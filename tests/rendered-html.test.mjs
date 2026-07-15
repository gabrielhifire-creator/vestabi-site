import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Vesta landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Vesta \| Inteligência operacional aplicada<\/title>/i);
  assert.match(html, /Menos retrabalho\. Mais clareza para operar\./);
  assert.match(html, /Em quais etapas a operação perde mais tempo\?/);
  assert.doesNotMatch(html, /Onde o tempo se perde\?/);
  assert.match(html, /href="#problema">Desafios<\/a>/);
  assert.match(html, /href="#como-ajudamos">Soluções<\/a>/);
  assert.match(html, /href="#metodo">Método<\/a>/);
  assert.match(html, /href="#faq">Perguntas<\/a>/);
  assert.match(html, /https:\/\/wa\.me\/5571981995565/);
  assert.match(html, /mailto:contato@vestabi\.com/);
  assert.match(html, /rel="canonical" href="https:\/\/www\.vestabi\.com\/"/);
  assert.match(html, /property="og:image" content="https:\/\/www\.vestabi\.com\/og\.png"/);
  assert.match(html, /name="twitter:image" content="https:\/\/www\.vestabi\.com\/og\.png"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  assert.doesNotMatch(html, /google-analytics|googletagmanager|plausible|umami|facebook\.net/i);
});

test("publishes search-engine discovery files for the canonical site", async () => {
  const [robots, sitemap] = await Promise.all([
    readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
  ]);

  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.match(robots, /^Sitemap: https:\/\/www\.vestabi\.com\/sitemap\.xml$/m);
  assert.match(sitemap, /<loc>https:\/\/www\.vestabi\.com\/<\/loc>/);
});

test("keeps the public Pages pipeline reproducible and secret-free", async () => {
  const [workflow, exportScript, smokeTest, gitignore] = await Promise.all([
    readFile(new URL("../.github/workflows/pages.yml", import.meta.url), "utf8"),
    readFile(new URL("../scripts/export-github-pages.mjs", import.meta.url), "utf8"),
    readFile(new URL("../scripts/smoke-test.mjs", import.meta.url), "utf8"),
    readFile(new URL("../.gitignore", import.meta.url), "utf8"),
  ]);

  assert.match(workflow, /pull_request:/);
  assert.match(workflow, /pages:\s*write/);
  assert.match(workflow, /id-token:\s*write/);
  assert.match(workflow, /actions\/deploy-pages@[a-f0-9]{40}/);
  assert.match(workflow, /pnpm\/action-setup@[a-f0-9]{40}/);
  assert.match(workflow, /version: 11\.7\.0/);
  assert.doesNotMatch(workflow, /corepack/);
  assert.match(workflow, /pnpm install --frozen-lockfile/);
  assert.match(workflow, /pnpm run export:github-pages/);
  assert.doesNotMatch(workflow, /secrets\.|gho_|github_pat_/i);
  assert.match(exportScript, /Compiled Geist font not found/);
  assert.match(smokeTest, /https:\/\/www\.vestabi\.com/);
  assert.match(smokeTest, /data:\(\?:image\|font\)/);
  assert.match(gitignore, /^\/\.openai\/$/m);
});

test("keeps navigation affordance and FAQ legibility in the production source", async () => {
  const [page, css, packageJson, rootFiles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readdir(new URL("../", import.meta.url)),
  ]);

  assert.match(page, /<nav className="desktop-nav"/);
  assert.match(page, /href="#problema">Desafios<\/a>/);
  assert.match(page, /href="#como-ajudamos">Soluções<\/a>/);
  assert.match(page, /href="#faq">Perguntas<\/a>/);

  assert.match(css, /\.desktop-nav a\s*\{[^}]*min-height:\s*42px/s);
  assert.match(css, /\.desktop-nav a\s*\{[^}]*padding:\s*9px 12px/s);
  assert.match(css, /\.desktop-nav a:hover,[\s\S]*box-shadow:\s*inset 0 -2px 0/s);
  assert.match(css, /\.faq-list details p\s*\{[^}]*line-height:\s*1\.68/s);
  assert.match(css, /\.process-intro\s*\{[^}]*position:\s*static/s);

  assert.match(packageJson, /"packageManager": "pnpm@11\.7\.0"/);
  assert.ok(rootFiles.includes("pnpm-lock.yaml"));
  assert.ok(!rootFiles.includes("package-lock.json"));
});

test("keeps numbered sequences legible and visually consistent", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /\.diagnostic-list span\s*\{[^}]*font-size:\s*12px/s);
  assert.match(
    css,
    /\.problem-item > span,[\s\S]*\.trust-points article > span\s*\{[^}]*width:\s*32px[^}]*height:\s*32px[^}]*font-size:\s*14px/s,
  );
  assert.match(
    css,
    /\.process-number\s*\{[^}]*width:\s*36px[^}]*height:\s*36px[^}]*font-size:\s*15px/s,
  );
});

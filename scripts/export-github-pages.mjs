import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const outputDir = path.join(root, "out", "github-pages");
const mobileNavigationScriptTag =
  '<script src="/mobile-navigation.js" defer></script>';

const workerUrl = pathToFileURL(path.join(root, "dist", "server", "index.js"));
workerUrl.searchParams.set("static-export", `${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const response = await worker.fetch(
  new Request("https://www.vestabi.com/", { headers: { accept: "text/html" } }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) throw new Error(`Render failed with ${response.status}`);

let html = await response.text();
const cssHref = html.match(/data-rsc-css-href="([^"]+\.css)"/)?.[1];
if (!cssHref) throw new Error("Compiled stylesheet not found in rendered HTML");

let css = await readFile(path.join(root, "dist", "client", cssHref), "utf8");
const fontHref = html.match(/href="([^"]+\.woff2)"/)?.[1];
if (!fontHref) throw new Error("Compiled Geist font not found in rendered HTML");
const fontPath = path.join(root, "dist", "client", fontHref.replace(/^\//, ""));

css = `@font-face{font-family:'Geist';font-style:normal;font-weight:100 900;font-display:swap;src:url('/geist.woff2') format('woff2')}\n:root{--font-geist-sans:'Geist',Arial,sans-serif}\n${css}`;

html = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  .replace(/<link\b[^>]*rel="modulepreload"[^>]*>/gi, "")
  .replace(/<link\b[^>]*rel="preload"[^>]*>/gi, "")
  .replace(/<style\b[^>]*data-vinext-fonts[^>]*>[\s\S]*?<\/style>/gi, "")
  .replace(
    /<link\b[^>]*data-rsc-css-href="[^"]+"[^>]*>/gi,
    '<link rel="stylesheet" href="/styles.css">',
  )
  .replace("</head>", '<meta name="generator" content="Vesta static site"></head>')
  .replace("</body>", `${mobileNavigationScriptTag}</body>`)
  .replace(/\sdata-precedence="[^"]*"/g, "")
  .replace(/\sdata-rsc-css-href="[^"]*"/g, "")
  .replace(/\scrossorigin=""/g, "")
  .replace(/\sclass="__variable_geist_[^"]*"/, "");

const htmlWithoutLocalNavigation = html.replace(mobileNavigationScriptTag, "");
const localNavigationScripts = html.match(
  /<script src="\/mobile-navigation\.js" defer><\/script>/g,
) ?? [];

if (localNavigationScripts.length !== 1) {
  throw new Error("Local mobile navigation script is missing or duplicated");
}

const leftovers = {
  scripts: htmlWithoutLocalNavigation.match(/<script\b/gi) ?? [],
  modulepreloads: html.match(/modulepreload/gi) ?? [],
  assets: [...html.matchAll(/.{0,80}\/assets\/.{0,120}/gi)].map((match) => match[0]),
  dataUrls: html.match(/data:(?:image|font)\//gi) ?? [],
};

if (Object.values(leftovers).some((matches) => matches.length > 0)) {
  console.error(JSON.stringify(leftovers, null, 2));
  throw new Error("Static HTML still contains runtime asset references");
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(path.join(outputDir, "icons"), { recursive: true });
await writeFile(path.join(outputDir, "index.html"), html);
await writeFile(path.join(outputDir, "404.html"), html);
await writeFile(path.join(outputDir, "CNAME"), "www.vestabi.com\n");
await writeFile(path.join(outputDir, ".nojekyll"), "");
await writeFile(path.join(outputDir, "styles.css"), css);
await copyFile(fontPath, path.join(outputDir, "geist.woff2"));
await copyFile(
  path.join(root, "public", "vesta-logo-light.png"),
  path.join(outputDir, "vesta-logo-light.png"),
);
await copyFile(path.join(root, "public", "og.png"), path.join(outputDir, "og.png"));
await copyFile(
  path.join(root, "public", "icons", "whatsapp.svg"),
  path.join(outputDir, "icons", "whatsapp.svg"),
);
await copyFile(
  path.join(root, "public", "icons", "envelope.svg"),
  path.join(outputDir, "icons", "envelope.svg"),
);
await copyFile(
  path.join(root, "public", "mobile-navigation.js"),
  path.join(outputDir, "mobile-navigation.js"),
);
await copyFile(
  path.join(root, "public", "robots.txt"),
  path.join(outputDir, "robots.txt"),
);
await copyFile(
  path.join(root, "public", "sitemap.xml"),
  path.join(outputDir, "sitemap.xml"),
);

console.log(JSON.stringify({ outputDir, bytes: Buffer.byteLength(html) }));

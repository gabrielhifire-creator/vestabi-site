import assert from "node:assert/strict";

const siteUrl = new URL(process.env.SITE_URL ?? "https://www.vestabi.com/");
const apexUrl = new URL(process.env.SITE_APEX_URL ?? "https://vestabi.com/");
const attempts = Number.parseInt(process.env.SMOKE_ATTEMPTS ?? "12", 10);
const delayMs = Number.parseInt(process.env.SMOKE_DELAY_MS ?? "10000", 10);

if (!Number.isInteger(attempts) || attempts < 1) {
  throw new Error("SMOKE_ATTEMPTS must be a positive integer");
}
if (!Number.isInteger(delayMs) || delayMs < 0) {
  throw new Error("SMOKE_DELAY_MS must be a non-negative integer");
}

const pause = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function fetchChecked(pathname, expectedContentType) {
  const url = new URL(pathname, siteUrl);
  url.searchParams.set("deployment-check", `${Date.now()}`);
  const response = await fetch(url, {
    cache: "no-store",
    headers: { "cache-control": "no-cache" },
  });

  assert.equal(response.status, 200, `${url.pathname} must return 200`);
  assert.match(
    response.headers.get("content-type") ?? "",
    expectedContentType,
    `${url.pathname} returned an unexpected content type`,
  );
  return response;
}

async function verifyDeployment() {
  const [home, robots, sitemap, css, logo, socialImage, emailIcon, whatsappIcon, font] =
    await Promise.all([
      fetchChecked("/", /^text\/html\b/i),
      fetchChecked("/robots.txt", /^text\/plain\b/i),
      fetchChecked("/sitemap.xml", /^(?:application|text)\/xml\b/i),
      fetchChecked("/styles.css", /^text\/css\b/i),
      fetchChecked("/vesta-logo-light.png", /^image\/png\b/i),
      fetchChecked("/og.png", /^image\/png\b/i),
      fetchChecked("/icons/envelope.svg", /^image\/svg\+xml\b/i),
      fetchChecked("/icons/whatsapp.svg", /^image\/svg\+xml\b/i),
      fetchChecked("/geist.woff2", /^font\/woff2\b/i),
    ]);

  const [html, robotsText, sitemapText] = await Promise.all([
    home.text(),
    robots.text(),
    sitemap.text(),
  ]);

  assert.match(html, /rel="canonical" href="https:\/\/www\.vestabi\.com\/"/);
  assert.match(html, /property="og:image" content="https:\/\/www\.vestabi\.com\/og\.png"/);
  assert.match(html, /https:\/\/wa\.me\/5571981995565/);
  assert.doesNotMatch(html, /data:(?:image|font)\//i);
  assert.doesNotMatch(
    html,
    /google-analytics|googletagmanager|plausible|umami|facebook\.net/i,
  );
  assert.match(robotsText, /Sitemap: https:\/\/www\.vestabi\.com\/sitemap\.xml/);
  assert.match(sitemapText, /<loc>https:\/\/www\.vestabi\.com\/<\/loc>/);
  assert.ok(Number(socialImage.headers.get("content-length") ?? "0") > 0);
  assert.ok(Number(logo.headers.get("content-length") ?? "0") > 0);
  assert.ok(Number(css.headers.get("content-length") ?? "0") > 0);
  assert.ok(Number(emailIcon.headers.get("content-length") ?? "0") > 0);
  assert.ok(Number(whatsappIcon.headers.get("content-length") ?? "0") > 0);
  assert.ok(Number(font.headers.get("content-length") ?? "0") > 0);

  const apexResponse = await fetch(apexUrl, {
    redirect: "manual",
    cache: "no-store",
    headers: { "cache-control": "no-cache" },
  });
  assert.ok([301, 302, 307, 308].includes(apexResponse.status));
  assert.equal(apexResponse.headers.get("location"), siteUrl.href);
}

let lastError;
for (let attempt = 1; attempt <= attempts; attempt += 1) {
  try {
    await verifyDeployment();
    console.log(`Deployment verified at ${siteUrl.href}`);
    process.exit(0);
  } catch (error) {
    lastError = error;
    if (attempt < attempts) {
      console.log(`Verification attempt ${attempt}/${attempts} failed; retrying.`);
      await pause(delayMs);
    }
  }
}

throw lastError;

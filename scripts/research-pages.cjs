const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const targets = [
  {
    id: "fowler-combine-functions-into-class",
    url: "https://refactoring.com/catalog/combineFunctionsIntoClass.html",
  },
  {
    id: "fowler-refactoring-book",
    url: "https://martinfowler.com/books/refactoring.html",
  },
  {
    id: "refactoring-guru-combine-functions-into-class",
    url: "https://refactoring.guru/combine-functions-into-class",
  },
  {
    id: "material-design-navigation",
    url: "https://m3.material.io/foundations/interaction/gestures",
  },
  {
    id: "awwwards-education",
    url: "https://www.awwwards.com/websites/education/",
  },
  {
    id: "awwwards-interactive",
    url: "https://www.awwwards.com/websites/interactive/",
  },
];

const outputDir = path.join("step_archive", "screenshots", "research");
fs.mkdirSync(outputDir, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
    locale: "ko-KR",
  });

  const results = [];

  for (const target of targets) {
    const page = await context.newPage();
    const result = {
      id: target.id,
      url: target.url,
      collectedAt: new Date().toISOString(),
      status: "PENDING",
      screenshot: path.join(outputDir, `${target.id}.png`),
      raw: path.join("step_archive", `research-raw-${target.id}.txt`),
      error: "",
    };

    try {
      await page.goto(target.url, {
        waitUntil: "domcontentloaded",
        timeout: 45000,
      });
      await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
      await page.screenshot({ path: result.screenshot, fullPage: true });
      const content = await page.evaluate(() => document.body.innerText);
      fs.writeFileSync(
        result.raw,
        `URL: ${target.url}\nCOLLECTED_AT: ${result.collectedAt}\n\n${content}`,
        "utf8",
      );
      result.status = "OK";
    } catch (error) {
      result.status = "FAIL";
      result.error = error instanceof Error ? error.message : String(error);
      fs.writeFileSync(
        result.raw,
        `URL: ${target.url}\nCOLLECTED_AT: ${result.collectedAt}\nERROR: ${result.error}`,
        "utf8",
      );
    } finally {
      await page.close();
      results.push(result);
    }
  }

  await browser.close();
  fs.writeFileSync(
    path.join("step_archive", "research-manifest.json"),
    JSON.stringify(results, null, 2),
    "utf8",
  );
})();

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright";

const root = join(process.cwd(), "dist");
const outputDir = join(process.cwd(), "step_archive", "screenshots");
const port = 4180;
const types = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
]);

// @MX:NOTE: Visual verification proves the abstract canvas and responsive UI render.
const server = createServer(async (request, response) => {
  const requestedPath = new URL(request.url ?? "/", `http://127.0.0.1:${port}`).pathname;
  const safePath = normalize(requestedPath === "/" ? "/index.html" : requestedPath).replace(
    /^(\.\.[/\\])+/,
    "",
  );
  const filePath = join(root, safePath);

  try {
    const body = await readFile(filePath);
    response.writeHead(200, {
      "content-type": types.get(extname(filePath)) ?? "application/octet-stream",
    });
    response.end(body);
  } catch {
    const fallback = await readFile(join(root, "index.html"));
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    response.end(fallback);
  }
});

await mkdir(outputDir, { recursive: true });

await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));

const browser = await chromium.launch();
const results = [];

for (const target of [
  { name: "desktop", viewport: { width: 1440, height: 1000 } },
  { name: "mobile", viewport: { width: 390, height: 844 } },
]) {
  const page = await browser.newPage({ viewport: target.viewport });
  await page.goto(`http://127.0.0.1:${port}`, { waitUntil: "networkidle" });
  await page.screenshot({
    path: join(outputDir, `final-${target.name}.png`),
    fullPage: true,
  });
  const canvasPixels = await page.locator("[data-flow-canvas]").evaluate((canvas) => {
    const context = canvas.getContext("2d");
    const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let visible = 0;
    for (let index = 3; index < data.length; index += 4) {
      if (data[index] > 0) {
        visible += 1;
      }
    }
    return visible;
  });

  if (canvasPixels < 100) {
    throw new Error(`${target.name} canvas is blank`);
  }

  results.push({
    viewport: target.name,
    screenshot: `step_archive/screenshots/final-${target.name}.png`,
    canvasPixels,
  });
  await page.close();
}

await browser.close();
server.close();

await writeFile(
  join(process.cwd(), "step_archive", "visual-check-results.json"),
  JSON.stringify(results, null, 2),
  "utf8",
);

import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

const root = join(process.cwd(), "dist");
const port = 4181;
const types = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
]);

// @MX:NOTE: Axe checks the rendered app after production build, not source markup only.
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

await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));

const browser = await chromium.launch();
const summaries = [];

for (const target of [
  { name: "desktop", viewport: { width: 1440, height: 1000 } },
  { name: "mobile", viewport: { width: 390, height: 844 } },
]) {
  const context = await browser.newContext({ viewport: target.viewport });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:${port}`, { waitUntil: "networkidle" });
  const result = await new AxeBuilder({ page }).analyze();
  summaries.push({
    viewport: target.name,
    violations: result.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      nodes: violation.nodes.length,
      description: violation.description,
    })),
  });
  await context.close();
}

await browser.close();
server.close();

await writeFile(
  join(process.cwd(), "step_archive", "accessibility-results.json"),
  JSON.stringify(summaries, null, 2),
  "utf8",
);

const violationCount = summaries.reduce((total, item) => total + item.violations.length, 0);
if (violationCount > 0) {
  throw new Error(`Accessibility violations: ${violationCount}`);
}

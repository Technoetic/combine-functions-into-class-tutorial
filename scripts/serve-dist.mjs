import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const port = Number(process.env.PORT ?? 4174);
const root = join(process.cwd(), "dist");
const types = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
]);

// @MX:NOTE: Tiny static server keeps built output previewable without external tooling.
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

server.listen(port, "127.0.0.1", () => {
  console.log(`dist server: http://127.0.0.1:${port}`);
});

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";
const root = path.resolve("out");
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".ttf": "font/ttf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".glb": "model/gltf-binary",
  ".ico": "image/x-icon",
};
const cache = new Map();
createServer(async (req, res) => {
  try {
    if (!["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405);
      res.end();
      return;
    }
    const url = new URL(req.url, "http://localhost");
    let file = path.resolve(root, "." + decodeURIComponent(url.pathname));
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    let status = 200;
    try {
      if ((await stat(file)).isDirectory())
        file = path.join(file, "index.html");
    } catch {
      file = path.join(root, "404.html");
      status = 404;
    }
    let data = cache.get(file);
    if (!data) {
      data = await readFile(file);
      cache.set(file, data);
    }
    const ext = path.extname(file);
    const compress =
      /gzip/.test(req.headers["accept-encoding"] || "") &&
      [".html", ".js", ".css", ".json", ".txt", ".svg", ".glb"].includes(ext);
    if (compress) {
      const key = file + ":gzip";
      let gz = cache.get(key);
      if (!gz) {
        gz = gzipSync(data);
        cache.set(key, gz);
      }
      data = gz;
    }
    res.writeHead(status, {
      "Content-Type": types[ext] || "application/octet-stream",
      "Content-Length": data.length,
      "Cache-Control":
        ext === ".html"
          ? "no-cache"
          : url.pathname.startsWith("/_next/static/")
            ? "public, max-age=31536000, immutable"
            : "public, max-age=3600",
      Vary: "Accept-Encoding",
      "X-Content-Type-Options": "nosniff",
      ...(compress ? { "Content-Encoding": "gzip" } : {}),
    });
    res.end(req.method === "HEAD" ? undefined : data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
}).listen(port, "0.0.0.0", () =>
  console.log(`VELUNE production preview: http://localhost:${port}`),
);

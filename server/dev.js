import compression from "compression";
import express from "express";

import { createServer } from "vite";

const PORT = Number.parseInt(process.env.PORT || "3030");
const ENV = process.env.ENV || "DEV";

const app = express();

app.use(compression());

console.log("Starting development server");
const viteDevServer = await createServer({ server: { middlewareMode: true, hmr: { port: 24679 } }, appType: 'custom' })
app.use(viteDevServer.middlewares);
app.use(async (req, res, next) => {
  try {
    const source = await viteDevServer.ssrLoadModule("app.ts");
    return await source.app(req, res, next);
  } catch (error) {
    if (typeof error === "object" && error instanceof Error) {
      viteDevServer.ssrFixStacktrace(error);
    }
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
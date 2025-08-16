import compression from "compression";
import express from "express";

const PORT = Number.parseInt(process.env.PORT || "3030");

const app = express();

app.use(compression());
app.disable("x-powered-by");

console.log("Starting development server");
const viteDevServer = await import("vite").then((vite) =>
  vite.createServer({
    server: { middlewareMode: true, hmr: { port: 24679 } },
  }),
);
app.use(viteDevServer.middlewares);
app.use(async (req, res, next) => {
  try {
    const source = await viteDevServer.ssrLoadModule("./server/app.ts");
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

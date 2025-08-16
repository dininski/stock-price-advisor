import { Router } from "express";

const router = Router({ strict: true });

const data: number[] = [];

router.get("/", (req, res) => {
  res.status(200);
  res.send(JSON.stringify(data));
});

router.post("/", (req, res) => {
  // TODO: generate sample data
  res.status(200);
  res.send(JSON.stringify({}));
});

export default router;

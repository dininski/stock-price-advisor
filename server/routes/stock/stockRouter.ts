import { Router } from "express";
import { regenerateData, getData } from "server/data";

const router = Router({ strict: true });

router.get("/", (req, res) => {
  res.header("Content-type", "application/json");
  res.status(200);
  res.send(getData());
});

router.post("/", (req, res) => {
  regenerateData();
  res.status(200);
  res.send(getData());
});

export default router;

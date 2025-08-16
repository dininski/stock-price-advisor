import { Router } from "express";
import { regenerateData, getData } from "@stock-advisor/server/data";

const router = Router({ strict: true });

router.get("/", async (req, res) => {
  res.header("Content-type", "application/json");
  res.status(200);
  res.send(getData());
});

router.post("/", async (req, res) => {
  regenerateData();
  res.status(200);
  res.send(getData());
});

export default router;

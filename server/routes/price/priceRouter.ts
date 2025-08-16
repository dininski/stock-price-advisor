import { Router } from "express";

const router = Router({ strict: true });

const data: number[] = [];

router.get("/best", (req, res) => {
  const { startTime, endTime } = req.query;
  if (!!startTime || !!endTime) {
    //TODO: add error handling
    res.status(400);
    return;
  }
  res.status(200);
  res.send(JSON.stringify(data));
});

export default router;

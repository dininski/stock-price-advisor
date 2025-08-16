import { Router } from "express";
import { getData } from "server/data";
import { calculateBestPrice } from "server/services/priceService";

const router = Router({ strict: true });

router.get("/best", (req, res) => {
  const { buyTime, sellTime } = req.query;

  if (!buyTime || !sellTime) {
    //TODO: clean up error handling
    res.status(400);
    return res.send({ error: "Provide both buyTime and sellTime." });
  }

  if (sellTime > buyTime) {
    res.status(400);
    return res.send({ error: "Sell time cannot be after buy time" });
  }

  const result = calculateBestPrice(getData());
  res.status(200);
  res.send(result);
});

export default router;

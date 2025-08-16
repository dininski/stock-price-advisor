import { Router } from "express";
import { getData } from "server/data";
import { calculateBestPrice } from "server/services/priceService";

const router = Router({ strict: true });

router.get("/best", (req, res) => {
  const { buyTime, sellTime } = req.query;
  console.log(buyTime, sellTime);
  if (!buyTime || !sellTime) {
    //TODO: clean up error handling
    res.status(400);
    console.log("err");
    res.send({ error: "Provide both buyTime and sellTime." });
    return;
  }

  const result = calculateBestPrice(getData());
  res.status(200);
  res.send(result);
});

export default router;

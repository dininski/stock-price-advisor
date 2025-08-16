import { Router } from "express";
import { getData } from "server/data";
import { calculateBestPrice } from "server/services/priceService";

const router = Router({ strict: true });

router.get("/best", (req, res) => {
  const { buyTime: buyTimeQueryParam, sellTime: sellTimeQueryParam } = req.query;
  //TODO: clean up error handling
  if (!buyTimeQueryParam || !sellTimeQueryParam) {
    console.log(buyTimeQueryParam, sellTimeQueryParam)
    res.status(400);
    return res.send({ message: "Provide both a buy time and a sell time.", code: 1 });
  }

  const buyTime = Number(buyTimeQueryParam);
  const sellTime = Number(sellTimeQueryParam);
  if (Number.isNaN(buyTime) || Number.isNaN(sellTime)) {
    res.status(400);
    return res.send({ message: "Invalid date and time format provided.", code: 2 });
  }

  if (buyTime > sellTime) {
    res.status(400);
    return res.send({ message: "Sell time cannot be after buy time.", code: 3 });
  }

  const result = calculateBestPrice(getData());
  res.status(200);
  res.send(result);
});

export default router;

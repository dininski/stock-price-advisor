import { Router } from "express";
import { getData } from "server/data";
import { calculateBestPrice } from "server/services/priceService";
import { respondError } from "server/util/express";
import { ApiError } from "@stock-advisor/shared/response/ApiError";
import { PriceResponse } from "@stock-advisor/shared/response/Price";
import { Response } from "express";

const router = Router({ strict: true });

router.get("/best", (req, res: Response<ApiError | PriceResponse | null>) => {
  const { buyTime: buyTimeQueryParam, sellTime: sellTimeQueryParam } =
    req.query;
  if (!buyTimeQueryParam || !sellTimeQueryParam) {
    return respondError(res, "Provide both a buy time and a sell time.", 1);
  }

  const buyTime = Number(buyTimeQueryParam);
  const sellTime = Number(sellTimeQueryParam);

  if (Number.isNaN(buyTime) || Number.isNaN(sellTime)) {
    return respondError(res, "Invalid date and time format provided.", 2);
  }

  if (buyTime > sellTime) {
    return respondError(res, "Sell time cannot be after buy time.", 3);
  }

  const data = getData();

  if (buyTime < data[0].date) {
    return respondError(res, "Buy time is outside of known stock values.", 4);
  }

  if (sellTime > data[data.length - 1].date) {
    return respondError(res, "Sell time is outside of known stock values.", 5);
  }

  const result = calculateBestPrice(getData(), buyTime, sellTime);
  res.status(200);
  res.send(result);
});

export default router;

import { Router, NextFunction, Request } from "express";
import { getData } from "@stock-advisor/server/data";
import { calculateBestPrice } from "@stock-advisor/server/services/priceService";
import { PriceResponse } from "@stock-advisor/shared/response/Price";
import { Response } from "express";
import { ApiError } from "server/util/errors";

const router = Router({ strict: true });

router.get(
  "/best",
  (req: Request, res: Response<PriceResponse | null>, next: NextFunction) => {
    const { buyTime: buyTimeQueryParam, sellTime: sellTimeQueryParam } =
      req.query;
    if (!buyTimeQueryParam || !sellTimeQueryParam) {
      throw new ApiError("Provide both a buy time and a sell time.", 400);
    }

    const buyTime = Number(buyTimeQueryParam);
    const sellTime = Number(sellTimeQueryParam);

    if (Number.isNaN(buyTime) || Number.isNaN(sellTime)) {
      throw new ApiError("Invalid date and time format provided.", 400);
    }

    const result = calculateBestPrice(getData(), buyTime, sellTime);
    res.status(200);
    res.send(result);
  }
);

export default router;

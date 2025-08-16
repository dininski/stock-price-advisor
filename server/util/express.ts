import { Response } from "express-serve-static-core";
import { ApiError } from "@stock-advisor/shared/response/ApiError";

export function respondError(
  res: Response<ApiError>,
  message: string,
  code: number,
  statusCode: number = 400,
) {
  res.status(statusCode);
  return res.send({ message, code });
}

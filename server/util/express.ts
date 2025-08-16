import { Response } from "express-serve-static-core";
import { ErrorResponse } from "@stock-advisor/shared/response/ErrorResponse";

export function respondError(
  res: Response<ErrorResponse>,
  message: string,
  statusCode: number = 500,
) {
  res.status(statusCode);
  return res.send({ message });
}

import { NextFunction, Request, Response } from "express";
import { ApiError, ValidationError } from "server/util/errors";
import { respondError } from "server/util/express";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    respondError(res, err.message, 400);
  } else if (err instanceof ApiError) {
    respondError(res, err.message, err.statusCode);
  } else {
    next(err);
  }
};

import { AxiosError } from "axios";
import { ErrorResponse } from "@stock-advisor/shared/response/ErrorResponse";

export const getAsyncErrorMessage = (err: unknown): string => {
  if (err instanceof AxiosError) {
    const axiosError = err as AxiosError<ErrorResponse>;
    if (axiosError.response?.data?.message) {
      return axiosError.response?.data?.message;
    } else {
      return "Something went wrong!";
    }
  } else {
    return err instanceof Error ? err.message : "Something went wrong";
  }
};

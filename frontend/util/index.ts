import { AxiosError } from "axios";
import { ApiError } from "shared/response/ApiError";

export const getAsyncErrorMessage = (err: unknown): string => {
  if (err instanceof AxiosError) {
    const axiosError = err as AxiosError<ApiError>;
    if (axiosError.response?.data?.message) {
      return axiosError.response?.data?.message;
    } else {
      return "Something went wrong!";
    }
  } else {
    return err instanceof Error ? err.message : "Something went wrong";
  }
};

import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import axios, { AxiosError } from "axios";
import { PriceResponse } from "shared/response/Price";
import { ApiError } from "shared/response/ApiError";
import { formatEpoch } from "shared/lib/dateFormatter";
import { Label } from "./Label";
import { Error } from "./Error";
import { AsyncOpWrapper } from "./AsyncOpResult";
type Inputs = {
  buyTime: string;
  sellTime: string;
};

export default function StockForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [profitResult, setData] = useState<PriceResponse | null>(null);
  const [loading, setLoading] = useState(false);
  // TODO: add error handling
  const [error, setError] = useState<string | null>(null);

  const getStockData = async (buyTime: number, sellTime: number) => {
    try {
      setLoading(true);
      // TODO: extract as config
      const response = await axios.get<PriceResponse | null>(
        `http://localhost:3030/api/v1/price/best?buyTime=${buyTime}&sellTime=${sellTime}`,
      );

      setData(response.data);
      setError(null);
    } catch (err) {
      console.log(err);
      // TODO: clean up error
      if (err instanceof AxiosError) {
        const axiosError = err as AxiosError<ApiError>;
        console.log(axiosError);
        if (axiosError.response?.data?.message) {
          setError(axiosError.response?.data?.message);
        } else {
          setError("Something went wrong");
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: Inputs) =>
    getStockData(Number(data.buyTime), Number(data.sellTime));

  // TODO: remove eslint override
  return (
    <div className="w-full max-w-xs">
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-4 pb-4 mb-2"
      >
        <div className="mb-2">
          <Label htmlFor="buyTime" text="Buy time"></Label>
          <Controller
            name="buyTime"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <DatePicker
                selected={value ? new Date(value) : null}
                placeholderText="Buy time"
                dateFormat="dd/MM/yyyy"
                showTimeInput={true}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Error show={!!errors.buyTime} message="Please select time to buy." />
        </div>
        <div className="mb-2">
          <Label htmlFor="sellTime" text="Sell time" />
          <Controller
            name="sellTime"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <DatePicker
                selected={value ? new Date(value) : null}
                showTimeInput={true}
                placeholderText="Sell time"
                dateFormat="dd/MM/yyyy"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Error show={!!errors.buyTime} message="Please select time to buy." />
        </div>
        <input
          title="Get profit"
          type="submit"
          value="Get profit"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        />
      </form>
      <AsyncOpWrapper loading={loading} errorText={error}>
        {profitResult && (
          <>
            <div>Profit: {profitResult.profit}</div>
            <div>
              Buy date and time: {formatEpoch(profitResult.buyInformation.date)}
            </div>
            <div>
              Sell date and time:{" "}
              {formatEpoch(profitResult.sellInformation.date)}
            </div>
          </>
        )}
      </AsyncOpWrapper>
    </div>
  );
}

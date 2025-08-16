import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { PriceResponse } from "shared/response/Price";
import { Label } from "frontend/components/common/Label";
import { AsyncOpWrapper } from "frontend/components/common/AsyncOpResult";
import { Error } from "frontend/components/common/Error";
import Profit from "frontend/components/profit/ProfitSection";
import * as apiClient from "frontend/client";
import { getAsyncErrorMessage } from "frontend/util";
import { StockDates } from "./stock";

type Inputs = {
  buyTime: string;
  sellTime: string;
};

export default function StockForm({
  setStockDates,
}: {
  setStockDates: React.Dispatch<React.SetStateAction<StockDates | null>>;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [priceResponse, setData] = useState<PriceResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getBestProfit = async (buyTime: number, sellTime: number) => {
    try {
      setLoading(true);
      const response = await apiClient.fetchBestProfit(buyTime, sellTime);

      setStockDates({
        buyTime,
        sellTime,
        bestBuy: response.data?.buyInformation?.date || null,
        bestSell: response.data?.sellInformation?.date || null,
      });
      if (response.data) {
        setData(response.data);
      }
      setError(null);
    } catch (err) {
      setError(getAsyncErrorMessage(err));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: Inputs) =>
    getBestProfit(Number(data.buyTime), Number(data.sellTime));

  return (
    <div className="w-full max-w-xs flex flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded px-8 pt-4 pb-4 mb-2 border border-gray-600"
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
          <Error
            show={!!errors.sellTime}
            message="Please select time to sell."
          />
        </div>
        <input
          title="Get profit"
          type="submit"
          value="Get profit"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        />
      </form>
      <AsyncOpWrapper loading={loading} errorText={error}>
        {priceResponse && <Profit bestPriceResponse={priceResponse} />}
      </AsyncOpWrapper>
    </div>
  );
}

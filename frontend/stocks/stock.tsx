import StockForm from "./StockForm";
import StockDataView from "./StockDataView";
import { useState } from "react";

export type StockDates = {
  bestBuy: number | null;
  bestSell: number | null;
  buyTime: number;
  sellTime: number;
};

export default () => {
  const [stockDates, setStockDates] = useState<StockDates | null>(null);
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-row gap-5">
          <StockDataView stockDates={stockDates} setStockDates={setStockDates}/>
          <StockForm setStockDates={setStockDates}/>
        </div>
      </div>
    </main>
  );
};

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ScriptableLineSegmentContext,
} from "chart.js";
import { Stock } from "shared/model/Stock";
import { formatEpoch } from "frontend/util/dateFormatter";
import { StockDates } from "frontend/stocks/stock";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const isWithinBestBuyRange = (
  stock: Stock,
  bestBuy: number | null,
  bestSell: number | null,
) => {
  return bestBuy && bestSell && stock.date >= bestBuy && stock.date < bestSell;
};

const isWithinQueryRange = (
  stock: Stock,
  buyTime: number,
  sellTime: number,
) => {
  return stock.date >= buyTime && stock.date < sellTime;
};

export default function LineChart({
  data,
  stockDates,
}: {
  data: Stock[];
  stockDates: StockDates | null;
}) {
  const chartData = {
    datasets: [
      {
        label: "Stock price",
        data: data.map((val) => ({ y: val.price, x: val.date })),
        borderColor: "rgba(222, 222, 221, 1)",
        backgroundColor: "rgba(16, 85, 88, 0.5)",
        segment: {
          borderColor: (ctx: ScriptableLineSegmentContext) => {
            if (stockDates !== null) {
              const current = data[ctx.p0DataIndex];
              const next = data[ctx.p1DataIndex];
              if (
                isWithinBestBuyRange(
                  current,
                  stockDates.bestBuy,
                  stockDates.bestSell,
                )
              ) {
                return "rgba(51, 167, 64, 1)";
              }

              if (
                isWithinQueryRange(
                  next,
                  stockDates.buyTime,
                  stockDates.sellTime,
                ) &&
                isWithinQueryRange(
                  current,
                  stockDates.buyTime,
                  stockDates.sellTime,
                )
              ) {
                return "rgba(214, 224, 112, 1)";
              }
            }
          },
        },
      },
    ],
    labels: data.map((val) => formatEpoch(val.date)),
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
    },
  };

  return <Line data={chartData} options={options} width={600} height={500} />;
}

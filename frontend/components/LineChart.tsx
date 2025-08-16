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
} from "chart.js";
import { Stock } from "~/model/Stock";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function LineChart({ data }: { data: Stock[] }) {
  const chartData = {
    datasets: [
      {
        label: "Stock price",
        data: data.map((val) => ({ y: val.price, x: new Date(val.date) })),
        borderColor: "rgba(46, 174, 133, 1)",
        backgroundColor: "rgba(16, 85, 88, 0.5)",
      },
    ],
    labels: data.map((val) => new Date(val.date)),
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        display: false
      }
    }
  }
  // TODO: make responsive
  return <Line data={chartData} options={options} width={600} height={500} />;
}

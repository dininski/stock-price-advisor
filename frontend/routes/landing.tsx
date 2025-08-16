import DateRangeForm from "~/components/SubmitForm";
import LineChart from "../components/LineChart";

const startDate = Date.now();

const sampleData = Array.from(
  { length: Math.floor(Math.random() * 30) },
  (_, index) => ({
    x: startDate + index * 1000,
    y: Math.floor(Math.random() * 400),
  }),
);

console.log(sampleData);

//TODO: fetch data from server
const data = {
  datasets: [
    {
      label: "Stock ticker",
      data: sampleData,
      borderColor: "rgba(46, 174, 133, 1)",
      backgroundColor: "rgba(16, 85, 88, 0.5)",
    },
  ],
};

export default () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-10">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Stock advisor
          </h1>
        </header>
        <LineChart data={data} />
        <div className="flex-col">
          <DateRangeForm />
        </div>
      </div>
    </main>
  );
};

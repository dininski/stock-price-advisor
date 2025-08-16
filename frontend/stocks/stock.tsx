import DateRangeForm from "frontend/components/SubmitForm";
import StockDataView from "./stockDataView";

export default () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-10">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Stock advisor
          </h1>
        </header>
        <div className="flex flex-row gap-10">
          <StockDataView />
          <DateRangeForm />
        </div>
      </div>
    </main>
  );
};

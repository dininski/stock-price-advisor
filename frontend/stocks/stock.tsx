import DateRangeForm from "frontend/components/SubmitForm";
import StockDataView from "./stockDataView";

export default () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-row gap-10">
          <StockDataView />
          <DateRangeForm />
        </div>
      </div>
    </main>
  );
};

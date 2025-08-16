import StockForm from "./StockForm";
import StockDataView from "./StockDataView";

export default () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-row gap-5">
          <StockDataView />
          <StockForm />
        </div>
      </div>
    </main>
  );
};

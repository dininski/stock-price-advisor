import { PriceResponse } from "@stock-advisor/shared/response/Price";
import ProfitCalculator from "./ProfitCalculator";
import { ProfitDisplay } from "./ProfitDisplay";

export default function Profit(props: { bestPriceResponse: PriceResponse }) {
  const { bestPriceResponse } = props;
  return (
    <>
      <ProfitDisplay bestPrice={bestPriceResponse} />
      <ProfitCalculator profitResult={bestPriceResponse} />
    </>
  );
}

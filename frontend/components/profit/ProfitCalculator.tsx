import { PriceResponse } from "shared/response/Price";
import { Label } from "../common/Label";
import { useState } from "react";

export default function ProfitCalculator(props: {
  profitResult: PriceResponse;
}) {
  const { profit } = props.profitResult;

  const [potentialProfit, setProfit] = useState<number | null>(null);
  const [investment, setInvestment] = useState<number | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const investmentInputValue = Number(e.target.value);
    setInvestment(investmentInputValue);

    setProfit(profit * investmentInputValue);
  };
  return (
    <div className="max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Label htmlFor="investment" text="Amount to invest" />
      <input
        type="number"
        value={investment || undefined}
        onChange={onChange}
      />
      <div>Profit: {potentialProfit}</div>
    </div>
  );
}

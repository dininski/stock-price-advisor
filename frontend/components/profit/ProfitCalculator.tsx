import { PriceResponse } from "@stock-advisor/shared/response/Price";
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
    const calculatedProfit = profit * investmentInputValue;
    const roundedCalculatedProfit =
      Math.round((calculatedProfit + Number.EPSILON) * 100) / 100;

    setProfit(roundedCalculatedProfit);
  };
  return (
    <div className="max-w-sm p-2 border border-gray-600 shadow-md rounded px-8 pt-4 pb-4 mb-2">
      <Label htmlFor="investment" text="Amount to invest" />
      <input
        type="number"
        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        value={investment || undefined}
        onChange={onChange}
      />
      <div className="text-sm">Potential profit: {potentialProfit}</div>
    </div>
  );
}

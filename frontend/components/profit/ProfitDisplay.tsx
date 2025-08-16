import { formatEpoch } from "shared/lib/dateFormatter";
import { PriceResponse } from "shared/response/Price";

export const ProfitDisplay = (props: { bestPrice: PriceResponse }) => (
  <div className="max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <div>Profit: {props.bestPrice.profit}</div>
    <div>
      Buy date and time:{" "}
      {formatEpoch(props.bestPrice.buyInformation.date)}
    </div>
    <div>
      Sell date and time:
      {formatEpoch(props.bestPrice.sellInformation.date)}
    </div>
  </div>
);

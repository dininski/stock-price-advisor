import { formatEpoch } from "@stock-advisor/frontend/util/dateFormatter";
import { PriceResponse } from "@stock-advisor/shared/response/Price";

export const ProfitDisplay = (props: { bestPrice: PriceResponse }) => (
  <div className="max-w-sm p-2 border border-gray-600 shadow-md rounded px-8 pt-4 pb-4 mb-2">
    <div className="mb-2 text-sm">Profit: {props.bestPrice.profit}</div>
    <div className="mb-2 text-sm">
      Buy date and time: {formatEpoch(props.bestPrice.buyInformation.date)}
    </div>
    <div className="mb-2 text-sm">
      Sell date and time:
      {formatEpoch(props.bestPrice.sellInformation.date)}
    </div>
  </div>
);

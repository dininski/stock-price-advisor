import { useEffect, useState } from "react";
import { Stock } from "shared/model/Stock";
import LineChart from "frontend/components/common/LineChart";
import { AsyncOpWrapper } from "frontend/components/common/AsyncOpResult";
import * as apiClient from "frontend/client";
import { getAsyncErrorMessage } from "frontend/util";

const GetStockData = () => {
  const [data, setData] = useState<Stock[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getStockData = async () => {
      try {
        const response = await apiClient.fetchStockData();

        setData(response.data);
        setError(null);
      } catch (err) {
        setError(getAsyncErrorMessage(err));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    void getStockData();
  }, []);

  const regenerateStockData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.regenerateData();

      setData(response.data);
      setError(null);
    } catch (err) {
      setError(getAsyncErrorMessage(err));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <AsyncOpWrapper loading={loading} errorText={error}>
        <>
          <div>
            <>{data !== null && <LineChart data={data} />}</>
          </div>
          <div>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => regenerateStockData()}
            >
              Regenerate data
            </button>
          </div>
        </>
      </AsyncOpWrapper>
    </div>
  );
};

export default GetStockData;

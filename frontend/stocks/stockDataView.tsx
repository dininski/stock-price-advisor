import { useEffect, useState } from "react";
import axios from "axios";
import { Stock } from "shared/model/Stock";
import LineChart from "frontend/components/LineChart";

const GetStockData = () => {
  const [data, setData] = useState<Stock[] | null>(null);
  const [loading, setLoading] = useState(true);
  // TODO: add error handling
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getStockData = async () => {
      try {
        // TODO: extract as config
        const response = await axios.get<Stock[] | null>(
          `http://localhost:3030/api/v1/stock`,
        );

        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    void getStockData();
  }, []);

  return (
    <div>
      {
        //TODO: sort out error handling
      }
      {!loading && error && <>{error}</>}
      {!loading && !error && data !== null && <LineChart data={data} />}
    </div>
  );
};

export default GetStockData;

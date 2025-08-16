import { useEffect, useState } from "react";
import axios from "axios";
import { Stock } from "~/model/Stock";
import LineChart from "~/components/LineChart";

const GetStockData = () => {
  const [data, setData] = useState<Stock[] | null>(null);
  const [loading, setLoading] = useState(true);
  // TODO: add error handling
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getStockData = async () => {
      try {
        const response = await axios.get<Stock[] | null>(
          `http://localhost:3030/api/v1/stock`,
        );

        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    getStockData();
  }, []);

  return <div>
    {!loading && data !== null && <LineChart data={data} />}
    </div>;
};

export default GetStockData;

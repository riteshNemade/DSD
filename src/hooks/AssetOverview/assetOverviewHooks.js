import { useState } from "react";
import api from "../../api/api";
import { useEffect } from "react";

export const fetchHistoricalData = (id) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [url, setUrl] = useState(
    `/reports/activity?item_id=${id}&item_type=asset&search=`
  );
  const [searchTerm, setSearchTerm] = useState();

  const getHistoricalData = async () => {
    await api.get(url).then((response) => {
      setHistoricalData(response.data.rows);
    });
  };
  const search = async () => {
    await api.get(url + searchTerm).then((response) => {
      console.log(url + searchTerm);
      setHistoricalData([])
      setHistoricalData(response.data.rows);
      console.log(historicalData.length);
    });
  };
  useEffect(() => {
    getHistoricalData();
  }, []);

  useEffect(() => {
    if (searchTerm !== undefined && searchTerm !== null) {
      console.log('why')
      search();
    }
  }, [searchTerm]);

  return {
    historicalData,
    url,
    setUrl,
    setSearchTerm,
  };
};

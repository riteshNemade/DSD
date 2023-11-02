import api from "../../api/api";
import { useState, useEffect } from "react";

export const fetchAssetListData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isListLoading, setIsListLoading] = useState(true);
  const [assetListData, setAssetListData] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [url, setUrl] = useState(
    `/hardware?sort=created_at&order=asc&limit=20&offset=`
  );
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);
    await api
      .get(url + 0)
      .then((response) => {
        setAssetListData([]);
        setOffset(0);
        setTotal(response.data.total);
        setAssetListData(response.data.rows);
      })
      .catch(() => {
        setAssetListData([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const search = async () => {
    setIsLoading(true);
    await api
      .get(`/hardware?search=${searchTerm}`)
      .then((response) => {
        setAssetListData(response.data.rows);
      })
      .catch(() => {
        setAssetListData([]);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      });
  };

  const fetchDataByOffset = async () => {
    await api.get(url + `${offset}`).then((response) => {
      setIsListLoading(true);

      setAssetListData([...assetListData, ...response.data.rows]);

      setTimeout(() => {
        setIsListLoading(false);
      }, 2500);
    });
  };

  // normal API call on screen load
  useEffect(() => {
    console.log(url)
    fetchData();
  }, [url]);

  useEffect(() => {
    fetchDataByOffset();
    console.log("offset", offset);
  }, [offset]);

  // API call for search
  useEffect(() => {
    if (searchTerm !== undefined || searchTerm !== null) {
      search();
    } else {
      fetchData();
    }
  }, [searchTerm]);

  return {
    isLoading,
    assetListData,
    searchTerm,
    setSearchTerm,
    url,
    setUrl,
    setOffset,
    isListLoading,
    total,
    offset
  };
};

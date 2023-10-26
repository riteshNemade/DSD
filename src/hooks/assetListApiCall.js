import api from "../api/api";
import { useState, useEffect } from "react";

export const fetchAssetListData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [assetListData, setAssetListData] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [sortOption, setSortOption] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    api
      .get("/hardware")
      .then((response) => {
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
    api
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

  const sortFetchData = async (sortCriteria, order) => {
    setIsLoading(true);
    api
      .get(`/hardware?sort=${sortCriteria}&order=${order}`)
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

  //normal API call on screen load
  useEffect(() => {
    fetchData();
  }, []);

  //API call for search
  useEffect(() => {
    if (searchTerm !== undefined || searchTerm !== null) {
      search();
    } else {
      fetchData();
    }
  }, [searchTerm]);

  //API call for sort
  useEffect(() => {
    if (sortOption !== undefined && sortOption !== null) {
      console.log(sortOption);
      const sortCriteria = sortOption.split("-")[0];
      const order = sortOption.split("-")[1];
      sortFetchData(sortCriteria, order);
    } else {
      fetchData();
    }
  }, [sortOption]);

  return { isLoading, assetListData, searchTerm, setSearchTerm, setSortOption };
};

import api from "../../api/api";
import { useState, useEffect } from "react";

export const fetchAssetListData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [assetListData, setAssetListData] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [sortOption, setSortOption] = useState('created_at-asc');
  const [url, setUrl] = useState(`/hardware?sort=created_at&order=asc&limit=20&offset=`)
  const [offset, setOffset] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);
    await api
      .get(url+0)
      .then((response) => {
        setAssetListData([]);
        setOffset(0)
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



  const fetchDataByOffset= async () =>{
    await api.get(url+`${offset}`).then((response)=>{
      setAssetListData([...assetListData,...response.data.rows]);
    })
  }

  // normal API call on screen load
  useEffect(() => {
    fetchData();
  }, [url]);

  useEffect(() => {
    fetchDataByOffset();
    console.log('offset',offset)
  }, [offset]);

  // API call for search
  useEffect(() => {
    if (searchTerm !== undefined || searchTerm !== null) {
      search();
    } else {
      fetchData();
    }
  }, [searchTerm]);

    // const sortFetchData = async (sortCriteria, order) => {
  //   setIsLoading(true);
  //   await api
  //     .get(`/hardware?sort=${sortCriteria}&order=${order}`)
  //     .then((response) => {
  //       setAssetListData(response.data.rows);
  //     })
  //     .catch(() => {
  //       setAssetListData([]);
  //     })
  //     .finally(() => {
  //       setTimeout(() => {
  //         setIsLoading(false);
  //       }, 1500);
  //     });
  // };

  // //API call for sort
  // useEffect(() => {
  //   if (sortOption !== undefined && sortOption !== null) {
  //     console.log(sortOption);
  //     const sortCriteria = sortOption.split("-")[0];
  //     const order = sortOption.split("-")[1];
  //     sortFetchData(sortCriteria, order);
  //   } else {
  //     fetchData();
  //   }
  // }, [sortOption]);

  return { isLoading, assetListData, searchTerm, setSearchTerm, setSortOption, sortOption, setUrl, setOffset };
};

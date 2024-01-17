import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import { useInfiniteQuery, onlineManager } from "@tanstack/react-query";

import { ASSET_LIST_CACHE_TIME } from "@constants/cacheConstants";
import api from "@api/api";

export function fetchData() {
  /**
   * Set the url here.
   * Change the url whenever sorting or filtering is done.
   * This will trigger state change thus triggering re-render.
   */
  let BASE_URL = `/hardware?location_id=${location_id}&`;
  const [url, setUrl] = useState(
    `${BASE_URL}sort=created_at&order=asc&limit=20&offset=`
  );

  //check user type and location id
  const location_id = useSelector((state) => {
    return state.global.locationId;
  });
  const userType = useSelector((state) => {
    return state.global.userType;
  });
  useEffect(() => {
    userType === "SUPER"
      ? setUrl(`/hardware?sort=created_at&order=asc&limit=20&offset=`)
      : setUrl(
          `/hardware?location_id=${location_id}&sort=created_at&order=asc&limit=20&offset=`
        );
  }, [userType]);

  //this will set isOnline flag thus showing the offline header
  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(state.isConnected);
    });
  });

  //check if there is a next page
  //this prevents wasteful call of API
  const nextPageCheckerFn = (lastPage, allPages, lastPageParam) => {
    if (lastPageParam > lastPage?.total + 20) {
      return null;
    }
    return lastPageParam + 20;
  };

  /**
   * This will recieve @param {number} nextPageNumber
   * and will return @returns {[{data}]} data
   * Auto appends to the existing data array
   */
  const getApiData = async (pageParam) => {
    const finalUrl = url + pageParam;
    let data = null;
    try {
      const res = await api.get(finalUrl);
      data = res.data;
    } catch (err) {
      console.log(err);
    }
    return data;
  };

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    isFetching,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["assetList", url],
    queryFn: ({ pageParam }) => getApiData(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) =>
      nextPageCheckerFn(lastPage, allPages, lastPageParam),
  });

  return {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    isFetching,
    refetch,
    url,
    setUrl,
  };
}

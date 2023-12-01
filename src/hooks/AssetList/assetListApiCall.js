import api from "../../api/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import { useState } from "react";
import { ASSET_LIST_CACHE_TIME } from "../../constants/cacheConstants";
import { useSelector } from "react-redux";

export function fetchData() {
  const company_id = useSelector((state) => {
    return state.global.company_id;
  });
  const [url, setUrl] = useState(
    `/hardware?company_id=${company_id}&sort=created_at&order=asc&limit=20&offset=`
  );
  console.log(url);
  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected);
    });
  });

  const nextPageCheckerFn = (lastPage, allPages, lastPageParam) => {
    if (lastPageParam > lastPage.total + 20) {
      return undefined;
    }
    return lastPageParam + 20;
  };

  const getApiData = async (pageParam) => {
    const finalUrl = url + pageParam;
    const res = await api.get(finalUrl);
    return res.data;
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
    staleTime: ASSET_LIST_CACHE_TIME, //5 minutes
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

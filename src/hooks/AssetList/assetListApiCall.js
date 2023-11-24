import api from "../../api/api";
import {
  QueryClient,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";
import { onlineManager } from "@tanstack/react-query";
import { useState } from "react";

export function fetchData() {
  const [url, setUrl] = useState(
    "/hardware?sort=created_at&order=asc&limit=20&offset="
  );

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
    staleTime: 1000 * 60 * 5, //5 minutes
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
    setUrl
  }


}

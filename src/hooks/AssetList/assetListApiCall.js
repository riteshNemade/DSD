import api from "../../api/api";
import { QueryClient, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo"
import { onlineManager } from '@tanstack/react-query'


export function fetchData() {
  const getApiData = async ({ pageParam }) => {
    console.log(
      `/hardware?sort=created_at&order=asc&limit=20&offset=${pageParam}`
    );
    const res = await api.get(
      `/hardware?sort=created_at&order=asc&limit=20&offset=${pageParam}`
    );
    // console.log(res)
    return res.data;
  };
  onlineManager.setEventListener(setOnline => {
    return NetInfo.addEventListener(state => {
      setOnline(!!state.isConnected)
    })
  })

  return useInfiniteQuery({
    queryKey: ["default"],
    queryFn: getApiData,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPageParam > lastPage.total + 20) {
        return undefined;
      }
      return lastPageParam + 20;
    },
    staleTime: 1000 * 60 * 5      //5 minutes
   
  });


}

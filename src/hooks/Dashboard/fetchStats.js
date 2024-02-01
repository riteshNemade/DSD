import api from "@api/api";
import { useQuery } from "@tanstack/react-query";

export default fetchDashboardStats = () => {
  const getDashboardStats = async () => {
    const response = await api.get("/dashboard");
    return response.data.data;
  };

  const dashboardStatsQuery = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: () => getDashboardStats(),
  });
  //   console.log(dashboardStatsQuery.data)
  return dashboardStatsQuery?.data;
};

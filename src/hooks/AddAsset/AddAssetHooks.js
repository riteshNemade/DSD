import api from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { API_CACHE_TIME } from "../../constants/cacheConstants";

const CACHE_TIME = 1000 * 60;

export function fetchOptions() {
  /*************API calling functions***************/
  const fetchModels = async () => {
    const response = await api.get("/models");
    return response.data.rows;
  };

  const fetchStatus = async () => {
    const response = await api.get("/statuslabels");
    return response.data.rows;
  };

  const fetchLocations = async () => {
    const response = await api.get("/locations");
    return response.data.rows;
  };

  const fetchSuppliers = async () => {
    const response = await api.get("/suppliers");
    return response.data.rows;
  };

  const fetchAssetMaintenanceTypes = async () => {
    const response = await api.get("/asset-maintenance-type");
    const result = response.data.data;
  
    const assetMaintenanceTypes = Object.keys(result)
      .filter((key) => key !== "") // Exclude the empty key
      .map((key) => ({ label: result[key] }));
   
    return assetMaintenanceTypes;
  };

  /*************Query Functions********************/
  const modelsQuery = useQuery({
    queryKey: ["models"],
    queryFn: () => fetchModels(),
    staleTime: CACHE_TIME,
  });

  const statusQuery = useQuery({
    queryKey: ["status"],
    staleTime: CACHE_TIME,
    queryFn: () => fetchStatus(),
  });
  const locationsQuery = useQuery({
    queryKey: ["locations"],
    queryFn: () => fetchLocations(),
    staleTime: CACHE_TIME,
  });
  const suppliersQuery = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => fetchSuppliers(),
    staleTime: CACHE_TIME,
  });
  const assetMaintenanceQuery = useQuery({
    queryKey: ["maintenances"],
    queryFn: () => fetchAssetMaintenanceTypes(),
  });
  /************************************************/
  return {
    modelsList: modelsQuery.data || [],
    statusList: statusQuery.data || [],
    locationsList: locationsQuery.data || [],
    suppliersList: suppliersQuery.data || [],
    maintenancesList: assetMaintenanceQuery.data || [],
  };
}

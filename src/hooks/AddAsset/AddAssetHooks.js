import api from "@api/api";
import { useQuery } from "@tanstack/react-query";
import { API_CACHE_TIME } from "@constants/cacheConstants";

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

  const fetchCompanies = async () => {
    const response = await api.get("/companies");
    return response.data.rows;
  };

  const fetchAssetTag = async () => {
    const response = await api.get("/hardware/getnextuniquetag");
    return response.data.data.next_tag;
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
    cacheTime: API_CACHE_TIME,
  });

  const statusQuery = useQuery({
    queryKey: ["status"],
    queryFn: () => fetchStatus(),
    cacheTime: API_CACHE_TIME,
  });
  const locationsQuery = useQuery({
    queryKey: ["locations"],
    queryFn: () => fetchLocations(),
    cacheTime: API_CACHE_TIME,
  });
  const suppliersQuery = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => fetchSuppliers(),
    cacheTime: API_CACHE_TIME,
  });
  const companiesQuery = useQuery({
    queryKey: ["companies"],
    queryFn: () => fetchCompanies(),
    cacheTime: API_CACHE_TIME,
  });
  const assetTagQuery = useQuery({
    queryKey: ["assetTag"],
    queryFn: () => fetchAssetTag(),
  });
  const assetMaintenanceQuery = useQuery({
    queryKey: ["maintenances"],
    queryFn: () => fetchAssetMaintenanceTypes(),
    cacheTime: API_CACHE_TIME,
  });
  /************************************************/
  return {
    modelsList: modelsQuery.data || [],
    statusList: statusQuery.data || [],
    locationsList: locationsQuery.data || [],
    suppliersList: suppliersQuery.data || [],
    companiesList: companiesQuery.data || [],
    maintenancesList: assetMaintenanceQuery.data || [],
    nextAssetTag: assetTagQuery.data || "",
    isFetching: assetTagQuery.isFetching,
    refetchAssetTag: assetTagQuery.refetch,
  };
}

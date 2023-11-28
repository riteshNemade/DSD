import api from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { API_CACHE_TIME } from "../../constants/cacheConstants";

const CACHE_TIME = 1000 * 60 ;

export function fetchOptions() {

  const maintenancesList = [
    { label: "Maintenance", value: 1 },
    { label: "Repair", value: 2 },
    { label: "PAT Test", value: 3 },
    { label: "Upgrade", value: 4 },
    { label: "Hardware Support", value: 5 },
    { label: "Software Support", value: 6 },
  ];
  const assetTypeData = [];

  const fetchCategories = async () => {
    const response = await api.get("/categories");
    return response.data.rows;
  };

  const fetchManufacturers = async () => {
    const response = await api.get("/manufacturers");
    return response.data.rows;
  };

  const fetchSuppliers = async () => {
    const response = await api.get("/suppliers");

    return response.data.rows;
  };

  const fetchDepartments = async () => {
    const response = await api.get("/departments");
    return response.data.rows;
  };

  const fetchCompanies = async () => {
    const response = await api.get("/companies");

    return response.data.rows;
  };

  const fetchLocations = async () => {
    const response = await api.get("/locations");

    return response.data.rows;
  };

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
    staleTime: CACHE_TIME,
  });

  const manufacturersQuery = useQuery({
    queryKey: ["manufacturers"],
    staleTime: CACHE_TIME,
    queryFn: () => fetchManufacturers(),
  });
  const suppliersQuery = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => fetchSuppliers(),
    staleTime: CACHE_TIME,
  });
  const departmentsQuery = useQuery({
    queryKey: ["departments"],
    queryFn: () => fetchDepartments(),
    staleTime: CACHE_TIME,
  });
  const companiesQuery = useQuery({
    queryKey: ["companies"],
    queryFn: () => fetchCompanies(),
    staleTime: CACHE_TIME,
  });
  const locationsQuery = useQuery({
    queryKey: ["locations"],
    queryFn: () => fetchLocations(),
    staleTime: CACHE_TIME,
  });


  return {
    categoriesList: categoriesQuery.data || [],
    manufacturersList: manufacturersQuery.data || [],
    suppliersList: suppliersQuery.data || [],
    maintenancesList,
    departmentsList: departmentsQuery.data || [],
    companiesList: companiesQuery.data || [],
    locationsList: locationsQuery.data || [],
    assetTypeData,
  };
}

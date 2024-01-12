import api from "@api/api";
import { useState, useEffect } from "react";

export const fetchFilterData = () => {
  const [categories, setCategories] = useState([]);
  const [models, setModels] = useState([]);
  const [status, setStatus] = useState([]);
  const [locations, setLocations] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [sortingOptions, setSortingOptions] = useState([
    { label: "Date added (asc)", value: "created_at-asc" },
    { label: "Date added (desc)", value: "created_at-desc" },
    { label: "Asset Name (asc)", value: "name-asc" },
    { label: "Asset Name (desc)", value: "name-desc" },
    { label: "EOL Date (asc)", value: "asset_eol_date-asc" },
    { label: "EOL Date (desc)", value: "asset_eol_date-desc" },
  ]);
  const fetchAllOptions = async () => {
    /*****************Set Categories****************/
    await api.get("/categories").then((response) => {
      const rows = response.data.rows;

      const updateCategories = rows.map((item) => ({
        id: item.id,
        name: item.name,
      }));

      setCategories(updateCategories);
    });

    /*****************Set Models****************/
    await api.get("/models").then((response) => {
      const rows = response.data.rows;

      const updateModels = rows.map((item) => ({
        id: item.id,
        name: item.name,
      }));

      setModels(updateModels);
    });

    /*****************Set Status****************/
    await api.get("/statuslabels").then((response) => {
      const rows = response.data.rows;

      const updateModels = rows.map((item) => ({
        id: item.id,
        name: item.name,
      }));

      setStatus(updateModels);
    });

    /*****************Set Locations****************/
    await api.get("/locations").then((response) => {
      const rows = response.data.rows;

      const updateLocations = rows.map((item) => ({
        id: item.id,
        name: item.name,
      }));

      setLocations(updateLocations);
    });

    /*****************Set Manufacturers****************/
    await api.get("/manufacturers").then((response) => {
      const rows = response.data.rows;

      const updateManufacturers = rows.map((item) => ({
        id: item.id,
        name: item.name,
      }));

      setManufacturers(updateManufacturers);
    });

    /*****************Set Suppliers****************/
    await api.get("/suppliers").then((response) => {
      const rows = response.data.rows;

      const updateSuppliers = rows.map((item) => ({
        id: item.id,
        name: item.name,
      }));

      setSuppliers(updateSuppliers);
    });
  };

  //useEffect call to store the data
  useEffect(() => {
    fetchAllOptions();
  }, []);

  return {
    categories,
    models,
    status,
    locations,
    manufacturers,
    suppliers,
    sortingOptions,
  };
};

export function filters() {
  const [companyFilter, setCompanyFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [modelFilter, setModelFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [locationFilter, setLocationFilter] = useState(null);
  const [manufacturerFilter, setManufacturerFilter] = useState(null);
  const [supplierFilter, setSupplierFilter] = useState(null);
  const [sortOption, setSortOption] = useState(null);
  const [assetNameFilter, setAssetNameFilter] = useState(null);
  const [assetTagFilter, setAssetTagFilter] = useState(null);

  return {
    companyFilter,
    setCompanyFilter,
    categoryFilter,
    setCategoryFilter,
    modelFilter,
    setModelFilter,
    statusFilter,
    setStatusFilter,
    locationFilter,
    setLocationFilter,
    manufacturerFilter,
    setManufacturerFilter,
    supplierFilter,
    setSupplierFilter,
    sortOption,
    setSortOption,
    assetNameFilter,
    setAssetNameFilter,
    assetTagFilter,
    setAssetTagFilter,
  };
}

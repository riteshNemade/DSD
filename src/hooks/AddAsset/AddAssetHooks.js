import api from "../../api/api";
import { useEffect, useState } from "react";

export function fetchOptions() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [manufacturersList, setmanufacturersList] = useState([]);
  const [suppliersList, setSuppliersList] = useState([]);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [companiesList, setCompaniesList] = useState([]);
  const [locationsList, setLocationsList] = useState([]);
  const [maintenancesList] = useState([
    { label: "Maintenance", value: 1 },
    { label: "Repair", value: 2 },
    { label: "PAT Test", value: 3 },
    { label: "Upgrade", value: 4 },
    { label: "Hardware Support", value: 5 },
    { label: "Software Support", value: 6 },
  ]);
  const assetTypeData = [];

  const fetchInitalData = async () => {
    await api
      .get("/categories")
      .then((response) => {
        setCategoriesList(response.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });

    await api
      .get("/manufacturers")
      .then((response) => {
        setmanufacturersList(response.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });

    await api
      .get("/suppliers")
      .then((response) => {
        setSuppliersList(response.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });

    await api
      .get("/departments")
      .then((response) => {
        setDepartmentsList(response.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });

    await api
      .get("/companies")
      .then((response) => {
        setCompaniesList(response.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });

    await api
      .get("/locations")
      .then((response) => {
        setLocationsList(response.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchInitalData();
  }, []);

  return {
    categoriesList,
    manufacturersList,
    suppliersList,
    maintenancesList,
    departmentsList,
    companiesList,
    locationsList,
    assetTypeData
  };
}

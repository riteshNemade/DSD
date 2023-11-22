import { useState } from "react";

export function inputFieldState() {
  const [assetName, setAssetName] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [tagId, setTagId] = useState("");
  const [category, setCategory] = useState("");
  const [manufacturers, setManufacturers] = useState("");
  const [suppliers, setSuppliers] = useState("");
  const [maintenance, setAssetMaintenance] = useState("");
  const [department, setDepartment] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  return {
    assetName,
    setAssetName,
    modelNumber,
    setModelNumber,
    tagId,
    setTagId,
    category,
    setCategory,
    manufacturers,
    setManufacturers,
    suppliers,
    setSuppliers,
    maintenance,
    setAssetMaintenance,
    department,
    setDepartment,
    company,
    setCompany,
    location,
    setLocation,
    description,
    setDescription,
  };
}

import { useState } from "react";

export function inputFieldState() {
  const [assetName, setAssetName] = useState(null);
  const [modelNumber, setModelNumber] = useState(null);
  const [tagId, setTagId] = useState(null);
  const [category, setCategory] = useState(null);
  const [manufacturers, setManufacturers] = useState(null);
  const [suppliers, setSuppliers] = useState(null);
  const [maintenance, setAssetMaintenance] = useState(null);
  const [department, setDepartment] = useState(null);
  const [company, setCompany] = useState(null);
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState(null);

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

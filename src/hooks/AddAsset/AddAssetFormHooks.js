import { useState } from "react";

export function inputFieldState() {
  const [assetTag, setAssetTag] = useState(null);
  const [serial, setSerial] = useState(null);
  const [model, setModel] = useState(null);
  const [status, setStatus] = useState(null);
  const [location, setLocation] = useState(null);
  const [assetName, setAssetName] = useState(null);
  const [warranty, setWarranty] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [suppliers, setSuppliers] = useState(null);
  const [purchaseCost, setPurchaseCost] = useState(null);
  const [notes, setNotes] = useState(null);
  const [draftAssetId, setDraftAssetId] = useState(null);

  /*
  state,
  corresponding setter, 
  state,
  corresponding setter, 
  */

  return {
    assetTag,
    setAssetTag,
    serial,
    setSerial,
    model,
    setModel,
    status,
    setStatus,
    location,
    setLocation,
    assetName,
    setAssetName,
    warranty,
    setWarranty,
    orderNumber,
    setOrderNumber,
    suppliers,
    setSuppliers,
    purchaseCost,
    setPurchaseCost,
    notes,
    setNotes,
    draftAssetId,
    setDraftAssetId,
  };
}

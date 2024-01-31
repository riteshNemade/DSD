import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import api from "@api/api";
import { Alert } from "react-native";

export const fetchHistoricalData = (id) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [url, setUrl] = useState(
    `/reports/activity?item_id=${id}&item_type=asset&search=`
  );
  const [searchTerm, setSearchTerm] = useState();

  const getHistoricalData = async () => {
    await api
      .get(url)
      .then((response) => {
        setHistoricalData(response.data.rows);
      })
      .catch((err) => console.log(err));
  };
  const search = async () => {
    await api
      .get(url + searchTerm)
      .then((response) => {
        setHistoricalData([]);
        setHistoricalData(response.data.rows);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getHistoricalData();
  }, []);

  useEffect(() => {
    if (searchTerm !== undefined && searchTerm !== null) {
      search();
    }
  }, [searchTerm]);

  return {
    historicalData,
    url,
    setUrl,
    setSearchTerm,
  };
};

export const deleteAsset = async (id, navigation, queryClient) => {
  await api
    .delete(`/hardware/${id}`)
    .then((res) => {
      Alert.alert("Success", "Asset deleted successfully", [
        {
          text: "Ok",
          onPress: () => {
            queryClient.invalidateQueries("assetList");
            navigation.navigate("AssetList");
          },
        },
      ]);
    })
    .catch((err) => {
      Alert.alert("Error", "Something went wrong");
    });
};

export const fetchMaintenanceData = (id) => {
  const getMaintenanceData = async () => {
    const response = await api.get(`/maintenances?asset_id=${id}`);
    return response.data.rows;
  };

  const maintenanceQuery = useQuery({
    queryKey: ["maintenance"],
    queryFn: () => getMaintenanceData(),
  });

  return {
    maintenanceList: maintenanceQuery.data || [],
    maintenanceRefetch: maintenanceQuery.refetch,
  };
};

export const fetchAssetTag = (id) => {
  const getAssetTag = async () => {
    const response = await api.get(`/hardware/${id}`);
    return response.data?.asset_tag;
  };

  const assetQuery = useQuery({
    queryKey: ["assetTag"],
    queryFn: () => getAssetTag(),
  });

  return {
    assetTag: assetQuery.data || "",
  };
};

export const deleteMaintenance = async (maintenance_id) => {
  await api.delete(`/maintenances/${maintenance_id}`).then((response) => {});
};

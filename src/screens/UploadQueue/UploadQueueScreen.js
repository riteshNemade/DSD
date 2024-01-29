import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

import HeaderComponent from "@components/Header/HeaderComponent";
import ContentViewComponent from "@components/ContentView/ContentViewComponent";
import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";

import DataModal from "./DataModal";
import ImageModal from "./ImageModal";
import ErrorModal from "./ErrorModal";
import UploadListContent from "./UploadListContent";
import FloatingSyncButton from "./FloatingSyncButton";

import { handleOfflineDataUpload } from "@utils/syncOfflineData";
import initDatabase, { getLocalData } from "@api/sqlite";
import { useIsFocused } from "@react-navigation/native";

const UploadQueueScreen = () => {
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [errorModalData, setErrorModalData] = useState([]);
  const [imageModalData, setImageModalData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isDataModalVisible, setIsDataModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);

  const isFocused = useIsFocused();
  const fetchDataFn = async () => {
    const db = await initDatabase();
    const offlineData = await getLocalData(db);
    setData(offlineData._array);
  };

  const handleSyncPress = async () => {
    await handleOfflineDataUpload();
    await fetchDataFn();
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => fetchDataFn())();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Upload Queue" iconName="Menu" />
        <ContentViewComponent backgroundColor="#fff">
          {data.length > 0 && isFocused? (
            <>
              {isDataModalVisible ? (
                <DataModal
                  isModalVisible={isDataModalVisible}
                  setModalVisible={setIsDataModalVisible}
                  data={modalData}
                />
              ) : (
                <></>
              )}
              {isErrorModalVisible ? (
                <ErrorModal
                  isModalVisible={isErrorModalVisible}
                  setModalVisible={setIsErrorModalVisible}
                  data={errorModalData}
                />
              ) : (
                <></>
              )}
              {isImageModalVisible ? (
                <ImageModal
                  isModalVisible={isImageModalVisible}
                  setModalVisible={setIsImageModalVisible}
                  data={imageModalData}
                ></ImageModal>
              ) : (
                <></>
              )}
              <View style={{ flex: 1 }}>
                <UploadListContent
                  data={data}
                  refetch={fetchDataFn}
                  setModalData={setModalData}
                  setIsDataModalVisible={setIsDataModalVisible}
                  setImageModalData={setImageModalData}
                  setIsImageModalVisible={setIsImageModalVisible}
                  setErrorModalData={setErrorModalData}
                  setIsErrorModalVisible={setIsErrorModalVisible}
                />
              </View>
              <FloatingSyncButton
                handleSyncPress={handleSyncPress}
                isLoading={isLoading}
              />
            </>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Data synchronized successfully.</Text>
            </View>
          )}
        </ContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default UploadQueueScreen;

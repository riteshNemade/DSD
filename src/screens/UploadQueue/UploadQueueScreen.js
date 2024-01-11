import { StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";

import HeaderComponent from "@components/Header/HeaderComponent";
import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";
import ContentViewComponent from "@components/ContentView/ContentViewComponent";

import { handleOfflineDataUpload } from "../../utils/syncOfflineData";
import initDatabase, { getLocalData } from "../../api/sqlite";
import UploadListContent from "./UploadListContent";
import FloatingSyncButton from "./FloatingSyncButton";
import ImageModal from "./ImageModal";
import DataModal from "./DataModal";
import ErrorModal from "./ErrorModal";

const UploadQueueScreen = () => {
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [isDataModalVisible, setIsDataModalVisible] = useState(false);
  const [errorModalData, setErrorModalData] = useState([]);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [imageModalData, setImageModalData] = useState([]);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
          {data.length > 0 ? (
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

const styles = StyleSheet.create({});

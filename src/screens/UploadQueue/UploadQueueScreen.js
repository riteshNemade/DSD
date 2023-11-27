import {
  StyleSheet,
  ToastAndroid,
  View,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import HeaderComponent from "components/Header/HeaderComponent";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ContentViewComponent from "components/ContentView/ContentViewComponent";

import { handleManualSync } from "../../utils/syncOfflineData";
import initDatabase, { getSyncData } from "../../api/sqlite";
import UploadListContent from "./UploadListContent";
import FloatingSyncButton from "./FloatingSyncButton";
import ImageModal from "./ImageModal";
import DataModal from "./DataModal";

const UploadQueueScreen = () => {
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [imageModalData, setImageModalData] = useState([]);
  const [isDataModalVisible, setIsDataModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);

  const dispatch = useDispatch();
  console.log(data)
  const fetchDataFn = async () => {
    const db = await initDatabase();
    const offlineData = await getSyncData(db);
    setData(offlineData._array);
  };

  const handleSyncPress = async () => {
    console.log("Syncing....");
    const isSyncSuccessful = await handleManualSync();
    if (isSyncSuccessful) {
      ToastAndroid.show("Sync Successful", ToastAndroid.LONG);
      dispatch({
        type: "DISABLE",
      });
      setData([]);
    } else {
      ToastAndroid.show(
        "Please check you internet connection",
        ToastAndroid.LONG
      );
    }
  };

  useEffect(() => {
    fetchDataFn();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Upload Queue" iconName="Menu" />
        <ContentViewComponent backgroundColor="#fff">
          {data.length > 0 ? (
            <>
              {isDataModalVisible ? <DataModal
              isModalVisible={isDataModalVisible}
              setModalVisible={setIsDataModalVisible}
              data={modalData}
              ></DataModal> : <></>}
              {isImageModalVisible ? (
                <ImageModal
                  isModalVisible={isImageModalVisible}
                  setModalVisible={setIsImageModalVisible}
                  data={imageModalData}
                ></ImageModal>
              ) : (
                <></>
              )}
              <View style={{flex:1}}>
              <UploadListContent
              data={data}
                refetch={fetchDataFn}
                setIsDataModalVisible={setIsDataModalVisible}
                setIsImageModalVisible={setIsImageModalVisible}
                setImageModalData={setImageModalData}
                setModalData={setModalData}
              />
              </View>
              <FloatingSyncButton handleSyncPress={handleSyncPress} />
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

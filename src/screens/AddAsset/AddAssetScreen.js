import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { colors, hPadding } from "@constants/global";

//components
import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";
import ScrollContentViewComponent from "@components/ScrollContentView/ScrollContentViewComponent";
import HeaderComponent from "@components/Header/HeaderComponent";
import OfflineHeader from "@components/OfflineHeader/OfflineHeader";

//separated JSX
import InputFields from "./InputFields";
import TopContent from "./TopContent";
import NoPermission from "./NoPermission";
import { ActivityIndicator } from "react-native-paper";

const AddAssetScreen = ({ route }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isOffline, setOfflineStatus] = useState(false);
  const [imageName, setImageName] = useState("");
  const [draftsData, setDraftsData] = useState(null);
  const [canCreateAsset, setCanCreateAsset] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(true);
  
  //check internet connection
  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });
    return () => removeNetInfoSubscription();
  }, []);

  useEffect(() => {
    (async () => {
      let userPermissions = await AsyncStorage.getItem("userPermissions");
      userPermissions = JSON.parse(userPermissions);
      console.log(userPermissions);
      if (userPermissions.createAsset) {
        setCanCreateAsset(true);
      }
    })().finally(() => {
      setIsScreenLoading(false);
    });
    console.log(canCreateAsset);
  }, []);

  //capture image from camera/image picker
  useEffect(() => {
    if (route.params && route.params.imageUri) {
      console.log(route.params.imageUri);
      const filePath = route.params.imageUri;
      setImageName(filePath.split("/").pop());
      setCapturedImage(route.params.imageUri);
    }
  }, [route.params?.imageUri]);

  //capture image from navigation picker
  useEffect(() => {
    if (
      route.params &&
      route.params?.drafts !== undefined &&
      route.params?.drafts !== null
    ) {
      setDraftsData(route.params?.drafts);
      if (
        route.params?.drafts.imagepath !== "null" &&
        route.params?.drafts.imagepath !== null
      ) {
        console.log(route.params?.drafts);
        const filePath = route.params?.drafts.imagepath;
        setImageName(filePath.split("/").pop());
        setCapturedImage(route.params?.drafts.imagepath);
      }
    }
  }, [route.params?.drafts]);

  const onClearImage = () => {
    setCapturedImage("");
    setImageName("");
  };
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <LinearGradientComponent>
          <HeaderComponent title="Add Asset" iconName="Menu" />
          <ScrollContentViewComponent backgroundColor="#fff">
            {/* OFFLINE HEADER */}
            {isOffline ? <OfflineHeader /> : null}

            {/* SCREEN CONTENT */}
            {!isScreenLoading ? (
              <View style={styles.container}>
                {canCreateAsset ? (
                  <>
                    <TopContent
                      onClearImage={onClearImage}
                      imageName={imageName}
                    />
                    <InputFields
                      isOffline={isOffline}
                      capturedImage={capturedImage}
                      clearImage={onClearImage}
                      draftsData={draftsData}
                    />
                  </>
                ) : (
                  <NoPermission />
                )}
              </View>
            ) : (
              <View style={[styles.container, { marginTop: "70%" }]}>
                <ActivityIndicator size={"large"} color={colors.blue} />
              </View>
            )}
            {/* SCREEN CONTENT */}
            
          </ScrollContentViewComponent>
        </LinearGradientComponent>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddAssetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: hPadding,
    marginTop: hPadding,
    paddingBottom: 125,
  },
});

import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ScrollContentViewComponent from "components/ScrollContentView/ScrollContentViewComponent";
import HeaderComponent from "components/Header/HeaderComponent";
import OfflineHeader from "../../components/OfflineHeader/OfflineHeader";

import InputFields from "./InputFields";
import { hPadding } from "../../constants/global";
import TopContent from "./TopContent";

const AddAssetScreen = ({ route }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isOffline, setOfflineStatus] = useState(false);
  const [imageName, setImageName] = useState("");
  const [draftsData, setDraftsData] = useState(null);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });

    return () => removeNetInfoSubscription();
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

  //capture image from camera/image picker
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
      <KeyboardAvoidingView behavior="height" style={{flex:1}}>
        <LinearGradientComponent>
          <HeaderComponent title="Add Asset" iconName="Menu" />
          <ScrollContentViewComponent backgroundColor="#fff">
            {isOffline ? <OfflineHeader /> : null}

            <View style={styles.container}>
              <TopContent onClearImage={onClearImage} imageName={imageName} />
              <InputFields
                isOffline={isOffline}
                capturedImage={capturedImage}
                clearImage={onClearImage}
                draftsData={draftsData}
              />
            </View>
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

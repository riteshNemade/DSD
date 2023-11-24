import { StyleSheet, View } from "react-native";
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
  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });

    return () => removeNetInfoSubscription();
  }, []);

  useEffect(() => {
    if (route.params && route.params.imageUri) {
      setCapturedImage(route.params.imageUri);
    }
  }, [route.params?.imageUri]);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Add Asset" iconName="Menu" />
        <ScrollContentViewComponent backgroundColor="#fff">
          {isOffline ? <OfflineHeader /> : null}
          <View style={styles.container}>
            <TopContent />
            <InputFields isOffline={isOffline} capturedImage={capturedImage} />
          </View>
        </ScrollContentViewComponent>
      </LinearGradientComponent>
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

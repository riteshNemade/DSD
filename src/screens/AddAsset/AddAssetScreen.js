import { StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";

import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ScrollContentViewComponent from "components/ScrollContentView/ScrollContentViewComponent";
import HeaderComponent from "components/Header/HeaderComponent";

import InputFields from "./InputFields";
import { hPadding } from "../../constants/global";
import TopContent from "./TopContent";
import { MaterialIcons } from '@expo/vector-icons';
import NetInfo from "@react-native-community/netinfo";

const AddAssetScreen = ({ route }) => {
  const [isOffline, setOfflineStatus] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });

    return () => removeNetInfoSubscription();
  }, []);

  useEffect(()=>{
    if (route.params && route.params.imageUri) {
      setCapturedImage(route.params.imageUri);
    }
  }, [route.params?.imageUri])

  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Add Asset" iconName="Menu" />
        <ScrollContentViewComponent backgroundColor="#fff">
          {isOffline ? (
            <View
              style={{
                height:50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                borderTopLeftRadius:30,
                borderTopRightRadius:30,
                flexDirection:'row'
              }}
            >
              <MaterialIcons name="signal-cellular-connected-no-internet-4-bar" size={24} color="white" />
              <Text style={{color:'white', marginLeft:10}}>Offline Mode</Text>
            </View>
          ) : null}
          <View style={styles.container}>
            <TopContent />
            <InputFields isOffline={isOffline} capturedImage={capturedImage}/>
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

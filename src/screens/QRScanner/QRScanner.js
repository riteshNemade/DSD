import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StyleSheet, Text, View, Linking, Alert } from "react-native";

import BarcodeMask from "react-native-barcode-mask";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import ButtonComponent from "@components/Button/ButtonComponent";

import api from "@api/api";
import {
  FONT_SIZE_LARGE,
  FONT_SIZE_REGULAR,
  colors,
  hPadding,
} from "@constants/global";

const renderCamera = (scanned, handleBarCodeScanned) => {
  return (
    <View style={styles.cameraContainer}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[styles.camera]}
      >
        <BarcodeMask
          edgeColor="#62B1F6"
          showAnimatedLine
          width={"75%"}
          height={"100%"}
          outerMaskOpacity={0.0}
        />
      </BarCodeScanner>
    </View>
  );
};

const QRScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(true); //for the loading indicator
  const navigation = useNavigation();

  useEffect(() => {
    (async () =>{
      setTimeout(() => {
        setIsLoading(false)
      },500)
    })()
  },[])

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  //user scans->gets redirected to info screen->comes back to this screen->clear the state
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setScanned(false);
    });
    return unsubscribe;
  }, [navigation]);

  const redirectToAssetOverview = async (route) => {
    try {
      const response = await api.get(route);
      const newData = response?.data;
      if (newData?.status === "error") {
        throw new Error();
      } else {
        navigation.navigate("AssetOverview", newData);
      }
    } catch (error) {
      Alert.alert(
        `There was an error`,
        `Please try again or scan a valid QR code.`
      );
    }
  };

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);

    // Regular expression pattern for matching the URL pattern
    // api/hardware/987654
    const urlPattern = /\/hardware\/(\d+)$/;
    const match = data.match(urlPattern);

    if (match) {
      //capturing the '/hardware/:id' part
      const route = "/hardware/" + match[1];

      await redirectToAssetOverview(route);
      setScanned(false);
    } else {
      Alert.alert(
        "QR Scan failed",
        `QR Code with data ${data} doesn't match the expected URL pattern.`,
        [{ text: "OK", onPress: () => setScanned(false) }]
      );
    }
  };
  if (hasPermission === false || hasPermission === null) {
    const openSettings = async () => {
      try {
        await Linking.openSettings();
      } catch (error) {
        console.error("Error opening settings:", error);
      }
    };
    return (
      <View style={{ flex: 1, paddingHorizontal: hPadding }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              marginBottom: 20,
            }}
          >
            <Text style={styles.text}>Camera permission not granted</Text>
          </View>
          <View style={{ flex: 1, paddingHorizontal: hPadding }}>
            <ButtonComponent
              text="Grant Permission Manually"
              onPress={openSettings}
            />
          </View>
        </View>
      </View>
    );
  } else {
    return isLoading ? (
      <View style={styles.container}>
        <ActivityIndicator size={72} color={colors.loading}/>
      </View>
    ) : (
      <View style={styles.container}>
        {!scanned ? (
          <>
            <Text style={styles.title}>QR SCANNER</Text>
            <Text style={styles.paragraph}>Scan a QR code.</Text>
            {renderCamera(scanned, handleBarCodeScanned)}
          </>
        ) : (
          <>
            <ActivityIndicator color={colors.loading} size={30} />
          </>
        )}
      </View>
    );
  }
};

export default QRScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: FONT_SIZE_LARGE + 4,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paragraph: {
    fontSize: FONT_SIZE_REGULAR - 2,
    marginBottom: 40,
  },
  cameraContainer: {
    width: "80%",
    aspectRatio: 1,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: FONT_SIZE_REGULAR,
    fontWeight: "500",
  },
});

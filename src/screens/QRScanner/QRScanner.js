import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import api from "../../api/api";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../../constants/global";
import { Alert } from "react-native";
import BarcodeMask from "react-native-barcode-mask";

const renderCamera = (handleBarCodeScanned) => {
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

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

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

      //route format is like /hardware/3

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
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!scanned ? (
        <>
          <Text style={styles.title}>QR SCANNER</Text>
          <Text style={styles.paragraph}>Scan a QR code.</Text>
          {renderCamera(handleBarCodeScanned)}
        </>
      ) : (
        <>
          <ActivityIndicator color={colors.blue} size={30} />
        </>
      )}
    </View>
  );
};

export default QRScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
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
});

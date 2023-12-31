import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import HeaderComponent from "components/Header/HeaderComponent";
import ScrollContentViewComponent from "../../components/ScrollContentView/ScrollContentViewComponent";
import AssetTagEntryComponent from "../../components/AssetTagEntry/AssetTagEntryComponent";
import ButtonComponent from "../../components/Button/ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import { gapV, hPadding } from "../../constants/global";
import { useState } from "react";
import api from "../../api/api";
import { ActivityIndicator } from "react-native-paper";
import { Alert } from "react-native";
import { useSelector } from "react-redux";

const QRScannerScreen = () => {
  const navigation = useNavigation();
  const [isAPILoading, setAPILoadingStatus] = useState(false);
  const company_id = useSelector((state) => {
    return state.global.company_id;
  });
  const handleSubmit = async (searchTerm) => {
    if (searchTerm !== "") {
      setAPILoadingStatus(true);
      console.log(`/hardware?company_id=${company_id}&search=${searchTerm}`);
      await api
        .get(`/hardware?company_id=${company_id}&search=${searchTerm}`)
        .then((response) => {
          const data = response.data;
          console.log(data);
          if (data.status === "error" || data.total !== 1) {
            setAPILoadingStatus(false);
            Alert.alert(
              "Asset does not exist",
              "The Asset you are trying to search does not exist."
            );
          } else {
            setAPILoadingStatus(false);
            navigation.navigate("AssetOverview", data.rows[0]);
          }
        })
        .catch((err) => {
          setAPILoadingStatus(false);
          Alert.alert(
            "Asset does not exist",
            "The Asset you are trying to search does not exist."
          );
        });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Search Asset" iconName="Menu" />

        <ScrollContentViewComponent backgroundColor={"#fff"}>
          <View style={styles.container}>
            <View style={{ flex: 1 }}>
              <AssetTagEntryComponent handleSubmit={handleSubmit} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textStyle}>OR</Text>
            </View>
            <View style={{ flex: 1 }}>
              <ButtonComponent
                iconEnabled
                text={"Scan a QR Code"}
                onPress={() => navigation.navigate("QRScanner")}
              />
            </View>
          </View>
        </ScrollContentViewComponent>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isAPILoading}
          onRequestClose={() => {
            setLoading(false);
          }}
        >
          <View style={styles.modalContainer}>
            <ActivityIndicator animating={isAPILoading} size={48} />
          </View>
        </Modal>
      </LinearGradientComponent>
    </View>
  );
};

export default QRScannerScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: hPadding,
    flex: 1,
    justifyContent: "center",
    marginTop: gapV,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: gapV,
  },
  textStyle: {
    fontSize: 18,
    letterSpacing: 1.1,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity as needed
  },
});

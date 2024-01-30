import { StyleSheet, View, Modal, TouchableOpacity, Image } from "react-native";
import React from "react";

import { AntDesign } from "@expo/vector-icons";
import { verticalScale } from "react-native-size-matters/extend";

import { gapV, hPadding } from "@constants/global";

const ImageModal = ({ isModalVisible, setModalVisible, data }) => {
  const handleModalClose = () => {
    setModalVisible(false);
  };
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.container}>
          <View style={styles.containerBehindModal}>
            <View style={styles.contentContainer}>
              <View style={{ flex: 1 }}>
                <Image
                  source={{ uri: data }}
                  style={{
                    height: "100%",
                    width: "100%",
                    resizeMode: "stretch",
                  }}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    alignSelf: "flex-end",
                    marginTop: gapV,
                    paddingRight: hPadding,
                  }}
                  onPress={handleModalClose}
                >
                  <AntDesign name="close" size={24} color={"#fff"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ImageModal;

const styles = StyleSheet.create({
  closeButton: {
    flex: 1,
    alignItems: "flex-end",
  },
  contentContainer: {
    backgroundColor: "#fff",
    height: "80%",
    padding: hPadding,
  },
  containerBehindModal: {
    backgroundColor: "rgba(0, 0, 0, 0.76)",
    padding: 20,
    width: "100%",
    height: "100%",
  },
  container: {
    width: "100%",
    marginTop: 91,  //64dp(header)+27dp(tab navigator)
    height: "110%",
  },
});

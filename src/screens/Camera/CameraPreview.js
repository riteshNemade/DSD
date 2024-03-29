import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";

const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: photo && photo.uri }} style={{ flex: 1 }}>
        <View style={styles.buttonContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={styles.retakePicture}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={savePhoto} style={styles.savePhoto}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                Save photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CameraPreview;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 15,
    justifyContent: "flex-end",
  },
  retakePicture: {
    width: 130,
    height: 40,
    alignItems: "center",
    borderRadius: 4,
  },
  savePhoto: {
    width: 130,
    height: 40,
    alignItems: "center",
    borderRadius: 4,
  },
});

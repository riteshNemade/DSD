import { Camera, CameraType } from "expo-camera";
import React, { useState } from "react";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, gapH, hPadding } from "../../constants/global";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library"; // Import MediaLibrary module
import CameraPreview from "./CameraPreview";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { verticalScale } from "react-native-size-matters/extend";
import ButtonComponent from "../../components/Button/ButtonComponent";

let camera;
export default function CameraScreen() {
  const navigation = useNavigation();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flashMode, setFlashMode] = useState("off");
  const [capturedImage, setCapturedImage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log(status);
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          backgroundColor: colors.bottomTabGray,
          height: verticalScale(71),
        },
      });
  }, [navigation]);

  const handleFlashMode = () => {
    if (flashMode === "on") {
      setFlashMode("off");
    } else if (flashMode === "off") {
      setFlashMode("on");
    } else {
      setFlashMode("off");
    }
  };
  const takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      navigation.navigate("AddAsset", { imageUri: result.assets[0].uri }); //navigate to prev
    }
  };

  const savePhoto = async () => {
    if (capturedImage) {
      try {
        const asset = await MediaLibrary.createAssetAsync(capturedImage.uri);
        // After saving the photo to the gallery, navigate back to the previous screen with the image URI
        navigation.navigate("AddAsset", { imageUri: capturedImage.uri });
      } catch (error) {
        console.error("Error saving photo:", error);
      }
    }
  };
  const openSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      console.error("Error opening settings:", error);
    }
  };
  return (
    <View style={styles.container}>
      {!hasPermission ? (
        <View style={{ flex: 1, paddingHorizontal: hPadding }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              marginBottom: 20,
            }}
          >
            <Text>Camera Permission not granted</Text>
          </View>
          <View style={{ flex: 1, paddingHorizontal: hPadding }}>
            <ButtonComponent
              text="Grant Permission Manually"
              onPress={openSettings}
            />
          </View>
        </View>
      ) : previewVisible && capturedImage ? (
        <CameraPreview
          photo={capturedImage}
          retakePicture={retakePicture}
          savePhoto={savePhoto}
        />
      ) : (
        <Camera
          style={styles.camera}
          type={CameraType.back}
          flashMode={flashMode}
          ref={(r) => {
            camera = r;
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.sideButtons} onPress={pickImage}>
              <FontAwesome5 name="images" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture} />
            <TouchableOpacity
              style={[
                styles.sideButtons,
                flashMode === "on" ? { backgroundColor: "white" } : {},
              ]}
              onPress={handleFlashMode}
            >
              <Ionicons
                name="flash"
                size={24}
                color={flashMode === "on" ? "black" : "white"}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    bottom: 1,
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    marginBottom: 30,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 50,
    height: 100,
    width: 100,
    marginBottom: 10,
  },
  sideButtons: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 50,
    height: 60,
    width: 60,
    alignSelf: "center",
    marginHorizontal: gapH * 3,
    alignItems: "center",
    justifyContent: "center",
  },
});

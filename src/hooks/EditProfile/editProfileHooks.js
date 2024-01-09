import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { Alert } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
export const profileFormState = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    email: "",
    avatar: null,
    canEdit: false,
  });
  const [error, setIsError] = useState(false);

  const getUserInfo = async () => {
    try {
      const userInfo = JSON.parse(await AsyncStorage.getItem("userInfo")) || {};
      return userInfo;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return {};
    }
  };

  const updateUser = async (isImageChanged) => {
    if (
      formState.firstName === "" ||
      formState.lastName === "" ||
      formState.username === ""
    ) {
      setIsError(true);
      Alert.alert("There was and error", "Please fill the required fields");
      return;
    } else {
      const reqObj = new FormData();
      reqObj.append("first_name", formState.firstName);
      reqObj.append("last_name", formState.lastName);
      reqObj.append("username", formState.username);
      reqObj.append("phone", formState.phone || "");
      reqObj.append("email", formState.email || "");

      console.log(isImageChanged)
      if (isImageChanged) {
        const imagePath = formState.avatar; //path to image on the device
        console.log(imagePath);
        // const imageBlob = await FileSystem.readAsStringAsync(imagePath, {
        //   encoding: FileSystem.EncodingType.Base64,
        // });
        reqObj.append("avatar", {uri: imagePath, name: 'image.jpg', type: 'image/jpeg'});
      }

      await api
        .post("/users/me", reqObj, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (res) => {
          await AsyncStorage.removeItem("userInfo");
          await AsyncStorage.setItem("userInfo", JSON.stringify(formState));

          Alert.alert("Success", "Profile updated successfully", [
            {
              text: "Ok",
              onPress: () =>
                navigation.navigate("ProfileScreen", {
                  firstName: formState.firstName,
                  lastName: formState.lastName,
                }),
            },
          ]);
        })
        .catch((err) => {
          console.log(err);
          Alert.alert(
            "There was an Error.",
            "Either the username is or input format is wrong"
          );
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const userInfo = await getUserInfo();
      setFormState((prevState) => ({
        ...prevState,
        firstName: userInfo.firstName || "",
        lastName: userInfo.lastName || "",
        username: userInfo.username || "",
        phone: userInfo.phone || "",
        email: userInfo.email || "",
        avatar: userInfo.avatar || null,
        canEdit: userInfo.canEdit,
      }));
      setIsLoading(false);
    };
    isFocused && fetchData();
  }, []);

  return {
    formState,
    setFormState,
    isLoading,
    updateUser,
  };
};

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { Alert } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

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

  const updateUser = async () => {
    if (
      formState.firstName === "" ||
      formState.lastName === "" ||
      formState.username === ""
    ) {
      setIsError(true);
      Alert.alert("There was and error", "Please fill the required fields");
      return;
    } else {
      const reqObj = {
        first_name: formState.firstName,
        last_name: formState.lastName,
        username: formState.username,
        phone: formState.phone || "",
        email: formState.email || "",
      };
      await api
        .post("/users/me", reqObj)
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

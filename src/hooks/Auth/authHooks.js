import { useState } from "react";
import { Alert } from "react-native";

import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { auth } from "@api/api";
import {
  dispatchLocalDataToRedux,
  setLocalUserProfileData,
  setLocalUserRoleAndPermissions,
  setUserCompany,
  setUserLocations,
} from "@utils/localStorageHandler";

export default loginHooks = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isError, setIsError] = useState(false);
  const [checked, setChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    //validate
    if (!username?.trim() || !password?.trim()) {
      setIsError(true);
      Alert.alert("Login Failed", "Please enter the credentials properly");
      return;
    } else {
      setIsError(false);
      setIsLoading(true);
      await auth
        .post("/login", { username, password })
        .then(async (res) => {
          //this ensures that state is cleared
          await AsyncStorage.clear();
          dispatch({
            type: "RESET_REDUX",
          });

          const { user, token } = res.data?.data;
          //set localstorage items
          if (user) {
            await setLocalUserRoleAndPermissions(user);
            await setUserLocations(user);
            await setUserCompany(user);
            await setLocalUserProfileData(user);
          }
          if (checked) {
            //remember me
            await AsyncStorage.setItem("token", token);
          }

          await dispatchLocalDataToRedux(dispatch).then(() => {
            //redux actions
            dispatch({
              type: "SET_TOKEN",
              payload: token,
            });
            dispatch({
              type: "LOGIN",
            });
          });
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
          Alert.alert("Login failed", "The Username or Password is incorrect.");
        })
        .finally(() => {
          setIsLoading(false);
          setUsername(null);
          setPassword(null);
        });
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    isError,
    setIsError,
    checked,
    setChecked,
    handleSignIn,
    isLoading,
  };
};

export const forgotPasswordHooks = () => {
  const [username, setUsername] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleSuccess = () => {
    setIsLoading(false);
    setUsername(null);
    navigation.goBack();
  };

  const handleSubmit = async () => {
    if (!username?.trim()) {
      setIsError(true);
      Alert.alert("Process Failed", "Please enter the username properly");
    } else {
      setIsError(false);
      setIsLoading(true);
      await auth.post("/reset-password", { username }).then((res) => {
        Alert.alert(
          "Reset Password",
          "An email with the password reset link is sent to your registered email. If you didnt recieve the email try again or contact your administrator.",
          [{ text: "OK", onPress: () => handleSuccess() }]
        );
      });
    }
  };

  return {
    username,
    setUsername,
    isError,
    isLoading,
    handleSubmit,
  };
};

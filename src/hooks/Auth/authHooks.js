import { useState } from "react";
import { Alert } from "react-native";

import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { auth } from "@api/api";

export default loginHooks = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isError, setIsError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    //validate
    if (!username?.trim() || !password?.trim()) {
      setIsError(true);
      setEmail(null);
      setPassword(null);
      Alert.alert("Login Failed", "Please enter the credentials properly");
    } else {
      setIsError(false);
      setIsLoading(true);
      await auth
        .post("/login", { username, password })
        .then(async (res) => {
          const token = res.data.data.token;
          let canEdit = "0";
          if (
            res.data.data.user?.permissions.superuser === "1" ||
            res.data.data?.user?.permissions["users.edit"] === "1" ||
            res.data.data.user?.permissions.admin == 1
          ) {
            canEdit = "1";
          }
          const avatar = res.data.data.user.avatar;
          const localUserData = {
            firstName: res.data.data.user.first_name,
            lastName: res.data.data.user.last_name,
            username: res.data.data.user.username,
            phone: res.data.data.user.phone,
            email: res.data.data.user.email,
            avatar,
            canEdit,
          };

          dispatch({
            type: "SET_TOKEN",
            payload: token,
          });
          if (checked) {
            await AsyncStorage.setItem("token", token);
          }
          await AsyncStorage.setItem("userInfo", JSON.stringify(localUserData));
          dispatch({
            type: "LOGIN",
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

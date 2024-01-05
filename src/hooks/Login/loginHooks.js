import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { auth } from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default loginHooks = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isError, setIsError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignIn = async () => {
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
        .then((res) => {
          const token = res.data.data.token;
          dispatch({
            type: "SET_TOKEN",
            payload: token,
          });
          if (checked) {
            AsyncStorage.setItem("token", token);
          }
          dispatch({
            type: "LOGIN",
          });
          setIsLoading(false);
        })
        .catch((err) => {
          setIsError(true);
          setIsLoading(false);
          setEmail(null);
          setPassword(null);
          Alert.alert("Login failed", "The Username or Password is incorrect.");
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
      setEmail(null);
      Alert.alert("Login Failed", "Please enter the credentials properly");
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

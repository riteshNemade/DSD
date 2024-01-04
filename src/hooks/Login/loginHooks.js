import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { auth } from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default loginHooks = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isError, setIsError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignIn = () => {
    if (!email?.trim() || !password?.trim()) {
      setIsError(true);
      setEmail(null);
      setPassword(null);
      Alert.alert("Login Failed", "Please enter the credentials properly");
    } else {
      setIsError(false);
      setIsLoading(true);
      auth
        .post("/login", { email, password })
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
          setIsLoading(false)
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
    email,
    setEmail,
    password,
    setPassword,
    isError,
    setIsError,
    checked,
    setChecked,
    handleSignIn,
    isLoading
  };
};

import { useEffect, useState } from "react";
import api from "../../api/api";
import { Alert } from "react-native";
export const changePassword = () => {
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isValidLength, setIsValidLength] = useState(0);
  const [passwordMatch, setPasswordMatch] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (newPassword && newPassword.length >= 10) {
      setIsValidLength(1);
    } else {
      setIsValidLength(0);
    }
  }, [newPassword]);

  useEffect(() => {
    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      setPasswordMatch(1);
    } else {
      setPasswordMatch(0);
    }
  }, [newPassword, confirmPassword]);

  const handleSubmit = async () => {
    if (isValidLength && passwordMatch) {
        setIsLoading(true)
      const reqObj = {
        current_password: oldPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      };
      await api
        .post("/users/me/change-password", reqObj)
        .then((res) => {
          Alert.alert("Success", "Password was changed successfully!");
          setOldPassword(null);
          setNewPassword(null);
          setConfirmPassword(null);
          setIsLoading(false)
        })
        .catch((err) => {
          const errMessage = err.response.data.error.message;
          Alert.alert("Error", `${errMessage}`);
          setOldPassword(null);
          setNewPassword(null);
          setConfirmPassword(null);
          setIsLoading(false)
        });
    } else {
      setIsValidLength(-1);
      setPasswordMatch(-1);
    }
  };

  return {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isValidLength,
    passwordMatch,
    handleSubmit,
    isLoading
  };
};

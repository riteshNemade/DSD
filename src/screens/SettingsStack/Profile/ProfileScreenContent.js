import { StyleSheet, FlatList, View } from "react-native";
import React from "react";

import { useDispatch } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "@api/api";
import { gapV, gapH, colors } from "@constants/global";
import { profileFormState } from "@hooks/EditProfile/editProfileHooks";

import ProfileHeader from "./ProfileHeader";
import ButtonComponent from "@components/Button/ButtonComponent";
import SettingsComponent from "@components/SettingsComponent/SettingsComponent";
import ContentViewComponent from "@components/ContentView/ContentViewComponent";

//hardcoded list items
import settingsData from "./profileOptions.json";

const renderSettings = ({ item }) => (
  <SettingsComponent title={item.title} options={item.options} />
);
export default function ProfileScreenContent({ firstName, lastName }) {
  const dispatch = useDispatch();
  const { isLoading, formState } = profileFormState();

  const handleLogout = async () => {
    await api.get("/logout").then(async () => {
      //clear out local storage
      await AsyncStorage.clear();
    });

    dispatch({
      type: "LOGOUT",
    }); // LOGOUT action
  };

  return (
    <View style={{ flex: 1 }}>
      {!isLoading ? (
        <FlatList
          ListHeaderComponent={
            <ProfileHeader
              firstName={firstName || formState.firstName}
              lastName={lastName || formState.lastName}
              image={formState.avatar}
              logoutHandler={handleLogout}
            />
          }
          data={settingsData}
          renderItem={renderSettings}
          keyExtractor={(item, index) => index.toString()}
          style={{ flex: 1, paddingBottom: gapV }}
        />
      ) : (
        <ContentViewComponent backgroundColor={"#fff"}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={48} color={colors.loading}/>
          </View>
        </ContentViewComponent>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    paddingHorizontal: gapH,
    marginVertical: gapV,
  },
});

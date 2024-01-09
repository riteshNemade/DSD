import { View } from "react-native";
import React from "react";

import HeaderComponent from "components/Header/HeaderComponent";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ScrollContentViewComponent from "components/ScrollContentView/ScrollContentViewComponent";
import ContentViewComponent from "../../../components/ContentView/ContentViewComponent";

import ProfilePicture from "../../../components/ProfilePictureComponent/ProfilePicture";
import { gapV, hPadding } from "../../../constants/global";
import EditProfileContent from "./EditProfileContent";
import { KeyboardAvoidingView } from "react-native";
import ButtonComponent from "../../../components/Button/ButtonComponent";
import { profileFormState } from "../../../hooks/EditProfile/editProfileHooks";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet } from "react-native";

const EditProfileScreen = () => {
  const { formState, isLoading, setFormState,updateUser } = profileFormState();
  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Edit Profile" iconName="Menu" />
        {!isLoading ? (
          <ScrollContentViewComponent backgroundColor="#fff">
            <KeyboardAvoidingView
              behavior="position"
              style={{ paddingBottom: 100 }}
            >
              <View style={{ alignItems: "center", marginTop: gapV }}>
                <ProfilePicture enableEdit />
              </View>
              <View>
                <EditProfileContent
                  formState={formState}
                  setFormState={setFormState}
                />
              </View>
              <View style={styles.buttonStyle}>
                <ButtonComponent text="Save The Information" onPress={() => updateUser()}/>
              </View>
            </KeyboardAvoidingView>
          </ScrollContentViewComponent>
        ) : (
          <ContentViewComponent backgroundColor={"#fff"}>
            <View style={styles.loader}>
              <ActivityIndicator size={48} />
            </View>
          </ContentViewComponent>
        )}
      </LinearGradientComponent>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    paddingHorizontal: hPadding,
    marginTop: gapV,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { View, KeyboardAvoidingView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import { ActivityIndicator } from "react-native-paper";

import HeaderComponent from "@components/Header/HeaderComponent";
import ButtonComponent from "@components/Button/ButtonComponent";
import ContentViewComponent from "@components/ContentView/ContentViewComponent";
import ProfilePicture from "@components/ProfilePictureComponent/ProfilePicture";
import LinearGradientComponent from "@components/LinearGradient/LinearGradientComponent";
import ScrollContentViewComponent from "@components/ScrollContentView/ScrollContentViewComponent";

import EditProfileContent from "./EditProfileContent";

import { gapV, hPadding } from "@constants/global";
import { profileFormState } from "@hooks/EditProfile/editProfileHooks";

const EditProfileScreen = ({ route }) => {
  const { formState, isLoading, setFormState, updateUser } = profileFormState();
  const [isImageChanged, setIsImageChanged] = useState(false);

  useEffect(() => {
    if (route.params !== undefined && route.params.imageUri !== undefined) {
      setFormState((prev) => ({ ...prev, avatar: route.params?.imageUri }));
      setIsImageChanged(true);
    }
  }, [route.params?.imageUri]);
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
                <ProfilePicture enableEdit image={formState.avatar} />
              </View>
              <View>
                <EditProfileContent
                  formState={formState}
                  setFormState={setFormState}
                />
              </View>
              <View style={styles.buttonStyle}>
                <ButtonComponent
                  text="Save The Information"
                  onPress={() => updateUser(isImageChanged)}
                />
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

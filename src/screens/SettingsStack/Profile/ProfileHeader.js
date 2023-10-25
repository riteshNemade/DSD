import { View, Text } from 'react-native'
import React from 'react'
import { gapH, gapV } from "../../../constants/global";
import ButtonComponent from "../../../components/Button/ButtonComponent";
import { scale, verticalScale } from "react-native-size-matters/extend";
import ProfilePicture from '../../../components/ProfilePictureComponent/ProfilePicture';
import { useNavigation } from '@react-navigation/native';


export default function ProfileHeader() {
  const navigation = useNavigation();
  return (
    <View
    style={{
      marginTop: gapV,
      paddingHorizontal: gapH,
    }}
  >
    <View style={{flex:1, flexDirection:'row'}}>
    <View>
      <ProfilePicture />
    </View>
    <View style={{ flex: 1, marginLeft: scale(25) }}>
      <View style={{ flex: 2, justifyContent: "center" }}>
        <Text
          style={{
            fontSize: 18,
            letterSpacing: 1.1,
            fontWeight: "700",
            textAlign: "left",
          }}
        >
          Name of User
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "flex-start",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            letterSpacing: 1,
            fontWeight: "600",
            color: "#a1a1a1",
            textAlign: "left",
          }}
        >
          User Role
        </Text>
      </View>
      <View style={{ flex: 1, marginRight: scale(88), height: verticalScale(50) }}>
        <ButtonComponent text="Edit Profile" onPress={()=> navigation.navigate('EditProfile')}/>
      </View>
    </View>
    </View>
  </View>
  )
}
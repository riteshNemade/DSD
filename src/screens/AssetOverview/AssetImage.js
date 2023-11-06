import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { scale, verticalScale } from "react-native-size-matters/extend";

import { colors, gapH, gapV } from "../../constants/global";
import TableImage from "../../components/TableImage/TableImage";

import EditIcon from "../../../assets/svg/ModalIcons/EditIcon";
import CloneIcon from "../../../assets/svg/ModalIcons/CloneIcon";
import AuditIcon from "../../../assets/svg/ModalIcons/AuditIcon";
import DeleteIcon from "../../../assets/svg/ModalIcons/DeleteIcon";
import { useNavigation } from "@react-navigation/native";

const AssetImage = ({ imageUrl, data}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {imageUrl !== "" && imageUrl !== undefined ? (
        <>
          <TableImage url={imageUrl} />
          <View style={styles.imageOverlay}></View>
          <Menu style={styles.menu}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="#fff"
              style={styles.menuIcon}
            />
            <MenuTrigger customStyles={triggerStyle} />

            <MenuOptions customStyles={menuOptionsStyle}>
              <MenuOption
                onSelect={() => alert(`Save`)}
                style={{ flexDirection: "row" }}
                disabled
              >
                <MaterialCommunityIcons
                  name="cart-outline"
                  size={20}
                  color={colors.gray}
                  style={{ transform: [{ rotateY: "180deg" }] }}
                />
                <Text style={styles.textStyle}>Checkout</Text>
              </MenuOption>
              <MenuOption
                onSelect={() => navigation.navigate('EditAsset',data)}
                style={{ flexDirection: "row" }}
              >
                <EditIcon />
                <Text style={styles.textStyle}>Edit</Text>
              </MenuOption>
              <MenuOption
              disabled
                onSelect={() => alert(`Not called`)}
                style={{ flexDirection: "row" }}
              >
                <CloneIcon />
                <Text style={styles.textStyle}>Clone</Text>
              </MenuOption>
              <MenuOption
              disabled
                onSelect={() => alert(`Not called`)}
                style={{ flexDirection: "row" }}
              >
                <AuditIcon />
                <Text style={styles.textStyle}>Audit</Text>
              </MenuOption>
              <MenuOption
              disabled
                onSelect={() => alert(`Not called`)}
                style={{ flexDirection: "row", marginLeft: 3 }}
              >
                <DeleteIcon />
                <Text
                  style={{
                    fontSize: 14,
                    marginLeft: scale(4),
                    color: colors.gray,
                  }}
                >
                  Delete
                </Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </>
      ) : (
        <Text>No Preview Available.</Text>
      )}
    </View>
  );
};

export default AssetImage;

const menuOptionsStyle = {
  optionsContainer: {
    width: scale(166),
    flex: 1,
    borderRadius: 10,
    backgroundColor: "transparent",
    paddingRight: scale(10),
    shadowOffset: 0,
    elevation: 0,
    paddingTop: verticalScale(5),
  },
  optionsWrapper: {
    marginRight: scale(24),
    backgroundColor: "white",
    borderRadius: 10,
    padding: 4,
  },
  optionText: {
    color: colors.gray,
  },
};

const triggerStyle = {
  triggerOuterWrapper: {
    position: "relative",
    marginTop: gapV,
  },
  triggerWrapper: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "scroll",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  menu: {
    flex: 1,
    position: "absolute",
    alignSelf: "flex-end",
  },
  imageOverlay: {
    backgroundColor: "rgba(0,0,0,0.35)",
    flex: 1,
    height: verticalScale(250),
    position: "absolute",
    width: "100%",
    borderTopEndRadius: 30,
  },
  menuIcon: {
    flex: 1,
    position: "absolute",
    alignSelf: "flex-end",
    paddingRight: gapH,
    marginTop: gapV,
  },
  textStyle: {
    fontSize: 14,
    marginLeft: scale(7),
    color: colors.gray,
  },
});

import React,{ useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { verticalScale } from "react-native-size-matters/extend";

import SortIcon from "assets/svg/SortIcon";
import AssetListSearch from "../../components/AssetListSearch/AssetListSearch";
import { gapV, hPadding } from "../../constants/global";
import { TouchableOpacity } from "react-native-gesture-handler";

import SortModal from "./SortModal";

const TopContent = ({ setSearchTerm, setSortOption }) => {
  const [isSortModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "height" : "padding"}
    >
      {isSortModalVisible ? (
        <SortModal
          isModalVisible={isSortModalVisible}
          setModalVisible={setModalVisible}
          setSortOption={setSortOption}
        />
      ) : (
        <>
          <View style={{ flex: 8 }}>
            <AssetListSearch setSearchTerm={setSearchTerm} />
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={openModal}>
              <View style={styles.iconStyle}>
                <SortIcon />
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

export default TopContent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: verticalScale(75),
  },
  iconContainer: {
    flex: 2,
    marginTop: gapV,
    marginRight: hPadding,
  },
  iconStyle: {
    marginLeft: hPadding + 21,
    marginTop: gapV - 7,
  },
});

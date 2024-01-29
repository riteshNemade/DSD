import { StyleSheet, Text, View, Modal } from "react-native";
import React, { useState } from "react";

import { Feather } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { scale, verticalScale } from "react-native-size-matters/extend";

import { colors, gapV, hPadding } from "@constants/global";
import ButtonComponent from "@components/Button/ButtonComponent";

const SortModal = ({
  isSortModalVisible,
  setSortModalVisible,
  url,
  setUrl,
}) => {
  const [selectedOption, setSelectedOption] = useState("created_at-asc");

  const handleSortPressed = () => {
    //URL format1= /hardware?sort=name&order=asc&limit=20&offset=
    //URL format2= /hardware?category_id=2&company_id=57&limit=20&offset=
    //split selectedOption
    const sortCriteria = selectedOption.split("-")[0];
    const order = selectedOption.split("-")[1];

    //regex to match `sort=something&order=something` pattern
    const regex = new RegExp(/sort=[^&]*&order=[^&]*/);

    //if pattern matched, change only sort and order section of the URL
    if (url.match(regex)) {
      const splitURL = url.split(regex);
      const newURL =
        splitURL[0] + `sort=${sortCriteria}&order=${order}` + splitURL[1];
      setUrl(newURL);
      setSortModalVisible(false);
    } else {
      //if pattern didnt match, add sort and order section after ? in URL
      const splitURL = url.split("?");
      const newURL =
        splitURL[0] + `?sort=${sortCriteria}&order=${order}&` + splitURL[1];
      setUrl(newURL);
      setSortModalVisible(false);
    }
  };
  
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isSortModalVisible}
        onRequestClose={() => setSortModalVisible(false)}
      >
        <View style={styles.container}>
          <View style={styles.containerBehindModal}>
            <View style={styles.contentContainer}>
              <View style={{ marginBottom: gapV / 2 }}>
                <Feather
                  name="x"
                  size={18}
                  color={colors.gray}
                  style={{ alignSelf: "flex-end" }}
                  onPress={() => setSortModalVisible(false)}
                />
              </View>
              <Text style={styles.textStyle}>Sort By</Text>
              <View style={styles.sortOptions}>
                <RadioButton
                  value="created_at-asc"
                  status={
                    selectedOption === "created_at-asc"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => {
                    setSelectedOption("created_at-asc");
                  }}
                />
                <Text>Date Added (asc)</Text>
              </View>
              <View style={styles.sortOptions}>
                <RadioButton
                  value="created_at-desc"
                  status={
                    selectedOption === "created_at-desc"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => {
                    setSelectedOption("created_at-desc");
                  }}
                />
                <Text>Date Added (desc)</Text>
              </View>
              <View style={styles.sortOptions}>
                <RadioButton
                  value="name-asc"
                  status={
                    selectedOption === "name-asc" ? "checked" : "unchecked"
                  }
                  onPress={() => {
                    setSelectedOption("name-asc");
                  }}
                />
                <Text>Asset Name (asc)</Text>
              </View>
              <View style={styles.sortOptions}>
                <RadioButton
                  value="name-desc"
                  status={
                    selectedOption === "name-desc" ? "checked" : "unchecked"
                  }
                  onPress={() => {
                    setSelectedOption("name-desc");
                  }}
                />
                <Text>Asset Name (desc)</Text>
              </View>
              <View style={styles.sortOptions}>
                <RadioButton
                  value="asset_eol_date-asc"
                  status={
                    selectedOption === "asset_eol_date-asc"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => {
                    setSelectedOption("asset_eol_date-asc");
                  }}
                />
                <Text>EOL Date (asc)</Text>
              </View>
              <View style={styles.sortOptions}>
                <RadioButton
                  value="asset_eol_date-desc"
                  status={
                    selectedOption === "asset_eol_date-desc"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => {
                    setSelectedOption("asset_eol_date-desc");
                  }}
                />
                <Text>EOL Date (desc)</Text>
              </View>
              <ButtonComponent text={"Search"} onPress={handleSortPressed} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SortModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: verticalScale(60),
    borderRadius: 30,
    height: "110%",
  },
  containerBehindModal: {
    backgroundColor: "rgba(0, 0, 0, 0.76)",
    padding: 20,
    width: "100%",
    height: "100%",
    overflow: "scroll",
  },
  contentContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: hPadding,
    overflow: "scroll",
    paddingVertical: gapV,
    borderRadius: 20,
  },
  textStyle: {
    fontSize: 18,
    letterSpacing: 1.1,
    fontWeight: "600",
    color: "#000",
    margin: scale(10),
  },
  sortOptions: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    height: verticalScale(70),
  },
});

import { StyleSheet, Text, View, Modal, Animated } from "react-native";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";
import { verticalScale } from "react-native-size-matters/extend";

import ButtonComponent from "@components/Button/ButtonComponent";

import {
  colors,
  gapV,
  hPadding,
  textBox,
  FONT_SIZE_REGULAR,
  FONT_SIZE_LARGE,
  DROPDOWN_HEIGHT,
} from "@constants/global";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "@api/api";

const LocationSelectModal = ({
  isModalVisible,
  setIsModalVisible,
  locationId,
  locationName,
}) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    await api
      .post("/users/me/change-location", { location_id: id })
      .then(async () => {
        await AsyncStorage.setItem(
          "primary_location",
          JSON.stringify({ id, name })
        );
        dispatch({
          type: "SET_LOCATION",
          payload: {
            id: id,
            name: name,
          },
        });
        setIsModalVisible(false);
      });
  };

  const handleSelect = (id, name) => {
    setName(name);
    setId(id);
  };

  const handleModalCloseRequest = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const getData = async () => {
      const seconday_locations = await AsyncStorage.getItem(
        "secondary_locations"
      );
      setData(JSON.parse(seconday_locations));
      console.log(data);
    };
    getData();
  }, []);

  const [animation] = useState(new Animated.Value(0));

  //this is to prevent modal opening before screen is ready
  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 200);

    return () => clearTimeout(animationTimeout);
  }, [animation]);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isModalVisible}
      onRequestClose={() => handleModalCloseRequest()}
    >
      <View
        style={{
          width: "100%",
          marginTop: verticalScale(71.4),
          borderRadius: 30,
          height: "110%",
        }}
      >
        <Animated.View
          style={[
            styles.containerBehindModal,
            {
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [900, 0], // Slide up from 600px below to 0
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.contentContainer}>
            <View style={{ flex: 1, marginTop: gapV }}>
              <Text style={{ fontSize: FONT_SIZE_LARGE, fontWeight: 600 }}>
                Please select a Location:{" "}
              </Text>
              <Dropdown
                data={data || []}
                labelField="name"
                valueField="name"
                value={locationName}
                placeholder={"Select Location"}
                placeholderStyle={{
                  color: colors.gray,
                  fontSize: FONT_SIZE_REGULAR,
                }}
                style={[
                  styles.dropdown,
                  {
                    borderColor: colors.gray,
                    fontSize: FONT_SIZE_REGULAR,
                  },
                ]}
                onChange={(item) => {
                  handleSelect(item.id, item.name);
                }}
              />
              <View style={{ marginTop: gapV }}>
                <ButtonComponent
                  text={"GO"}
                  onPress={() => {
                    handleSubmit();
                  }}
                />
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default LocationSelectModal;

const styles = StyleSheet.create({
  containerBehindModal: {
    backgroundColor: "rgba(0, 0, 0, 0.76)",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  contentContainer: {
    backgroundColor: "#fff",
    height: "30%",
    padding: hPadding,
    borderRadius: 15,
    marginTop: "40%",
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: textBox.textBorderRadius,
    marginTop: gapV + 1,
    padding: textBox.padding,
    height: DROPDOWN_HEIGHT,
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderComponent from "components/Header/HeaderComponent";
import LinearGradientComponent from "components/LinearGradient/LinearGradientComponent";
import ContentViewComponent from "components/ContentView/ContentViewComponent";
import NotificationComponent from "../../components/Notifications/NotificationComponent";

import { hPadding } from "../../constants/global";
import { FlatList } from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    color: "orange",
    title: "Something has happened",
    duration: "2 day ago",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    color: "green",
    title: "Your order has been completed",
    duration: "2 day ago",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    color: "gray",
    title: "You got one new email",
    duration: "1 day ago",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d77",
    color: "gray",
    title: "You got one new email",
    duration: "2 day ago",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f60",
    color: "green",
    title: "Your Asset order has been completed",
    duration: "2 day ago",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    color: "red",
    title: "Your Asset order has been cancelled",
    duration: "2 day ago",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d74",
    color: "red",
    title: "Your Asset order has been cancelled",
    duration: "2 day ago",
  },
];

const NotificationsScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradientComponent>
        <HeaderComponent title="Notifications" iconName="Menu" />
        <ContentViewComponent backgroundColor="#fff">
          <View style={{paddingTop: 5 }}>
            <FlatList
              data={DATA}
              renderItem={({ item }) => (
                <View
                  style={{ paddingHorizontal: hPadding}}
                >
                  <NotificationComponent
                    color={item.color}
                    title={item.title}
                    duration={item.duration}
                  />
                </View>
              )}
            />
          </View>
        </ContentViewComponent>
      </LinearGradientComponent>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({});

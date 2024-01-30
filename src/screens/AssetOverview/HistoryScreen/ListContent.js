import { FONT_SIZE_REGULAR, FONT_SIZE_SMALL } from "@constants/global";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

const ListContent = ({
  historicalData,
  indexNumber,
  setModalData,
  setModalVisible,
}) => {
  const handleItemPress = () => {
    setModalData(historicalData);
    setModalVisible(true);
  };
  return (
    <>
      <TouchableOpacity
        style={[
          { flex: 1, flexDirection: "row" },
          {
            backgroundColor:
              indexNumber % 2 === 0 ? "rgba(161, 161, 161, 0.28)" : "fff",
          },
        ]}
        onPress={() => handleItemPress()}
      >
        <View style={styles.column}>
          <View style={styles.firstColumn}>
            <Text style={{fontSize: FONT_SIZE_SMALL}}>{historicalData.action_date.formatted}</Text>
          </View>
          <View style={styles.firstColumn}>
            <Text style={{fontSize: FONT_SIZE_SMALL}}>{historicalData.admin.name}</Text>
          </View>
          <View style={styles.firstColumn}>
            <Text style={{fontSize: FONT_SIZE_SMALL}}>{historicalData.action_type}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default ListContent;

const styles = StyleSheet.create({
  column: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 50,
  },
  firstColumn: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    flex: 1,
  },
  secondColumn: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    flex: 1,
  },
  thirdColumn: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    flex: 1,
  },
});

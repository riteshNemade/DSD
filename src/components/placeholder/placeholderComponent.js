import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const PlaceholderComponent = ({onClearImage}) => {
  return (
    <TouchableOpacity style={{ height: '100%', flex:1, justifyContent:'space-between'}} onPress={()=> onClearImage()}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Clear Image</Text>
        <Entypo name="circle-with-cross" size={18}/>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceholderComponent;

const styles = StyleSheet.create({
    button: {
      borderRadius: 10,
      padding: 10,
      backgroundColor:'#B0B0B047',
      height: '100%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingHorizontal:25,
      
    },
    buttonText: {
      fontSize: 14,
      marginRight:15,
    },
  });
  
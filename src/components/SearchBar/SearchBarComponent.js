import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const SearchBarComponent = ({ placeholder, handleSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={{flex:9}}>
        <TextInput placeholder={placeholder} style={{marginLeft:20}} 
          onEndEditing={(event)=>handleSubmit(event.nativeEvent.text)}
        />
      </View>
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <MaterialIcons name="search" color={'#667085'} size={24}/>
      </View>
    </View>
  );
};

export default SearchBarComponent;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        borderColor:'#667085',
        borderWidth:1,
        borderRadius:6,
        height:35
    }
});

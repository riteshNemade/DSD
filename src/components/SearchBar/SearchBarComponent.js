import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { verticalScale } from "react-native-size-matters/extend";
import { useState } from "react";

const SearchBarComponent = ({setSearchTerm}) => {
  const [inputText, setInputText] = useState(null);

  const handleInputChange = (text) =>{
    setInputText(text)
  }
  const handleEndEditing = () =>{
    setSearchTerm(inputText)
  }


  return (
    <View style={styles.container}>
      <View style={{flex:9}}>
        <TextInput   style={{marginLeft:20}} 
        placeholder="Search"
          onChangeText={handleInputChange}
          onSubmitEditing={handleEndEditing}
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
        height:verticalScale(50),
        justifyContent:'center',
        alignItems:'center'
    }
});

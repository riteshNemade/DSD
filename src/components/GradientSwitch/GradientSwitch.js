import React from 'react';
import { Switch, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { verticalScale } from 'react-native-size-matters/extend';
import { colors } from '../../constants/global';

const GradientSwtich = ({ value, onValueChange }) => {
  return (
    <View style={{  width:'100%', height:verticalScale(26)}}>
    <LinearGradient
      colors={[colors.gradientColor1, colors.gradientColor2]} // Adjust the colors as needed
      style={{  borderRadius: 25, height:verticalScale(26), alignSelf:'flex-end'}}
    >
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: 'transparent', true: 'transparent' }}
        thumbColor={'#fff'} // Customize the thumb color
        style={{height:verticalScale(26)}}
        
      />
    </LinearGradient>
    </View>
  );
};

export default GradientSwtich;

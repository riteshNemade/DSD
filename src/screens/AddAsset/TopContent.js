import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { gapV } from '../../constants/global'
import PlaceholderComponent from '../../components/placeholder/placeholderComponent'
import ButtonComponent from '../../components/Button/ButtonComponent'

const TopContent = () => {
  return (
    <View style={{ flex: 2 }}>
              <Text style={styles.textStyle}>Scanned 1 Asset</Text>
              <View
                style={styles.topButtonContainer}
              >
                <View style={{ flex: 1, marginRight: 17, height: "100%" }}>
                  <PlaceholderComponent />
                </View>
                <View style={{ flex: 1, marginLeft: 17, height: "100%" }}>
                  <ButtonComponent text="Scan Image" />
                </View>
              </View>
            </View>
  )
}

export default TopContent

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 18,
        letterSpacing: 0.8,
        fontWeight: "700",
        color: "#a1a1a1",
      },
    topButtonContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: gapV,
        flex: 4,
      },
})
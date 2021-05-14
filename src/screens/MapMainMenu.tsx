import React, { useState } from 'react'
import { View,Text, StyleSheet } from 'react-native'
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken("");

export default function MapMainMenu() {
    return (
        <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map} />
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF"
    },
    container: {
      height: 500,
      width: 300,
      backgroundColor: "tomato"
    },
    map: {
      flex: 1
    }
  });
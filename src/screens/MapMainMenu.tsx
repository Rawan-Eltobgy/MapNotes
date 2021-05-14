import React, { useState } from 'react'
import { View,Text, StyleSheet } from 'react-native'
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken("sk.eyJ1Ijoicm93YW54eXoiLCJhIjoiY2tvbmMwd2J2MDAwNDJ2cGl2OTJseG5ndyJ9.B0D-CDqQF-lXGZmAaUpEiQ");

export default function MapMainMenu() {
    const [latitude, setLatitude] =useState(0)
    const [longitude, setLongitude] =useState(0)

    const onUserLocationUpdate = async (location: MapboxGL.Location) => {
        console.log(location)
        let lat = location.coords.latitude;
        let long = location.coords.longitude;
        let alt = location.coords.altitude;
        setLatitude(lat)
        setLongitude(long)
    } 

    const renderAnnotations = () => {
        return (
          <MapboxGL.PointAnnotation
            key="pointAnnotation"
            id="pointAnnotation"
            coordinate={[latitude, longitude]}>
            <View style={{
                      height: 30, 
                      width: 30, 
                      backgroundColor: '#00cccc', 
                      borderRadius: 50, 
                      borderColor: '#fff', 
                      borderWidth: 3
                    }} />
          </MapboxGL.PointAnnotation>
        );
      }

    return (
        <View style={{flex: 1, height: "100%", width: "100%" }}>
        <MapboxGL.MapView
          styleURL={MapboxGL.StyleURL.Street}
          zoomLevel={13}
          centerCoordinate={[latitude, longitude]}
          showUserLocation={true}
          style={{flex: 1}}>
            <MapboxGL.Camera
              zoomLevel={13}
              centerCoordinate={[latitude, longitude]}
              animationMode={'flyTo'}
              animationDuration={0}            >
            </MapboxGL.Camera>
            <MapboxGL.UserLocation
                   visible={true}
                onUpdate={(loc) => onUserLocationUpdate(loc)}
            />
            {renderAnnotations()}
        </MapboxGL.MapView>
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
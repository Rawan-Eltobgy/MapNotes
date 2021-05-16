import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

import {ActionButton} from '../../components';
import {Colors, storage} from '../config';
import { FormScreen } from './FormScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

MapboxGL.setAccessToken(
  'sk.eyJ1Ijoicm93YW54eXoiLCJhIjoiY2tvbmMwd2J2MDAwNDJ2cGl2OTJseG5ndyJ9.B0D-CDqQF-lXGZmAaUpEiQ',
);

export default function MapMainMenu({navigation}) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [noteStep, setNoteStep] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [notes,setNotes]= useState([])
  useEffect(() => {
    async function fetchNotes() {
      let notes =  JSON.parse(await (storage.getItem('notes') || '[]'));
      setNotes(notes)
    }
    fetchNotes()
  },
  [notes]
)

const saveNotesLocally = async (values: any) => {
  try {
    let data = {
      title: values.title,
      description: values.description,
      memory: values.memory,
      location: {
        latitude: latitude,
        longitude: longitude,
      },
    };
    let currentNotes = (await storage.getItem('notes')) || '[]';
    currentNotes = JSON.parse(currentNotes);
    currentNotes.push(data);
    storage.setItem('notes', JSON.stringify(currentNotes)).then(() => {});
    setNotes(currentNotes)
    closeModal();
  } catch (error) {
    console.log(error);
  }
};

  const setLatLong = (
    lat: React.SetStateAction<number>,
    long: React.SetStateAction<number>,
  ) => {
    setLatitude(lat);
    setLongitude(long);
  };

  const onUserLocationUpdate = async (location: MapboxGL.Location) => {
    console.log(location);
    let lat = location.coords.latitude;
    let long = location.coords.longitude;
    let alt = location.coords.altitude;
    setLatLong(lat, long);
  };

  const onDragEnd = (e: any) => {
    setLatLong(e.geometry.coordinates[0], e.geometry.coordinates[1]);
  };

  //Render user current location and pin to move
  const renderAnnotations = () => {
    return (
      <MapboxGL.PointAnnotation
        // key={id}
        // id={id}
        key="pointAnnotation"
        id="pointAnnotation"
        title="Test"
        draggable={true}
        onDragEnd={(event: any) => onDragEnd(event)}
        coordinate={[latitude, longitude]}>
        <Image
          source={require('../assets/images/blackMarker.png')}
          style={{
            flex: 1,
            resizeMode: 'contain',
            width: 50,
            height: 50,
          }}
        />
      </MapboxGL.PointAnnotation>
    );
  };


  const changeNoteStep = async (closeBtnClicked: false) => {
    closeBtnClicked || noteStep ===2 ?
      setNoteStep(0) : noteStep===1 ?
      setIsModalVisible(true)
      : setNoteStep(prevState => prevState + 1);
  };

  const closeModal = () => {
    setIsModalVisible(false)
}

const renderAllMapMarkers = () => {
  return(
    <>
     {notes && notes.map((note: any, index) =>  {
      return(
        <MapboxGL.PointAnnotation
        // key={id}
        // id={id}
        key={index}
        id="pointAnnotation"
        draggable={false}
        coordinate={[note.location.latitude, note.location.longitude]}>
        <View
          pointerEvents="none" // this is important for the onPress prop of ShapeSource to work
        >
          <Image
            source={require('../assets/images/redMarker.png')}
            style={{
              flex: 1,
              resizeMode: 'contain',
              width: 50,
              height: 50,
            }}
          />
        </View>
      </MapboxGL.PointAnnotation>
      )
    })
  }

    </>
  )
   
};
const renderFormModal = () => {
  return (
      <FormScreen
          visible={isModalVisible}
          animationIn="slideInUp"
          animationOut="bounceOutDown"
          title={"title"}
          notes={notes}
          onSave={saveNotesLocally}
          // placeholder={"placeholder"}
          closeModal={closeModal}
      />
  )
}

  const actionButtonText = noteStep ? 'Set the pin here' : 'Add a note';
  return (
    <View style={styles.viewContainer}>
    { !!noteStep && <View style={styles.cancelBtn}>
        <ActionButton
          onPress={()=>changeNoteStep(true)}
          buttonIcon
          style={{
            backgroundColor: Colors.white,
            borderRadius: 20,
            height: 65,
            width: 65,
            flex: 1
          }}
        />
      </View>}
      <MapboxGL.MapView
        styleURL={MapboxGL.StyleURL.Outdoors}
        zoomLevel={13}
        centerCoordinate={[latitude, longitude]}
        showUserLocation={true}
        style={{flex: 1}}>
        <MapboxGL.Camera
          zoomLevel={13}
          centerCoordinate={[latitude, longitude]}
          animationMode={'flyTo'}
          animationDuration={0}></MapboxGL.Camera>
        <MapboxGL.UserLocation
          visible={true}
          onUpdate={loc => onUserLocationUpdate(loc)}
        />
        {renderAnnotations()}
        {renderAllMapMarkers()}
      </MapboxGL.MapView>
      <View style={styles.btnContainer}>
        <ActionButton
          onPress={changeNoteStep}
          text={`${actionButtonText}`}
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.primary,
            borderRadius: 20,
            height: 75,
            width: '75%',
            flex: 1,
            // marginHorizontal: 10,
          }}
        />
      </View>
      {renderFormModal()}
      
    </View>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  viewContainer: {
    height: '100%',
    width: '100%',
  },
  btnContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    marginBottom: '10%',
    zIndex: 10,
    alignItems: 'center',
  },
  cancelBtn: {
    position: 'absolute',
    left: 40,
    top: 65,
    zIndex: 10,
  },
  map: {
    flex: 1,
  },
});

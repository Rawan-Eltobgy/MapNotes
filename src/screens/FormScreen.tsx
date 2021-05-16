import React, {FunctionComponent, useState, useEffect} from 'react';
import {
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import DeviceInfo from 'react-native-device-info';

import {ActionButton} from '../../components';
import {Colors} from '../config';
import NoteForm from '../../components/form/NoteForm';

type Props = {
  visible: boolean;
  title?: string;
  closeModal: Function;
  animationIn?: string;
  animationOut?: string;
  style?: ViewStyle | ViewStyle[];
  onSave?: Function,
  notes?: any
};
export const FormScreen: FunctionComponent<Props> = (props: Props) => {
  const {visible, title, animationIn, animationOut, closeModal, onSave, notes} = props;

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Modal
      propagateSwipe
      isVisible={visible}
      useNativeDriver={true}
      onSwipeComplete={closeModal}
      swipeDirection="down"
      swipeThreshold={10}
      animationIn={'slideInUp'}
      animationOut={'bounceOutDown'}
      style={[styles.modalView]}
      onBackdropPress={closeModal}>
      <TouchableWithoutFeedback
        onPress={dismissKeyboard}
        style={styles.columnFlex}>
        <View style={styles.containerStyle}>
          <View style={[styles.content, props.style]}>
            <View style={styles.columnFlex}>
              <View style={styles.modalHeader}>
                <Text style={styles.contentTitle}>{title}</Text>
                <TouchableOpacity
                  onPress={closeModal}
                  style={{alignContent: 'flex-end'}}>
                  <Image
                    source={require('../assets/images/closeBtn.png')}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <NoteForm onSave={onSave} closeModal={closeModal} notes={notes}/>
              {/* <View>
                <ActionButton
                  transparent
                  text={'done'}
                  onPress={() => console.log('saving')}
                />
              </View> */}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

FormScreen.defaultProps = {
  title: '',
  visible: false,
  animationIn: 'fadeIn',
  animationOut: 'fadeOut',
  notes: []
};

const styles = StyleSheet.create({
  modalView: {
    margin: 0,
    width: '100%',
    justifyContent: 'flex-end',
  },
  columnFlex: {
    flex: 1,
    flexDirection: 'column',
  },
  titleRow: {
    width: '100%',
    marginTop: 50,
  },
  childContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalHeader: {
    paddingHorizontal: 0,
    flexDirection: 'row',
    marginBottom: '15%',
  },
  content: {
    width: '93%',
    height:
      Platform.OS === 'android'
        ? '100%'
        : DeviceInfo.hasNotch()
        ? '90%%'
        : '95%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: '10%',
    flexDirection: 'column',
  },
  contentTitle: {
    fontSize: 24,
    marginBottom: 8,
    color: Colors.primary,
    textAlign: 'left',
    flex: 20,
  },
});

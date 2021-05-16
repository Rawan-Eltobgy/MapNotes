import React from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import { TouchableOpacity, Text, Button, StyleSheet, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';

import FormInput from './FormInput'
import {Colors} from '../../src/config';

const formValidationSchema = yup.object().shape({
    title: yup
      .string()
      .required('Title is required'),
    description: yup
      .string()
      .min(20, ({ min, value }) => `${min - value.length} characters to go`)
      .required(''),
    memory: yup
      .string()
      .min(20, ({ min, value }) => `${min - value.length} characters to go`)
      .required(''),
    photo: yup
      .object()
  })

const saveDataLocally = () => {

}
export default function NoteForm() {
    return (
        <Formik
        validationSchema={formValidationSchema}
        initialValues={{
          title: '',
          questionOne: '',
          questionTwo: '',
          questionThree: '',
          photo: ''
        }}
        onSubmit={values => console.log(values)}
      >
        {({
          handleSubmit,
          isValid,
          values,
          setFieldValue,
          setFieldTouched,
          errors,
          touched,
        }) => (
          <>
            <Text style={styles.question}>Enter the title of the note</Text>
            <Field
              component={FormInput}
              name="title"
              placeholder="Title"
            />
            <Text style={styles.question}>Write a brief description about your spot</Text>
            <Field
              component={FormInput}
              name="description"
              placeholder="Description"
              multiline
              numberOfLines={2}
            />
            <Text style={styles.question}>Store your favorite memory about the place</Text>
            <Field
              component={FormInput}
              name="memory"
              placeholder="Memory"
              multiline
              numberOfLines={3}
            />
            <Text style={styles.question}>Upload</Text>

            <TouchableOpacity
              style={styles.photoButton}
              onPress={() => {
                ImagePicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true
                  }).then(image => {
                    console.log(image);
                  });
              }}
            >
              <Text style={{color: Colors.gray}}>Upload</Text>
            </TouchableOpacity>

            {/* {values.photo &&
              <Text>{`...${values.photo.fileName.substr(values.photo.fileName.length - 10)}`}</Text>
            }

            {(errors.photo && touched.photo) &&
              <Text style={{ color: 'red' }}>{errors.photo}</Text>
            } */}
            <View style={styles.saveBtnContainer}>
                <Button 
                title="SUBMIT"
                onPress={handleSubmit}
                disabled={!isValid || values.title === ""}
                > 
                    <Text style={{color: '#000'}}>SUBMIT</Text>
                </Button>
            </View>
          </>
        )}
      </Formik>
    )
}
const styles = StyleSheet.create({
    question: {
      marginTop: '5%',
    //   fontWeight: 'bold',
      fontSize: 17
    },
    saveBtnContainer: {
        marginTop: '25%',
        alignContent: 'flex-end',
        justifyContent: 'flex-end'
    },
    saveBtn: {
        color: 'black'
    },
    photoButton: {
        backgroundColor: Colors.white,
        elevation: 3,
        width: '50%',
        marginTop: '8%',
        height: 40,
        borderRadius: 10,
        borderColor: Colors.gray,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },
  });
  
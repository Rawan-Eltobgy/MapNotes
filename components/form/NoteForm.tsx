import React from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import { TouchableOpacity, Text, Button } from 'react-native'
import FormInput from './FormInput'

const formValidationSchema = yup.object().shape({
    title: yup
      .string()
      .required('Title is required'),
    questionOne: yup
      .string()
      .min(20, ({ min, value }) => `${min - value.length} characters to go`)
      .required(''),
    questionTwo: yup
      .string()
      .min(20, ({ min, value }) => `${min - value.length} characters to go`)
      .required(''),
    questionThree: yup
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
          questionThree: ''
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
            <Field
              component={FormInput}
              name="title"
              placeholder="Title"
            />
            <Field
              component={FormInput}
              name="post"
              placeholder="Write post..."
              multiline
              numberOfLines={3}
            />

            <Button 
              onPress={handleSubmit}
              title="SUBMIT"
              disabled={!isValid || values.title === ""}
            />
          </>
        )}
      </Formik>
    )
}

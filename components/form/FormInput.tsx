import React from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';

export default function FormInput(props) {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];
  return (
    <>
      <TextInput
        style={[styles.textInput, hasError && styles.errorInput]}
        value={value}
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {/* {hasError && <Text style={styles.errorText}>{errors[name]}</Text>} */}
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 30,
    width: '60%',
    marginVertical: '10%',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  errorText: {
    fontSize: 10,
    margin: '3%',
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  },
});

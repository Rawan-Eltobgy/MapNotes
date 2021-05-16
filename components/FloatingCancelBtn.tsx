import React, {FunctionComponent} from 'react';
import {Colors} from '../src/config/styles';
import {
  ViewStyle,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  TextStyle,
  StyleSheet,
} from 'react-native';

type Props = {
  disabled?: boolean;
  isLoading?: boolean;
  onPress: () => void;
  text: string;
  spinnerSize?: 'large' | 'small';
  disabledStyle?: ViewStyle | ViewStyle[];
  transparent?: boolean;
  spinnerColor?: string;
  accessibilityLabel?: string;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  children?: any;
};

export const FloatingCancelBtn: FunctionComponent<Props> = (props: Props) => {
  const disabled = props?.disabled || props?.isLoading;
  let content = null;
  if (props.isLoading) {
    content = (
      <ActivityIndicator color={props.spinnerColor} size={props.spinnerSize} />
    );
  } else {
    content = (
      <Text
        adjustsFontSizeToFit={true}
        style={[
          props.disabled ? styles.disableText : styles.text,
          !!props.textStyle ? props.textStyle : {},
        ]}>
        {props.text}
      </Text>
    );
  }

  const getContainerStyle = () => {
    return [
      props.disabled ? {} : props.isLoading ? styles.loadingButton : {},
      props.style,
    ];
  };

  return (
    <TouchableOpacity
      disabled={props.disabled || props.isLoading}
      accessibilityLabel={props.accessibilityLabel}
      onPress={() => props.onPress()}
      style={getContainerStyle()}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabledButton: {
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disableText: {
    marginTop: 0,
    fontSize: 16,
    color: Colors.white,
    opacity: 0.4,
  },
  text: {
    fontSize: 16,
    marginTop: 0,
    color: Colors.white,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  loadingButton: {
    backgroundColor: Colors.white,
    borderRadius: 32,
  },
});

FloatingCancelBtn.defaultProps = {
  transparent: false,
  disabled: false,
  accessibilityLabel: '',
  style: {},
  disabledStyle: {},
  spinnerColor: Colors.white,
};

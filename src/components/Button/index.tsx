import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';

export enum ButtonTypes {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  TERTIARY = 'TERTIARY',
  ACTIVE = 'ACTIVE',
}

const BUTTON_STYLES: Record<string, StyleProp<TextStyle>> = {
  [ButtonTypes.PRIMARY]: styles.primaryButton,
  [ButtonTypes.SECONDARY]: styles.secondaryButton,
  [ButtonTypes.TERTIARY]: styles.tertiaryButton,
  [ButtonTypes.ACTIVE]: styles.activeButton,
};

const BUTTON_TEXT_STYLES: Record<string, StyleProp<TextStyle>> = {
  [ButtonTypes.PRIMARY]: styles.primaryButtonText,
  [ButtonTypes.SECONDARY]: styles.secondaryButtonText,
  [ButtonTypes.TERTIARY]: styles.tertiaryButtonText,
  [ButtonTypes.ACTIVE]: styles.activeButtonText,
};

const Button = ({
  text,
  type = ButtonTypes.PRIMARY,
  onPress,
  style,
}: ButtonProps) => {
  const buttonStyles = [styles.button, BUTTON_STYLES[type]];
  const buttonTextStyles = [styles.buttonText, BUTTON_TEXT_STYLES[type]];
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyles, style ?? []]}>
      <Text style={buttonTextStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

interface ButtonProps {
  text: string;
  type?: ButtonTypes;
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
}

export default Button;

import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  button: {
    height: 80,
    width: 80,
    borderRadius: 100,
    justifyContent: 'center',
    margin: 10,
  },
  primaryButton: {
    backgroundColor: '#9B9B9B',
  },
  primaryButtonText: {
    color: 'black',
  },
  secondaryButton: {
    backgroundColor: '#333333',
  },
  secondaryButtonText: {
    color: 'rgba(255,255,255,0.8)',
  },
  tertiaryButton: {
    backgroundColor: '#F2A439',
  },
  tertiaryButtonText: {
    color: 'white',
  },
  activeButton: {
    backgroundColor: 'white',
  },
  activeButtonText: {
    color: '#F2A439',
  },
  buttonText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
});

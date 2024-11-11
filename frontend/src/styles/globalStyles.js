import { StyleSheet } from 'react-native';
import colors from './colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,   // Set background to black
  },
  title: {
    fontSize: 24,
    fontFamily: 'Anton-Regular',
    color: colors.primary,           // Green color for text
  },
  button: {
    padding: 10,
    backgroundColor: colors.primary, // Green button background
    borderRadius: 5,
  },
  buttonText: {
    color: colors.white,             // White text on the button
    fontSize: 16,
  },
});

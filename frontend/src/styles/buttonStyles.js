import { StyleSheet } from 'react-native';
import colors from './colors';

const buttonStyles = StyleSheet.create({
  greenButton: {
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  greenButtonText: {
    fontFamily: 'Anton',
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  yellowButton: {
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.yellow,
    paddingVertical: 9,
    width: 200,
  },
  yellowButtonText: {
    fontFamily: 'Anton',
    fontSize: 17,
    color: colors.yellow,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
},
});

export default buttonStyles;

import { StyleSheet } from 'react-native';
import colors from './colors';

const createEventStyles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContainer: {
        width: '90%',
        height: '78%',
        padding: 0, 
        backgroundColor: 'rgba(210, 175, 29, 0.7)',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        borderRadius: 50,
        padding: 5,
        zIndex: 1,
    },
    header: {
        padding: 9,
        backgroundColor: 'transparent',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    scrollViewInnerContent: {
        paddingHorizontal: 20,
        paddingTop: 20, 
    },
    input: {
        height: 40,
        borderColor: colors.yellow,
        backgroundColor: '#C4B89A',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
        color: '#2D2D2D',
    },
    descriptionInput: {
        height: 150,
        minHeight: 100,
        maxHeight: 200,
        borderColor: colors.yellow,
        backgroundColor: '#C4B89A',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
        color: '#2D2D2D',
        textAlignVertical: 'top',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.primary,
        fontFamily: 'Anton',
    },
    label: {
        color: colors.white,
        fontSize: 16,
        marginBottom: 5,
    },
    submitButton: {
        backgroundColor: 'transparent',
        paddingVertical: 12,
        width: 190,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        borderWidth: 2,
        borderColor: colors.primary,
    },
    submitButtonText: {
        color: colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Anton',
    },
    imagePickerButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        alignItems: 'center',
    },
    imagePickerText: {
        color: colors.white,
        fontSize: 16,
    },

    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    inputContainer: {
        width: '48%', 
    },
});

export default createEventStyles;
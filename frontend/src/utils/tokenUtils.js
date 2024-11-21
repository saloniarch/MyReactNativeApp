// Using AsyncStorage instead of React Native Keychain because app is being developed
// on Windows for iOS, and RNK is showing errors due to no access to cocoa pods

import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (token) => {
    try {
        await AsyncStorage.setItem('userToken', token);
        console.log('Token saved successfully');
    } catch (error) {
        console.error('Error saving token:', error);
    }
};

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        console.log('Token retrieved successfully', token);
        return token;
    } catch (error) {
        console.error('Error getting token:', error);
    }
};

export const clearToken = async () => {
    try {
        await AsyncStorage.removeItem('userToken');
        console.log('Token cleared successfully');
    } catch (error) {
        console.error('Error clearing token:', error);
    }
};

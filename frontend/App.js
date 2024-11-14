import { useFonts } from 'expo-font';
import 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useCallback, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import Navigation
import AppNavigator from './src/navigation/AppNavigator';
import CreateEventScreen from './src/screens/CreateEventScreen';

// Auth Context
import { UserProvider } from './src/contexts/UserContext';
import { AuthProvider } from './src/contexts/AuthContext';

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); 

  const openEventModal = () => setIsModalVisible(true);

  const closeEventModal = () => setIsModalVisible(false);

  const [fontsLoaded] = useFonts({
    'Anton': require('./assets/fonts/Anton-Regular.ttf'),
  });

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Return null until fonts are loaded to prevent rendering
  }

  return (
    <AuthProvider>
      <UserProvider>
       <GestureHandlerRootView style={{ flex: 1}}>
        <NavigationContainer onReady={onLayoutRootView}>
          <AppNavigator openEventModal={openEventModal} />
        </NavigationContainer>
        <CreateEventScreen isVisible={isModalVisible} onClose={closeEventModal} />
        </GestureHandlerRootView>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;

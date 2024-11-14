import React, { useCallback, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Import Screens
import SplashScreenComponent from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import EventScreen from './src/screens/EventScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ChatScreen from './src/screens/ChatScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AuthScreen from './src/screens/AuthScreen';

// Auth Context
import { AuthProvider } from './src/contexts/AuthContext';
import { UserProvider } from './src/contexts/UserContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'Events') {
          iconName = focused ? 'add-circle' : 'add-circle-outline';
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#8ACE00',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        height: 80,
        paddingTop: 15,
        paddingBottom: 24,
        backgroundColor: '#000000',
      },
    })}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen} 
      options={({ navigation }) => ({
        headerShown: true,
        headerTitle: 'HOME',
        headerTitleAlign: 'left',
        headerTitleStyle: { fontFamily: 'Anton', fontWeight: 'bold', fontSize: 26, color: '#8ACE00' },
        headerStyle: { backgroundColor: '#000000' },
        headerRight: () => (
          <Icon.Button
            name="chatbubbles-outline"
            size={25}
            backgroundColor="#000000"
            color="#8ACE00"
            onPress={() => navigation.navigate('Chat')}
          />
        ),
      })}
    />
    <Tab.Screen 
      name="Events" 
      component={EventScreen} 
      options={{
        headerShown: true,
        headerTitle: 'CREATE AN EVENT',
        headerTitleAlign: 'left',
        headerTitleStyle: { fontFamily: 'Anton', fontWeight: 'bold', fontSize: 26, color: '#8ACE00' },
        headerStyle: { backgroundColor: '#000000' },
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  // Load the Anton font using useFonts hook
  const [fontsLoaded] = useFonts({
    'Anton': require('./assets/fonts/Anton-Regular.ttf'),
  });

  useEffect(() => {
    // Keep the splash screen visible while fonts are loading
    SplashScreen.preventAutoHideAsync();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // Hide the splash screen once fonts are loaded
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Return null until fonts are loaded to prevent rendering
  }

  return (
    <AuthProvider>
      <UserProvider>
        <NavigationContainer onReady={onLayoutRootView}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreenComponent} />
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Logout" component={AuthScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;

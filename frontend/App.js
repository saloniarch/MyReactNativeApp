import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Import Screens
import SplashScreen from './src/screens/SplashScreen';
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for main app screens
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Chat') {
          iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'Events') {
          iconName = focused ? 'add-circle' : 'add-circle-outline';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#8ACE00', // Green color for active icons
      tabBarInactiveTintColor: 'gray',   // Gray for inactive icons
      tabBarStyle: {
        height: 80,
        paddingTop: 15,
        paddingBottom: 24,
        backgroundColor: '#000000', // Black background for tab bar
      },
    })}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{
        headerShown: true,  // Show header for Home Screen
        headerTitle: 'Home',  // Set title for Home Screen
        headerTitleAlign: 'left',  // Align the title to the left
        headerTitleStyle: { fontWeight: 'bold', fontSize: 26, color: '#8ACE00' }, // Set title color to green
        headerStyle: { backgroundColor: '#000000' },  // Set header background to black
      }}
    />
    <Tab.Screen 
      name="Events" 
      component={EventScreen} 
      options={{
        headerShown: true,  // Show header for Event Screen
        headerTitle: 'Create an Event',  // Set title for Event Screen
        headerTitleAlign: 'left',  // Align the title to the left
        headerTitleStyle: { fontWeight: 'bold', fontSize: 26, color: '#8ACE00' }, // Set title color to green
        headerStyle: { backgroundColor: '#000000' },  // Set header background to black
      }}
    />
    <Tab.Screen 
      name="Chat" 
      component={ChatScreen} 
      options={{
        headerShown: false, // Hide header for Chat Screen
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{
        headerShown: false, // Hide header for Profile Screen
      }}
    />
  </Tab.Navigator>
);

// App Component
const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Splash Screen */}
            <Stack.Screen name="Splash" component={SplashScreen} />
            {/* Main App Tab Navigator */}
            <Stack.Screen name="Main" component={TabNavigator} />
            {/* Other Screens */}
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

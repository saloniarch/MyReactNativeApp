import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Import Screens
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateEventScreen from './src/screens/CreateEventScreen'; 
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
const TabNavigator = ({ openEventModal }) => (
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
        headerShown: true, 
        headerTitle: 'Home', 
        headerTitleAlign: 'left', 
        headerTitleStyle: { fontWeight: 'bold', fontSize: 26, color: '#8ACE00' },
        headerStyle: { backgroundColor: '#000000' },
      }}
    />
    <Tab.Screen 
      name="Events" 
      component={HomeScreen} 
      listeners={{
        tabPress: (e) => {
          e.preventDefault();
          openEventModal(); 
        },
      }}
      options={{
        headerShown: false, 
      }}
    />
    <Tab.Screen 
      name="Chat" 
      component={ChatScreen} 
      options={{ headerShown: false }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

const App = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openEventModal = () => {
    setModalVisible(true);
  };

  const closeEventModal = () => {
    setModalVisible(false);
  };

  return (
    <AuthProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Splash Screen */}
            <Stack.Screen name="Splash" component={SplashScreen} />
            {/* Main App Tab Navigator */}
            <Stack.Screen name="Main">
              {(props) => <TabNavigator {...props} openEventModal={openEventModal} />}
            </Stack.Screen>
            {/* Other Screens */}
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Logout" component={AuthScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        {/* Render CreateEventScreen modal */}
        <CreateEventScreen isVisible={isModalVisible} onClose={closeEventModal} />
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
import React from 'react';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import Screens
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import SplashScreen from '../screens/SplashScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import CreateEventScreen from '../screens/CreateEventScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ({ openEventModal }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'Create Event') {
          iconName = focused ? 'add-circle' : 'add-circle-outline';
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        height: 80,
        paddingTop: 15,
        paddingBottom: 24,
        backgroundColor: colors.black,
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
        headerTitleStyle: { fontFamily: 'Anton', fontWeight: 'bold', fontSize: 26, color: colors.primary },
        headerStyle: { backgroundColor: colors.black },
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
      name="Create Event" 
      component={HomeScreen} 
      listeners={{
        tabPress: (e) => {
          e.preventDefault();
          openEventModal(); // Open the modal when the Events tab is pressed
        },
      }}
      options={{
        headerShown: true,
        headerTitle: 'CREATE AN EVENT',
        headerTitleAlign: 'left',
        headerTitleStyle: { fontFamily: 'Anton', fontWeight: 'bold', fontSize: 26, color: colors.primary },
        headerStyle: { backgroundColor: colors.black },
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

const AppNavigator = ({ openEventModal }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Main" children={() => <TabNavigator openEventModal={openEventModal} />} />
    <Stack.Screen name="Chat" component={ChatScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Logout" component={AuthScreen} />
  </Stack.Navigator>
);

export default AppNavigator;

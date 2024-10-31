import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen'; // Import ProfileScreen

const Stack = createStackNavigator();

// Custom fade transition for both platforms
const screenTransition = ({ current }) => {
  const opacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1], // Fade in from 0 to 1
  });

  return {
    cardStyle: {
      opacity, // Apply the fade animation
    },
  };
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash" 
        screenOptions={{ 
          headerShown: false, 
          cardStyleInterpolator: screenTransition // Custom fade transition
        }}
      >
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
        />
        <Stack.Screen 
          name="Profile" // Add Profile screen
          component={ProfileScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

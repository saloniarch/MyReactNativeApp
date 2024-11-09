import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoggedOutScreen from './LoggedOutScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createNativeStackNavigator();


const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="LoggedOut" 
      component={LoggedOutScreen} 
      options={{ 
        headerShown: false, // Hide header
        gestureEnabled: false // Disable the swipe gesture
      }} 
    />
    <Stack.Screen 
      name="Main" 
      component={HomeScreen} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="Profile" 
      component={ProfileScreen} 
    />
  </Stack.Navigator>
);

export default AppNavigator;
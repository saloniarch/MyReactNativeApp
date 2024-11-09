import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './screens/SignInScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createStackNavigator();

const AuthNavigator = ({ onLogin }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn">
        {() => <SignInScreen onLogin={onLogin} />} // Pass the login function
      </Stack.Screen>
      <Stack.Screen name="Register">
        {() => <RegisterScreen onLogin={onLogin} />} // Pass the login function
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigator;

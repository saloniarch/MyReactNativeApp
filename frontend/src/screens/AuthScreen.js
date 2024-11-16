import React, { useState } from 'react'; 
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { register } from '../utils/auth';
import { useAuth } from '../contexts/AuthContext';
import buttonStyles from '../styles/buttonStyles';

const AuthScreen = ({ navigation }) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Access authentication functions from context
  const { login, setUser } = useAuth();

  const handleRegister = async () => {
    try {
      // Pass the necessary data for validation and registration
      await register({ username, email, password });
      Alert.alert("Success", "Registration successful!");
      navigation.replace("Main"); // Redirect to the main screen after registration
    } catch (error) {
      Alert.alert("Registration Error", error.message); // validation error
    }
  };

  const handleLogin = async () => {
    try {
      const userData = await login(username, password);
      setUser(userData.user);
      navigation.replace('Main');
    } catch (error) {
      Alert.alert("Login failed", error.message || "An error occurred during login.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? "REGISTER" : "SIGN IN"}</Text>

      {isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholderTextColor="#00000"
        />
      )}

      {isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#00000"
        />
      )}

      {!isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholderTextColor="#00000"
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#00000"
      />

      <TouchableOpacity
        style={buttonStyles.yellowButton}
        onPress={isRegistering ? handleRegister : handleLogin}
      >
        <Text style={buttonStyles.yellowButtonText}>
          {isRegistering ? "Register" : "Sign In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.toggleText}>
          {isRegistering ? "Already have an account? Sign In" : "Don't have an account? Register"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: '#8ACE00',
    fontFamily: 'Anton',
  },
  input: {
    width: '80%',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    backgroundColor: '#E1DAAE', 
    color: '#00000',
  },
  toggleText: {
    marginTop: 20,
    color: '#D2AF1D',
    textDecorationLine: 'underline',
  },
});

export default AuthScreen;

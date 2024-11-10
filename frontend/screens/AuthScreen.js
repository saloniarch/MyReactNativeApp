import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { register } from '../utils/auth';
import { useAuth } from '../contexts/AuthContext';

const AuthScreen = ({ navigation }) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Access authentication functions from context
  const { login, setUser } = useAuth();

  const handleRegister = async () => {
    try {
      // Pass the necessary data for validation and registration
      await register({ name, surname, email, password });
      Alert.alert("Success", "Registration successful!");
      navigation.replace("Main"); // Redirect to the main screen after registration
    } catch (error) {
      Alert.alert("Registration Error", error.message); // validation error
    }
  };

  const handleLogin = async () => {
    try {
      const userData = await login(email, password);
      setUser(userData.user);
      navigation.replace('Main');
    } catch (error) {
      Alert.alert("Login failed", error.message || "An error occurred during login.");
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? "Register" : "Sign In"}</Text>

      {isRegistering && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Surname"
            value={surname}
            onChangeText={setSurname}
          />
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <Button
        title={isRegistering ? "Register" : "Sign In"}
        onPress={isRegistering ? handleRegister : handleLogin}
      />

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
    backgroundColor: '#e5f1ef',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  toggleText: {
    marginTop: 20,
    color: '#1DB954',
    textDecorationLine: 'underline',
  },
});

export default AuthScreen;

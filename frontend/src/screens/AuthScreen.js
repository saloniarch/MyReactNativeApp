import React, { useState } from 'react'; 
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { registerUser, loginUser } from '../api/authApi';
import { useAuth } from '../hooks/useAuth';
import { useUser } from '../contexts/UserContext';
import buttonStyles from '../styles/buttonStyles';

// Password validation
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return "Password must be at least 8 characters, include a number, a special character, and a mix of uppercase and lowercase letters.";
  }
  return null;
};

const AuthScreen = ({ navigation }) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Access auth functions and user state from context
  const { login, setUser, error, loading } = useAuth();
  const { setUserData } = useUser();

  const handleRegister = async () => {
    const passwordError = validatePassword(password);
    if (passwordError) {
      Alert.alert("Registration Error", passwordError);
      return;
    }

    try {
      await registerUser({ username, email, password });
      Alert.alert("Success", "Registration successful!");
      navigation.replace("Main"); 
    } catch (error) {
      Alert.alert("Registration Error", error.message);
    }
  };

  const handleLogin = async () => {
    const passwordError = validatePassword(password);
    if (passwordError) {
      Alert.alert("Login Error", passwordError);
      return;
    }

    try {
      const userData = await loginUser(username, password);
      setUser(userData.user); // Set user data in AuthContext
      setUserData(userData.user); // Update user data in UserContext
      navigation.replace("Main");
    } catch (error) {
      Alert.alert("Login failed", error.message || "An error occurred during login.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? "REGISTER" : "SIGN IN"}</Text>

      {isRegistering && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholderTextColor="#7F7F7F"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#7F7F7F"
          />
        </>
      )}

      {!isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholderTextColor="#7F7F7F"
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!passwordVisible} // Toggle password visibility
        autoCapitalize="none"
        placeholderTextColor="#7F7F7F"
      />

      {/* Password visibility toggle button */}
      <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
        <Text style={{ color: '#D2AF1D', marginTop: 10 }}>
          {passwordVisible ? "Hide" : "Show"} Password
        </Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity
        style={[buttonStyles.yellowButton, { opacity: loading ? 0.5 : 1 }]} // Disable button when loading
        onPress={isRegistering ? handleRegister : handleLogin}
        disabled={loading} // Disable button during API request
      >
        <Text style={buttonStyles.yellowButtonText}>
          {loading ? "Processing..." : isRegistering ? "Register" : "Sign In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.toggleText}>
          {isRegistering ? "Already have an account? Sign In" : "Don't have an account? Register"}
        </Text>
      </TouchableOpacity>

      {/* Displaying error message */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: '#8ACE00',
    fontFamily: 'Anton',
  },
  input: {
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#D2AF1D',
    borderRadius: 8,
    backgroundColor: '#F4F4F4',
    color: '#000',
  },
  toggleText: {
    marginTop: 20,
    color: '#D2AF1D',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
  },
});

export default AuthScreen;

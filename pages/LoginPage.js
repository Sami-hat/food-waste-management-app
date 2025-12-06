import { loginStyles } from '../styles/LoginPageStyles';

import React, { useState } from 'react';
import { View, Alert, TextInput, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigation = useNavigation();
  const { signInWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await signInWithEmail(email.trim(), password);

      // if (!response.emailVerified) {
      //   Alert.alert(
      //     'Email Not Verified',
      //     'Please check your email to verify your account.',
      //     [
      //       { text: 'OK' }
      //     ]
      //   );
      // }

      navigation.navigate('Home');
    } catch (error) {
      console.error('Login error:', error);

      if (error.message.includes('Invalid credentials')) {
        setError('Invalid email or password');
      } else if (error.message.includes('locked')) {
        setError(error.message);
      } else if (error.message.includes('Network')) {
        setError('Network error. Please check your connection.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={loginStyles.container}>
      <Text style={loginStyles.title}>
        Log In
      </Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        style={loginStyles.inputText}
        onChangeText={setEmail}
        placeholderTextColor="#999"
      />
      {error && error.includes('email') && (
        <Text style={loginStyles.errorText}>{error}</Text>
      )}

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        style={loginStyles.inputText}
        onChangeText={setPassword}
        placeholderTextColor="#999"
      />
      {error && error.includes('password') && (
        <Text style={loginStyles.errorText}>{error}</Text>
      )}

      <Pressable
        onPress={handleLogin}
        disabled={loading}
        style={loginStyles.backButton}
      >
        <Text style={loginStyles.backText}>
          {loading ? 'Logging in...' : 'Log In'}
        </Text>
      </Pressable>

      <Pressable
        style={loginStyles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={loginStyles.backText}>Back to Home</Text>
      </Pressable>

      {error && !error.includes('email') && !error.includes('password') ? (
        <Text style={loginStyles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
};

export default LoginPage;
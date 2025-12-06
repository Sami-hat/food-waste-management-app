import React, { useState } from 'react';
import { View, Alert, Pressable, TextInput, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { signUpStyles } from '../styles/SignUpPageStyles';

const SignUpPage = () => {
  const navigation = useNavigation();
  const { signUpWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async () => {
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    if (!validateEmail(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      setError('');

      await signUpWithEmail(email.trim(), password);
      
      Alert.alert(
        'Success!',
        'Your account has been created. Please check your email to verify your account.',
        [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
      );
    } catch (error) {
      console.error('Signup error:', error);

      if (error.message.includes('already exists')) {
        setError('An account with this email already exists');
      } else if (error.message.includes('Too many')) {
        setError(error.message);
      } else if (error.message.includes('Network')) {
        setError('Network error. Please check your connection.');
      } else {
        setError('Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={signUpStyles.container}>
      <Text style={signUpStyles.title}>
        Sign Up
      </Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        style={signUpStyles.inputText}
        onChangeText={setEmail}
      />
      {error && error.includes('email') && (
        <Text style={signUpStyles.errorText}>{error}</Text>
      )}

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        style={signUpStyles.inputText}
        onChangeText={setPassword}
      />
      {error && error.includes('Password') && (
        <Text style={signUpStyles.errorText}>{error}</Text>
      )}

      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        style={signUpStyles.inputText}
        onChangeText={setConfirmPassword}
      />
      {error && error.includes('match') && (
        <Text style={signUpStyles.errorText}>{error}</Text>
      )}

      <Text style={signUpStyles.passwordHint}>
        Password must contain at least 8 characters, including uppercase, lowercase, number, and special character
      </Text>

      <Text style={signUpStyles.legalText}>
        By signing up, you agree to our{' '}
        <Text
          style={signUpStyles.legalLink}
          onPress={() => navigation.navigate('PrivacyPolicy')}
        >
          Privacy Policy
        </Text>
        {' '}and{' '}
        <Text
          style={signUpStyles.legalLink}
          onPress={() => navigation.navigate('TermsOfService')}
        >
          Terms of Service
        </Text>
      </Text>

      <Pressable
        onPress={handleSignup}
        disabled={loading}
        style={signUpStyles.backButton}
      >
        <Text style={signUpStyles.backText}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </Text>
      </Pressable>

      <Pressable
        style={signUpStyles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={signUpStyles.backText}>Back to Home</Text>
      </Pressable>

      {error && !error.includes('email') && !error.includes('Password') && !error.includes('match') ? (
        <Text style={signUpStyles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
};

export default SignUpPage;
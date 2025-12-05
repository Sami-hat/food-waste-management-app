import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native';
import { authService } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';

export default function EmailVerificationScreen({ route, navigation }) {
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { refreshUserProfile } = useAuth();

  // Get token from deep link if available
  const tokenFromLink = route.params?.token;

  useEffect(() => {
    if (tokenFromLink) {
      // Automatically verify with token from deep link
      verifyEmail(tokenFromLink);
    }
  }, [tokenFromLink]);

  const verifyEmail = async (token) => {
    setIsVerifying(true);
    try {
      await authService.verifyEmail(token || verificationCode);

      // Refresh user profile to update email verification status
      if (refreshUserProfile) {
        await refreshUserProfile();
      }

      Alert.alert('Success', 'Email verified successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home')
        }
      ]);
    } catch (error) {
      Alert.alert('Error', error.message || 'Invalid or expired verification code');
    } finally {
      setIsVerifying(false);
    }
  };

  // If came from deep link, show verifying state
  if (tokenFromLink && isVerifying) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#52B788" />
        <Text style={{ marginTop: 20, fontSize: 16 }}>Verifying your email...</Text>
      </View>
    );
  }

  // Manual entry screen
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Verify Your Email</Text>
      <Text style={{ marginBottom: 20 }}>
        Enter the verification code from your email:
      </Text>
      <TextInput
        value={verificationCode}
        onChangeText={setVerificationCode}
        placeholder="Enter verification code"
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          padding: 10,
          marginBottom: 20,
          borderRadius: 4,
        }}
      />
      <Pressable
        onPress={() => verifyEmail(verificationCode)}
        disabled={isVerifying || !verificationCode}
        style={{
          backgroundColor: isVerifying || !verificationCode ? '#ccc' : '#52B788',
          padding: 15,
          borderRadius: 25,
          alignItems: 'center',
        }}
      >
        {isVerifying ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            Verify Email
          </Text>
        )}
      </Pressable>
    </View>
  );
}
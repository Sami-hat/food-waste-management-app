import { settingsStyles } from '../styles/SettingsPageStyles';

import { useState } from 'react';
import { View, Alert, Pressable, Text, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/apiService';

const SettingsPage = ({ setIndex }) => {

  const { user, logout, isEmailVerified } = useAuth();
  const [isResendingVerification, setIsResendingVerification] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            setIndex(0); // Navigate back to landing page
          }
        }
      ]
    );
  };

  const handleLogoutAllDevices = async () => {
    Alert.alert(
      'Logout from All Devices',
      'This will log you out from all devices. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout All',
          style: 'destructive',
          onPress: async () => {
            await logout(true);
            setIndex(0);
          }
        }
      ]
    );
  };

  const handleResendVerification = async () => {
    setIsResendingVerification(true);
    try {
      await authService.resendVerification(user.id);
      Alert.alert('Success', 'Verification email sent! Please check your inbox.');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to send verification email');
    } finally {
      setIsResendingVerification(false);
    }
  };

  return (
    <View style={settingsStyles.safeAreaView}>
      <View style={settingsStyles.container}>
        <Text style={settingsStyles.title}>Settings</Text>

        {user && (
          <View style={settingsStyles.userInfoContainer}>
            <Text style={settingsStyles.emailLabel}>Account Email</Text> 
            <Text style={settingsStyles.emailText}>{user.email}</Text>
            {!isEmailVerified && (
              <>
                <Text style={settingsStyles.emailVerificationText}>
                  ⚠️ Email not verified
                </Text>
                <Pressable
                  onPress={handleResendVerification}
                  style={settingsStyles.verifyButton}
                  disabled={isResendingVerification}
                >
                  {isResendingVerification ? (
                    <ActivityIndicator size="small" color="#52B788" />
                  ) : (
                    <Text style={settingsStyles.verifyButtonText}>Verify Now</Text>
                  )}
                </Pressable>
              </>
            )}
          </View>
        )}

        <Pressable
          onPress={handleLogout}
          style={settingsStyles.logoutButton}
        >
          <Text style={settingsStyles.buttonText}>Logout</Text>
        </Pressable>

        <Pressable
          onPress={handleLogoutAllDevices}
          style={settingsStyles.logoutAllButton}
        >
          <Text style={settingsStyles.buttonText}>Logout from All Devices</Text>
        </Pressable>

        <View style={settingsStyles.legalSection}>
          <Text style={settingsStyles.legalTitle}>Legal</Text>

          <Pressable
            onPress={() => {
              setIndex(0);
              setTimeout(() => {
                // This will navigate in ProfileStack after tab switch
                global.navigateToPrivacyPolicy?.();
              }, 150);
            }}
            style={settingsStyles.legalLink}
          >
            <Text style={settingsStyles.legalLinkText}>Privacy Policy</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setIndex(0);
              setTimeout(() => {
                // This will navigate in ProfileStack after tab switch
                global.navigateToTermsOfService?.();
              }, 150);
            }}
            style={settingsStyles.legalLink}
          >
            <Text style={settingsStyles.legalLinkText}>Terms of Service</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SettingsPage;
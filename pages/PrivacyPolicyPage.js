import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { legalStyles } from '../styles/LegalPageStyles';

const PrivacyPolicyPage = () => {
  const navigation = useNavigation();

  return (
    <View style={legalStyles.container}>
      <ScrollView style={legalStyles.scrollView}>
        <View style={legalStyles.content}>
          <Text style={legalStyles.title}>Privacy Policy</Text>
          <Text style={legalStyles.lastUpdated}>
            Last Updated: December 6, 2025
          </Text>

          <View style={legalStyles.section}>
            <Text style={legalStyles.sectionTitle}>1. Introduction</Text>
            <Text style={legalStyles.paragraph}>
              Welcome to Shelfie. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our mobile application.
            </Text>
          </View>

          <View style={legalStyles.section}>
            <Text style={legalStyles.sectionTitle}>2. Information We Collect</Text>

            <View style={legalStyles.subSection}>
              <Text style={legalStyles.subSectionTitle}>2.1 Account Information</Text>
              <Text style={legalStyles.bulletPoint}>• Email address (required for account creation)</Text>
              <Text style={legalStyles.bulletPoint}>• Encrypted password</Text>
              <Text style={legalStyles.bulletPoint}>• Account verification status</Text>
            </View>

            <View style={legalStyles.subSection}>
              <Text style={legalStyles.subSectionTitle}>2.2 Inventory Data</Text>
              <Text style={legalStyles.bulletPoint}>• Food items you add to your inventory</Text>
              <Text style={legalStyles.bulletPoint}>• Quantities and expiry dates</Text>
              <Text style={legalStyles.bulletPoint}>• Categories and tags</Text>
              <Text style={legalStyles.bulletPoint}>• Barcode scan data</Text>
            </View>

            <View style={legalStyles.subSection}>
              <Text style={legalStyles.subSectionTitle}>2.3 Photos and Camera Data</Text>
              <Text style={legalStyles.bulletPoint}>• Photos you capture using the in-app camera</Text>
              <Text style={legalStyles.bulletPoint}>• Image data sent to LogMeal API for food recognition</Text>
              <Text style={legalStyles.paragraph}>
                Note: Photos are processed for food recognition and are not permanently stored on our servers.
              </Text>
            </View>

            <View style={legalStyles.subSection}>
              <Text style={legalStyles.subSectionTitle}>2.4 Dietary Preferences</Text>
              <Text style={legalStyles.bulletPoint}>• Dietary restrictions (vegan, vegetarian, gluten-free, etc.)</Text>
              <Text style={legalStyles.bulletPoint}>• Custom dietary requirements</Text>
              <Text style={legalStyles.bulletPoint}>• Recipe preferences and saved recipes</Text>
            </View>

            <View style={legalStyles.subSection}>
              <Text style={legalStyles.subSectionTitle}>2.5 Usage Information</Text>
              <Text style={legalStyles.bulletPoint}>• Recipe generation requests</Text>
              <Text style={legalStyles.bulletPoint}>• Feature usage patterns</Text>
              <Text style={legalStyles.bulletPoint}>• Error logs and crash reports</Text>
            </View>
          </View>

          <View style={legalStyles.section}>
            <Text style={legalStyles.sectionTitle}>3. Third-Party Services</Text>
            <Text style={legalStyles.paragraph}>
              We use the following third-party services that may collect information:
            </Text>

            <View style={legalStyles.subSection}>
              <Text style={legalStyles.subSectionTitle}>3.1 Google OAuth</Text>
              <Text style={legalStyles.paragraph}>
                For Google Sign-In authentication. Google's Privacy Policy applies to data collected through this service.
              </Text>
            </View>

            <View style={legalStyles.subSection}>
              <Text style={legalStyles.subSectionTitle}>3.2 LogMeal API</Text>
              <Text style={legalStyles.paragraph}>
                For food recognition from photos. Images are sent to LogMeal for processing. See LogMeal's privacy policy for their data handling practices.
              </Text>
            </View>

            <View style={legalStyles.subSection}>
              <Text style={legalStyles.subSectionTitle}>3.3 Google Gemini AI</Text>
              <Text style={legalStyles.paragraph}>
                For recipe generation based on your ingredients. Your ingredient list is sent to Google's Gemini API. Google's AI Privacy Policy applies.
              </Text>
            </View>

            <View style={legalStyles.subSection}>
              <Text style={legalStyles.subSectionTitle}>3.4 OpenFoodFacts & UPCItemDB</Text>
              <Text style={legalStyles.paragraph}>
                For barcode product information. Barcode queries are sent to these public databases.
              </Text>
            </View>
          </View>

          <View style={legalStyles.section}>
            <Text style={legalStyles.sectionTitle}>4. How We Use Your Information</Text>
            <Text style={legalStyles.paragraph}>We use your information to:</Text>
            <Text style={legalStyles.bulletPoint}>• Provide and maintain the Shelfie service</Text>
            <Text style={legalStyles.bulletPoint}>• Manage your food inventory</Text>
            <Text style={legalStyles.bulletPoint}>• Generate personalized recipe recommendations</Text>
            <Text style={legalStyles.bulletPoint}>• Send email verification and account notifications</Text>
            <Text style={legalStyles.bulletPoint}>• Improve app functionality and user experience</Text>
            <Text style={legalStyles.bulletPoint}>• Prevent fraud and ensure security</Text>
          </View>

          <View style={legalStyles.section}>
            <Text style={legalStyles.sectionTitle}>5. Data Storage and Security</Text>
            <Text style={legalStyles.paragraph}>
              Your data is stored securely on our PostgreSQL database hosted on Vercel's infrastructure. We implement industry-standard security measures including:
            </Text>
            <Text style={legalStyles.bulletPoint}>• JWT token-based authentication</Text>
            <Text style={legalStyles.bulletPoint}>• Encrypted password storage (bcrypt hashing)</Text>
            <Text style={legalStyles.bulletPoint}>• HTTPS encryption for all data transmission</Text>
            <Text style={legalStyles.bulletPoint}>• Secure token storage using Expo SecureStore</Text>
            <Text style={legalStyles.bulletPoint}>• Rate limiting to prevent abuse</Text>
          </View>

          <View style={legalStyles.section}>
            <Text style={legalStyles.sectionTitle}>6. Data Retention</Text>
            <Text style={legalStyles.paragraph}>
              We retain your data as long as your account is active. You may request deletion of your account and all associated data at any time.
            </Text>
            <Text style={legalStyles.bulletPoint}>• Inventory data: Retained until you delete items or your account</Text>
            <Text style={legalStyles.bulletPoint}>• Preferences: Retained until you modify or delete your account</Text>
            <Text style={legalStyles.bulletPoint}>• Photos: Processed immediately and not permanently stored</Text>
            <Text style={legalStyles.bulletPoint}>• Account data: Deleted within 30 days of account deletion request</Text>
          </View>

          <View style={legalStyles.section}>
            <Text style={legalStyles.sectionTitle}>7. Your Rights</Text>
            <Text style={legalStyles.paragraph}>You have the right to:</Text>
            <Text style={legalStyles.bulletPoint}>• Access your personal data</Text>
            <Text style={legalStyles.bulletPoint}>• Correct inaccurate data</Text>
            <Text style={legalStyles.bulletPoint}>• Request deletion of your data</Text>
            <Text style={legalStyles.bulletPoint}>• Export your data</Text>
            <Text style={legalStyles.bulletPoint}>• Withdraw consent for data processing</Text>
            <Text style={legalStyles.bulletPoint}>• Object to certain data processing activities</Text>
          </View>

          <View style={legalStyles.section}>
            <Text style={legalStyles.sectionTitle}>8. Children's Privacy</Text>
            <Text style={legalStyles.paragraph}>
              Shelfie is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If we discover that a child under 13 has provided us with personal information, we will delete it immediately.
            </Text>
          </View>

          <View style={legalStyles.section}>
            <Text style={legalStyles.sectionTitle}>9. Data Sharing</Text>
            <Text style={legalStyles.paragraph}>
              We do not sell, rent, or share your personal data with third parties for marketing purposes. We only share data:
            </Text>
            <Text style={legalStyles.bulletPoint}>• With third-party services necessary for app functionality (listed in Section 3)</Text>
            <Text style={legalStyles.bulletPoint}>• When required by law or legal process</Text>
            <Text style={legalStyles.bulletPoint}>• To protect our rights, safety, or property</Text>
          </View>

          <View style={legalStyles.section}>
            <Text style={legalStyles.sectionTitle}>10. Cookies and Tracking</Text>
            <Text style={legalStyles.paragraph}>
              We use JWT tokens for authentication and session management. We do not use cookies for advertising or cross-site tracking.
            </Text>
          </View>

          <View style={legalStyles.section}>
            <Text style={legalStyles.sectionTitle}>11. Changes to This Policy</Text>
            <Text style={legalStyles.paragraph}>
              We may update this privacy policy from time to time. We will notify you of any material changes by updating the "Last Updated" date and, where appropriate, providing in-app notifications.
            </Text>
          </View>

          <View style={legalStyles.section}>
            <Text style={legalStyles.sectionTitle}>12. International Data Transfers</Text>
            <Text style={legalStyles.paragraph}>
              Your data may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers.
            </Text>
          </View>

          <View style={legalStyles.contactSection}>
            <Text style={legalStyles.sectionTitle}>Contact Us</Text>
            <Text style={legalStyles.contactText}>
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at:
            </Text>
            <Text style={legalStyles.contactText}>
              {'\n'}Email: privacy@shelfieapp.com
            </Text>
            <Text style={legalStyles.contactText}>
              Data Protection Officer: dpo@shelfieapp.com
            </Text>
          </View>

          <Pressable
            style={legalStyles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={legalStyles.backButtonText}>Back</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyPage;

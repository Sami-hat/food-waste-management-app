import { preferencesStyles } from "../styles/PreferencesPageStyles";
import { preferencesService } from "../services/apiService";

import React, { useState, useEffect } from "react";
import { View, Alert, ScrollView, Pressable, Text, Switch, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from '../contexts/AuthContext';

const PreferencesPage = ({ }) => {
  const { user } = useAuth();
  const userId = user?.id;

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    is_vegan: false,
    is_vegetarian: false,
    is_gluten_free: false,
    is_dairy_free: false,
    is_nut_free: false,
    is_high_protein: false,
    is_low_carb: false,
    is_custom: false,
    custom_text: "",
  });

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      setLoading(true);
      const data = await preferencesService.get(userId);

      setPreferences({
        ...data,
        custom_text: data.custom_text || "",
      });
    } catch (error) {
      console.error("Error loading preferences:", error);

      setPreferences({
        is_vegan: false,
        is_vegetarian: false,
        is_gluten_free: false,
        is_dairy_free: false,
        is_nut_free: false,
        is_high_protein: false,
        is_low_carb: false,
        is_custom: false,
        custom_text: "",
      });
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async () => {
    try {
      setLoading(true);

      const prefsToSave = {
        ...preferences,
        custom_text: preferences.is_custom ? preferences.custom_text : "",
      };

      await preferencesService.update(userId, prefsToSave);
      Alert.alert("Success", "Preferences saved successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error saving preferences:", error);
      Alert.alert("Error", "Failed to save preferences");
    } finally {
      setLoading(false);
    }
  };

  const updatePreference = (key, value) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleCustom = () => {
    const newValue = !preferences.is_custom;
    setPreferences((prev) => ({
      ...prev,
      is_custom: newValue,
      custom_text: newValue ? prev.custom_text : "",
    }));
  };

  return (
    <View style={preferencesStyles.container}>
      <ScrollView
        contentContainerStyle={preferencesStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={preferencesStyles.title}>
          Dietary Preferences
        </Text>

        <View style={preferencesStyles.checkboxContainer}>
          <Text style={preferencesStyles.checkboxText}>Vegan</Text>
          <Switch
            value={preferences.is_vegan}
            onValueChange={(value) => updatePreference("is_vegan", value)}
            trackColor={{ false: "#767577", true: "#52B788" }}
            thumbColor={preferences.is_vegan ? "#fff" : "#f4f3f4"}
          />
        </View>

        <View style={preferencesStyles.checkboxContainer}>
          <Text style={preferencesStyles.checkboxText}>Vegetarian</Text>
          <Switch
            value={preferences.is_vegetarian}
            onValueChange={(value) => updatePreference("is_vegetarian", value)}
            trackColor={{ false: "#767577", true: "#52B788" }}
            thumbColor={preferences.is_vegetarian ? "#fff" : "#f4f3f4"}
          />
        </View>

        <View style={preferencesStyles.checkboxContainer}>
          <Text style={preferencesStyles.checkboxText}>Gluten Free</Text>
          <Switch
            value={preferences.is_gluten_free}
            onValueChange={(value) => updatePreference("is_gluten_free", value)}
            trackColor={{ false: "#767577", true: "#52B788" }}
            thumbColor={preferences.is_gluten_free ? "#fff" : "#f4f3f4"}
          />
        </View>

        <View style={preferencesStyles.checkboxContainer}>
          <Text style={preferencesStyles.checkboxText}>Dairy Free</Text>
          <Switch
            value={preferences.is_dairy_free}
            onValueChange={(value) => updatePreference("is_dairy_free", value)}
            trackColor={{ false: "#767577", true: "#52B788" }}
            thumbColor={preferences.is_dairy_free ? "#fff" : "#f4f3f4"}
          />
        </View>

        <View style={preferencesStyles.checkboxContainer}>
          <Text style={preferencesStyles.checkboxText}>Nut Free</Text>
          <Switch
            value={preferences.is_nut_free}
            onValueChange={(value) => updatePreference("is_nut_free", value)}
            trackColor={{ false: "#767577", true: "#52B788" }}
            thumbColor={preferences.is_nut_free ? "#fff" : "#f4f3f4"}
          />
        </View>

        <View style={preferencesStyles.checkboxContainer}>
          <Text style={preferencesStyles.checkboxText}>High Protein</Text>
          <Switch
            value={preferences.is_high_protein}
            onValueChange={(value) => updatePreference("is_high_protein", value)}
            trackColor={{ false: "#767577", true: "#52B788" }}
            thumbColor={preferences.is_high_protein ? "#fff" : "#f4f3f4"}
          />
        </View>

        <View style={preferencesStyles.checkboxContainer}>
          <Text style={preferencesStyles.checkboxText}>Low Carb</Text>
          <Switch
            value={preferences.is_low_carb}
            onValueChange={(value) => updatePreference("is_low_carb", value)}
            trackColor={{ false: "#767577", true: "#52B788" }}
            thumbColor={preferences.is_low_carb ? "#fff" : "#f4f3f4"}
          />
        </View>

        <View style={preferencesStyles.checkboxContainer}>
          <Text style={preferencesStyles.checkboxText}>Custom Dietary Restrictions</Text>
          <Switch
            value={preferences.is_custom}
            onValueChange={toggleCustom}
            trackColor={{ false: "#767577", true: "#52B788" }}
            thumbColor={preferences.is_custom ? "#fff" : "#f4f3f4"}
          />
        </View>

        {preferences.is_custom && (
          <View style={preferencesStyles.customInputContainer}>
            <TextInput
              placeholder="Enter your custom dietary preferences..."
              placeholderTextColor="#999"
              value={preferences.custom_text}
              onChangeText={(text) => updatePreference("custom_text", text)}
              multiline
              numberOfLines={3}
              style={preferencesStyles.customInputText}
              maxLength={500}
            />
            <Text style={preferencesStyles.characterCount}>
              {`${preferences.custom_text.length}/500`}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={preferencesStyles.buttonContainer}>
        <Pressable
          onPress={savePreferences}
          disabled={loading}
          style={preferencesStyles.saveButton}
        >
          <Text style={preferencesStyles.buttonTitle}>
            {loading ? 'Saving...' : 'Save Preferences'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.goBack()}
          disabled={loading}
          style={preferencesStyles.cancelButton}
        >
          <Text style={preferencesStyles.cancelText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PreferencesPage;

import { cameraStyles } from "../styles/CameraPageStyles";

import { useState, useRef } from "react";
import {
  View,
  Pressable,
  Alert,
  ActivityIndicator,
  Text,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CameraView, useCameraPermissions } from "expo-camera";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { recipeService, inventoryService } from "../services/apiService";

import { useAuth } from '../contexts/AuthContext';

const CameraPage = ({ }) => {
  const { user } = useAuth();
  const userId = user?.id;

  const navigation = useNavigation();
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photoData, setPhotoData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef(null);

  const processImage = async (photo) => {
    setIsProcessing(true);
    try {
      if (!photo.base64) {
        throw new Error('No base64 image data available');
      }
      const result = await recipeService.analyseImage(photo.base64);

      if (
        result.segmentation_results &&
        result.segmentation_results[0] &&
        result.segmentation_results[0].recognition_results &&
        result.segmentation_results[0].recognition_results.length > 0
      ) {
        const detectedItems =
          result.segmentation_results[0].recognition_results;
        const itemNames = detectedItems.map((item) => item.name).join(", ");

        Alert.alert("Items Detected", `Found: ${itemNames}`, [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => setPhotoData(null),
          },
          {
            text: "Add to Inventory",
            onPress: async () => {
              await addItemsToInventory(detectedItems);
              setPhotoData(null);
              navigation.goBack();
            },
          },
        ]);
      } else {
        Alert.alert(
          "No Items Detected",
          "Could not identify any food items in the image. Try taking a clearer photo.",
          [{ text: "OK", onPress: () => setPhotoData(null) }],
        );
      }
    } catch (error) {
      console.error("Error processing image:", error);
      Alert.alert(
        "Processing Error",
        "Failed to analyze the image. Please try again.",
        [{ text: "OK", onPress: () => setPhotoData(null) }],
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const addItemsToInventory = async (items) => {
    try {
      for (const item of items) {
        await inventoryService.add(userId, item.name, "1", null, null);
      }
      Alert.alert("Success", "Items added to inventory!");
    } catch (error) {
      console.error("Error adding to inventory:", error);
      Alert.alert("Error", "Failed to add items to inventory");
    }
  };

  if (!permission) {
    return <View style={cameraStyles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={cameraStyles.permissionContainer}>
        <View style={cameraStyles.permissionContent}>
          <Ionicons name="camera-outline" size={80} color="#52B788" />
          <Text style={cameraStyles.permissionTitle}>
            Camera Permission Required
          </Text>
          <Text style={cameraStyles.permissionText}>
            We need access to your camera to take photos of your groceries
          </Text>
          <Pressable
            style={cameraStyles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={cameraStyles.permissionButtonText}>
              Grant Permission
            </Text>
          </Pressable>
          <Pressable
            style={cameraStyles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={cameraStyles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const toggleCameraType = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true, // Enable base64 encoding
        });
        console.log("Photo taken:", photo.uri);
        setPhotoData(photo);
      } catch (error) {
        console.error("Error taking picture:", error);
        Alert.alert(
          "Camera Error",
          "Failed to take picture. Please try again.",
        );
      }
    } else {
      console.error("Camera ref not available");
    }
  };

  const renderPhotoPreview = () => {
    return (
      <View style={cameraStyles.previewContainer}>
        <View style={cameraStyles.previewHeader}>
          <Pressable
            style={cameraStyles.headerButton}
            onPress={() => setPhotoData(null)}
          >
            <Ionicons name="arrow-back" size={28} color="white" />
          </Pressable>
          <Text style={cameraStyles.headerTitle}>Review Photo</Text>
          <View style={cameraStyles.headerButton} />
        </View>

        <Image
          source={{ uri: photoData.uri }}
          contentFit="contain"
          style={cameraStyles.previewImage}
        />

        <View style={cameraStyles.previewActions}>
          <Pressable
            style={[cameraStyles.actionButton, cameraStyles.retakeButton]}
            onPress={() => setPhotoData(null)}
            disabled={isProcessing}
          >
            <MaterialCommunityIcons
              name="camera-retake"
              size={24}
              color="white"
            />
            <Text style={cameraStyles.actionButtonText}>Retake</Text>
          </Pressable>

          <Pressable
            style={[cameraStyles.actionButton, cameraStyles.processButton]}
            onPress={() => processImage(photoData)}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <FontAwesome name="check" size={24} color="white" />
                <Text style={cameraStyles.actionButtonText}>Process</Text>
              </>
            )}
          </Pressable>
        </View>
      </View>
    );
  };

  const renderCamera = () => {
    return (
      <View style={cameraStyles.container}>
        <CameraView
          style={cameraStyles.camera}
          facing={facing}
          ref={cameraRef}
        >
          <View style={cameraStyles.cameraOverlay}>
            {/* Top Bar */}
            <View style={cameraStyles.topBar}>
              <Pressable
                style={cameraStyles.topButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={28} color="white" />
              </Pressable>

              <View style={cameraStyles.cameraGuide}>
                <Text style={cameraStyles.guideText}>
                  Center groceries in frame
                </Text>
              </View>

              <Pressable
                style={cameraStyles.topButton}
                onPress={toggleCameraType}
              >
                <MaterialCommunityIcons
                  name="camera-flip-outline"
                  size={28}
                  color="white"
                />
              </Pressable>
            </View>

            {/* Focus Guide */}
            <View style={cameraStyles.focusArea}>
              <View style={[cameraStyles.focusCorner, { top: 0, left: 0 }]} />
              <View
                style={[
                  cameraStyles.focusCorner,
                  { top: 0, right: 0, transform: [{ rotate: "90deg" }] },
                ]}
              />
              <View
                style={[
                  cameraStyles.focusCorner,
                  { bottom: 0, left: 0, transform: [{ rotate: "-90deg" }] },
                ]}
              />
              <View
                style={[
                  cameraStyles.focusCorner,
                  { bottom: 0, right: 0, transform: [{ rotate: "180deg" }] },
                ]}
              />
            </View>

            {/* Bottom Controls */}
            <View style={cameraStyles.bottomControls}>
              <View style={cameraStyles.controlsRow}>
                <View style={{ width: 60 }} />

                <Pressable
                  style={cameraStyles.shutterButton}
                  onPress={takePicture}
                  activeOpacity={0.7}
                >
                  <View style={cameraStyles.shutterOuter}>
                    <View style={cameraStyles.shutterInner} />
                  </View>
                </Pressable>

                <View style={{ width: 60 }} />
              </View>
            </View>
          </View>
        </CameraView>
      </View>
    );
  };

  return photoData ? renderPhotoPreview() : renderCamera();
};

export default CameraPage;

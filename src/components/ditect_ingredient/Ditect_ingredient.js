// DetectIngredient.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const DetectIngredient = () => {
  const [cameraVisible, setCameraVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [detectedIngredients, setDetectedIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const cameraRef = useRef(null); // Properly define cameraRef

  // Function to detect ingredients using multipart/form-data
  const detectIngredients = async (imagePath) => {
    try {
      setLoading(true);
      setDetectedIngredients([]);
      setSelectedIngredients([]);
      setErrorMessage('');

      console.log('Sending image data to backend...');
      console.log('Image Path:', imagePath);

      const formData = new FormData();
      formData.append('image', {
        uri: imagePath,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      const response = await axios.post('http://10.200.28.199:5000/detect', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Backend Response:', response.data);

      if (
        response.data.ingredients &&
        Array.isArray(response.data.ingredients) &&
        response.data.ingredients.length > 0
      ) {
        setDetectedIngredients(response.data.ingredients);
      } else {
        setErrorMessage('No ingredients detected.');
      }
    } catch (error) {
      console.error('Detection Error:', error);
      if (error.response) {
        // Server responded with a status other than 2xx
        setErrorMessage(`Server Error: ${error.response.data.error || 'Unknown error'}`);
      } else if (error.request) {
        // Request was made but no response received
        setErrorMessage('Network error: Unable to reach the server.');
      } else {
        // Something else caused the error
        setErrorMessage('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to handle image capture
  const captureImage = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.5, base64: false };
        const data = await cameraRef.current.takePictureAsync(options);
        console.log('Captured Image Data:', data);
        setImageUri(data.uri);
        if (data.uri) {
          detectIngredients(data.uri);
        } else {
          setErrorMessage('Failed to capture image.');
        }
        setCameraVisible(false); // Hide camera after capture
      } catch (error) {
        console.error('Capture Error:', error);
        setErrorMessage('Failed to capture image.');
      }
    }
  };

  // Function to upload an image
  const uploadImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false, // Not needed for multipart
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        setErrorMessage(response.errorMessage || 'ImagePicker Error');
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        console.log('Selected Image Asset:', asset);
        setImageUri(asset.uri);
        if (asset.uri) {
          detectIngredients(asset.uri);
        } else {
          setErrorMessage('Failed to retrieve image URI.');
        }
      } else {
        setErrorMessage('No image selected.');
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ingredient Detection API</Text>

      <View style={styles.optionsContainer}>
        <Button title="Capture Image" onPress={() => setCameraVisible(true)} />
        <Button title="Upload Image" onPress={uploadImage} />
      </View>

      {cameraVisible && (
        <View style={styles.cameraContainer}>
          <RNCamera
            style={styles.camera}
            ref={cameraRef}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}
            androidCameraPermissionOptions={{
              title: 'Camera Permission',
              message: 'App needs access to your camera',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            }}
          >
            <View style={styles.captureButtonContainer}>
              <Button title="Capture" onPress={captureImage} />
              <Button title="Cancel" onPress={() => setCameraVisible(false)} color="#FF0000" />
            </View>
          </RNCamera>
        </View>
      )}

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}

      {detectedIngredients.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Detected Ingredients:</Text>
          {detectedIngredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredient}>
              {ingredient}
            </Text>
          ))}
        </View>
      )}

      {errorMessage !== '' && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black'
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  cameraContainer: {
    width: '100%',
    height: 400,
    marginBottom: 10,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  image: {
    width: '100%',
    height: 240,
    marginTop: 10,
    marginBottom: 10,
  },
  resultsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'black'
  },
  ingredient: {
    fontSize: 16,
    color: 'blue',
  },
  selectedIngredients: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
  },
  errorContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ffdddd',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DetectIngredient;

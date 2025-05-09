import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Button from '@/components/ui/Button';
import { useAuthContext } from '@/context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // For the back arrow

export default function EditProfile() {
  const { user, updateProfileData } = useAuthContext();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [photoUri, setPhotoUri] = useState<string | null>(user?.photoURL || null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State to hold success message
  
  const navigation = useNavigation();

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setPhotoUri(user?.photoURL || null);
  }, [user]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access media library is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!pickerResult.canceled) {
      const uri = pickerResult.assets[0].uri;
      setPhotoUri(uri); // Save local URI directly
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Validation Error', 'Name and email cannot be empty.');
      return;
    }

    setIsLoading(true); // Start loader
    try {
      // Save local photo URI in Firestore as a string
      await updateProfileData(name, photoUri || '');
      setSuccessMessage('Profile updated successfully.'); // Set success message
      setTimeout(() => setSuccessMessage(null), 3000); // Hide success message after 3 seconds
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile.');
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  const handleGoBack = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        
        <Text style={styles.title}>Edit Profile</Text>
        
        {successMessage && (
          <Text style={styles.successMessage}>{successMessage}</Text> // Display success message
        )}
        
        <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarPlaceholderText}>Add Photo</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            autoCapitalize="words"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, { backgroundColor: '#eee' }]}
            value={email}
            editable={false}
            placeholder="Email cannot be changed"
          />
        </View>
        
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Save" onPress={handleSave} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  content: { flex: 1, padding: 16, position: 'relative' },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 10,
  },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 16, color: '#000', textAlign: 'center' },
  successMessage: {
    fontSize: 16,
    color: 'green',
    marginVertical: 10,
    textAlign: 'center',
  },
  avatarContainer: { alignSelf: 'center', marginBottom: 24 },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: { color: '#666' },
  formGroup: { marginBottom: 16 },
  label: { fontSize: 16, color: '#666', marginBottom: 8 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

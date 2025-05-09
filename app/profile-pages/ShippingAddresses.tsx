import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useAuth } from '@/hooks/useAuth';
import { COLORS } from '@/constants/Colors';
import { LAYOUT } from '@/constants/Layout';
import Button from '@/components/ui/Button';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ShippingAddress } from '@/types/ShippingAddress';

export default function ShippingAddresses() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newAddress, setNewAddress] = useState<ShippingAddress>({
    street: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const userRef = user?.id ? doc(db, 'users', user.id) : null;
  const navigation = useNavigation();

  React.useEffect(() => {
    const fetchAddresses = async () => {
      if (!userRef) return;
      try {
        setLoading(true);
        const docSnap = await getDoc(userRef);
        const data = docSnap.exists() ? docSnap.data() : {};
        setAddresses(data.shippingAddresses || []);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        Alert.alert('Error', 'Failed to load addresses.');
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [userRef]);

  const saveAddresses = async (updated: ShippingAddress[]) => {
    if (!userRef) return;
    try {
      setLoading(true);
      await setDoc(userRef, { shippingAddresses: updated }, { merge: true });
      setAddresses(updated);
      Alert.alert('Success', 'Shipping address saved successfully');
    } catch (error) {
      console.error('Error saving addresses:', error);
      Alert.alert('Error', 'Failed to save address.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = () => {
    const { street, city, postalCode, country } = newAddress;
    if (!street.trim() || !city.trim() || !postalCode.trim() || !country.trim()) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }
    
    const updated = [...addresses, newAddress];
    saveAddresses(updated); 
    setNewAddress({ street: '', city: '', postalCode: '', country: '' });
    setShowModal(false);
  };

  const handleDeleteAddress = (index: number) => {
    Alert.alert('Delete Address', 'Are you sure you want to delete this address?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            setLoading(true);
            // Remove address from list
            const updated = addresses.filter((_, i) => i !== index);
            await saveAddresses(updated);
          } catch (error) {
            console.error('Error deleting address:', error);
            Alert.alert('Error', 'Failed to delete address.');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const renderItem = ({ item, index }: { item: ShippingAddress; index: number }) => (
    <View style={styles.addressItem}>
      <Text style={styles.addressText}>
        {`${item.street}, ${item.city}, ${item.postalCode}, ${item.country}`}
      </Text>
      <TouchableOpacity
        onPress={() => handleDeleteAddress(index)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Shipping Addresses</Text>

        <FlatList
          data={addresses}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.placeholder}>No addresses added yet.</Text>
          }
          style={styles.list}
        />

        <Button title="Add Address" onPress={() => setShowModal(true)} />
      </View>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Address</Text>

            <TextInput
              value={newAddress.street}
              onChangeText={(text) => setNewAddress({ ...newAddress, street: text })}
              placeholder="Street"
              style={styles.input}
            />
            <TextInput
              value={newAddress.city}
              onChangeText={(text) => setNewAddress({ ...newAddress, city: text })}
              placeholder="City"
              style={styles.input}
            />
            <TextInput
              value={newAddress.postalCode}
              onChangeText={(text) => setNewAddress({ ...newAddress, postalCode: text })}
              placeholder="Postal Code"
              style={styles.input}
              keyboardType="number-pad"
            />
            <TextInput
              value={newAddress.country}
              onChangeText={(text) => setNewAddress({ ...newAddress, country: text })}
              placeholder="Country"
              style={styles.input}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setShowModal(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddAddress} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.offWhite,
  },
  content: {
    flex: 1,
    padding: LAYOUT.spacing.l,
  },
  title: {
    fontSize: LAYOUT.fontSize.xl,
    fontWeight: '600',
    marginBottom: LAYOUT.spacing.m,
    color: COLORS.black,
    textAlign: 'center',
    marginTop: 40,
  },
  list: {
    flex: 1,
    marginBottom: LAYOUT.spacing.m,
  },
  addressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: LAYOUT.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  addressText: {
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
    flex: 1,
    paddingRight: 10,
  },
  deleteButton: {
    paddingHorizontal: LAYOUT.spacing.m,
    paddingVertical: LAYOUT.spacing.xs,
    backgroundColor: '#ff3b30',
    borderRadius: LAYOUT.borderRadius.medium,
  },
  deleteButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  placeholder: {
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginTop: LAYOUT.spacing.l,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.large,
    padding: LAYOUT.spacing.l,
  },
  modalTitle: {
    fontSize: LAYOUT.fontSize.l,
    fontWeight: '600',
    marginBottom: LAYOUT.spacing.m,
    color: COLORS.black,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: LAYOUT.borderRadius.medium,
    padding: LAYOUT.spacing.m,
    fontSize: LAYOUT.fontSize.m,
    marginBottom: LAYOUT.spacing.m,
    minHeight: 40,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: LAYOUT.spacing.s,
  },
  cancelButton: {
    backgroundColor: COLORS.lightGray,
    paddingVertical: LAYOUT.spacing.m,
    paddingHorizontal: LAYOUT.spacing.l,
    borderRadius: LAYOUT.borderRadius.medium,
    flex: 1,
    marginRight: 8,
  },
  cancelButtonText: {
    color: COLORS.black,
    textAlign: 'center',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: LAYOUT.spacing.m,
    paddingHorizontal: LAYOUT.spacing.l,
    borderRadius: LAYOUT.borderRadius.medium,
    flex: 1,
    marginLeft: 8,
  },
  saveButtonText: {
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: '600',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 10,
    zIndex: 10,
  },
});

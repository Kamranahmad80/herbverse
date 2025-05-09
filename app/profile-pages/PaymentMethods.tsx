import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '@/constants/Colors';
import { LAYOUT } from '@/constants/Layout';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { useFirestoreCollection } from '@/hooks/useFirestoreCollection';
import { PaymentMethod } from '@/types/PaymentMethod';

export default function PaymentMethods() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  
  // Use the Firestore collection hook for payment methods
  const {
    data: methods,
    loading,
    addItem,
    deleteItem
  } = useFirestoreCollection<PaymentMethod>({
    collectionPath: user ? `users/${user.id}/paymentMethods` : '',
    filterField: user ? undefined : 'dummy', // Prevent loading if no user
    filterValue: user ? undefined : 'dummy'
  });

  const handleAddMethod = async () => {
    if (!user) return;
    if (!cardNumber || !cardHolder || !expiryMonth || !expiryYear || !cvv) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }

    const expiry = `${expiryMonth}/${expiryYear}`;
    const newCard: PaymentMethod = { cardNumber, cardHolder, expiry, cvv };

    try {
      await addItem(newCard);
      setModalVisible(false);
      setCardNumber('');
      setCardHolder('');
      setExpiryMonth('');
      setExpiryYear('');
      setCvv('');
    } catch (error) {
      console.error('Error adding card:', error);
      Alert.alert('Error', 'Failed to add payment method.');
    }
  };

  const handleDeleteMethod = (id: string) => {
    Alert.alert('Delete Payment Method', 'Are you sure you want to delete this card?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteItem(id);
          } catch (error) {
            console.error('Error deleting card:', error);
            Alert.alert('Error', 'Failed to delete payment method.');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: PaymentMethod & { id: string } }) => (
    <View style={styles.methodItem}>
      <Text style={styles.methodText}>
        {item.cardNumber?.slice(0, 4)} **** **** ****
      </Text>
      <TouchableOpacity onPress={() => handleDeleteMethod(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.title}>Payment Methods</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.title}>Payment Methods</Text>
      </View>

      <FlatList
        data={methods}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.placeholder}>No payment methods added.</Text>}
        style={styles.list}
      />
      <Button title="Add Payment Method" onPress={() => setModalVisible(true)} />

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Payment Method</Text>

            <TextInput
              placeholder="Card Number"
              keyboardType="number-pad"
              style={styles.input}
              value={cardNumber}
              onChangeText={setCardNumber}
              maxLength={16}
            />
            <TextInput
              placeholder="Card Holder"
              style={styles.input}
              value={cardHolder}
              onChangeText={setCardHolder}
            />

            <View style={styles.row}>
              <TextInput
                placeholder="MM"
                keyboardType="number-pad"
                maxLength={2}
                style={[styles.input, styles.halfInput]}
                value={expiryMonth}
                onChangeText={setExpiryMonth}
              />
              <TextInput
                placeholder="YY"
                keyboardType="number-pad"
                maxLength={2}
                style={[styles.input, styles.halfInput]}
                value={expiryYear}
                onChangeText={setExpiryYear}
              />
            </View>

            <TextInput
              placeholder="CVV"
              keyboardType="number-pad"
              maxLength={3}
              style={styles.input}
              value={cvv}
              onChangeText={setCvv}
            />

            <View style={styles.buttonRow}>
              <Button title="Save" onPress={handleAddMethod} />
              <View style={{ height: 10 }} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
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
    paddingHorizontal: LAYOUT.spacing.l,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: LAYOUT.spacing.m,
  },
  title: {
    fontSize: LAYOUT.fontSize.xl,
    fontWeight: '600',
    marginLeft: LAYOUT.spacing.m,
    color: COLORS.black,
  },
  list: {
    flex: 1,
    marginBottom: LAYOUT.spacing.m,
  },
  methodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: LAYOUT.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  methodText: {
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    margin: 20,
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: LAYOUT.fontSize.l,
    fontWeight: '600',
    marginBottom: 10,
    color: COLORS.black,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    color: COLORS.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginRight: 10,
  },
  buttonRow: {
    marginTop: 12,
  },
});

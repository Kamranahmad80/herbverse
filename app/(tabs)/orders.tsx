import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/Colors';
import { LAYOUT } from '@/constants/Layout';
import { useRouter } from 'expo-router';
import OrderCard from '@/components/order/OrderCard';
import EmptyState from '@/components/ui/EmptyState';
import { ClipboardList } from 'lucide-react-native';
import { mockOrders } from '@/data/mockData';

export default function OrdersScreen() {
  const router = useRouter();

  if (mockOrders.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Orders</Text>
        </View>
        
        <EmptyState
          icon={<ClipboardList size={64} color={COLORS.mediumGray} />}
          title="No orders yet"
          message="Your order history will appear here"
          actionText="Browse Products"
          onAction={() => router.push('/(tabs)')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>
      
      <FlatList
        data={mockOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderCard order={item} />
        )}
        contentContainerStyle={styles.ordersList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },
  header: {
    paddingHorizontal: LAYOUT.spacing.l,
    paddingVertical: LAYOUT.spacing.l,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.xl,
    color: COLORS.black,
  },
  ordersList: {
    padding: LAYOUT.spacing.l,
  },
});
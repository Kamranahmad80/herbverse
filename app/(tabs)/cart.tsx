import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { LAYOUT } from '@/constants/Layout';
import Button from '@/components/ui/Button';
import CartItem from '@/components/cart/CartItem';
import EmptyState from '@/components/ui/EmptyState';
import { ShoppingCart, CreditCard, Check } from 'lucide-react-native';
import { useCart } from '../../context/CartContext';

export default function CartScreen() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shippingFee;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      setOrderPlaced(true);
      // Wait a bit before clearing cart and redirecting
      setTimeout(() => {
        clearCart();
        router.push('/(tabs)/orders');
      }, 2000);
    }, 2000);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shopping Cart</Text>
        </View>
        
        <EmptyState
          icon={<ShoppingCart size={64} color={COLORS.mediumGray} />}
          title="Your cart is empty"
          message="Browse products and add items to your cart"
          actionText="Browse Products"
          onAction={() => router.push('/(tabs)')}
        />
      </SafeAreaView>
    );
  }

  if (orderPlaced) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Order Placed</Text>
        </View>
        
        <EmptyState
          icon={<Check size={64} color={COLORS.success} />}
          title="Order Successfully Placed!"
          message="Your order has been placed and is being processed"
          actionText="View Orders"
          onAction={() => router.push('/(tabs)/orders')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <Text style={styles.itemCount}>{cartItems.length} items</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cartItems}>
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={() => removeFromCart(item.id)}
              onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
            />
          ))}
        </View>
        
        <View style={styles.cartSummary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>
              {shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}
            </Text>
          </View>
          
          {shippingFee > 0 && (
            <View style={styles.freeShippingNote}>
              <Text style={styles.freeShippingText}>
                Add ${(50 - subtotal).toFixed(2)} more for free shipping
              </Text>
            </View>
          )}
          
          <View style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.checkoutContainer}>
        <Button
          title={isCheckingOut ? "Processing..." : "Proceed to Checkout"}
          onPress={handleCheckout}
          variant="primary"
          style={styles.checkoutButton}
          isLoading={isCheckingOut}
          disabled={isCheckingOut}
        />
        
        <View style={styles.paymentMethodsContainer}>
          <CreditCard size={16} color={COLORS.darkGray} />
          <Text style={styles.paymentMethodsText}>Multiple payment methods available</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: LAYOUT.spacing.l,
    paddingVertical: LAYOUT.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.xl,
    color: COLORS.black,
  },
  itemCount: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.darkGray,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: LAYOUT.spacing.l,
  },
  cartItems: {
    marginBottom: LAYOUT.spacing.l,
  },
  cartSummary: {
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.large,
    padding: LAYOUT.spacing.l,
    marginBottom: LAYOUT.spacing.l,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.black,
    marginBottom: LAYOUT.spacing.m,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: LAYOUT.spacing.m,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.darkGray,
  },
  summaryValue: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
  },
  freeShippingNote: {
    backgroundColor: COLORS.primaryLight + '20',
    borderRadius: LAYOUT.borderRadius.medium,
    padding: LAYOUT.spacing.m,
    marginBottom: LAYOUT.spacing.m,
  },
  freeShippingText: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.primary,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: LAYOUT.spacing.m,
  },
  totalLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.black,
  },
  totalValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: LAYOUT.fontSize.xl,
    color: COLORS.primary,
  },
  checkoutContainer: {
    padding: LAYOUT.spacing.l,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  checkoutButton: {
    width: '100%',
    marginBottom: LAYOUT.spacing.m,
  },
  paymentMethodsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentMethodsText: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.darkGray,
    marginLeft: LAYOUT.spacing.xs,
  },
});
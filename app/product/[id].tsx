import { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { LAYOUT } from '@/constants/Layout';
import Button from '@/components/ui/Button';
import { ArrowLeft, Star, Minus, Plus, Heart, ShoppingCart } from 'lucide-react-native';
import { mockProducts } from '@/data/mockData';
import { useCart } from '../../context/CartContext';

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Find the product with the matching ID
  const product = mockProducts.find(p => p.id === id);
  
  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
        <Button 
          title="Go Back" 
          onPress={() => router.back()} 
          variant="primary"
          style={styles.backButton}
        />
      </SafeAreaView>
    );
  }
  
  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    router.push('/(tabs)/cart');
  };
  
  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.black} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Product Details</Text>
        
        <TouchableOpacity onPress={() => router.push('/(tabs)/cart')} style={styles.cartButton}>
          <ShoppingCart size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: product.image }} style={styles.productImage} />
        
        <View style={styles.productInfoContainer}>
          <View style={styles.nameAndFavorite}>
            <Text style={styles.productName}>{product.name}</Text>
            <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
              <Heart 
                size={24} 
                color={isFavorite ? COLORS.error : COLORS.darkGray} 
                fill={isFavorite ? COLORS.error : 'none'} 
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map(star => (
              <Star 
                key={star} 
                size={16} 
                color={COLORS.warning} 
                fill={star <= (product.rating ?? 0) ? COLORS.warning : 'none'} 
              />
            ))}
          </View>
          <Text style={styles.ratingText}>{(product.rating ?? 0).toFixed(1)} ({product.reviews} reviews)</Text>
          </View>
          
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.benefitsTitle}>Benefits</Text>
          <View style={styles.benefitsList}>
            {product.benefits?.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <View style={styles.benefitBullet} />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                style={[styles.quantityButton, quantity === 1 && styles.disabledButton]} 
                onPress={handleDecrement}
                disabled={quantity === 1}
              >
                <Minus size={20} color={quantity === 1 ? COLORS.mediumGray : COLORS.black} />
              </TouchableOpacity>
              
              <Text style={styles.quantityValue}>{quantity}</Text>
              
              <TouchableOpacity style={styles.quantityButton} onPress={handleIncrement}>
                <Plus size={20} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.addToCartContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${(product.price * quantity).toFixed(2)}</Text>
        </View>
        
        <Button
          title="Add to Cart"
          onPress={handleAddToCart}
          variant="primary"
          style={styles.addToCartButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  errorText: {
    fontFamily: 'Poppins-Medium',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.error,
    textAlign: 'center',
    marginTop: LAYOUT.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: LAYOUT.spacing.l,
    paddingVertical: LAYOUT.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.black,
  },
  backButton: {
    padding: LAYOUT.spacing.xs,
  },
  cartButton: {
    padding: LAYOUT.spacing.xs,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: LAYOUT.spacing.xxl,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  productInfoContainer: {
    padding: LAYOUT.spacing.l,
  },
  nameAndFavorite: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: LAYOUT.spacing.s,
  },
  productName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.xl,
    color: COLORS.black,
    flex: 1,
    marginRight: LAYOUT.spacing.m,
  },
  favoriteButton: {
    padding: LAYOUT.spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.m,
  },
  stars: {
    flexDirection: 'row',
    marginRight: LAYOUT.spacing.s,
  },
  ratingText: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.darkGray,
  },
  productPrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: LAYOUT.fontSize.xxl,
    color: COLORS.primary,
    marginBottom: LAYOUT.spacing.m,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: LAYOUT.spacing.l,
  },
  descriptionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.black,
    marginBottom: LAYOUT.spacing.m,
  },
  descriptionText: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
    lineHeight: 24,
  },
  benefitsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.black,
    marginBottom: LAYOUT.spacing.m,
  },
  benefitsList: {
    marginTop: LAYOUT.spacing.s,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: LAYOUT.spacing.m,
  },
  benefitBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginTop: 6,
    marginRight: LAYOUT.spacing.m,
  },
  benefitText: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
    flex: 1,
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: COLORS.lightGray + '80',
  },
  quantityValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.black,
    minWidth: 40,
    textAlign: 'center',
  },
  addToCartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: LAYOUT.spacing.l,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
  },
  totalContainer: {
    flex: 1,
    marginRight: LAYOUT.spacing.m,
  },
  totalLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.darkGray,
    marginBottom: LAYOUT.spacing.xs,
  },
  totalValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: LAYOUT.fontSize.xl,
    color: COLORS.primary,
  },
  addToCartButton: {
    flex: 1,
  },
});
import { StyleSheet, View, Text, Image, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { LAYOUT } from '@/constants/Layout';
import { ShoppingCart } from 'lucide-react-native';
import { Product } from '@/types/Product';
import { useCart } from '../../context/CartContext';
type ProductCardProps = {
  product: Product;
  style?: StyleProp<ViewStyle>;
};

export default function ProductCard({ product, style }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  
  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };
  
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        {product.popular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>Popular</Text>
          </View>
        )}
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddToCart}
          >
            <ShoppingCart size={16} color={COLORS.white} />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.large,
    overflow: 'hidden',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    height: 150,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  popularBadge: {
    position: 'absolute',
    top: LAYOUT.spacing.s,
    left: LAYOUT.spacing.s,
    backgroundColor: COLORS.accent,
    paddingHorizontal: LAYOUT.spacing.s,
    paddingVertical: LAYOUT.spacing.xs,
    borderRadius: LAYOUT.borderRadius.small,
  },
  popularText: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.xs,
    color: COLORS.white,
  },
  contentContainer: {
    padding: LAYOUT.spacing.m,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
    marginBottom: LAYOUT.spacing.xs,
  },
  price: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.primary,
    marginBottom: LAYOUT.spacing.m,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: LAYOUT.spacing.m,
    paddingVertical: LAYOUT.spacing.xs,
    borderRadius: LAYOUT.borderRadius.medium,
  },
  addButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.white,
    marginLeft: LAYOUT.spacing.xs,
  },
});
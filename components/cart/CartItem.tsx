import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/Colors';
import { LAYOUT } from '@/constants/Layout';
import { CartItem as CartItemType } from '@/types/Cart';
import { Minus, Plus, Trash2 } from 'lucide-react-native';

type CartItemProps = {
  item: CartItemType;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
};

export default function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const handleIncrement = () => {
    onUpdateQuantity(item.quantity + 1);
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.contentContainer}>
        <View style={styles.topContent}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
            <Trash2 size={16} color={COLORS.error} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={[styles.quantityButton, item.quantity === 1 && styles.disabledButton]} 
            onPress={handleDecrement}
            disabled={item.quantity === 1}
          >
            <Minus size={14} color={item.quantity === 1 ? COLORS.mediumGray : COLORS.black} />
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{item.quantity}</Text>
          
          <TouchableOpacity style={styles.quantityButton} onPress={handleIncrement}>
            <Plus size={14} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.large,
    padding: LAYOUT.spacing.m,
    marginBottom: LAYOUT.spacing.m,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: LAYOUT.borderRadius.medium,
    marginRight: LAYOUT.spacing.m,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: LAYOUT.spacing.xs,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
    flex: 1,
    marginRight: LAYOUT.spacing.s,
  },
  removeButton: {
    padding: LAYOUT.spacing.xs,
  },
  price: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.primary,
    marginBottom: LAYOUT.spacing.s,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: COLORS.lightGray,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: COLORS.lightGray + '80',
  },
  quantityText: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
    marginHorizontal: LAYOUT.spacing.m,
    minWidth: 20,
    textAlign: 'center',
  },
});
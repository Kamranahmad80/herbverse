import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/Colors';
import { LAYOUT } from '@/constants/Layout';
import { Order } from '@/types/Order';
import { ChevronRight } from 'lucide-react-native';

type OrderCardProps = {
  order: Order;
};

export default function OrderCard({ order }: OrderCardProps) {
  // Helper function to get the right badge style based on status
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Processing':
        return styles.processingBadge;
      case 'Shipped':
        return styles.shippedBadge;
      case 'Delivered':
        return styles.deliveredBadge;
      case 'Cancelled':
        return styles.cancelledBadge;
      default:
        return styles.processingBadge;
    }
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <View style={styles.header}>
        <View>
          <Text style={styles.orderIdLabel}>Order ID</Text>
          <Text style={styles.orderId}>#{order.id}</Text>
        </View>
        
        <View style={[styles.statusBadge, getStatusBadgeStyle(order.status)]}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date</Text>
          <Text style={styles.detailValue}>{order.date}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Items</Text>
          <Text style={styles.detailValue}>{order.items.length} items</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {order.status === 'Delivered' 
            ? 'Delivered on ' + order.deliveryDate
            : order.status === 'Shipped'
              ? 'Expected delivery on ' + order.deliveryDate
              : 'Processing your order'}
        </Text>
        <ChevronRight size={20} color={COLORS.primary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.m,
  },
  orderIdLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.darkGray,
    marginBottom: LAYOUT.spacing.xs,
  },
  orderId: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
  },
  statusBadge: {
    paddingHorizontal: LAYOUT.spacing.m,
    paddingVertical: LAYOUT.spacing.xs,
    borderRadius: LAYOUT.borderRadius.medium,
  },
  processingBadge: {
    backgroundColor: COLORS.warning + '20',
  },
  shippedBadge: {
    backgroundColor: COLORS.info + '20',
  },
  deliveredBadge: {
    backgroundColor: COLORS.success + '20',
  },
  cancelledBadge: {
    backgroundColor: COLORS.error + '20',
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.black,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginBottom: LAYOUT.spacing.m,
  },
  detailsContainer: {
    marginBottom: LAYOUT.spacing.m,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: LAYOUT.spacing.s,
  },
  detailLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.darkGray,
  },
  detailValue: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
  },
  totalValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: LAYOUT.spacing.m,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.darkGray,
  },
});
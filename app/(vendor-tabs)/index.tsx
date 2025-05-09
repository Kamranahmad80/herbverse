import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/Colors';
import { LAYOUT } from '@/constants/Layout';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import { 
  LineChart, 
  PlusCircle, 
  Package, 
  TrendingUp, 
  DollarSign,
  Users,
  ArrowUpRight,
  ShoppingBag
} from 'lucide-react-native';
import { mockOrders } from '@/data/mockData';

function VendorDashboardScreen() {
  const { user } = useAuth();
  
  // Calculate today's earnings from mock orders
  const todayEarnings = mockOrders
    .filter(order => {
      const orderDate = new Date(order.date);
      const today = new Date();
      return (
        orderDate.getDate() === today.getDate() &&
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear()
      );
    })
    .reduce((sum, order) => sum + order.total, 0);
  
  // Calculate pending orders
  const pendingOrders = mockOrders.filter(
    order => order.status === 'Processing' || order.status === 'Shipped'
  ).length;
  
  // Calculate completed orders
  const completedOrders = mockOrders.filter(
    order => order.status === 'Delivered'
  ).length;
  
  // Calculate total earnings
  const totalEarnings = mockOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <Text style={styles.vendorName}>{user?.name || 'Vendor'}</Text>
          </View>
          
          <TouchableOpacity style={styles.addProductButton}>
            <PlusCircle size={16} color={COLORS.white} />
            <Text style={styles.addProductText}>Add Product</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: COLORS.primary + '20' }]}>
              <DollarSign size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.statValue}>${todayEarnings.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Today's Earnings</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: COLORS.accent + '20' }]}>
              <Package size={20} color={COLORS.accent} />
            </View>
            <Text style={styles.statValue}>{pendingOrders}</Text>
            <Text style={styles.statLabel}>Pending Orders</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: COLORS.success + '20' }]}>
              <TrendingUp size={20} color={COLORS.success} />
            </View>
            <Text style={styles.statValue}>{completedOrders}</Text>
            <Text style={styles.statLabel}>Completed Orders</Text>
          </View>
        </View>
        
        <View style={styles.earningsCard}>
          <View style={styles.earningsHeader}>
            <Text style={styles.earningsTitle}>Total Earnings</Text>
            <TouchableOpacity style={styles.periodSelector}>
              <Text style={styles.periodText}>This Month</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.earningsAmount}>${totalEarnings.toFixed(2)}</Text>
          
          <View style={styles.earningsChart}>
            <LineChart width={280} height={80} color={COLORS.primary} strokeWidth={2} />
          </View>
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.recentOrdersContainer}>
          {mockOrders.slice(0, 3).map((order) => (
            <TouchableOpacity key={order.id} style={styles.orderCard}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderNumber}>Order #{order.id}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
                <View style={[styles.statusBadge, 
                  order.status === 'Delivered' 
                    ? styles.deliveredBadge 
                    : order.status === 'Shipped' 
                      ? styles.shippedBadge 
                      : styles.processingBadge
                ]}>
                  <Text style={styles.statusText}>{order.status}</Text>
                </View>
              </View>
              
              <View style={styles.orderDetails}>
                <Text style={styles.orderItems}>{order.items.length} items</Text>
                <Text style={styles.orderTotal}>${order.total.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.quickAccessContainer}>
          <Text style={styles.quickAccessTitle}>Quick Access</Text>
          
          <View style={styles.quickAccessGrid}>
            <TouchableOpacity style={styles.quickAccessCard}>
              <View style={[styles.quickAccessIcon, { backgroundColor: COLORS.primary + '20' }]}>
                <ShoppingBag size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.quickAccessText}>Add Product</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAccessCard}>
              <View style={[styles.quickAccessIcon, { backgroundColor: COLORS.accent + '20' }]}>
                <Package size={24} color={COLORS.accent} />
              </View>
              <Text style={styles.quickAccessText}>Manage Orders</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAccessCard}>
              <View style={[styles.quickAccessIcon, { backgroundColor: COLORS.secondary + '20' }]}>
                <Users size={24} color={COLORS.secondary} />
              </View>
              <Text style={styles.quickAccessText}>Customers</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAccessCard}>
              <View style={[styles.quickAccessIcon, { backgroundColor: '#5856D6' + '20' }]}>
                <ArrowUpRight size={24} color="#5856D6" />
              </View>
              <Text style={styles.quickAccessText}>Sales Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: LAYOUT.spacing.l,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.l,
  },
  welcomeText: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.darkGray,
  },
  vendorName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.xl,
    color: COLORS.black,
    marginTop: LAYOUT.spacing.xs,
  },
  addProductButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: LAYOUT.spacing.m,
    paddingVertical: LAYOUT.spacing.s,
    borderRadius: LAYOUT.borderRadius.medium,
  },
  addProductText: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.white,
    marginLeft: LAYOUT.spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: LAYOUT.spacing.l,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.large,
    padding: LAYOUT.spacing.m,
    marginHorizontal: LAYOUT.spacing.xs,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: LAYOUT.spacing.s,
  },
  statValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.black,
    marginBottom: LAYOUT.spacing.xs,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.xs,
    color: COLORS.darkGray,
    textAlign: 'center',
  },
  earningsCard: {
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
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.m,
  },
  earningsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.black,
  },
  periodSelector: {
    backgroundColor: COLORS.lightGray + '50',
    paddingHorizontal: LAYOUT.spacing.m,
    paddingVertical: LAYOUT.spacing.xs,
    borderRadius: LAYOUT.borderRadius.medium,
  },
  periodText: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.darkGray,
  },
  earningsAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: LAYOUT.fontSize.xxxl,
    color: COLORS.primary,
    marginBottom: LAYOUT.spacing.m,
  },
  earningsChart: {
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.m,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.black,
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.primary,
  },
  recentOrdersContainer: {
    marginBottom: LAYOUT.spacing.l,
  },
  orderCard: {
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.large,
    padding: LAYOUT.spacing.m,
    marginBottom: LAYOUT.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
    marginBottom: LAYOUT.spacing.xs,
  },
  orderDate: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.darkGray,
    marginBottom: LAYOUT.spacing.s,
  },
  statusBadge: {
    paddingHorizontal: LAYOUT.spacing.s,
    paddingVertical: LAYOUT.spacing.xs,
    borderRadius: LAYOUT.borderRadius.small,
    alignSelf: 'flex-start',
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
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.xs,
    color: COLORS.black,
  },
  orderDetails: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  orderItems: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.darkGray,
    marginBottom: LAYOUT.spacing.xs,
  },
  orderTotal: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.primary,
  },
  quickAccessContainer: {
    marginBottom: LAYOUT.spacing.xxl,
  },
  quickAccessTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.black,
    marginBottom: LAYOUT.spacing.m,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAccessCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.large,
    padding: LAYOUT.spacing.m,
    marginBottom: LAYOUT.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickAccessIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: LAYOUT.spacing.m,
  },
  quickAccessText: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
    textAlign: 'center',
  },
});

export default VendorDashboardScreen;
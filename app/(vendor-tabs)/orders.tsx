import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, Modal, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/Colors';
import { LAYOUT } from '@/constants/Layout';
import { Search, Filter, ChevronRight, X, Check, Truck, PackageCheck } from 'lucide-react-native';
import { mockOrders } from '@/data/mockData';
import { Order } from '@/types/Order';
import Button from '@/components/ui/Button';

function VendorOrdersScreen() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Processing' | 'Shipped' | 'Delivered'>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderDetailVisible, setOrderDetailVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Filter orders by search text and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchText.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchText.toLowerCase());
      
    const matchesStatus = 
      selectedStatus === 'All' || 
      order.status === selectedStatus;
      
    return matchesSearch && matchesStatus;
  });
  
  const updateOrderStatus = (orderId: string, newStatus: 'Processing' | 'Shipped' | 'Delivered') => {
    setLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId 
            ? {...order, status: newStatus} 
            : order
        )
      );
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({...selectedOrder, status: newStatus});
      }
      
      setLoading(false);
      Alert.alert('Success', `Order status updated to ${newStatus}`);
    }, 1000);
  };
  
  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setOrderDetailVisible(true);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orders</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={COLORS.darkGray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search orders or customers"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText ? (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <X size={16} color={COLORS.darkGray} />
            </TouchableOpacity>
          ) : null}
        </View>
        
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={COLORS.darkGray} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.statusTabs}>
        <TouchableOpacity 
          style={[styles.statusTab, selectedStatus === 'All' && styles.activeStatusTab]}
          onPress={() => setSelectedStatus('All')}
        >
          <Text style={[styles.statusTabText, selectedStatus === 'All' && styles.activeStatusTabText]}>All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.statusTab, selectedStatus === 'Processing' && styles.activeStatusTab]}
          onPress={() => setSelectedStatus('Processing')}
        >
          <Text style={[styles.statusTabText, selectedStatus === 'Processing' && styles.activeStatusTabText]}>Processing</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.statusTab, selectedStatus === 'Shipped' && styles.activeStatusTab]}
          onPress={() => setSelectedStatus('Shipped')}
        >
          <Text style={[styles.statusTabText, selectedStatus === 'Shipped' && styles.activeStatusTabText]}>Shipped</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.statusTab, selectedStatus === 'Delivered' && styles.activeStatusTab]}
          onPress={() => setSelectedStatus('Delivered')}
        >
          <Text style={[styles.statusTabText, selectedStatus === 'Delivered' && styles.activeStatusTabText]}>Delivered</Text>
        </TouchableOpacity>
      </View>
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
      
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.orderCard}
            onPress={() => viewOrderDetails(item)}
          >
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderId}>Order #{item.id}</Text>
                <Text style={styles.orderDate}>{item.date}</Text>
              </View>
              
              <View style={[styles.statusBadge, 
                item.status === 'Delivered' 
                  ? styles.deliveredBadge 
                  : item.status === 'Shipped' 
                    ? styles.shippedBadge 
                    : styles.processingBadge
              ]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
            
            <View style={styles.customerInfo}>
              <Text style={styles.infoLabel}>Customer:</Text>
              <Text style={styles.infoValue}>{item.customer.name}</Text>
            </View>
            
            <View style={styles.orderInfo}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Items:</Text>
                <Text style={styles.infoValue}>{item.items.length}</Text>
              </View>
              
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Total:</Text>
                <Text style={styles.totalValue}>${item.total.toFixed(2)}</Text>
              </View>
            </View>
            
            <View style={styles.orderFooter}>
              <TouchableOpacity style={styles.viewDetailsButton}>
                <Text style={styles.viewDetailsText}>View Details</Text>
                <ChevronRight size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.ordersList}
        showsVerticalScrollIndicator={false}
      />
      {/* Order Detail Modal */}
      <Modal
        visible={orderDetailVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Order Details</Text>
              <TouchableOpacity 
                onPress={() => setOrderDetailVisible(false)}
                style={styles.closeButton}
              >
                <X size={20} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            
            {selectedOrder && (
              <ScrollView style={styles.detailScrollView}>
                <View style={styles.orderDetailSection}>
                  <Text style={styles.detailSectionTitle}>Order Information</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Order ID:</Text>
                    <Text style={styles.detailValue}>#{selectedOrder.id}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Date:</Text>
                    <Text style={styles.detailValue}>{selectedOrder.date}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Status:</Text>
                    <View style={[styles.statusBadge, 
                      selectedOrder.status === 'Delivered' 
                        ? styles.deliveredBadge 
                        : selectedOrder.status === 'Shipped' 
                          ? styles.shippedBadge 
                          : styles.processingBadge
                    ]}>
                      <Text style={styles.statusText}>{selectedOrder.status}</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.orderDetailSection}>
                  <Text style={styles.detailSectionTitle}>Customer Information</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Name:</Text>
                    <Text style={styles.detailValue}>{selectedOrder.customer.name}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Email:</Text>
                    <Text style={styles.detailValue}>{selectedOrder.customer.email}</Text>
                  </View>
                </View>
                
                <View style={styles.orderDetailSection}>
                  <Text style={styles.detailSectionTitle}>Shipping Address</Text>
                  <Text style={styles.addressText}>
                    {selectedOrder.customer.address || '123 Main St, Apt 4B\nNew York, NY 10001'}
                  </Text>
                </View>
                
                <View style={styles.orderDetailSection}>
                  <Text style={styles.detailSectionTitle}>Order Items</Text>
                  {selectedOrder.items.map((item, index) => (
                    <View key={index} style={styles.orderItem}>
                      <View style={styles.orderItemImage} />
                      <View style={styles.orderItemDetails}>
                        <Text style={styles.orderItemName}>{item.name}</Text>
                        <Text style={styles.orderItemQuantity}>Qty: {item.quantity}</Text>
                        <Text style={styles.orderItemPrice}>${item.price.toFixed(2)}</Text>
                      </View>
                    </View>
                  ))}
                </View>
                
                <View style={styles.orderDetailSection}>
                  <Text style={styles.detailSectionTitle}>Order Summary</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Subtotal:</Text>
                    <Text style={styles.detailValue}>
                      ${selectedOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Shipping:</Text>
                    <Text style={styles.detailValue}>${(selectedOrder.total * 0.1).toFixed(2)}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Total:</Text>
                    <Text style={[styles.detailValue, styles.totalAmount]}>${selectedOrder.total.toFixed(2)}</Text>
                  </View>
                </View>
                
                <View style={styles.actionButtonsContainer}>
                  {selectedOrder.status === 'Processing' && (
                    <Button 
                      title="Mark as Shipped"
                      onPress={() => updateOrderStatus(selectedOrder.id, 'Shipped')}
                      variant="primary"
                      isLoading={loading}
                    />
                  )}
                  
                  {selectedOrder.status === 'Shipped' && (
                    <Button 
                      title="Mark as Delivered"
                      onPress={() => updateOrderStatus(selectedOrder.id, 'Delivered')}
                      variant="primary"
                      isLoading={loading}
                    />
                  )}
                  
                  {selectedOrder.status === 'Delivered' && (
                    <View style={styles.completedOrderMessage}>
                      <Check size={20} color={COLORS.success} />
                      <Text style={styles.completedOrderText}>Order completed successfully</Text>
                    </View>
                  )}
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default VendorOrdersScreen;

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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: LAYOUT.spacing.l,
    paddingVertical: LAYOUT.spacing.m,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.offWhite,
    borderRadius: LAYOUT.borderRadius.medium,
    paddingHorizontal: LAYOUT.spacing.m,
    paddingVertical: LAYOUT.spacing.s,
    marginRight: LAYOUT.spacing.m,
  },
  searchIcon: {
    marginRight: LAYOUT.spacing.s,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    zIndex: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: LAYOUT.spacing.l,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.large,
    padding: LAYOUT.spacing.l,
    width: '100%',
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.l,
  },
  modalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.black,
  },
  closeButton: {
    padding: LAYOUT.spacing.xs,
  },
  detailScrollView: {
    maxHeight: '80%',
  },
  orderDetailSection: {
    marginBottom: LAYOUT.spacing.l,
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.medium,
    padding: LAYOUT.spacing.m,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  detailSectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
    marginBottom: LAYOUT.spacing.m,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addressText: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.darkGray,
    lineHeight: 22,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: LAYOUT.spacing.m,
    paddingBottom: LAYOUT.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  orderItemImage: {
    width: 60,
    height: 60,
    borderRadius: LAYOUT.borderRadius.small,
    backgroundColor: COLORS.lightGray,
    marginRight: LAYOUT.spacing.m,
  },
  orderItemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  orderItemName: {
    fontFamily: 'Poppins-Medium',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
    marginBottom: LAYOUT.spacing.xs,
  },
  orderItemQuantity: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.darkGray,
  },
  orderItemPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.primary,
    marginTop: LAYOUT.spacing.xs,
  },
  totalAmount: {
    fontFamily: 'Poppins-Bold',
    color: COLORS.primary,
    fontSize: LAYOUT.fontSize.l,
  },
  actionButtonsContainer: {
    marginVertical: LAYOUT.spacing.l,
  },
  completedOrderMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.success + '20',
    padding: LAYOUT.spacing.m,
    borderRadius: LAYOUT.borderRadius.medium,
  },
  completedOrderText: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.success,
    marginLeft: LAYOUT.spacing.s,
  },
  filterButton: {
    backgroundColor: COLORS.offWhite,
    borderRadius: LAYOUT.borderRadius.medium,
    padding: LAYOUT.spacing.s,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  statusTabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingHorizontal: LAYOUT.spacing.l,
    paddingVertical: LAYOUT.spacing.m,
  },
  statusTab: {
    marginRight: LAYOUT.spacing.m,
    paddingVertical: LAYOUT.spacing.xs,
    paddingHorizontal: LAYOUT.spacing.m,
    borderRadius: LAYOUT.borderRadius.medium,
  },
  activeStatusTab: {
    backgroundColor: COLORS.primary,
  },
  statusTabText: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.darkGray,
  },
  activeStatusTabText: {
    color: COLORS.white,
  },
  ordersList: {
    padding: LAYOUT.spacing.l,
  },
  orderCard: {
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.large,
    padding: LAYOUT.spacing.l,
    marginBottom: LAYOUT.spacing.m,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: LAYOUT.spacing.m,
  },
  orderId: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
    marginBottom: LAYOUT.spacing.xs,
  },
  orderDate: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.darkGray,
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
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.black,
  },
  customerInfo: {
    flexDirection: 'row',
    marginBottom: LAYOUT.spacing.m,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: LAYOUT.spacing.m,
  },
  infoItem: {
    flexDirection: 'row',
  },
  infoLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.darkGray,
    marginRight: LAYOUT.spacing.xs,
  },
  infoValue: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
  },
  totalValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.primary,
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: LAYOUT.spacing.m,
    alignItems: 'flex-end',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetailsText: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.primary,
    marginRight: LAYOUT.spacing.xs,
  },
});
import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, Modal, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/Colors';
import { LAYOUT } from '@/constants/Layout';
import Button from '@/components/ui/Button';
import { PlusCircle, Search, Filter, Edit, Trash2, X } from 'lucide-react-native';
import { mockProducts } from '@/data/mockData';
import { Product } from '@/types/Product';

function VendorProductsScreen() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchText, setSearchText] = useState('');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  
  // New product form state
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: '',
    stock: 0,
    description: ''
  });
  
  // Filter products by search text
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchText.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchText.toLowerCase())
  );
  
  const handleAddProduct = () => {
    setLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      const productId = `${products.length + 1}`;
      const product: Product = {
        id: productId,
        name: newProduct.name || 'New Product',
        price: newProduct.price || 0,
        image: 'https://via.placeholder.com/150',
        category: newProduct.category || 'Other',
        description: newProduct.description || 'Product description',
        stock: newProduct.stock || 10,
        rating: 5.0,
        reviews: 0,
        popular: false
      };
      
      setProducts(prev => [...prev, product]);
      setNewProduct({
        name: '',
        price: 0,
        category: '',
        stock: 0,
        description: ''
      });
      setIsAddModalVisible(false);
      setLoading(false);
      Alert.alert('Success', 'Product added successfully!');
    }, 1000);
  };
  
  const handleEditProduct = () => {
    if (!selectedProduct) return;
    
    setLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      setProducts(prev => 
        prev.map(p => 
          p.id === selectedProduct.id 
            ? {...selectedProduct, ...newProduct} 
            : p
        )
      );
      setIsEditModalVisible(false);
      setSelectedProduct(null);
      setLoading(false);
      Alert.alert('Success', 'Product updated successfully!');
    }, 1000);
  };
  
  const handleDeleteProduct = (productId: string) => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setLoading(true);
            
            // Simulate network request
            setTimeout(() => {
              setProducts(prev => prev.filter(p => p.id !== productId));
              setLoading(false);
              Alert.alert('Success', 'Product deleted successfully!');
            }, 1000);
          }
        }
      ]
    );
  };
  
  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
      description: product.description
    });
    setIsEditModalVisible(true);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Products</Text>
        <Button
          title="Add Product"
          onPress={() => setIsAddModalVisible(true)}
          variant="primary"
          style={styles.addButton}
          size="small"
        />
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={COLORS.darkGray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products"
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
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
      
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <View style={styles.productInfo}>
              <View style={styles.imageContainer}>
                <View style={styles.productImage} />
                <Text style={styles.productCategory}>{item.category}</Text>
              </View>
              
              <View style={styles.productDetails}>
                <Text style={styles.productName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                <View style={styles.stockInfo}>
                  <View style={[
                    styles.stockIndicator, 
                    (item.stock || 0) > 10 ? styles.inStockIndicator : styles.lowStockIndicator
                  ]} />
                  <Text style={styles.stockText}>
                    {(item.stock || 0) > 10 ? 'In Stock' : 'Low Stock'} ({item.stock || 0})
                  </Text>
                </View>
              </View>
            </View>
            
            <View style={styles.productActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => openEditModal(item)}
              >
                <Edit size={18} color={COLORS.primary} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleDeleteProduct(item.id)}
              >
                <Trash2 size={18} color={COLORS.error} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.productsList}
        showsVerticalScrollIndicator={false}
      />
    
      {/* Add Product Modal */}
      <Modal
        visible={isAddModalVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Product</Text>
              <TouchableOpacity 
                onPress={() => setIsAddModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={20} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Product Name*</Text>
              <TextInput
                style={styles.input}
                value={newProduct.name as string}
                onChangeText={(text) => setNewProduct({...newProduct, name: text})}
                placeholder="Enter product name"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Price ($)*</Text>
              <TextInput
                style={styles.input}
                value={newProduct.price?.toString()}
                onChangeText={(text) => setNewProduct({...newProduct, price: parseFloat(text) || 0})}
                placeholder="Enter price"
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Category*</Text>
              <TextInput
                style={styles.input}
                value={newProduct.category as string}
                onChangeText={(text) => setNewProduct({...newProduct, category: text})}
                placeholder="Enter category"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Stock*</Text>
              <TextInput
                style={styles.input}
                value={newProduct.stock?.toString()}
                onChangeText={(text) => setNewProduct({...newProduct, stock: parseInt(text) || 0})}
                placeholder="Enter stock quantity"
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={newProduct.description as string}
                onChangeText={(text) => setNewProduct({...newProduct, description: text})}
                placeholder="Enter product description"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
            
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => setIsAddModalVisible(false)}
                variant="secondary"
              />
              <Button
                title={loading ? "Adding..." : "Add Product"}
                onPress={handleAddProduct}
                variant="primary"
                isLoading={loading}
                disabled={!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.stock}
              />
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Edit Product Modal */}
      <Modal
        visible={isEditModalVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Product</Text>
              <TouchableOpacity 
                onPress={() => setIsEditModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={20} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Product Name*</Text>
              <TextInput
                style={styles.input}
                value={newProduct.name as string}
                onChangeText={(text) => setNewProduct({...newProduct, name: text})}
                placeholder="Enter product name"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Price ($)*</Text>
              <TextInput
                style={styles.input}
                value={newProduct.price?.toString()}
                onChangeText={(text) => setNewProduct({...newProduct, price: parseFloat(text) || 0})}
                placeholder="Enter price"
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Category*</Text>
              <TextInput
                style={styles.input}
                value={newProduct.category as string}
                onChangeText={(text) => setNewProduct({...newProduct, category: text})}
                placeholder="Enter category"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Stock*</Text>
              <TextInput
                style={styles.input}
                value={newProduct.stock?.toString()}
                onChangeText={(text) => setNewProduct({...newProduct, stock: parseInt(text) || 0})}
                placeholder="Enter stock quantity"
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={newProduct.description as string}
                onChangeText={(text) => setNewProduct({...newProduct, description: text})}
                placeholder="Enter product description"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
            
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => setIsEditModalVisible(false)}
                variant="secondary"
              />
              <Button
                title={loading ? "Updating..." : "Update Product"}
                onPress={handleEditProduct}
                variant="primary"
                isLoading={loading}
                disabled={!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.stock}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default VendorProductsScreen;

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
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.xl,
    color: COLORS.black,
  },
  addButton: {
    paddingHorizontal: LAYOUT.spacing.m,
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
    maxHeight: '80%',
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
  formGroup: {
    marginBottom: LAYOUT.spacing.m,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.darkGray,
    marginBottom: LAYOUT.spacing.xs,
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: LAYOUT.borderRadius.medium,
    padding: LAYOUT.spacing.m,
  },
  textArea: {
    height: 100,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: LAYOUT.spacing.m,
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
  productsList: {
    padding: LAYOUT.spacing.l,
  },
  productCard: {
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
  productInfo: {
    flexDirection: 'row',
    marginBottom: LAYOUT.spacing.m,
  },
  imageContainer: {
    marginRight: LAYOUT.spacing.m,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: LAYOUT.borderRadius.medium,
    backgroundColor: COLORS.lightGray,
    marginBottom: LAYOUT.spacing.xs,
  },
  productCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.xs,
    color: COLORS.darkGray,
    textAlign: 'center',
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontFamily: 'Poppins-Medium',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
    marginBottom: LAYOUT.spacing.xs,
  },
  productPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.primary,
    marginBottom: LAYOUT.spacing.s,
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: LAYOUT.spacing.xs,
  },
  inStockIndicator: {
    backgroundColor: COLORS.success,
  },
  lowStockIndicator: {
    backgroundColor: COLORS.warning,
  },
  stockText: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.darkGray,
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: LAYOUT.spacing.m,
  },
  actionButton: {
    padding: LAYOUT.spacing.s,
    marginLeft: LAYOUT.spacing.m,
  },
});
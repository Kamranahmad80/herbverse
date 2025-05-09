import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/Colors';
import { LAYOUT } from '@/constants/Layout';
import { useRouter } from 'expo-router';
import ProductCard from '@/components/product/ProductCard';
import { mockProducts } from '@/data/mockData';
import { Product } from '@/types/Product';
export default function ProductList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      if (searchQuery.trim() === '') {
        setFilteredProducts(mockProducts);
      } else {
        const filtered = mockProducts.filter((product: Product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
      }
      setLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleProductPress = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize="none"
      />
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleProductPress(item.id)}>
              <ProductCard product={item} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.emptyText}>No products found.</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
    padding: LAYOUT.spacing.l,
  },
  searchInput: {
    height: 40,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    borderRadius: LAYOUT.borderRadius.medium,
    paddingHorizontal: 12,
    marginBottom: LAYOUT.spacing.m,
    fontSize: LAYOUT.fontSize.m,
  },
  loader: {
    marginTop: LAYOUT.spacing.xl,
  },
  listContent: {
    paddingBottom: LAYOUT.spacing.xl,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: LAYOUT.spacing.xl,
    color: COLORS.darkGray,
    fontSize: LAYOUT.fontSize.m,
  },
});

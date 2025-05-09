import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/Colors';
import { LAYOUT } from '@/constants/Layout';
import { useAuth } from '@/hooks/useAuth';
import ProductCard from '@/components/product/ProductCard';
import CategoryPill from '@/components/ui/CategoryPill';
import { Search, MapPin } from 'lucide-react-native';
import { mockProducts } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { router } from 'expo-router';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'teas', name: 'Teas' },
  { id: 'oils', name: 'Essential Oils' },
  { id: 'capsules', name: 'Capsules' },
  { id: 'skincare', name: 'Skincare' },
  { id: 'supplements', name: 'Supplements' },
];

function HomeScreen() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    let filtered = mockProducts;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
      );
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery]);

  const popularProducts = mockProducts.filter(product => product.popular);

  // Get the current time to display a greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {loading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          </View>
        )}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.userName}>{user?.name || 'Guest'}</Text>
          </View>
          <View style={styles.locationContainer}>
            <MapPin size={16} color={COLORS.primary} />
            <Text style={styles.location}>New York</Text>
          </View>
        </View>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={COLORS.darkGray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products"
            placeholderTextColor={COLORS.darkGray}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              setShowSearchResults(text.length > 0);
            }}
            onSubmitEditing={() => {
              if (searchQuery.length > 0) {
                setLoading(true);
                // Simulate search delay
                setTimeout(() => {
                  setLoading(false);
                  setShowSearchResults(true);
                }, 500);
              }
            }}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => {
                setSearchQuery('');
                setShowSearchResults(false);
              }}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.categoriesContainer}>
          {!showSearchResults && (
          <>
            {/* Categories */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesContainer}
              contentContainerStyle={styles.categoriesContent}
            >
              {categories.map((category) => (
                <CategoryPill
                  key={category.id}
                  title={category.name}
                  isSelected={category.id === selectedCategory}
                  onPress={() => {
                    setSelectedCategory(category.id);
                    setLoading(true);
                    // Simulate category filtering delay
                    setTimeout(() => setLoading(false), 300);
                  }}
                />
              ))}
            </ScrollView>
          </>
        )}        
        </View>
        
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Herbs</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.popularProductsContainer}
          >
            {popularProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                style={styles.popularProductCard}
              />
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Products</Text>
            {showSearchResults ? (
              <View style={styles.searchResultsContainer}>
                <Text style={styles.searchResultsTitle}>
                  Search Results for "{searchQuery}"
                </Text>
                <Text style={styles.searchResultsCount}>
                  {filteredProducts.length} products found
                </Text>
                
                <View style={styles.searchResultsGrid}>
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      style={styles.searchResultCard}
                    />
                  ))}
                </View>
              </View>
            ) : (
              <View style={styles.productsGrid}>
                {mockProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    style={styles.productCard}
                  />
                ))}
              </View>
            )}
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
  content: {
    paddingHorizontal: LAYOUT.spacing.l,
    paddingTop: LAYOUT.spacing.l,
    paddingBottom: LAYOUT.spacing.xxl,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: COLORS.white,
    padding: LAYOUT.spacing.l,
    borderRadius: LAYOUT.borderRadius.large,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  loadingText: {
    marginTop: LAYOUT.spacing.s,
    fontFamily: 'Inter-Medium',
    color: COLORS.darkGray,
  },
  clearButton: {
    padding: LAYOUT.spacing.xs,
  },
  clearButtonText: {
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.darkGray,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: LAYOUT.spacing.l,
  },
  greeting: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.darkGray,
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.xl,
    color: COLORS.black,
    marginTop: LAYOUT.spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray + '50',
    paddingHorizontal: LAYOUT.spacing.m,
    paddingVertical: LAYOUT.spacing.xs,
    borderRadius: LAYOUT.borderRadius.large,
  },
  location: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.darkGray,
    marginLeft: LAYOUT.spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.medium,
    paddingHorizontal: LAYOUT.spacing.m,
    paddingVertical: LAYOUT.spacing.m,
    marginBottom: LAYOUT.spacing.l,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
  categoriesContainer: {
    marginBottom: LAYOUT.spacing.l,
  },
  categoriesContent: {
    paddingRight: LAYOUT.spacing.l,
  },
  categoriesList: {
    paddingRight: LAYOUT.spacing.l,
  },
  sectionContainer: {
    marginBottom: LAYOUT.spacing.xl,
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
  resultsText: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.darkGray,
  },
  popularProductsList: {
    paddingRight: LAYOUT.spacing.l,
  },
  popularProductsContainer: {
    paddingRight: LAYOUT.spacing.l,
  },
  popularProductCard: {
    width: 180,
    marginRight: LAYOUT.spacing.m,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: LAYOUT.spacing.l,
  },
  searchResultsContainer: {
    marginTop: LAYOUT.spacing.m,
  },
  searchResultsTitle: {
    fontSize: LAYOUT.fontSize.l,
    fontFamily: 'Poppins-SemiBold',
    color: COLORS.black,
    marginBottom: LAYOUT.spacing.xs,
  },
  searchResultsCount: {
    fontSize: LAYOUT.fontSize.s,
    fontFamily: 'Inter-Regular',
    color: COLORS.darkGray,
    marginBottom: LAYOUT.spacing.l,
  },
  searchResultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  searchResultCard: {
    width: '48%',
    marginBottom: LAYOUT.spacing.l,
  },
});

export default HomeScreen;
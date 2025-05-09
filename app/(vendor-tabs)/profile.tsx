import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch, Alert, Modal, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { LAYOUT } from '@/constants/Layout';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import { 
  User, 
  Store, 
  CreditCard, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Bell,
  BarChart3
} from 'lucide-react-native';

function VendorProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);
  const [isStoreInfoVisible, setIsStoreInfoVisible] = useState(false);
  const [isSalesReportVisible, setIsSalesReportVisible] = useState(false);
  
  // Profile edit form state
  const [profileForm, setProfileForm] = useState({
    storeName: user?.name || 'Herb Store',
    email: user?.email || 'vendor@example.com',
    phone: '(123) 456-7890',
    address: '123 Market St, San Francisco, CA 94103'
  });
  
  // Store info state
  const [storeInfo, setStoreInfo] = useState({
    storeName: 'Herb Store',
    description: 'Premium organic herbs and natural wellness products',
    category: 'Health & Wellness',
    openingYear: '2020',
    website: 'www.herbstore.com'
  });
  
  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };
  
  const handleSaveProfile = () => {
    // Simulate saving profile
    setTimeout(() => {
      Alert.alert('Success', 'Profile updated successfully');
      setIsEditProfileVisible(false);
    }, 500);
  };
  
  const handleSaveStoreInfo = () => {
    // Simulate saving store info
    setTimeout(() => {
      Alert.alert('Success', 'Store information updated successfully');
      setIsStoreInfoVisible(false);
    }, 500);
  };
  
  const navigateToAppSettings = () => {
    router.push('/profile-pages/AppSettings');
  };
  
  const navigateToHelpCenter = () => {
    router.push('/profile-pages/HelpCenter');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vendor Profile</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.profileAvatarContainer}>
            <View style={styles.profileAvatar}>
              <Store size={32} color={COLORS.white} />
            </View>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || 'Vendor'}</Text>
            <Text style={styles.profileEmail}>{user?.email || 'vendor@example.com'}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setIsEditProfileVisible(true)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Store Management</Text>
          
          <View style={styles.menuCard}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => setIsStoreInfoVisible(true)}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuItemIcon, { backgroundColor: COLORS.primary + '20' }]}>
                  <Store size={20} color={COLORS.primary} />
                </View>
                <Text style={styles.menuItemText}>Store Information</Text>
              </View>
              <ChevronRight size={20} color={COLORS.darkGray} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => setIsSalesReportVisible(true)}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuItemIcon, { backgroundColor: COLORS.secondary + '20' }]}>
                  <BarChart3 size={20} color={COLORS.secondary} />
                </View>
                <Text style={styles.menuItemText}>Sales Reports</Text>
              </View>
              <ChevronRight size={20} color={COLORS.darkGray} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuItemIcon, { backgroundColor: COLORS.accent + '20' }]}>
                  <CreditCard size={20} color={COLORS.accent} />
                </View>
                <Text style={styles.menuItemText}>Payment Settings</Text>
              </View>
              <ChevronRight size={20} color={COLORS.darkGray} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.menuCard}>
            <View style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuItemIcon, { backgroundColor: '#FF9500' + '20' }]}>
                  <Bell size={20} color="#FF9500" />
                </View>
                <Text style={styles.menuItemText}>Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={(value) => {
                  setNotificationsEnabled(value);
                  Alert.alert(
                    'Notifications',
                    value ? 'Notifications enabled' : 'Notifications disabled'
                  );
                }}
                thumbColor={COLORS.white}
                trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
              />
            </View>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={navigateToAppSettings}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuItemIcon, { backgroundColor: '#5856D6' + '20' }]}>
                  <Settings size={20} color="#5856D6" />
                </View>
                <Text style={styles.menuItemText}>App Settings</Text>
              </View>
              <ChevronRight size={20} color={COLORS.darkGray} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help & Support</Text>
          
          <View style={styles.menuCard}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={navigateToHelpCenter}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuItemIcon, { backgroundColor: '#34C759' + '20' }]}>
                  <HelpCircle size={20} color="#34C759" />
                </View>
                <Text style={styles.menuItemText}>Vendor Support</Text>
              </View>
              <ChevronRight size={20} color={COLORS.darkGray} />
            </TouchableOpacity>
          </View>
        </View>
        
        <Button
          title={user ? 'Log Out' : 'Log In'}
          onPress={user ? handleLogout : handleLogin}
          variant="outline"
          style={styles.logoutButton}
        />
      </ScrollView>
      
      {/* Edit Profile Modal */}
      <Modal
        visible={isEditProfileVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Store Name</Text>
              <TextInput
                style={styles.input}
                value={profileForm.storeName}
                onChangeText={(text) => setProfileForm({...profileForm, storeName: text})}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={profileForm.email}
                onChangeText={(text) => setProfileForm({...profileForm, email: text})}
                keyboardType="email-address"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                value={profileForm.phone}
                onChangeText={(text) => setProfileForm({...profileForm, phone: text})}
                keyboardType="phone-pad"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={profileForm.address}
                onChangeText={(text) => setProfileForm({...profileForm, address: text})}
                multiline
                numberOfLines={3}
              />
            </View>
            
            <View style={styles.modalButtonRow}>
              <Button 
                title="Cancel" 
                onPress={() => setIsEditProfileVisible(false)}
                variant="secondary"
                style={{flex: 1, marginRight: 8}}
              />
              <Button 
                title="Save" 
                onPress={handleSaveProfile}
                variant="primary"
                style={{flex: 1, marginLeft: 8}}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Store Information Modal */}
      <Modal
        visible={isStoreInfoVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Store Information</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Store Name</Text>
              <TextInput
                style={styles.input}
                value={storeInfo.storeName}
                onChangeText={(text) => setStoreInfo({...storeInfo, storeName: text})}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={storeInfo.description}
                onChangeText={(text) => setStoreInfo({...storeInfo, description: text})}
                multiline
                numberOfLines={3}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Category</Text>
              <TextInput
                style={styles.input}
                value={storeInfo.category}
                onChangeText={(text) => setStoreInfo({...storeInfo, category: text})}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Year Started</Text>
              <TextInput
                style={styles.input}
                value={storeInfo.openingYear}
                onChangeText={(text) => setStoreInfo({...storeInfo, openingYear: text})}
                keyboardType="number-pad"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Website</Text>
              <TextInput
                style={styles.input}
                value={storeInfo.website}
                onChangeText={(text) => setStoreInfo({...storeInfo, website: text})}
                keyboardType="url"
              />
            </View>
            
            <View style={styles.modalButtonRow}>
              <Button 
                title="Cancel" 
                onPress={() => setIsStoreInfoVisible(false)}
                variant="secondary"
                style={{flex: 1, marginRight: 8}}
              />
              <Button 
                title="Save" 
                onPress={handleSaveStoreInfo}
                variant="primary"
                style={{flex: 1, marginLeft: 8}}
              />
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Sales Reports Modal */}
      <Modal
        visible={isSalesReportVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sales Reports</Text>
            
            <View style={styles.salesContainer}>
              <View style={styles.salesHeader}>
                <Text style={styles.salesHeaderTitle}>Monthly Sales (2025)</Text>
              </View>
              
              <View style={styles.salesChart}>
                {/* Placeholder for chart */}
                <View style={styles.chartPlaceholder}>
                  <View style={[styles.chartBar, { height: 100 }]} />
                  <View style={[styles.chartBar, { height: 80 }]} />
                  <View style={[styles.chartBar, { height: 120 }]} />
                  <View style={[styles.chartBar, { height: 140 }]} />
                  <View style={[styles.chartBar, { height: 90 }]} />
                </View>
                
                <View style={styles.chartLabels}>
                  <Text style={styles.chartLabel}>Jan</Text>
                  <Text style={styles.chartLabel}>Feb</Text>
                  <Text style={styles.chartLabel}>Mar</Text>
                  <Text style={styles.chartLabel}>Apr</Text>
                  <Text style={styles.chartLabel}>May</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.salesSummary}>
              <View style={styles.salesMetric}>
                <Text style={styles.salesMetricLabel}>Total Sales</Text>
                <Text style={styles.salesMetricValue}>$24,500</Text>
              </View>
              
              <View style={styles.salesMetric}>
                <Text style={styles.salesMetricLabel}>Products Sold</Text>
                <Text style={styles.salesMetricValue}>342</Text>
              </View>
              
              <View style={styles.salesMetric}>
                <Text style={styles.salesMetricLabel}>Avg. Order Value</Text>
                <Text style={styles.salesMetricValue}>$71.64</Text>
              </View>
            </View>
            
            <Button 
              title="Close" 
              onPress={() => setIsSalesReportVisible(false)}
              variant="primary"
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: LAYOUT.spacing.l,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  profileAvatarContainer: {
    marginRight: LAYOUT.spacing.m,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.black,
    marginBottom: LAYOUT.spacing.xs,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.darkGray,
  },
  editButton: {
    paddingHorizontal: LAYOUT.spacing.m,
    paddingVertical: LAYOUT.spacing.xs,
    borderRadius: LAYOUT.borderRadius.medium,
    backgroundColor: COLORS.lightGray,
  },
  editButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.s,
    color: COLORS.darkGray,
  },
  section: {
    marginBottom: LAYOUT.spacing.l,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.darkGray,
    marginBottom: LAYOUT.spacing.m,
    marginLeft: LAYOUT.spacing.xs,
  },
  menuCard: {
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.large,
    overflow: 'hidden',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: LAYOUT.spacing.l,
    paddingVertical: LAYOUT.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: LAYOUT.spacing.m,
  },
  menuItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
  },
  logoutButton: {
    marginVertical: LAYOUT.spacing.xxl,
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
  modalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.black,
    marginBottom: LAYOUT.spacing.l,
    textAlign: 'center',
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
    minHeight: 80,
    textAlignVertical: 'top',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: LAYOUT.spacing.l,
  },
  salesContainer: {
    backgroundColor: COLORS.offWhite,
    borderRadius: LAYOUT.borderRadius.medium,
    padding: LAYOUT.spacing.m,
    marginBottom: LAYOUT.spacing.l,
  },
  salesHeader: {
    marginBottom: LAYOUT.spacing.m,
  },
  salesHeaderTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.black,
  },
  salesChart: {
    height: 180,
  },
  chartPlaceholder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    paddingBottom: LAYOUT.spacing.s,
  },
  chartBar: {
    width: 30,
    backgroundColor: COLORS.primary,
    borderRadius: LAYOUT.borderRadius.small,
    marginHorizontal: LAYOUT.spacing.s,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: LAYOUT.spacing.s,
  },
  chartLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.xs,
    color: COLORS.darkGray,
    width: 48,
    textAlign: 'center',
  },
  salesSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: LAYOUT.spacing.l,
  },
  salesMetric: {
    backgroundColor: COLORS.white,
    padding: LAYOUT.spacing.m,
    borderRadius: LAYOUT.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: LAYOUT.spacing.xs,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  salesMetricLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.xs,
    color: COLORS.darkGray,
    marginBottom: LAYOUT.spacing.xs,
  },
  salesMetricValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.primary,
  },
});

export default VendorProfileScreen;
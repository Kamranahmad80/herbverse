import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { LAYOUT } from '@/constants/Layout';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import {
  User,
  MapPin,
  CreditCard,
  Settings,
  HelpCircle,
  ChevronRight,
  Bell,
} from 'lucide-react-native';

function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const navigateTo = (path: string) => {
    router.push(path as any);
  };

  const profileImageUri = user?.photoURL || null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.profileAvatarContainer}>
            <View style={styles.profileAvatar}>
              {profileImageUri ? (
                <Image source={{ uri: profileImageUri }} style={styles.avatarImage} />
              ) : (
                <User size={32} color={COLORS.white} />
              )}
            </View>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || 'Guest'}</Text>
            <Text style={styles.profileEmail}>{user?.email || 'guest@example.com'}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.menuCard}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigateTo('/profile-pages/EditProfile')}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuItemIcon, { backgroundColor: COLORS.primary + '20' }]}>
                  <User size={20} color={COLORS.primary} />
                </View>
                <Text style={styles.menuItemText}>Personal Information</Text>
              </View>
              <ChevronRight size={20} color={COLORS.darkGray} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigateTo('/profile-pages/ShippingAddresses')}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuItemIcon, { backgroundColor: COLORS.secondary + '20' }]}>
                  <MapPin size={20} color={COLORS.secondary} />
                </View>
                <Text style={styles.menuItemText}>Shipping Addresses</Text>
              </View>
              <ChevronRight size={20} color={COLORS.darkGray} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigateTo('/profile-pages/PaymentMethods')}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuItemIcon, { backgroundColor: COLORS.accent + '20' }]}>
                  <CreditCard size={20} color={COLORS.accent} />
                </View>
                <Text style={styles.menuItemText}>Payment Methods</Text>
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
                onValueChange={handleToggleNotifications}
                thumbColor={COLORS.white}
                trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
              />
            </View>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigateTo('/profile-pages/AppSettings')}
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
              onPress={() => navigateTo('/profile-pages/HelpCenter')}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuItemIcon, { backgroundColor: '#34C759' + '20' }]}>
                  <HelpCircle size={20} color="#34C759" />
                </View>
                <Text style={styles.menuItemText}>Help Center</Text>
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
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
    marginTop: LAYOUT.spacing.m,
    marginBottom: LAYOUT.spacing.xxl,
  },
});

export default ProfileScreen;

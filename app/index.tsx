import { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { COLORS } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/ui/Button';
import { Leaf } from 'lucide-react-native';

export default function SplashScreen() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      // Wait a bit to show the splash screen
      const timeout = setTimeout(() => {
        if (user) {
          if (user.role === 'vendor') {
            router.replace('/(vendor-tabs)');
          } else {
            router.replace('/(tabs)');
          }
        }
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [user, isLoading]);

  return (
    <LinearGradient
      colors={[COLORS.backgroundLight, COLORS.backgroundDark]}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Leaf size={48} color={COLORS.white} />
        <Text style={styles.appName}>HerbVerse</Text>
        <Text style={styles.tagline}>Nature's Wellness, Delivered</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title="Sign In" 
          onPress={() => router.push('/(auth)/login')} 
          style={styles.button}
          variant="primary"
        />
        <Button 
          title="Create Account" 
          onPress={() => router.push('/(auth)/register')} 
          style={styles.button}
          variant="secondary"
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  appName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
    color: COLORS.white,
    marginTop: 16,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.white,
    marginTop: 8,
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 50,
    gap: 16,
  },
  button: {
    width: '100%',
  },
});
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { COLORS } from '@/constants/Colors';
import { LAYOUT } from '@/constants/Layout';
import Button from '@/components/ui/Button';
import { Leaf, ArrowLeft } from 'lucide-react-native';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'vendor'>('customer');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    // Trim inputs
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Optional: Password strength validation (at least 6 chars)
    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }

    try {
      setError(null);
      setIsLoading(true);

      const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      const user = userCredential.user;

      // Store additional user info in Firestore with Firestore Timestamp
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: trimmedName,
        email: trimmedEmail,
        role,
        createdAt: new Date() // Firestore Timestamp will convert this automatically
      });

      // Optional: Navigate to home or welcome screen after registration
      router.replace('/');

    } catch (err: any) {
      console.error('Registration error:', err);
      // Handle Firebase auth error codes for better messages
      let errorMessage = 'Registration failed. Please try again.';
      if (err.code) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'This email is already in use.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password is too weak.';
            break;
          default:
            errorMessage = err.message || errorMessage;
        }
      } else if (typeof err.message === 'string') {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={COLORS.black} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Leaf size={32} color={COLORS.primary} />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the HerbVerse community</Text>
        </View>

        <View style={styles.form}>
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              secureTextEntry
            />
          </View>

          <View style={styles.roleContainer}>
            <Text style={styles.label}>I am a:</Text>
            <View style={styles.roleOptions}>
              <TouchableOpacity
                style={[styles.roleOption, role === 'customer' && styles.roleOptionActive]}
                onPress={() => setRole('customer')}
                accessibilityRole="button"
                accessibilityState={{ selected: role === 'customer' }}
                accessibilityLabel="Select Customer Role"
              >
                <Text style={[styles.roleText, role === 'customer' && styles.roleTextActive]}>Customer</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.roleOption, role === 'vendor' && styles.roleOptionActive]}
                onPress={() => setRole('vendor')}
                accessibilityRole="button"
                accessibilityState={{ selected: role === 'vendor' }}
                accessibilityLabel="Select Vendor Role"
              >
                <Text style={[styles.roleText, role === 'vendor' && styles.roleTextActive]}>Vendor</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Button
            title="Create Account"
            onPress={handleRegister}
            isLoading={isLoading}
            variant="primary"
            style={styles.button}
            disabled={isLoading || !name.trim() || !email.trim() || !password || !confirmPassword || password !== confirmPassword}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: LAYOUT.spacing.l,
  },
  backButton: {
    marginTop: LAYOUT.spacing.l,
    marginBottom: LAYOUT.spacing.l,
  },
  header: {
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.xl,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: LAYOUT.fontSize.xxxl,
    color: COLORS.black,
    marginTop: LAYOUT.spacing.m,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.darkGray,
    marginTop: LAYOUT.spacing.xs,
  },
  form: {
    width: '100%',
  },
  errorContainer: {
    backgroundColor: COLORS.error + '20',
    padding: LAYOUT.spacing.m,
    borderRadius: LAYOUT.borderRadius.medium,
    marginBottom: LAYOUT.spacing.m,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.error,
  },
  inputContainer: {
    marginBottom: LAYOUT.spacing.l,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.darkGray,
    marginBottom: LAYOUT.spacing.xs,
  },
  input: {
    backgroundColor: COLORS.offWhite,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: LAYOUT.borderRadius.medium,
    padding: LAYOUT.spacing.m,
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.black,
  },
  button: {
    marginTop: LAYOUT.spacing.m,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: LAYOUT.spacing.xl,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.darkGray,
  },
  footerLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.primary,
    marginLeft: LAYOUT.spacing.xs,
  },

  // Missing styles added for role selection
  roleContainer: {
    marginBottom: LAYOUT.spacing.l,
  },
  roleOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  roleOption: {
    paddingVertical: LAYOUT.spacing.s,
    paddingHorizontal: LAYOUT.spacing.m,
    borderRadius: LAYOUT.borderRadius.medium,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  roleOptionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  roleText: {
    fontFamily: 'Inter-Regular',
    fontSize: LAYOUT.fontSize.l,
    color: COLORS.black,
  },
  roleTextActive: {
    color: COLORS.white,
  },
});

export default RegisterScreen;

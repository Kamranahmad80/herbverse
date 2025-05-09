import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { LAYOUT } from '@/constants/Layout';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import { Leaf, ArrowLeft } from 'lucide-react-native';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError(null);
      await login(email.trim(), password);
      setSuccess('Login successful!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={COLORS.black} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Leaf size={32} color={COLORS.primary} />
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue to HerbVerse</Text>
        </View>

        <View style={styles.form}>
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          {success && (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>{success}</Text>
            </View>
          )}

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
              placeholder="Enter your password"
              secureTextEntry
            />
          </View>

          <Button
            title="Sign In"
            onPress={handleLogin}
            isLoading={isLoading}
            variant="primary"
            style={styles.button}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/register')}>
              <Text style={styles.footerLink}>Sign Up</Text>
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
  successContainer: {
    backgroundColor: COLORS.success + '20',
    padding: LAYOUT.spacing.m,
    borderRadius: LAYOUT.borderRadius.medium,
    marginBottom: LAYOUT.spacing.m,
  },
  successText: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.success,
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
});

export default LoginScreen;

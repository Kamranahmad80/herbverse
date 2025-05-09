import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/Colors';
import { LAYOUT } from '@/constants/Layout';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const faqs = [
  {
    question: 'How to reset my password?',
    answer: 'Go to the login screen and tap on "Forgot Password" to reset your password.',
  },
  {
    question: 'How to contact support?',
    answer: 'You can contact support via email or phone listed below.',
  },
  {
    question: 'How to update my profile information?',
    answer: 'Go to the Profile page and tap on Edit to update your information.',
  },
];

export default function HelpCenter() {
  const navigation = useNavigation();
  
  const handleGoBack = () => {
    navigation.goBack();
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Help Center</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        ))}
        <View style={styles.contact}>
          <Text style={styles.contactTitle}>Contact Support</Text>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:support@herbverse.com')}>
            <Text style={styles.contactLink}>support@herbverse.com</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('tel:+1234567890')}>
            <Text style={styles.contactLink}>+1 (234) 567-890</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: LAYOUT.spacing.l,
    paddingTop: LAYOUT.spacing.l,
    paddingBottom: LAYOUT.spacing.m,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  backButton: {
    marginRight: LAYOUT.spacing.m,
  },
  content: {
    padding: LAYOUT.spacing.l,
  },
  title: {
    fontSize: LAYOUT.fontSize.xl,
    fontWeight: '600',
    color: COLORS.black,
  },
  faqItem: {
    marginBottom: LAYOUT.spacing.m,
    backgroundColor: COLORS.white,
    padding: LAYOUT.spacing.m,
    borderRadius: LAYOUT.borderRadius.medium,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  question: {
    fontSize: LAYOUT.fontSize.m,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: LAYOUT.spacing.s,
  },
  answer: {
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.darkGray,
  },
  contact: {
    marginTop: LAYOUT.spacing.l,
    backgroundColor: COLORS.white,
    padding: LAYOUT.spacing.m,
    borderRadius: LAYOUT.borderRadius.medium,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contactTitle: {
    fontSize: LAYOUT.fontSize.m,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: LAYOUT.spacing.m,
  },
  contactLink: {
    fontSize: LAYOUT.fontSize.m,
    color: COLORS.primary,
    marginBottom: LAYOUT.spacing.m,
  },
});

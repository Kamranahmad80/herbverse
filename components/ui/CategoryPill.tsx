import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { COLORS } from '@/constants/Colors';
import { LAYOUT } from '@/constants/Layout';

type CategoryPillProps = {
  title: string;
  isSelected: boolean;
  onPress: () => void;
};

export default function CategoryPill({ title, isSelected, onPress }: CategoryPillProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected ? styles.selectedContainer : styles.unselectedContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.text,
        isSelected ? styles.selectedText : styles.unselectedText,
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: LAYOUT.spacing.m,
    paddingVertical: LAYOUT.spacing.s,
    borderRadius: LAYOUT.borderRadius.large,
    marginRight: LAYOUT.spacing.m,
  },
  selectedContainer: {
    backgroundColor: COLORS.primary,
  },
  unselectedContainer: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  text: {
    fontFamily: 'Inter-Medium',
    fontSize: LAYOUT.fontSize.s,
  },
  selectedText: {
    color: COLORS.white,
  },
  unselectedText: {
    color: COLORS.darkGray,
  },
});
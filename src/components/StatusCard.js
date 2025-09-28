import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const StatusCard = ({ title, value, icon }) => {
  const { isDarkMode, colors } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;

  return (
    <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeColors.text }]}>{title}</Text>
        {icon}
      </View>
      <Text style={[styles.value, { color: themeColors.primary }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%', // Mesma largura dos botões de ações rápidas
    borderRadius: 12,
    padding: 20, // Mesmo padding dos botões de ações rápidas
    marginBottom: 12, // Mesma margem inferior dos botões
    borderWidth: 1,
    minHeight: 100,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default StatusCard;
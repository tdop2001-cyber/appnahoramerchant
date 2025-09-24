import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const StatusCard = ({ title, value, status, icon }) => {
  const { isDarkMode, colors } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return { bg: 'rgba(30, 203, 79, 0.2)', text: '#1ecb4f' };
      case 'busy':
        return { bg: 'rgba(255, 69, 0, 0.2)', text: '#FF4500' };
      case 'offline':
        return { bg: 'rgba(153, 153, 153, 0.2)', text: '#999999' };
      default:
        return { bg: 'rgba(255, 115, 0, 0.2)', text: '#FF7300' };
    }
  };

  const statusColors = getStatusColor(status);

  return (
    <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeColors.text }]}>{title}</Text>
        {icon}
      </View>
      <Text style={[styles.value, { color: themeColors.primary }]}>{value}</Text>
      <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
        <Text style={[styles.statusText, { color: statusColors.text }]}>
          {status === 'available' ? 'Disponível' : 
           status === 'busy' ? 'Ocupado' : 
           status === 'offline' ? 'Offline' : 'Indisponível'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 4,
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
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default StatusCard;
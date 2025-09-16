import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { createDynamicStyles } from '../styles/dynamicStyles';

const StatusCard = ({ 
  children, 
  status = 'info', 
  title, 
  subtitle,
  style = {} 
}) => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);

  const getStatusBarStyle = () => {
    switch (status) {
      case 'pending':
        return styles.cardStatusBarPending;
      case 'accepted':
        return styles.cardStatusBarAccepted;
      case 'picked':
        return styles.cardStatusBarPicked;
      case 'delivered':
        return styles.cardStatusBarDelivered;
      case 'operational':
        return styles.cardStatusBarOperational;
      case 'warning':
        return styles.cardStatusBarWarning;
      case 'error':
        return styles.cardStatusBarError;
      case 'info':
      default:
        return styles.cardStatusBarInfo;
    }
  };

  return (
    <View style={[styles.cardWithStatus, style]}>
      {/* Barra lateral colorida */}
      <View style={[styles.cardStatusBar, getStatusBarStyle()]} />
      
      {/* Conteúdo do card */}
      {title && (
        <Text style={styles.cardTitle}>{title}</Text>
      )}
      {subtitle && (
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
      )}
      {children}
    </View>
  );
};

export default StatusCard;

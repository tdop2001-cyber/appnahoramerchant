import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const TabBarIcon = ({ route, focused, size = 24 }) => {
  const { isDarkMode, colors } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;
  
  const iconColor = focused ? themeColors.tabBarActive : themeColors.tabBarInactive;

  const getIcon = () => {
    switch (route.name) {
      case 'Início':
        return '🏠';
      case 'Entregas':
        return '📦';
      case 'Produtos':
        return '🍽️';
      case 'Configurações':
        return '⚙️';
      default:
        return '❓';
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: size, color: iconColor }}>
        {getIcon()}
      </Text>
    </View>
  );
};

export default TabBarIcon;
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import SvgIcon from './SvgIcon';

const TabBarIcon = ({ route, focused, size = 24 }) => {
  const { isDarkMode, colors } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;

  const iconColor = focused ? themeColors.tabBarActive : themeColors.tabBarInactive;

  const getIcon = () => {
    switch (route.name) {
      case 'Início':
        return 'home';
      case 'Entregas':
        return 'box';
      case 'Produtos':
        return 'restaurant';
      case 'Configurações':
        return 'settings';
      default:
        return 'question';
    }
  };

  const iconName = getIcon();

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <SvgIcon name={iconName} size={size} color={iconColor} />
    </View>
  );
};

export default TabBarIcon;
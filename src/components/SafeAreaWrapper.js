import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const SafeAreaWrapper = ({ children, style }) => {
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaView style={[{ 
      flex: 1, 
      backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f5',
      paddingTop: 20 // Adiciona margem superior extra
    }, style]}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={isDarkMode ? '#0a0a0a' : '#f5f5f5'}
      />
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;
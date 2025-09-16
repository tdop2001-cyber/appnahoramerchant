import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { createDynamicStyles } from '../styles/dynamicStyles';

const SafeAreaWrapper = ({ children, style, edges = ['top', 'left', 'right'] }) => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);
  
  return (
    <SafeAreaView 
      style={[styles.container, style]} 
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;

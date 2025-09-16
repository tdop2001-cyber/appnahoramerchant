import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Padrão: modo escuro

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      // Cores do modo escuro
      dark: {
        background: '#1a1a1a',
        surface: '#2a2a2a',
        card: '#333333',
        text: '#ffffff',
        textSecondary: '#cccccc',
        primary: '#FF6B35',
        primaryText: '#ffffff',
        secondary: '#555555',
        secondaryText: '#cccccc',
        border: '#444444',
        success: '#1ecb4f',
        error: '#FF4500',
        warning: '#FFD700',
        tabBarActive: '#FF6B35',
        tabBarInactive: '#666666',
        tabBarBackground: '#1a1a1a',
      },
      // Cores do modo claro
      light: {
        background: '#f5f5f5',
        surface: '#ffffff',
        card: '#ffffff',
        text: '#333333',
        textSecondary: '#666666',
        primary: '#FF6B35',
        primaryText: '#ffffff',
        secondary: '#e0e0e0',
        secondaryText: '#666666',
        border: '#e0e0e0',
        success: '#1ecb4f',
        error: '#FF4500',
        warning: '#FFD700',
        tabBarActive: '#FF6B35',
        tabBarInactive: '#999999',
        tabBarBackground: '#ffffff',
      }
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

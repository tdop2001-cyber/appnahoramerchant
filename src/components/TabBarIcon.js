import React from 'react';
import { Text } from 'react-native';

const TabBarIcon = ({ route, focused, color, size }) => {
  let emoji = '';

  switch (route.name) {
    case 'Início':
      emoji = '🏠';
      break;
    case 'Entregas':
      emoji = '📦';
      break;
    case 'Produtos':
      emoji = '🍽️';
      break;
    case 'Configurações':
      emoji = '⚙️';
      break;
    default:
      emoji = '❓';
  }

  return (
    <Text style={{ fontSize: size, color: color }}>
      {emoji}
    </Text>
  );
};

export default TabBarIcon;

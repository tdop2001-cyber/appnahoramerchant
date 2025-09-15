import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import EntregasScreen from './src/screens/EntregasScreen';
import ProdutosScreen from './src/screens/ProdutosScreen';
import ConfiguracoesScreen from './src/screens/ConfiguracoesScreen';
import CriarProdutoScreen from './src/screens/CriarProdutoScreen';
import EditarProdutoScreen from './src/screens/EditarProdutoScreen';
import NovaEntregaScreen from './src/screens/NovaEntregaScreen';
import CategoriasScreen from './src/screens/CategoriasScreen';
import NovaCategoriaScreen from './src/screens/NovaCategoriaScreen';
import EditarCategoriaScreen from './src/screens/EditarCategoriaScreen';
import EntregaDetalhesScreen from './src/screens/EntregaDetalhesScreen';

// Import components
import TabBarIcon from './src/components/TabBarIcon';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ProdutosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProdutosList" component={ProdutosScreen} />
      <Stack.Screen name="CriarProduto" component={CriarProdutoScreen} />
      <Stack.Screen name="EditarProduto" component={EditarProdutoScreen} />
      <Stack.Screen name="Categorias" component={CategoriasScreen} />
      <Stack.Screen name="NovaCategoria" component={NovaCategoriaScreen} />
      <Stack.Screen name="EditarCategoria" component={EditarCategoriaScreen} />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeList" component={HomeScreen} />
      <Stack.Screen name="NovaEntrega" component={NovaEntregaScreen} />
    </Stack.Navigator>
  );
}

function EntregasStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EntregasList" component={EntregasScreen} />
      <Stack.Screen name="EntregaDetalhes" component={EntregaDetalhesScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              return <TabBarIcon route={route} focused={focused} color={color} size={size} />;
            },
            tabBarActiveTintColor: '#FF7300',
            tabBarInactiveTintColor: '#666',
            tabBarStyle: {
              backgroundColor: '#1a1a1a',
              borderTopColor: '#333',
              borderTopWidth: 1,
              height: 80,
              paddingBottom: 20,
              paddingTop: 10,
              paddingHorizontal: 10,
            },
            headerShown: false,
          })}
        >
          <Tab.Screen 
            name="Início" 
            component={HomeStack}
            options={{
              tabBarLabel: 'Início',
            }}
          />
          <Tab.Screen 
            name="Entregas" 
            component={EntregasStack}
            options={{
              tabBarLabel: 'Entregas',
            }}
          />
          <Tab.Screen 
            name="Produtos" 
            component={ProdutosStack}
            options={{
              tabBarLabel: 'Produtos',
            }}
          />
          <Tab.Screen 
            name="Configurações" 
            component={ConfiguracoesScreen}
            options={{
              tabBarLabel: 'Configurações',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

// Import theme context
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import EntregasScreen from './src/screens/EntregasScreen';
import ProdutosScreen from './src/screens/ProdutosScreen';
import ConfiguracoesScreen from './src/screens/ConfiguracoesScreen';
import GanhosScreen from './src/screens/GanhosScreen';
import CriarProdutoScreen from './src/screens/CriarProdutoScreen';
import EditarProdutoScreen from './src/screens/EditarProdutoScreen';
import NovaEntregaScreen from './src/screens/NovaEntregaScreen';
import CategoriasScreen from './src/screens/CategoriasScreen';
import NovaCategoriaScreen from './src/screens/NovaCategoriaScreen';
import EditarCategoriaScreen from './src/screens/EditarCategoriaScreen';
import EntregaDetalhesScreen from './src/screens/EntregaDetalhesScreen';
import EnderecosRetiradaScreen from './src/screens/EnderecosRetiradaScreen';
import InformacoesRestauranteScreen from './src/screens/InformacoesRestauranteScreen';
import MetodosPagamentoScreen from './src/screens/MetodosPagamentoScreen';
import AlterarSenhaScreen from './src/screens/AlterarSenhaScreen';
import RelatoriosScreen from './src/screens/RelatoriosScreen';
import AjudaSuporteScreen from './src/screens/AjudaSuporteScreen';

// Import components
import TabBarIcon from './src/components/TabBarIcon';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Componente de navegação principal que usa o tema
function MainNavigator() {
  const theme = useTheme();
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];

  return (
    <>
      <StatusBar 
        barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
        translucent={false}
      />
      <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return <TabBarIcon route={route} focused={focused} color={color} size={size} />;
          },
          tabBarActiveTintColor: colors.tabBarActive,
          tabBarInactiveTintColor: colors.tabBarInactive,
          tabBarStyle: {
            backgroundColor: colors.tabBarBackground,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: 80,
            paddingBottom: 20,
            paddingTop: 10,
            paddingHorizontal: 10,
            shadowColor: theme.isDarkMode ? '#000' : '#000',
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: theme.isDarkMode ? 0.3 : 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen 
          name="Início" 
          component={HomeStack}
          options={{
            tabBarLabel: 'Início',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
          }}
        />
        <Tab.Screen 
          name="Entregas" 
          component={EntregasStack}
          options={{
            tabBarLabel: 'Entregas',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
          }}
        />
        <Tab.Screen 
          name="Produtos" 
          component={ProdutosStack}
          options={{
            tabBarLabel: 'Produtos',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
          }}
        />
        <Tab.Screen 
          name="Configurações" 
          component={ConfiguracoesStack}
          options={{
            tabBarLabel: 'Configurações',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
          }}
        />
      </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

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
      <Stack.Screen name="Ganhos" component={GanhosScreen} />
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

function ConfiguracoesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ConfiguracoesList" component={ConfiguracoesScreen} />
      <Stack.Screen name="EnderecosRetirada" component={EnderecosRetiradaScreen} />
      <Stack.Screen name="InformacoesRestaurante" component={InformacoesRestauranteScreen} />
      <Stack.Screen name="MetodosPagamento" component={MetodosPagamentoScreen} />
      <Stack.Screen name="AlterarSenha" component={AlterarSenhaScreen} />
      <Stack.Screen name="Relatorios" component={RelatoriosScreen} />
      <Stack.Screen name="AjudaSuporte" component={AjudaSuporteScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <MainNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import StatusCard from '../components/StatusCard';
import SvgIcon from '../components/SvgIcon';


// Componente principal - apenas a tela inicial
const HomeScreen = () => {
  const { isDarkMode, colors } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;
  const navigation = useNavigation();
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(true);

  const stats = [
    { title: 'Pedidos Hoje', value: '12', status: 'available' },
    { title: 'Faturamento Hoje', value: 'R$ 789,50', status: 'available' },
    { title: 'Ticket Médio', value: 'R$ 65,80', status: 'available' },
    { title: 'Tempo Médio Preparo', value: '18 min', status: 'available' },
  ];

  // Funções de navegação para os botões
  const handleNovoPedido = () => {
    Alert.alert('Novo Pedido', 'Funcionalidade de novo pedido será implementada em breve!');
  };

  const handleVerPedidos = () => {
    navigation.navigate('Entregas', { initialTab: 'ativas' });
  };

  const handleGerenciarCardapio = () => {
    navigation.navigate('Categorias');
  };

  const handleRelatorios = () => {
    navigation.navigate('Relatórios');
  };

  const toggleRestaurantStatus = () => {
    setIsRestaurantOpen(!isRestaurantOpen);
    Alert.alert(
      'Status do Restaurante',
      `Restaurante ${!isRestaurantOpen ? 'aberto' : 'fechado'} com sucesso!`
    );
  };

  return (
    <SafeAreaWrapper>
      <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: themeColors.surface, borderBottomColor: themeColors.border }]}>
          <View style={styles.headerTop}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.headerTitle, { color: themeColors.text }]}>
                Restaurante VaiJá
              </Text>
              <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
                {isRestaurantOpen ? 'Recebendo pedidos' : 'Fechado para pedidos'}
              </Text>
            </View>

            {/* Status Toggle */}
            <TouchableOpacity
              style={[
                styles.statusToggle,
                {
                  backgroundColor: isRestaurantOpen ? '#1ecb4f' : '#FF4500',
                  borderColor: isRestaurantOpen ? '#1ecb4f' : '#FF4500'
                }
              ]}
              onPress={toggleRestaurantStatus}
            >
              <SvgIcon
                name={isRestaurantOpen ? "check-circle" : "canceled"}
                size={16}
                color="#ffffff"
                style={{ marginRight: 6 }}
              />
              <Text style={[styles.statusText, { color: '#ffffff' }]}>
                {isRestaurantOpen ? 'ABERTO' : 'FECHADO'}
              </Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* Estatísticas */}
        <View style={styles.statsSection}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Resumo de Hoje
          </Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <StatusCard
                key={index}
                title={stat.title}
                value={stat.value}
                status={stat.status}
              />
            ))}
          </View>
        </View>

        {/* Ações Rápidas */}
        <View style={styles.actionsSection}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Ações Rápidas
          </Text>

          {/* Botão Novo Pedido - Destacado */}
          <TouchableOpacity
            style={[
              styles.primaryActionButton,
              {
                backgroundColor: themeColors.primary,
                marginBottom: 16
              }
            ]}
            onPress={handleNovoPedido}
          >
            <SvgIcon name="plus-circle" size={24} color="#ffffff" />
            <Text style={[styles.primaryActionText, { color: '#ffffff' }]}>Novo Pedido</Text>
          </TouchableOpacity>

          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}
              onPress={handleVerPedidos}
            >
              <SvgIcon name="box" size={24} color={themeColors.primary} />
              <Text style={[styles.actionText, { color: themeColors.text }]}>Ver Pedidos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}
              onPress={handleGerenciarCardapio}
            >
              <SvgIcon name="grid" size={24} color={themeColors.primary} />
              <Text style={[styles.actionText, { color: themeColors.text }]}>Cardápio</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}
              onPress={handleRelatorios}
            >
              <SvgIcon name="chart" size={24} color={themeColors.primary} />
              <Text style={[styles.actionText, { color: themeColors.text }]}>Relatórios</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}
              onPress={() => navigation.navigate('Configurações')}
            >
              <SvgIcon name="settings" size={24} color={themeColors.primary} />
              <Text style={[styles.actionText, { color: themeColors.text }]}>Configurações</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    marginTop: 20, // Aumentado de 10 para 20
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  statusToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 8,
  },
  alertText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionsSection: {
    padding: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  primaryActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  primaryActionText: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
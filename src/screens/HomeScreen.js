import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import StatusCard from '../components/StatusCard';


// Componente principal - apenas a tela inicial
const HomeScreen = () => {
  const { isDarkMode, colors } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;

  const stats = [
    { title: 'Entregas Hoje', value: '12', status: 'available' },
    { title: 'Ganhos Hoje', value: 'R$ 89,50', status: 'available' },
    { title: 'Avaliação', value: '4.8', status: 'available' },
    { title: 'Tempo Online', value: '6h 30m', status: 'available' },
  ];

  return (
    <SafeAreaWrapper>
      <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: themeColors.surface, borderBottomColor: themeColors.border }]}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>
            Olá, João! 👋
          </Text>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
            Pronto para suas entregas?
          </Text>
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
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
              <Text style={[styles.actionIcon, { color: themeColors.primary }]}>📦</Text>
              <Text style={[styles.actionText, { color: themeColors.text }]}>Ver Entregas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
              <Text style={[styles.actionIcon, { color: themeColors.primary }]}>💰</Text>
              <Text style={[styles.actionText, { color: themeColors.text }]}>Ganhos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
              <Text style={[styles.actionIcon, { color: themeColors.primary }]}>📍</Text>
              <Text style={[styles.actionText, { color: themeColors.text }]}>Localização</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
              <Text style={[styles.actionIcon, { color: themeColors.primary }]}>⚙️</Text>
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
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsSection: {
    paddingHorizontal: 20,
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
  actionButton: {
    width: '48%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
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
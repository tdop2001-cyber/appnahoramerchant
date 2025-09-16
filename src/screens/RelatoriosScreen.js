import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { createDynamicStyles } from '../styles/dynamicStyles';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

const RelatoriosScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];
  
  const [periodoSelecionado, setPeriodoSelecionado] = useState('hoje');

  const relatorios = [
    {
      id: 1,
      titulo: 'Relatório de Vendas',
      descricao: 'Vendas por período, produtos mais vendidos e análise de receita',
      icone: '📊',
      cor: '#4CAF50',
    },
    {
      id: 2,
      titulo: 'Relatório de Entregas',
      descricao: 'Status das entregas, tempo médio e avaliações dos clientes',
      icone: '🚚',
      cor: '#2196F3',
    },
    {
      id: 3,
      titulo: 'Relatório de Produtos',
      descricao: 'Produtos mais vendidos, estoque e performance por categoria',
      icone: '🍽️',
      cor: '#FF9800',
    },
    {
      id: 4,
      titulo: 'Relatório Financeiro',
      descricao: 'Receitas, despesas, lucros e análise de pagamentos',
      icone: '💰',
      cor: '#9C27B0',
    },
  ];

  const periodos = [
    { id: 'hoje', label: 'Hoje', valor: 'R$ 1.250,00' },
    { id: 'semana', label: 'Esta Semana', valor: 'R$ 8.750,00' },
    { id: 'mes', label: 'Este Mês', valor: 'R$ 32.500,00' },
    { id: 'ano', label: 'Este Ano', valor: 'R$ 156.800,00' },
  ];

  const handleGerarRelatorio = (relatorio) => {
    Alert.alert(
      'Gerar Relatório',
      `Deseja gerar o ${relatorio.titulo} para o período selecionado?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Gerar', 
          onPress: () => {
            Alert.alert('Sucesso', 'Relatório gerado com sucesso!');
            // Aqui seria implementada a geração do relatório
          }
        },
      ]
    );
  };

  const handleExportarRelatorio = () => {
    Alert.alert(
      'Exportar Relatório',
      'Escolha o formato de exportação:',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'PDF', onPress: () => Alert.alert('Sucesso', 'Relatório exportado em PDF!') },
        { text: 'Excel', onPress: () => Alert.alert('Sucesso', 'Relatório exportado em Excel!') },
      ]
    );
  };

  return (
    <SafeAreaWrapper>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={{ marginBottom: 16 }}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.textPrimary}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Relatórios</Text>
          <Text style={styles.headerSubtitle}>
            Visualize relatórios detalhados de vendas e performance
          </Text>
        </View>

        {/* Resumo Rápido */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📈 Resumo Rápido</Text>
          <View style={{ marginTop: 16 }}>
            <View style={[styles.row, styles.spaceBetween, { marginBottom: 12 }]}>
              <Text style={styles.textSecondary}>Vendas Hoje</Text>
              <Text style={[styles.text, { color: '#4CAF50', fontWeight: '600' }]}>R$ 1.250,00</Text>
            </View>
            <View style={[styles.row, styles.spaceBetween, { marginBottom: 12 }]}>
              <Text style={styles.textSecondary}>Pedidos Hoje</Text>
              <Text style={[styles.text, { color: '#2196F3', fontWeight: '600' }]}>23 pedidos</Text>
            </View>
            <View style={[styles.row, styles.spaceBetween, { marginBottom: 12 }]}>
              <Text style={styles.textSecondary}>Taxa de Entrega</Text>
              <Text style={[styles.text, { color: '#FF9800', fontWeight: '600' }]}>95%</Text>
            </View>
            <View style={[styles.row, styles.spaceBetween]}>
              <Text style={styles.textSecondary}>Avaliação Média</Text>
              <Text style={[styles.text, { color: '#9C27B0', fontWeight: '600' }]}>4.8 ⭐</Text>
            </View>
          </View>
        </View>

        {/* Seleção de Período */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📅 Período</Text>
          <View style={{ marginTop: 16 }}>
            {periodos.map((periodo) => (
              <TouchableOpacity
                key={periodo.id}
                style={[
                  styles.row,
                  styles.spaceBetween,
                  {
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 8,
                    backgroundColor: periodoSelecionado === periodo.id ? 'rgba(255, 152, 0, 0.1)' : 'transparent',
                    borderWidth: 1,
                    borderColor: periodoSelecionado === periodo.id ? '#FF9800' : 'transparent',
                  }
                ]}
                onPress={() => setPeriodoSelecionado(periodo.id)}
              >
                <Text style={[styles.text, { fontWeight: periodoSelecionado === periodo.id ? '600' : '400' }]}>
                  {periodo.label}
                </Text>
                <Text style={[styles.text, { color: '#4CAF50', fontWeight: '600' }]}>
                  {periodo.valor}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tipos de Relatórios */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📋 Tipos de Relatórios</Text>
          <View style={{ marginTop: 16 }}>
            {relatorios.map((relatorio) => (
              <TouchableOpacity
                key={relatorio.id}
                style={[
                  styles.row,
                  {
                    padding: 16,
                    borderRadius: 8,
                    marginBottom: 12,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderLeftWidth: 4,
                    borderLeftColor: relatorio.cor,
                  }
                ]}
                onPress={() => handleGerarRelatorio(relatorio)}
              >
                <View style={{ marginRight: 16 }}>
                  <Text style={{ fontSize: 24 }}>{relatorio.icone}</Text>
                </View>
                <View style={styles.flex1}>
                  <Text style={[styles.text, { fontWeight: '600', marginBottom: 4 }]}>
                    {relatorio.titulo}
                  </Text>
                  <Text style={[styles.textSecondary, { fontSize: 12, lineHeight: 16 }]}>
                    {relatorio.descricao}
                  </Text>
                </View>
                <Text style={[styles.textSecondary, { fontSize: 20 }]}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Ações */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚡ Ações Rápidas</Text>
          <View style={{ marginTop: 16 }}>
            <TouchableOpacity
              style={[styles.button, { marginBottom: 12 }]}
              onPress={handleExportarRelatorio}
            >
              <Text style={styles.buttonText}>📤 Exportar Relatório</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary]}
              onPress={() => Alert.alert('Info', 'Funcionalidade em desenvolvimento')}
            >
              <Text style={styles.buttonSecondaryText}>📧 Enviar por Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dicas */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💡 Dicas</Text>
          <View style={{ marginTop: 16 }}>
            <View style={{
              backgroundColor: 'rgba(33, 150, 243, 0.1)',
              borderRadius: 8,
              padding: 12,
              borderLeftWidth: 4,
              borderLeftColor: '#2196F3',
            }}>
              <Text style={[styles.text, { fontWeight: '600', marginBottom: 8 }]}>
                📊 Como usar os relatórios:
              </Text>
              <Text style={[styles.textSecondary, { fontSize: 12, lineHeight: 18 }]}>
                • Selecione o período desejado{'\n'}
                • Escolha o tipo de relatório{'\n'}
                • Exporte em PDF ou Excel{'\n'}
                • Use os dados para tomar decisões estratégicas
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default RelatoriosScreen;

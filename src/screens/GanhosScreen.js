import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import StatusCard from '../components/StatusCard';
import SvgIcon from '../components/SvgIcon';

const { width } = Dimensions.get('window');

const GanhosScreen = () => {
  const { isDarkMode, colors } = useTheme();
  const themeColors = isDarkMode ? colors.dark : colors.light;
  const [selectedPeriod, setSelectedPeriod] = useState('hoje');

  const periods = [
    { id: 'hoje', label: 'Hoje' },
    { id: 'semana', label: 'Semana' },
    { id: 'mes', label: 'Mês' },
    { id: 'ano', label: 'Ano' },
  ];

  const ganhosPorPeriodo = {
    hoje: {
      total: 'R$ 89,50',
      entregas: '12',
      media: 'R$ 7,46',
      comissao: 'R$ 17,90',
      detalhes: [
        { tipo: 'Entrega', valor: 'R$ 6,50', horario: '18:45', cliente: 'João Silva' },
        { tipo: 'Entrega', valor: 'R$ 8,00', horario: '18:20', cliente: 'Maria Santos' },
        { tipo: 'Entrega', valor: 'R$ 7,25', horario: '17:50', cliente: 'Pedro Costa' },
        { tipo: 'Entrega', valor: 'R$ 9,50', horario: '17:30', cliente: 'Ana Lima' },
        { tipo: 'Entrega', valor: 'R$ 6,75', horario: '16:45', cliente: 'Carlos Oliveira' },
      ]
    },
    semana: {
      total: 'R$ 456,80',
      entregas: '67',
      media: 'R$ 6,81',
      comissao: 'R$ 91,36',
      detalhes: [
        { tipo: 'Segunda-feira', valor: 'R$ 89,50', horario: '12 entregas', cliente: '' },
        { tipo: 'Terça-feira', valor: 'R$ 76,20', horario: '10 entregas', cliente: '' },
        { tipo: 'Quarta-feira', valor: 'R$ 94,30', horario: '14 entregas', cliente: '' },
        { tipo: 'Quinta-feira', valor: 'R$ 67,40', horario: '9 entregas', cliente: '' },
        { tipo: 'Sexta-feira', valor: 'R$ 129,40', horario: '22 entregas', cliente: '' },
      ]
    },
    mes: {
      total: 'R$ 1.847,30',
      entregas: '278',
      media: 'R$ 6,65',
      comissao: 'R$ 369,46',
      detalhes: [
        { tipo: 'Semana 1', valor: 'R$ 456,80', horario: '67 entregas', cliente: '' },
        { tipo: 'Semana 2', valor: 'R$ 423,50', horario: '63 entregas', cliente: '' },
        { tipo: 'Semana 3', valor: 'R$ 512,30', horario: '78 entregas', cliente: '' },
        { tipo: 'Semana 4', valor: 'R$ 454,70', horario: '70 entregas', cliente: '' },
      ]
    },
    ano: {
      total: 'R$ 18.950,40',
      entregas: '2.847',
      media: 'R$ 6,66',
      comissao: 'R$ 3.790,08',
      detalhes: [
        { tipo: 'Janeiro', valor: 'R$ 1.650,20', horario: '245 entregas', cliente: '' },
        { tipo: 'Fevereiro', valor: 'R$ 1.423,80', horario: '218 entregas', cliente: '' },
        { tipo: 'Março', valor: 'R$ 1.847,30', horario: '278 entregas', cliente: '' },
        { tipo: 'Abril', valor: 'R$ 1.567,90', horario: '232 entregas', cliente: '' },
        { tipo: 'Maio', valor: 'R$ 1.789,60', horario: '267 entregas', cliente: '' },
      ]
    }
  };

  const dadosAtuais = ganhosPorPeriodo[selectedPeriod];

  // Modelo NaHora!: 15% plataforma / 85% entregador
  const calcularSplitNaHora = (total) => {
    const totalNum = parseFloat(total.replace('R$ ', '').replace(',', '.'));
    const taxaPlataforma = totalNum * 0.15; // 15%
    const ganhoEntregador = totalNum * 0.85; // 85%
    return {
      taxaPlataforma: taxaPlataforma.toFixed(2).replace('.', ','),
      ganhoEntregador: ganhoEntregador.toFixed(2).replace('.', ',')
    };
  };

  const splitFinanceiro = calcularSplitNaHora(dadosAtuais.total);

  const stats = [
    { title: 'Ganho Total', value: dadosAtuais.total, status: 'available' },
    { title: 'Entregas', value: dadosAtuais.entregas, status: 'available' },
    { title: 'Média/Entrega', value: dadosAtuais.media, status: 'available' },
    { title: 'Taxa Plataforma (15%)', value: `R$ ${splitFinanceiro.taxaPlataforma}`, status: 'busy' },
  ];

  return (
    <SafeAreaWrapper>
      <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: themeColors.surface, borderBottomColor: themeColors.border }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SvgIcon name="money" size={24} color={themeColors.primary} style={{ marginRight: 8 }} />
            <Text style={[styles.headerTitle, { color: themeColors.text }]}>
              Meus Ganhos
            </Text>
          </View>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
            Acompanhe seus rendimentos
          </Text>
        </View>

        {/* Filtros de Período */}
        <View style={styles.filtersSection}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Período
          </Text>
          <View style={styles.filtersContainer}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.id}
                style={[
                  styles.filterButton,
                  {
                    backgroundColor: selectedPeriod === period.id
                      ? themeColors.primary
                      : themeColors.surface,
                    borderColor: selectedPeriod === period.id
                      ? themeColors.primary
                      : themeColors.border,
                  }
                ]}
                onPress={() => setSelectedPeriod(period.id)}
              >
                <Text style={[
                  styles.filterText,
                  {
                    color: selectedPeriod === period.id
                      ? themeColors.primaryText
                      : themeColors.text
                  }
                ]}>
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Resumo de Ganhos */}
        <View style={styles.statsSection}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Resumo - {periods.find(p => p.id === selectedPeriod)?.label}
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

        {/* Detalhes dos Ganhos */}
        <View style={styles.detailsSection}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Detalhamento
          </Text>
          <View style={styles.detailsContainer}>
            {dadosAtuais.detalhes.map((detalhe, index) => (
              <View
                key={index}
                style={[
                  styles.detailItem,
                  {
                    backgroundColor: themeColors.surface,
                    borderColor: themeColors.border
                  }
                ]}
              >
                <View style={styles.detailHeader}>
                  <Text style={[styles.detailTipo, { color: themeColors.text }]}>
                    {detalhe.tipo}
                  </Text>
                  <Text style={[styles.detailValor, { color: themeColors.primary }]}>
                    {detalhe.valor}
                  </Text>
                </View>
                <View style={styles.detailInfo}>
                  <Text style={[styles.detailHorario, { color: themeColors.textSecondary }]}>
                    {detalhe.horario}
                  </Text>
                  {detalhe.cliente && (
                    <Text style={[styles.detailCliente, { color: themeColors.textSecondary }]}>
                      {detalhe.cliente}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Resumo Final - Modelo NaHora! (15% / 85%) */}
        <View style={[styles.summarySection, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <Text style={[styles.summaryTitle, { color: themeColors.text, marginBottom: 16 }]}>
            💰 Split Financeiro (Modelo NaHora!)
          </Text>

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: themeColors.text }]}>
              Ganho Bruto:
            </Text>
            <Text style={[styles.summaryValue, { color: themeColors.success }]}>
              {dadosAtuais.total}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: themeColors.text }]}>
              Taxa Plataforma (15%):
            </Text>
            <Text style={[styles.summaryValue, { color: themeColors.error }]}>
              -R$ {splitFinanceiro.taxaPlataforma}
            </Text>
          </View>

          <View style={[styles.summaryRow, styles.summaryTotal]}>
            <Text style={[styles.summaryLabelTotal, { color: themeColors.text }]}>
              Ganho Entregador (85%):
            </Text>
            <Text style={[styles.summaryValueTotal, { color: themeColors.primary }]}>
              R$ {splitFinanceiro.ganhoEntregador}
            </Text>
          </View>

          {/* Informação adicional */}
          <View style={[
            {
              backgroundColor: 'rgba(255, 115, 0, 0.1)',
              borderRadius: 8,
              padding: 12,
              marginTop: 16,
              borderWidth: 1,
              borderColor: 'rgba(255, 115, 0, 0.3)'
            }
          ]}>
            <Text style={[styles.summaryLabel, { color: themeColors.text, fontSize: 12 }]}>
              ℹ️ O modelo NaHora! repassa 85% do valor total para o entregador,
              retendo apenas 15% como taxa da plataforma.
            </Text>
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
    marginTop: 20,
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
  filtersSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailTipo: {
    fontSize: 16,
    fontWeight: '600',
  },
  detailValor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailHorario: {
    fontSize: 14,
  },
  detailCliente: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  summarySection: {
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTotal: {
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 8,
    borderTopColor: 'rgba(255, 115, 0, 0.3)',
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  summaryLabelTotal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  summaryValueTotal: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GanhosScreen;
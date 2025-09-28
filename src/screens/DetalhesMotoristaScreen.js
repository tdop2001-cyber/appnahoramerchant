import React from 'react';
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
import SvgIcon from '../components/SvgIcon';

const DetalhesMotoristaScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];

  const { motorista } = route.params || {};

  if (!motorista) {
    return (
      <SafeAreaWrapper>
        <View style={[styles.container, styles.center]}>
          <Text style={styles.text}>Motorista não encontrado</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaWrapper>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return { bg: 'rgba(30, 203, 79, 0.2)', text: '#1ecb4f', border: '#1ecb4f' };
      case 'ocupado':
        return { bg: 'rgba(255, 215, 0, 0.2)', text: '#FFD700', border: '#FFD700' };
      case 'offline':
        return { bg: 'rgba(153, 153, 153, 0.2)', text: '#999999', border: '#999999' };
      default:
        return { bg: 'rgba(255, 115, 0, 0.2)', text: '#FF7300', border: '#FF7300' };
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'ocupado':
        return 'Ocupado';
      case 'offline':
        return 'Offline';
      default:
        return 'Desconhecido';
    }
  };

  const statusColor = getStatusColor(motorista.status);

  const handleEditarMotorista = () => {
    navigation.navigate('EditarMotorista', { motorista });
  };

  const handleRemoverMotorista = () => {
    Alert.alert(
      '⚠️ Remover Motorista',
      `Tem certeza que deseja remover ${motorista.nome} da sua equipe?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            Alert.alert('✅ Removido', 'Motorista removido com sucesso!');
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <SafeAreaWrapper>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={{ marginBottom: 16 }}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.row}>
              <SvgIcon name="arrow-left" size={16} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.textPrimary}>Voltar</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalhes do Motorista</Text>
          <Text style={styles.headerSubtitle}>
            Informações completas
          </Text>
        </View>

        {/* Perfil */}
        <View style={styles.card}>
          <View style={[styles.row, { alignItems: 'center', marginBottom: 16 }]}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: statusColor.bg,
              borderWidth: 3,
              borderColor: statusColor.border,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 16
            }}>
              <Text style={{ fontSize: 32 }}>{motorista.foto}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.text, { fontSize: 20, fontWeight: 'bold', marginBottom: 4 }]}>
                {motorista.nome}
              </Text>
              <View style={{
                backgroundColor: statusColor.bg,
                borderColor: statusColor.border,
                borderWidth: 1,
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 16,
                alignSelf: 'flex-start'
              }}>
                <Text style={[{ fontSize: 12, fontWeight: '600', color: statusColor.text }]}>
                  {getStatusLabel(motorista.status)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Informações Pessoais */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informações Pessoais</Text>

          <View style={[styles.row, { marginBottom: 12, alignItems: 'center' }]}>
            <SvgIcon name="phone" size={16} color={colors.primary} style={{ marginRight: 12 }} />
            <Text style={styles.text}>{motorista.telefone}</Text>
          </View>

          <View style={[styles.row, { marginBottom: 12, alignItems: 'center' }]}>
            <SvgIcon name="location" size={16} color={colors.primary} style={{ marginRight: 12 }} />
            <Text style={styles.text}>{motorista.localizacao}</Text>
          </View>
        </View>

        {/* Veículo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Veículo</Text>

          <View style={[styles.row, { marginBottom: 12, alignItems: 'center' }]}>
            <SvgIcon name="truck" size={16} color={colors.primary} style={{ marginRight: 12 }} />
            <Text style={styles.text}>{motorista.veiculo}</Text>
          </View>

          <View style={[styles.row, { marginBottom: 12, alignItems: 'center' }]}>
            <SvgIcon name="card" size={16} color={colors.primary} style={{ marginRight: 12 }} />
            <Text style={styles.text}>Placa: {motorista.placa}</Text>
          </View>
        </View>

        {/* Estatísticas */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Estatísticas</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={[styles.text, { fontSize: 24, fontWeight: 'bold', color: colors.primary }]}>
                ⭐ {motorista.avaliacaoMedia}
              </Text>
              <Text style={[styles.textSecondary, { fontSize: 12 }]}>Avaliação</Text>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={[styles.text, { fontSize: 24, fontWeight: 'bold', color: colors.primary }]}>
                {motorista.totalEntregas}
              </Text>
              <Text style={[styles.textSecondary, { fontSize: 12 }]}>Total Entregas</Text>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={[styles.text, { fontSize: 24, fontWeight: 'bold', color: colors.primary }]}>
                {motorista.entregasHoje}
              </Text>
              <Text style={[styles.textSecondary, { fontSize: 12 }]}>Hoje</Text>
            </View>
          </View>

          <View style={{ marginTop: 16, alignItems: 'center' }}>
            <Text style={[styles.text, { fontSize: 18, fontWeight: 'bold' }]}>
              {motorista.tempoMedio}
            </Text>
            <Text style={[styles.textSecondary, { fontSize: 12 }]}>Tempo Médio de Entrega</Text>
          </View>
        </View>

        {/* Ações */}
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
            <TouchableOpacity
              style={[styles.button, { flex: 1 }]}
              onPress={handleEditarMotorista}
            >
              <View style={styles.row}>
                <SvgIcon name="edit" size={16} color={colors.primaryText} style={{ marginRight: 6 }} />
                <Text style={styles.buttonText}>Editar</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary, { flex: 1 }]}
              onPress={() => Alert.alert('Em breve', 'Histórico de entregas será implementado!')}
            >
              <View style={styles.row}>
                <SvgIcon name="details" size={16} color={colors.textSecondary} style={{ marginRight: 6 }} />
                <Text style={styles.buttonSecondaryText}>Histórico</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#FF4500', borderColor: '#FF4500' }]}
            onPress={handleRemoverMotorista}
          >
            <View style={styles.row}>
              <SvgIcon name="trash" size={16} color="#ffffff" style={{ marginRight: 6 }} />
              <Text style={[styles.buttonText, { color: '#ffffff' }]}>Remover Motorista</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default DetalhesMotoristaScreen;
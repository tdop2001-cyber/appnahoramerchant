import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { createDynamicStyles } from '../styles/dynamicStyles';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import SvgIcon from '../components/SvgIcon';

const MotoristasScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];

  const [searchText, setSearchText] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  // Dados simulados de motoristas
  const [motoristas] = useState([
    {
      id: 1,
      nome: 'João Silva',
      telefone: '(11) 99999-1234',
      veiculo: 'Honda CG 160',
      placa: 'ABC-1234',
      status: 'online',
      localizacao: 'Centro - SP',
      avaliacaoMedia: 4.8,
      totalEntregas: 156,
      entregasHoje: 8,
      tempoMedio: '25 min',
      foto: '👨‍🏍️',
      disponivel: true,
    },
    {
      id: 2,
      nome: 'Maria Santos',
      telefone: '(11) 88888-5678',
      veiculo: 'Yamaha Fazer 250',
      placa: 'XYZ-5678',
      status: 'ocupado',
      localizacao: 'Vila Madalena - SP',
      avaliacaoMedia: 4.9,
      totalEntregas: 203,
      entregasHoje: 12,
      tempoMedio: '22 min',
      foto: '👩‍🏍️',
      disponivel: true,
    },
    {
      id: 3,
      nome: 'Carlos Oliveira',
      telefone: '(11) 77777-9012',
      veiculo: 'Honda Biz 125',
      placa: 'DEF-9012',
      status: 'offline',
      localizacao: 'Jardins - SP',
      avaliacaoMedia: 4.6,
      totalEntregas: 89,
      entregasHoje: 0,
      tempoMedio: '28 min',
      foto: '👨‍🏍️',
      disponivel: false,
    },
    {
      id: 4,
      nome: 'Ana Costa',
      telefone: '(11) 66666-3456',
      veiculo: 'Yamaha Neo 125',
      placa: 'GHI-3456',
      status: 'online',
      localizacao: 'Bela Vista - SP',
      avaliacaoMedia: 4.7,
      totalEntregas: 134,
      entregasHoje: 6,
      tempoMedio: '24 min',
      foto: '👩‍🏍️',
      disponivel: true,
    },
  ]);

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return 'check-circle';
      case 'ocupado':
        return 'hourglass';
      case 'offline':
        return 'canceled';
      default:
        return 'question';
    }
  };

  const filteredMotoristas = motoristas.filter(motorista => {
    const matchesSearch = motorista.nome.toLowerCase().includes(searchText.toLowerCase()) ||
                         motorista.telefone.includes(searchText) ||
                         motorista.veiculo.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filtroStatus === 'todos' || motorista.status === filtroStatus;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    todos: motoristas.length,
    online: motoristas.filter(m => m.status === 'online').length,
    ocupado: motoristas.filter(m => m.status === 'ocupado').length,
    offline: motoristas.filter(m => m.status === 'offline').length,
  };

  return (
    <SafeAreaWrapper>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Motoristas Parceiros</Text>
          <Text style={styles.headerSubtitle}>
            Acompanhe os motoristas disponíveis na sua região
          </Text>
        </View>

        {/* Resumo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Motoristas Disponíveis</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={[styles.text, { fontSize: 24, fontWeight: 'bold', color: '#1ecb4f' }]}>
                {statusCounts.online}
              </Text>
              <Text style={[styles.textSecondary, { fontSize: 12 }]}>Online</Text>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={[styles.text, { fontSize: 24, fontWeight: 'bold', color: '#FFD700' }]}>
                {statusCounts.ocupado}
              </Text>
              <Text style={[styles.textSecondary, { fontSize: 12 }]}>Ocupados</Text>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={[styles.text, { fontSize: 24, fontWeight: 'bold', color: colors.primary }]}>
                {motoristas.reduce((acc, m) => acc + m.entregasHoje, 0)}
              </Text>
              <Text style={[styles.textSecondary, { fontSize: 12 }]}>Entregas Hoje</Text>
            </View>
          </View>
        </View>

        {/* Busca */}
        <View style={[styles.card, { marginBottom: 8, paddingVertical: 6, paddingHorizontal: 10 }]}>
          <TextInput
            style={{
              backgroundColor: '#333333',
              borderRadius: 6,
              padding: 6,
              color: '#ffffff',
              fontSize: 12,
              minHeight: 32,
            }}
            placeholder="Buscar motorista por nome, telefone ou veículo..."
            placeholderTextColor="#999999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Filtros por Status */}
        <View style={[styles.card, { marginBottom: 12, paddingVertical: 12, paddingHorizontal: 16 }]}>
          <Text style={[styles.text, { fontSize: 14, fontWeight: '700', marginBottom: 12 }]}>
            Filtrar por Status
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: -4 }}
            contentContainerStyle={{ paddingHorizontal: 4 }}
          >
            <View style={styles.row}>
              {/* Todos */}
              <TouchableOpacity
                style={[
                  styles.button,
                  filtroStatus === 'todos' ? {} : styles.buttonSecondary,
                  {
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    marginRight: 8,
                    borderRadius: 6,
                    alignSelf: 'flex-start',
                  }
                ]}
                onPress={() => setFiltroStatus('todos')}
              >
                <View style={styles.row}>
                  <SvgIcon
                    name="grid"
                    size={14}
                    color={filtroStatus === 'todos' ? colors.primaryText : colors.textSecondary}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={[
                    filtroStatus === 'todos' ? styles.buttonText : styles.buttonSecondaryText,
                    { fontSize: 12, fontWeight: '600' }
                  ]}>
                    Todos ({statusCounts.todos})
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Online */}
              <TouchableOpacity
                style={[
                  {
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    marginRight: 8,
                    borderRadius: 20,
                    backgroundColor: filtroStatus === 'online' ? '#1ecb4f' : 'rgba(30, 203, 79, 0.1)',
                    borderWidth: 1.5,
                    borderColor: '#1ecb4f',
                    alignItems: 'center',
                    minWidth: 80
                  }
                ]}
                onPress={() => setFiltroStatus('online')}
              >
                <View style={[styles.row, { alignItems: 'center' }]}>
                  <SvgIcon
                    name="check-circle"
                    size={14}
                    color={filtroStatus === 'online' ? '#000000' : '#1ecb4f'}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={[
                    { fontSize: 12, fontWeight: '600', textAlign: 'center' },
                    filtroStatus === 'online' ? { color: '#000000' } : { color: '#1ecb4f' }
                  ]}>
                    {statusCounts.online}
                  </Text>
                </View>
                <Text style={[
                  { fontSize: 10, fontWeight: '500', textAlign: 'center', marginTop: 2 },
                  filtroStatus === 'online' ? { color: '#000000' } : { color: '#1ecb4f' }
                ]}>
                  Online
                </Text>
              </TouchableOpacity>

              {/* Ocupado */}
              <TouchableOpacity
                style={[
                  {
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    marginRight: 8,
                    borderRadius: 20,
                    backgroundColor: filtroStatus === 'ocupado' ? '#FFD700' : 'rgba(255, 215, 0, 0.1)',
                    borderWidth: 1.5,
                    borderColor: '#FFD700',
                    alignItems: 'center',
                    minWidth: 80
                  }
                ]}
                onPress={() => setFiltroStatus('ocupado')}
              >
                <View style={[styles.row, { alignItems: 'center' }]}>
                  <SvgIcon
                    name="hourglass"
                    size={14}
                    color={filtroStatus === 'ocupado' ? '#000000' : '#FFD700'}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={[
                    { fontSize: 12, fontWeight: '600', textAlign: 'center' },
                    filtroStatus === 'ocupado' ? { color: '#000000' } : { color: '#FFD700' }
                  ]}>
                    {statusCounts.ocupado}
                  </Text>
                </View>
                <Text style={[
                  { fontSize: 10, fontWeight: '500', textAlign: 'center', marginTop: 2 },
                  filtroStatus === 'ocupado' ? { color: '#000000' } : { color: '#FFD700' }
                ]}>
                  Ocupado
                </Text>
              </TouchableOpacity>

              {/* Offline */}
              <TouchableOpacity
                style={[
                  {
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    marginRight: 8,
                    borderRadius: 20,
                    backgroundColor: filtroStatus === 'offline' ? '#999999' : 'rgba(153, 153, 153, 0.1)',
                    borderWidth: 1.5,
                    borderColor: '#999999',
                    alignItems: 'center',
                    minWidth: 80
                  }
                ]}
                onPress={() => setFiltroStatus('offline')}
              >
                <View style={[styles.row, { alignItems: 'center' }]}>
                  <SvgIcon
                    name="canceled"
                    size={14}
                    color={filtroStatus === 'offline' ? '#ffffff' : '#999999'}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={[
                    { fontSize: 12, fontWeight: '600', textAlign: 'center' },
                    filtroStatus === 'offline' ? { color: '#ffffff' } : { color: '#999999' }
                  ]}>
                    {statusCounts.offline}
                  </Text>
                </View>
                <Text style={[
                  { fontSize: 10, fontWeight: '500', textAlign: 'center', marginTop: 2 },
                  filtroStatus === 'offline' ? { color: '#ffffff' } : { color: '#999999' }
                ]}>
                  Offline
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Informativo sobre Parcerias */}
        <View style={[styles.card, { marginBottom: 12 }]}>
          <View style={[styles.row, { alignItems: 'center', marginBottom: 8 }]}>
            <SvgIcon name="info" size={16} color={colors.primary} style={{ marginRight: 8 }} />
            <Text style={[styles.text, { fontWeight: '600' }]}>Motoristas Parceiros</Text>
          </View>
          <Text style={[styles.textSecondary, { fontSize: 12 }]}>
            Motoristas autônomos que se oferecem para fazer entregas na sua região.
            Eles podem aceitar ou recusar suas solicitações de entrega.
          </Text>
        </View>

        {/* Lista de Motoristas */}
        {filteredMotoristas.length === 0 ? (
          <View style={[styles.card, styles.center, { paddingVertical: 40 }]}>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>🏍️</Text>
            <Text style={[styles.text, { fontSize: 18, marginBottom: 8 }]}>
              Nenhum motorista encontrado
            </Text>
            <Text style={styles.textSecondary}>
              Tente ajustar sua busca ou filtro
            </Text>
          </View>
        ) : (
          filteredMotoristas.map((motorista) => {
            const statusColor = getStatusColor(motorista.status);
            return (
              <TouchableOpacity
                key={motorista.id}
                style={[styles.card, { flexDirection: 'row', alignItems: 'center' }]}
                onPress={() => navigation.navigate('DetalhesMotorista', { motorista })}
              >
                {/* Avatar */}
                <View style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: statusColor.bg,
                  borderWidth: 2,
                  borderColor: statusColor.border,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 16
                }}>
                  <Text style={{ fontSize: 24 }}>{motorista.foto}</Text>
                </View>

                {/* Info Principal */}
                <View style={{ flex: 1 }}>
                  <View style={[styles.row, { alignItems: 'center', marginBottom: 4 }]}>
                    <Text style={[styles.text, { fontSize: 16, fontWeight: '600', marginRight: 8 }]}>
                      {motorista.nome}
                    </Text>
                    <View style={{
                      backgroundColor: statusColor.bg,
                      borderColor: statusColor.border,
                      borderWidth: 1,
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 12,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                      <SvgIcon
                        name={getStatusIcon(motorista.status)}
                        size={12}
                        color={statusColor.text}
                        style={{ marginRight: 4 }}
                      />
                      <Text style={[{ fontSize: 10, fontWeight: '600', color: statusColor.text }]}>
                        {getStatusLabel(motorista.status)}
                      </Text>
                    </View>
                  </View>

                  <Text style={[styles.textSecondary, { fontSize: 12, marginBottom: 2 }]}>
                    📱 {motorista.telefone}
                  </Text>
                  <Text style={[styles.textSecondary, { fontSize: 12, marginBottom: 2 }]}>
                    🏍️ {motorista.veiculo} • {motorista.placa}
                  </Text>
                  <Text style={[styles.textSecondary, { fontSize: 12 }]}>
                    📍 {motorista.localizacao}
                  </Text>
                </View>

                {/* Stats */}
                <View style={{ alignItems: 'flex-end' }}>
                  <View style={[styles.row, { alignItems: 'center', marginBottom: 4 }]}>
                    <Text style={[styles.text, { fontSize: 14, fontWeight: 'bold', marginRight: 4 }]}>
                      ⭐ {motorista.avaliacaoMedia}
                    </Text>
                  </View>
                  <Text style={[styles.textSecondary, { fontSize: 10 }]}>
                    {motorista.entregasHoje} entregas hoje
                  </Text>
                  <Text style={[styles.textSecondary, { fontSize: 10 }]}>
                    {motorista.tempoMedio} tempo médio
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default MotoristasScreen;
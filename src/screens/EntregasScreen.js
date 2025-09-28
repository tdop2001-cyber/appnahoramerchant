import React, { useState, useEffect } from 'react';
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

const EntregasScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];
  
  const { initialTab = 'ativas' } = route.params || {};
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('todos');

  // Atualizar aba ativa quando o parâmetro mudar
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const [entregasAtivas, setEntregasAtivas] = useState([
    {
      id: '47321',
      cliente: 'Maria Silva',
      endereco: 'Rua das Flores, 123 - Jardim Primavera',
      status: 'pending',
      tempo: '10 min atrás',
      valor: 'R$ 25,50',
      itens: ['1x Pizza Margherita', '1x Refrigerante'],
    },
    {
      id: '47320',
      cliente: 'João Pereira',
      endereco: 'Av. Paulista, 1000 - Bela Vista',
      status: 'accepted',
      tempo: '30 min atrás',
      valor: 'R$ 18,00',
      itens: ['2x Hambúrguer', '1x Batata Frita'],
    },
    {
      id: '47315',
      cliente: 'Ana Souza',
      endereco: 'Rua Augusta, 2500 - Jardins',
      status: 'picked',
      tempo: '45 min atrás',
      valor: 'R$ 32,00',
      itens: ['1x Combo Executivo', '1x Suco Natural'],
    },
    {
      id: '47319',
      cliente: 'Carlos Mendes',
      endereco: 'Rua das Rosas, 456 - Centro',
      status: 'delivered',
      tempo: '1 hora atrás',
      valor: 'R$ 28,50',
      itens: ['1x Prato Especial', '1x Refrigerante'],
    },
    {
      id: '47318',
      cliente: 'Pedro Costa',
      endereco: 'Rua das Palmeiras, 789 - Vila Madalena',
      status: 'cancelled',
      tempo: '1 hora atrás',
      valor: 'R$ 45,00',
      itens: ['1x Prato Executivo', '1x Suco'],
    },
  ]);

  const [entregasHistorico] = useState([
    {
      id: '47310',
      cliente: 'Carlos Santos',
      endereco: 'Rua das Palmeiras, 456 - Centro',
      status: 'delivered',
      tempo: '2 horas atrás',
      valor: 'R$ 22,50',
      itens: ['1x Prato do Dia', '1x Salada'],
    },
    {
      id: '47305',
      cliente: 'Fernanda Lima',
      endereco: 'Av. Brasil, 789 - Zona Sul',
      status: 'delivered',
      tempo: '3 horas atrás',
      valor: 'R$ 28,00',
      itens: ['1x Massa Carbonara', '1x Vinho'],
    },
    {
      id: '47302',
      cliente: 'Roberto Silva',
      endereco: 'Rua das Acácias, 321 - Jardins',
      status: 'cancelled',
      tempo: '4 horas atrás',
      valor: 'R$ 35,00',
      itens: ['1x Pizza Grande', '1x Refrigerante'],
    },
  ]);

  // Função para obter a cor da faixa lateral baseada no status
  const getStatusBorderColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FFD700'; // Dourado para pendente
      case 'accepted':
        return '#9C27B0'; // Roxo para aceito
      case 'picked':
        return '#2196F3'; // Azul para coletado
      case 'delivered':
        return '#1ecb4f'; // Verde para entregue
      case 'cancelled':
        return '#FF4500'; // Vermelho para cancelada
      default:
        return '#666666'; // Cinza padrão
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return [styles.statusBadge, styles.statusPending];
      case 'accepted':
        return [styles.statusBadge, styles.statusAccepted];
      case 'picked':
        return [styles.statusBadge, styles.statusPicked];
      case 'delivered':
        return [styles.statusBadge, styles.statusDelivered];
      case 'cancelled':
        return [styles.statusBadge, styles.statusCancelled];
      default:
        return [styles.statusBadge];
    }
  };

  const getStatusTextStyle = (status) => {
    switch (status) {
      case 'pending':
        return [styles.statusText, styles.statusPendingText];
      case 'accepted':
        return [styles.statusText, styles.statusAcceptedText];
      case 'picked':
        return [styles.statusText, styles.statusPickedText];
      case 'delivered':
        return [styles.statusText, styles.statusDeliveredText];
      case 'cancelled':
        return [styles.statusText, styles.statusCancelledText];
      default:
        return [styles.statusText];
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'accepted':
        return 'Aceito';
      case 'picked':
        return 'Coletado';
      case 'delivered':
        return 'Entregue';
      case 'cancelled':
        return 'Cancelada';
      default:
        return 'Desconhecido';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return 'hourglass';
      case 'accepted':
        return 'check-circle';
      case 'picked':
        return 'box';
      case 'delivered':
        return 'champions';
      case 'cancelled':
        return 'canceled';
      default:
        return 'question';
    }
  };

  const atualizarStatusEntrega = (entregaId, novoStatus) => {
    setEntregasAtivas(prevEntregas => 
      prevEntregas.map(entrega => 
        entrega.id === entregaId 
          ? { ...entrega, status: novoStatus }
          : entrega
      )
    );
  };


  // Função para filtrar entregas por status
  const getFilteredEntregas = (entregas) => {
    if (selectedStatus === 'todos') {
      return entregas;
    }
    return entregas.filter(entrega => entrega.status === selectedStatus);
  };

  const currentEntregas = getFilteredEntregas(activeTab === 'ativas' ? entregasAtivas : entregasHistorico);

  return (
    <SafeAreaWrapper>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Entregas</Text>
        <Text style={styles.headerSubtitle}>
          Gerencie suas entregas ativas e histórico
        </Text>
      </View>

      {/* Tabs */}
      <View style={[styles.row, { marginHorizontal: 16, marginBottom: 16 }]}>
        <TouchableOpacity
          style={[
            styles.button,
            activeTab === 'ativas' ? {} : styles.buttonSecondary,
            { flex: 1, marginRight: 8 },
          ]}
          onPress={() => setActiveTab('ativas')}
        >
          <View style={styles.row}>
            <SvgIcon name="box" size={16} color={activeTab === 'ativas' ? colors.primaryText : colors.textSecondary} style={{ marginRight: 6 }} />
            <Text
              style={[
                activeTab === 'ativas' ? styles.buttonText : styles.buttonSecondaryText,
              ]}
            >
              Ativas ({entregasAtivas.length})
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activeTab === 'historico' ? {} : styles.buttonSecondary,
            { flex: 1, marginLeft: 8 },
          ]}
          onPress={() => setActiveTab('historico')}
        >
          <Text
            style={[
              activeTab === 'historico' ? styles.buttonText : styles.buttonSecondaryText,
            ]}
          >
            <View style={styles.row}>
              <SvgIcon name="details" size={16} color={activeTab === 'historico' ? colors.primaryText : colors.textSecondary} style={{ marginRight: 6 }} />
              <Text>Histórico ({entregasHistorico.length})</Text>
            </View>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Busca */}
      <View style={[styles.card, { marginBottom: 8, paddingVertical: 8, paddingHorizontal: 12 }]}>
        <TextInput
          style={{
            backgroundColor: '#333333',
            borderRadius: 6,
            padding: 8,
            color: '#ffffff',
            fontSize: 14,
            minHeight: 36,
          }}
          placeholder="Buscar por cliente, endereço ou ID..."
          placeholderTextColor="#999999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Filtros por Status */}
      <View style={[styles.card, { marginBottom: 12, paddingVertical: 8, paddingHorizontal: 12 }]}>
        <Text style={[styles.text, { fontSize: 12, fontWeight: '600', marginBottom: 6 }]}>
          Filtrar por Status
        </Text>
        <View style={[styles.row, { flexWrap: 'nowrap', gap: 2 }]}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedStatus === 'todos' ? {} : styles.buttonSecondary,
              { 
                paddingVertical: 3, 
                paddingHorizontal: 6, 
                minHeight: 24,
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
              }
            ]}
            onPress={() => setSelectedStatus('todos')}
          >
            <Text style={[
              selectedStatus === 'todos' ? styles.buttonText : styles.buttonSecondaryText,
              { fontSize: 9, textAlign: 'center' }
            ]}>
              Todos
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              { 
                paddingVertical: 3, 
                paddingHorizontal: 6, 
                minHeight: 24,
                borderRadius: 6,
                backgroundColor: selectedStatus === 'pending' ? '#FFD700' : 'transparent',
                borderWidth: 1,
                borderColor: '#FFD700',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
              }
            ]}
            onPress={() => setSelectedStatus('pending')}
          >
            <Text style={[
              { fontSize: 9, fontWeight: '600', textAlign: 'center' },
              selectedStatus === 'pending' ? { color: '#000000' } : { color: '#FFD700' }
            ]}>
              Pendente
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              { 
                paddingVertical: 3, 
                paddingHorizontal: 6, 
                minHeight: 24,
                borderRadius: 6,
                backgroundColor: selectedStatus === 'accepted' ? '#9C27B0' : 'transparent',
                borderWidth: 1,
                borderColor: '#9C27B0',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
              }
            ]}
            onPress={() => setSelectedStatus('accepted')}
          >
            <Text style={[
              { fontSize: 9, fontWeight: '600', textAlign: 'center' },
              selectedStatus === 'accepted' ? { color: '#ffffff' } : { color: '#9C27B0' }
            ]}>
              Aceito
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              { 
                paddingVertical: 3, 
                paddingHorizontal: 6, 
                minHeight: 24,
                borderRadius: 6,
                backgroundColor: selectedStatus === 'picked' ? '#2196F3' : 'transparent',
                borderWidth: 1,
                borderColor: '#2196F3',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
              }
            ]}
            onPress={() => setSelectedStatus('picked')}
          >
            <Text style={[
              { fontSize: 9, fontWeight: '600', textAlign: 'center' },
              selectedStatus === 'picked' ? { color: '#ffffff' } : { color: '#2196F3' }
            ]}>
              Coletado
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              { 
                paddingVertical: 3, 
                paddingHorizontal: 6, 
                minHeight: 24,
                borderRadius: 6,
                backgroundColor: selectedStatus === 'delivered' ? '#1ecb4f' : 'transparent',
                borderWidth: 1,
                borderColor: '#1ecb4f',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
              }
            ]}
            onPress={() => setSelectedStatus('delivered')}
          >
            <Text style={[
              { fontSize: 9, fontWeight: '600', textAlign: 'center' },
              selectedStatus === 'delivered' ? { color: '#000000' } : { color: '#1ecb4f' }
            ]}>
              Entregue
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              { 
                paddingVertical: 3, 
                paddingHorizontal: 6, 
                minHeight: 24,
                borderRadius: 6,
                backgroundColor: selectedStatus === 'cancelled' ? '#FF4500' : 'transparent',
                borderWidth: 1,
                borderColor: '#FF4500',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
              }
            ]}
            onPress={() => setSelectedStatus('cancelled')}
          >
            <Text style={[
              { fontSize: 9, fontWeight: '600', textAlign: 'center' },
              selectedStatus === 'cancelled' ? { color: '#ffffff' } : { color: '#FF4500' }
            ]}>
              Cancelado
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {currentEntregas.length === 0 ? (
          <View style={[styles.card, styles.center, { paddingVertical: 40 }]}>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>📦</Text>
            <Text style={[styles.text, { fontSize: 18, marginBottom: 8 }]}>
              Nenhuma entrega encontrada
            </Text>
            <Text style={styles.textSecondary}>
              {activeTab === 'ativas'
                ? 'Não há entregas ativas no momento'
                : 'Nenhuma entrega no histórico'}
            </Text>
          </View>
        ) : (
          currentEntregas.map((entrega) => (
            <View key={entrega.id} style={[styles.card, { 
              flexDirection: 'row',
              paddingLeft: 0,
              overflow: 'hidden',
              position: 'relative',
              borderRadius: 12
            }]}>
              {/* Faixa lateral de status com curvatura */}
              <View style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 6,
                backgroundColor: getStatusBorderColor(entrega.status),
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12
              }} />
              
              {/* Conteúdo do card */}
              <View style={{ flex: 1, paddingLeft: 16 }}>
                <View style={styles.listItemHeader}>
                  <View style={styles.row}>
                    <SvgIcon 
                      name={getStatusIcon(entrega.status)} 
                      size={20} 
                      color={colors.primary} 
                      style={{ marginRight: 8 }} 
                    />
                    <Text style={styles.listItemTitle}>#{entrega.id}</Text>
                  </View>
                  <View style={getStatusStyle(entrega.status)}>
                    <Text style={getStatusTextStyle(entrega.status)}>
                      {getStatusLabel(entrega.status)}
                    </Text>
                  </View>
                </View>

                <View style={[styles.row, { marginTop: 8, alignItems: 'center' }]}>
                  <SvgIcon name="user" size={16} color={colors.textSecondary} style={{ marginRight: 6 }} />
                  <Text style={styles.listItemSubtitle}>
                    {entrega.cliente}
                  </Text>
                </View>
                <View style={[styles.row, { marginTop: 4, alignItems: 'center' }]}>
                  <SvgIcon name="location" size={16} color={colors.textSecondary} style={{ marginRight: 6 }} />
                  <Text style={styles.listItemSubtitle}>
                    {entrega.endereco}
                  </Text>
                </View>
                <View style={[styles.row, { marginTop: 4, alignItems: 'center' }]}>
                  <SvgIcon name="alarm-clock" size={16} color={colors.textSecondary} style={{ marginRight: 6 }} />
                  <Text style={styles.listItemSubtitle}>
                    {entrega.tempo}
                  </Text>
                </View>

                <View style={[styles.row, styles.spaceBetween, { marginTop: 12 }]}>
                  <View>
                    <Text style={styles.textSecondary}>Valor Total</Text>
                    <Text style={[styles.textPrimary, { fontSize: 18, fontWeight: 'bold' }]}>
                      {entrega.valor}
                    </Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 16 }}>
                    <Text style={styles.textSecondary}>Itens</Text>
                    {entrega.itens.map((item, index) => (
                      <Text key={index} style={[styles.textSecondary, { fontSize: 12 }]}>
                        • {item}
                      </Text>
                    ))}
                  </View>
                </View>

                <View style={[styles.row, { marginTop: 16, gap: 8 }]}>
                  <TouchableOpacity 
                    style={[styles.button, { flex: 1 }]}
                    onPress={() => navigation.navigate('EntregaDetalhes', { entrega })}
                  >
                    <View style={styles.row}>
                      <SvgIcon name="details" size={16} color={colors.primaryText} style={{ marginRight: 6 }} />
                      <Text style={styles.buttonText} numberOfLines={1}>Detalhes</Text>
                    </View>
                  </TouchableOpacity>
                  {activeTab === 'ativas' && (entrega.status === 'accepted' || entrega.status === 'picked') && (
                    <TouchableOpacity 
                      style={[styles.button, styles.buttonSecondary, { flex: 1 }]}
                      onPress={() => console.log('Funcionalidade de rastreamento será implementada em breve!')}
                    >
                      <View style={styles.row}>
                        <SvgIcon name="location" size={16} color={colors.textSecondary} style={{ marginRight: 6 }} />
                        <Text style={styles.buttonSecondaryText} numberOfLines={1}>Rastrear</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default EntregasScreen;

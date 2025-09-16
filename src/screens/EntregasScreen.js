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

const EntregasScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];
  
  const { initialTab = 'ativas' } = route.params || {};
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchText, setSearchText] = useState('');

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
  ]);

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
      default:
        return 'Desconhecido';
    }
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'accepted':
        return '✅';
      case 'picked':
        return '📦';
      case 'delivered':
        return '🎉';
      default:
        return '❓';
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


  const currentEntregas = activeTab === 'ativas' ? entregasAtivas : entregasHistorico;

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
          <Text
            style={[
              activeTab === 'ativas' ? styles.buttonText : styles.buttonSecondaryText,
            ]}
          >
            📦 Ativas ({entregasAtivas.length})
          </Text>
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
            📋 Histórico ({entregasHistorico.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Busca */}
      <View style={[styles.card, { marginBottom: 16 }]}>
        <TextInput
          style={{
            backgroundColor: '#333333',
            borderRadius: 8,
            padding: 12,
            color: '#ffffff',
            fontSize: 16,
          }}
          placeholder="Buscar por cliente, endereço ou ID..."
          placeholderTextColor="#999999"
          value={searchText}
          onChangeText={setSearchText}
        />
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
            <View key={entrega.id} style={styles.card}>
              <View style={styles.listItemHeader}>
                <View style={styles.row}>
                  <Text style={[styles.listItemTitle, { marginRight: 8 }]}>
                    {getStatusEmoji(entrega.status)}
                  </Text>
                  <Text style={styles.listItemTitle}>#{entrega.id}</Text>
                </View>
                <View style={getStatusStyle(entrega.status)}>
                  <Text style={getStatusTextStyle(entrega.status)}>
                    {getStatusLabel(entrega.status)}
                  </Text>
                </View>
              </View>

              <Text style={[styles.listItemSubtitle, { marginTop: 8 }]}>
                👤 {entrega.cliente}
              </Text>
              <Text style={[styles.listItemSubtitle, { marginTop: 4 }]}>
                📍 {entrega.endereco}
              </Text>
              <Text style={[styles.listItemSubtitle, { marginTop: 4 }]}>
                ⏰ {entrega.tempo}
              </Text>

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
                  <Text style={styles.buttonText} numberOfLines={1}>📋 Detalhes</Text>
                </TouchableOpacity>
                {activeTab === 'ativas' && (
                  <TouchableOpacity 
                    style={[styles.button, styles.buttonSecondary, { flex: 1 }]}
                    onPress={() => console.log('Funcionalidade de rastreamento será implementada em breve!')}
                  >
                    <Text style={styles.buttonSecondaryText} numberOfLines={1}>📍 Rastrear</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default EntregasScreen;

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Linking,
} from 'react-native';
import styles from '../styles/styles';

const EntregaDetalhesScreen = ({ navigation, route }) => {
  const { entrega } = route.params || {};
  
  const [entregaData] = useState(entrega || {
    id: '47321',
    cliente: 'Maria Silva',
    telefone: '(11) 99999-9999',
    endereco: 'Rua das Flores, 123 - Jardim Primavera',
    status: 'pending',
    tempo: '10 min atrás',
    valor: 'R$ 25,50',
    taxaEntrega: 'R$ 3,50',
    subtotal: 'R$ 22,00',
    itens: [
      { nome: 'Pizza Margherita', quantidade: 1, preco: 'R$ 18,00' },
      { nome: 'Refrigerante Coca-Cola 350ml', quantidade: 1, preco: 'R$ 4,00' }
    ],
    observacoes: 'Entregar no portão da frente. Cliente prefere não tocar a campainha.',
    motoboy: {
      nome: 'João Santos',
      telefone: '(11) 88888-8888',
      placa: 'ABC-1234',
      avaliacao: 4.8
    },
    historico: [
      { status: 'pending', tempo: '10 min atrás', descricao: 'Pedido recebido' },
      { status: 'accepted', tempo: '8 min atrás', descricao: 'Pedido aceito pelo motoboy' },
      { status: 'preparing', tempo: '5 min atrás', descricao: 'Pedido sendo preparado' },
    ]
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return [styles.statusBadge, { backgroundColor: 'rgba(255, 127, 80, 0.2)' }];
      case 'accepted':
        return [styles.statusBadge, { backgroundColor: 'rgba(173, 216, 230, 0.2)' }];
      case 'preparing':
        return [styles.statusBadge, { backgroundColor: 'rgba(255, 140, 0, 0.2)' }];
      case 'picked':
        return [styles.statusBadge, { backgroundColor: 'rgba(255, 140, 0, 0.2)' }];
      case 'delivered':
        return [styles.statusBadge, { backgroundColor: 'rgba(30, 203, 79, 0.2)' }];
      default:
        return [styles.statusBadge];
    }
  };

  const getStatusTextStyle = (status) => {
    switch (status) {
      case 'pending':
        return [styles.statusText, { color: '#ff7f50' }];
      case 'accepted':
        return [styles.statusText, { color: '#ADD8E6' }];
      case 'preparing':
        return [styles.statusText, { color: '#FF8C00' }];
      case 'picked':
        return [styles.statusText, { color: '#FF8C00' }];
      case 'delivered':
        return [styles.statusText, { color: '#1ecb4f' }];
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
      case 'preparing':
        return 'Preparando';
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
      case 'preparing':
        return '👨‍🍳';
      case 'picked':
        return '📦';
      case 'delivered':
        return '🎉';
      default:
        return '❓';
    }
  };

  const handleLigarCliente = () => {
    if (entregaData.telefone) {
      Linking.openURL(`tel:${entregaData.telefone}`);
    } else {
      Alert.alert('Erro', 'Telefone do cliente não disponível');
    }
  };

  const handleLigarMotoboy = () => {
    if (entregaData.motoboy?.telefone) {
      Linking.openURL(`tel:${entregaData.motoboy.telefone}`);
    } else {
      Alert.alert('Erro', 'Telefone do motoboy não disponível');
    }
  };

  const handleRastrear = () => {
    Alert.alert('Rastreamento', 'Funcionalidade de rastreamento em tempo real será implementada em breve!');
  };

  const handleAtualizarStatus = () => {
    Alert.alert('Atualizar Status', 'Funcionalidade para atualizar status da entrega será implementada em breve!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
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
          <Text style={styles.headerTitle}>Detalhes da Entrega</Text>
          <Text style={styles.headerSubtitle}>
            Pedido #{entregaData.id}
          </Text>
        </View>

        {/* Status da Entrega */}
        <View style={styles.card}>
          <View style={styles.listItemHeader}>
            <View style={styles.row}>
              <Text style={[styles.listItemTitle, { marginRight: 8 }]}>
                {getStatusEmoji(entregaData.status)}
              </Text>
              <Text style={styles.listItemTitle}>#{entregaData.id}</Text>
            </View>
            <View style={getStatusStyle(entregaData.status)}>
              <Text style={getStatusTextStyle(entregaData.status)}>
                {getStatusLabel(entregaData.status)}
              </Text>
            </View>
          </View>
          <Text style={[styles.textSecondary, { marginTop: 8 }]}>
            ⏰ {entregaData.tempo}
          </Text>
        </View>

        {/* Informações do Cliente */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informações do Cliente</Text>
          <View style={{ marginTop: 12 }}>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80 }]}>Nome:</Text>
              <Text style={styles.text}>{entregaData.cliente || 'Não informado'}</Text>
            </View>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80 }]}>Telefone:</Text>
              <Text style={styles.text}>{entregaData.telefone || 'Não informado'}</Text>
            </View>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80 }]}>Endereço:</Text>
              <Text style={[styles.text, { flex: 1 }]}>{entregaData.endereco || 'Não informado'}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.button, { marginTop: 12 }]}
            onPress={handleLigarCliente}
          >
            <Text style={styles.buttonText}>📞 Ligar para Cliente</Text>
          </TouchableOpacity>
        </View>

        {/* Informações do Motoboy */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Motoboy Responsável</Text>
          <View style={{ marginTop: 12 }}>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80 }]}>Nome:</Text>
              <Text style={styles.text}>{entregaData.motoboy?.nome || 'Não atribuído'}</Text>
            </View>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80 }]}>Telefone:</Text>
              <Text style={styles.text}>{entregaData.motoboy?.telefone || 'Não informado'}</Text>
            </View>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80 }]}>Placa:</Text>
              <Text style={styles.text}>{entregaData.motoboy?.placa || 'Não informada'}</Text>
            </View>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600', width: 80 }]}>Avaliação:</Text>
              <Text style={styles.text}>⭐ {entregaData.motoboy?.avaliacao || 'N/A'}/5.0</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.button, { marginTop: 12 }]}
            onPress={handleLigarMotoboy}
          >
            <Text style={styles.buttonText}>📞 Ligar para Motoboy</Text>
          </TouchableOpacity>
        </View>

        {/* Itens do Pedido */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Itens do Pedido</Text>
          <View style={{ marginTop: 12 }}>
            {(entregaData.itens || []).map((item, index) => (
              <View key={index} style={[styles.row, styles.spaceBetween, { marginBottom: 8, paddingVertical: 4 }]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.text}>{item.quantidade || 1}x {item.nome || 'Item'}</Text>
                </View>
                <Text style={[styles.textPrimary, { fontWeight: '600' }]}>{item.preco || 'R$ 0,00'}</Text>
              </View>
            ))}
          </View>
          
          <View style={{ borderTopWidth: 1, borderTopColor: '#333333', marginTop: 12, paddingTop: 12 }}>
            <View style={[styles.row, styles.spaceBetween, { marginBottom: 4 }]}>
              <Text style={styles.textSecondary}>Subtotal:</Text>
              <Text style={styles.text}>{entregaData.subtotal || 'R$ 0,00'}</Text>
            </View>
            <View style={[styles.row, styles.spaceBetween, { marginBottom: 4 }]}>
              <Text style={styles.textSecondary}>Taxa de Entrega:</Text>
              <Text style={styles.text}>{entregaData.taxaEntrega || 'R$ 0,00'}</Text>
            </View>
            <View style={[styles.row, styles.spaceBetween, { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#333333' }]}>
              <Text style={[styles.text, { fontWeight: 'bold', fontSize: 16 }]}>Total:</Text>
              <Text style={[styles.textPrimary, { fontWeight: 'bold', fontSize: 18 }]}>{entregaData.valor || 'R$ 0,00'}</Text>
            </View>
          </View>
        </View>

        {/* Observações */}
        {entregaData.observacoes && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Observações</Text>
            <Text style={[styles.text, { marginTop: 12, lineHeight: 20 }]}>
              {entregaData.observacoes}
            </Text>
          </View>
        )}

        {/* Histórico da Entrega */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Histórico da Entrega</Text>
          <View style={{ marginTop: 12 }}>
            {(entregaData.historico || []).map((item, index) => (
              <View key={index} style={[styles.row, { marginBottom: 12, alignItems: 'flex-start' }]}>
                <View style={{ marginRight: 12, marginTop: 2 }}>
                  <View style={[
                    { 
                      width: 12, 
                      height: 12, 
                      borderRadius: 6, 
                      backgroundColor: index === 0 ? '#FF7300' : '#333333' 
                    }
                  ]} />
                  {index < (entregaData.historico || []).length - 1 && (
                    <View style={{ 
                      width: 2, 
                      height: 20, 
                      backgroundColor: '#333333', 
                      marginLeft: 5, 
                      marginTop: 2 
                    }} />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.text}>{item.descricao || 'Status atualizado'}</Text>
                  <Text style={[styles.textSecondary, { fontSize: 12, marginTop: 2 }]}>
                    {item.tempo || 'Agora'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Ações */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ações</Text>
          <View style={{ marginTop: 12 }}>
            <TouchableOpacity 
              style={[styles.button, { marginBottom: 12 }]}
              onPress={handleRastrear}
            >
              <Text style={styles.buttonText}>📍 Rastrear Entrega</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.buttonSecondary, { marginBottom: 12 }]}
              onPress={handleAtualizarStatus}
            >
              <Text style={styles.buttonSecondaryText}>🔄 Atualizar Status</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#FF4500', borderColor: '#FF4500', borderWidth: 1 }]}
              onPress={() => Alert.alert('Cancelar', 'Funcionalidade de cancelamento será implementada em breve!')}
            >
              <Text style={[styles.buttonText, { color: '#ffffff' }]}>❌ Cancelar Entrega</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EntregaDetalhesScreen;

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { createDynamicStyles } from '../styles/dynamicStyles';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import StatusCard from '../components/StatusCard';

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);
  
  const [stats] = useState({
    entregasHoje: 12,
    entregasAndamento: 5,
    tempoMedio: '28 min',
    faturamentoDia: 'R$ 380,00',
  });

  const [entregasAtivas] = useState([
    {
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
    },
    {
      id: '47320',
      cliente: 'João Pereira',
      telefone: '(11) 88888-7777',
      endereco: 'Av. Paulista, 1000 - Bela Vista',
      status: 'accepted',
      tempo: '30 min atrás',
      valor: 'R$ 45,00',
      taxaEntrega: 'R$ 5,00',
      subtotal: 'R$ 40,00',
      itens: [
        { nome: 'Hambúrguer Artesanal', quantidade: 2, preco: 'R$ 20,00' },
        { nome: 'Batata Frita', quantidade: 1, preco: 'R$ 8,00' },
        { nome: 'Suco Natural', quantidade: 2, preco: 'R$ 12,00' }
      ],
      observacoes: 'Entregar no apartamento 15A. Portão eletrônico.',
      motoboy: {
        nome: 'Carlos Oliveira',
        telefone: '(11) 77777-6666',
        placa: 'DEF-5678',
        avaliacao: 4.9
      },
      historico: [
        { status: 'pending', tempo: '30 min atrás', descricao: 'Pedido recebido' },
        { status: 'accepted', tempo: '25 min atrás', descricao: 'Pedido aceito pelo motoboy' },
        { status: 'preparing', tempo: '20 min atrás', descricao: 'Pedido sendo preparado' },
        { status: 'ready', tempo: '10 min atrás', descricao: 'Pedido pronto para coleta' },
      ]
    },
    {
      id: '47315',
      cliente: 'Ana Souza',
      telefone: '(11) 77777-5555',
      endereco: 'Rua Augusta, 2500 - Jardins',
      status: 'picked',
      tempo: '45 min atrás',
      valor: 'R$ 32,00',
      taxaEntrega: 'R$ 4,00',
      subtotal: 'R$ 28,00',
      itens: [
        { nome: 'Salada Caesar', quantidade: 1, preco: 'R$ 18,00' },
        { nome: 'Água Mineral', quantidade: 1, preco: 'R$ 3,00' },
        { nome: 'Pão de Alho', quantidade: 1, preco: 'R$ 7,00' }
      ],
      observacoes: 'Entregar na recepção do prédio comercial.',
      motoboy: {
        nome: 'Pedro Costa',
        telefone: '(11) 66666-4444',
        placa: 'GHI-9012',
        avaliacao: 4.7
      },
      historico: [
        { status: 'pending', tempo: '45 min atrás', descricao: 'Pedido recebido' },
        { status: 'accepted', tempo: '40 min atrás', descricao: 'Pedido aceito pelo motoboy' },
        { status: 'preparing', tempo: '35 min atrás', descricao: 'Pedido sendo preparado' },
        { status: 'ready', tempo: '25 min atrás', descricao: 'Pedido pronto para coleta' },
        { status: 'picked', tempo: '15 min atrás', descricao: 'Pedido coletado pelo motoboy' },
      ]
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

  return (
    <SafeAreaWrapper>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>
            Bem-vindo ao seu painel de controle de entregas
          </Text>
          <TouchableOpacity 
            style={[styles.button, { marginTop: 16 }]}
            onPress={() => navigation.navigate('NovaEntrega')}
          >
            <Text style={styles.buttonText}>Nova Entrega</Text>
          </TouchableOpacity>
        </View>
        {/* Estatísticas */}
        <View style={[styles.statsContainer, { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }]}>
          <View style={[styles.statCard, { width: '48%', marginBottom: 16, minHeight: 100, paddingVertical: 16 }]}>
            <Text style={styles.statValue}>{stats.entregasHoje}</Text>
            <Text style={styles.statLabel}>Entregas Hoje</Text>
            <Text style={[styles.statLabel, { fontSize: 11, marginTop: 6, color: '#1ecb4f', lineHeight: 14 }]}>
              2 entregas a mais que ontem
            </Text>
          </View>
          <View style={[styles.statCard, { width: '48%', marginBottom: 16, minHeight: 100, paddingVertical: 16 }]}>
            <Text style={styles.statValue}>{stats.entregasAndamento}</Text>
            <Text style={styles.statLabel}>Em Andamento</Text>
            <Text style={[styles.statLabel, { fontSize: 11, marginTop: 6, color: '#FFD700', lineHeight: 14 }]}>
              3 pendentes, 2 em rota
            </Text>
          </View>
          <View style={[styles.statCard, { width: '48%', marginBottom: 16, minHeight: 100, paddingVertical: 16 }]}>
            <Text style={styles.statValue}>{stats.tempoMedio}</Text>
            <Text style={styles.statLabel}>Tempo Médio</Text>
            <Text style={[styles.statLabel, { fontSize: 11, marginTop: 6, lineHeight: 14 }]}>
              Média das últimas 24h
            </Text>
          </View>
          <View style={[styles.statCard, { width: '48%', marginBottom: 16, minHeight: 100, paddingVertical: 16 }]}>
            <Text style={styles.statValue}>{stats.faturamentoDia}</Text>
            <Text style={styles.statLabel}>Faturamento</Text>
            <Text style={[styles.statLabel, { fontSize: 11, marginTop: 6, color: '#1ecb4f', lineHeight: 14 }]}>
              12 entregas realizadas
            </Text>
          </View>
        </View>

        {/* Status do Sistema */}
        <StatusCard 
          status="operational"
          title="Status do Sistema"
          subtitle="Motoboys disponíveis próximos"
        >
          <View style={[styles.row, styles.spaceBetween, { marginTop: 16, flexWrap: 'wrap' }]}>
            <View style={{ minWidth: '30%', marginBottom: 12 }}>
              <Text style={styles.textSecondary}>Motoboys Online</Text>
              <Text style={[styles.textPrimary, { fontSize: 20, fontWeight: 'bold' }]}>9</Text>
            </View>
            <View style={{ minWidth: '30%', marginBottom: 12 }}>
              <Text style={styles.textSecondary}>Tempo de Aceite</Text>
              <Text style={[styles.textPrimary, { fontSize: 20, fontWeight: 'bold' }]}>~4 min</Text>
            </View>
            <View style={{ minWidth: '30%', marginBottom: 12 }}>
              <Text style={styles.textSecondary}>Status</Text>
              <View style={[styles.statusBadge, { backgroundColor: 'rgba(30, 203, 79, 0.2)', marginTop: 4 }]}>
                <Text style={[styles.statusText, { color: '#1ecb4f' }]}>Operacional</Text>
              </View>
            </View>
          </View>
        </StatusCard>

        {/* Entregas Ativas */}
        <StatusCard 
          status="info"
          title="Entregas Ativas"
        >
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={() => navigation.navigate('Entregas', { 
              screen: 'EntregasList',
              params: { initialTab: 'ativas' }
            })}>
              <Text style={styles.textPrimary}>Ver Todas</Text>
            </TouchableOpacity>
          </View>
          
          {entregasAtivas.slice(0, 2).map((entrega, index) => (
            <TouchableOpacity 
              key={entrega.id} 
              style={[styles.listItem, { 
                marginBottom: index < Math.min(entregasAtivas.length, 2) - 1 ? 16 : 0,
                paddingVertical: 12,
                minHeight: 80
              }]}
              onPress={() => navigation.navigate('Entregas', { 
                screen: 'EntregaDetalhes', 
                params: { entrega } 
              })}
              activeOpacity={0.7}
            >
              <View style={styles.listItemHeader}>
                <Text style={styles.listItemTitle}>#{entrega.id}</Text>
                <View style={getStatusStyle(entrega.status)}>
                  <Text style={getStatusTextStyle(entrega.status)}>
                    {getStatusLabel(entrega.status)}
                  </Text>
                </View>
              </View>
              <Text style={[styles.listItemSubtitle, { marginTop: 6, lineHeight: 18 }]}>{entrega.cliente}</Text>
              <Text style={[styles.listItemSubtitle, { marginTop: 6, lineHeight: 18 }]}>
                {entrega.endereco}
              </Text>
              <Text style={[styles.listItemSubtitle, { marginTop: 8, fontSize: 12, lineHeight: 16 }]}>
                {entrega.tempo}
              </Text>
            </TouchableOpacity>
          ))}
          
          {entregasAtivas.length > 2 && (
            <TouchableOpacity 
              style={[styles.button, styles.buttonSecondary, { marginTop: 12 }]}
              onPress={() => navigation.navigate('Entregas', { 
                screen: 'EntregasList',
                params: { initialTab: 'ativas' }
              })}
            >
              <Text style={styles.buttonSecondaryText}>
                Ver mais {entregasAtivas.length - 2} entregas
              </Text>
            </TouchableOpacity>
          )}
        </StatusCard>

        {/* Ações Rápidas */}
        <StatusCard 
          status="info"
          title="Ações Rápidas"
        >
          <View style={[styles.row, styles.spaceBetween, { marginTop: 16 }]}>
            <TouchableOpacity style={[styles.button, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.buttonText}>📦 Nova Entrega</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonSecondary, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.buttonSecondaryText}>📊 Relatórios</Text>
            </TouchableOpacity>
          </View>
        </StatusCard>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;

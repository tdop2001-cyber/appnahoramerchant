import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import styles from '../styles/styles';

const ConfiguracoesScreen = () => {
  const [notificacoes, setNotificacoes] = useState(true);
  const [som, setSom] = useState(true);
  const [vibracao, setVibracao] = useState(true);
  const [modoEscuro, setModoEscuro] = useState(true);

  const [restauranteInfo] = useState({
    nome: 'Restaurante Sabor & Arte',
    endereco: 'Rua das Flores, 123 - Centro',
    telefone: '(11) 99999-9999',
    email: 'contato@saborarte.com',
    cnpj: '12.345.678/0001-90',
  });

  const handleLogout = () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: () => console.log('Logout') },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir Conta',
      'Esta ação não pode ser desfeita. Tem certeza?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => console.log('Delete account') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configurações</Text>
        <Text style={styles.headerSubtitle}>
          Gerencie suas preferências e informações
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Informações do Restaurante */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏪 Informações do Restaurante</Text>
          <View style={{ marginTop: 16 }}>
            <View style={[styles.row, styles.spaceBetween, { marginBottom: 12 }]}>
              <Text style={styles.textSecondary}>Nome</Text>
              <Text style={styles.text}>{restauranteInfo.nome}</Text>
            </View>
            <View style={[styles.row, styles.spaceBetween, { marginBottom: 12 }]}>
              <Text style={styles.textSecondary}>Endereço</Text>
              <Text style={[styles.text, { flex: 1, textAlign: 'right' }]}>
                {restauranteInfo.endereco}
              </Text>
            </View>
            <View style={[styles.row, styles.spaceBetween, { marginBottom: 12 }]}>
              <Text style={styles.textSecondary}>Telefone</Text>
              <Text style={styles.text}>{restauranteInfo.telefone}</Text>
            </View>
            <View style={[styles.row, styles.spaceBetween, { marginBottom: 12 }]}>
              <Text style={styles.textSecondary}>Email</Text>
              <Text style={styles.text}>{restauranteInfo.email}</Text>
            </View>
            <View style={[styles.row, styles.spaceBetween]}>
              <Text style={styles.textSecondary}>CNPJ</Text>
              <Text style={styles.text}>{restauranteInfo.cnpj}</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.button, { marginTop: 16 }]}>
            <Text style={styles.buttonText}>✏️ Editar Informações</Text>
          </TouchableOpacity>
        </View>

        {/* Configurações de Notificações */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔔 Notificações</Text>
          <View style={{ marginTop: 16 }}>
            <View style={[styles.row, styles.spaceBetween, { marginBottom: 16 }]}>
              <View style={styles.flex1}>
                <Text style={styles.text}>Notificações Push</Text>
                <Text style={styles.textSecondary}>
                  Receber notificações sobre novos pedidos
                </Text>
              </View>
              <Switch
                value={notificacoes}
                onValueChange={setNotificacoes}
                trackColor={{ false: '#333333', true: '#FF7300' }}
                thumbColor={notificacoes ? '#ffffff' : '#999999'}
              />
            </View>
            <View style={[styles.row, styles.spaceBetween, { marginBottom: 16 }]}>
              <View style={styles.flex1}>
                <Text style={styles.text}>Som</Text>
                <Text style={styles.textSecondary}>
                  Reproduzir sons para notificações
                </Text>
              </View>
              <Switch
                value={som}
                onValueChange={setSom}
                trackColor={{ false: '#333333', true: '#FF7300' }}
                thumbColor={som ? '#ffffff' : '#999999'}
              />
            </View>
            <View style={[styles.row, styles.spaceBetween]}>
              <View style={styles.flex1}>
                <Text style={styles.text}>Vibração</Text>
                <Text style={styles.textSecondary}>
                  Vibrar ao receber notificações
                </Text>
              </View>
              <Switch
                value={vibracao}
                onValueChange={setVibracao}
                trackColor={{ false: '#333333', true: '#FF7300' }}
                thumbColor={vibracao ? '#ffffff' : '#999999'}
              />
            </View>
          </View>
        </View>

        {/* Configurações de Aparência */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎨 Aparência</Text>
          <View style={{ marginTop: 16 }}>
            <View style={[styles.row, styles.spaceBetween]}>
              <View style={styles.flex1}>
                <Text style={styles.text}>Modo Escuro</Text>
                <Text style={styles.textSecondary}>
                  Usar tema escuro (recomendado)
                </Text>
              </View>
              <Switch
                value={modoEscuro}
                onValueChange={setModoEscuro}
                trackColor={{ false: '#333333', true: '#FF7300' }}
                thumbColor={modoEscuro ? '#ffffff' : '#999999'}
              />
            </View>
          </View>
        </View>

        {/* Configurações de Conta */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>👤 Conta</Text>
          <View style={{ marginTop: 16 }}>
            <TouchableOpacity style={[styles.row, styles.spaceBetween, { marginBottom: 16 }]}>
              <View style={styles.row}>
                <Text style={{ fontSize: 20, marginRight: 12 }}>🔒</Text>
                <View>
                  <Text style={styles.text}>Alterar Senha</Text>
                  <Text style={styles.textSecondary}>Atualizar sua senha de acesso</Text>
                </View>
              </View>
              <Text style={styles.textSecondary}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.row, styles.spaceBetween, { marginBottom: 16 }]}>
              <View style={styles.row}>
                <Text style={{ fontSize: 20, marginRight: 12 }}>💳</Text>
                <View>
                  <Text style={styles.text}>Métodos de Pagamento</Text>
                  <Text style={styles.textSecondary}>Gerenciar formas de recebimento</Text>
                </View>
              </View>
              <Text style={styles.textSecondary}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.row, styles.spaceBetween, { marginBottom: 16 }]}>
              <View style={styles.row}>
                <Text style={{ fontSize: 20, marginRight: 12 }}>📊</Text>
                <View>
                  <Text style={styles.text}>Relatórios</Text>
                  <Text style={styles.textSecondary}>Visualizar relatórios de vendas</Text>
                </View>
              </View>
              <Text style={styles.textSecondary}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.row, styles.spaceBetween]}>
              <View style={styles.row}>
                <Text style={{ fontSize: 20, marginRight: 12 }}>❓</Text>
                <View>
                  <Text style={styles.text}>Ajuda e Suporte</Text>
                  <Text style={styles.textSecondary}>Central de ajuda e contato</Text>
                </View>
              </View>
              <Text style={styles.textSecondary}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ações da Conta */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚠️ Ações da Conta</Text>
          <View style={{ marginTop: 16 }}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary, { marginBottom: 12 }]}
              onPress={handleLogout}
            >
              <Text style={styles.buttonSecondaryText}>🚪 Sair da Conta</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#FF4500' }]}
              onPress={handleDeleteAccount}
            >
              <Text style={styles.buttonText}>🗑️ Excluir Conta</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Informações do App */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>ℹ️ Sobre o App</Text>
          <View style={{ marginTop: 16 }}>
            <View style={[styles.row, styles.spaceBetween, { marginBottom: 12 }]}>
              <Text style={styles.textSecondary}>Versão</Text>
              <Text style={styles.text}>1.0.0</Text>
            </View>
            <View style={[styles.row, styles.spaceBetween, { marginBottom: 12 }]}>
              <Text style={styles.textSecondary}>Última Atualização</Text>
              <Text style={styles.text}>15/09/2025</Text>
            </View>
            <View style={[styles.row, styles.spaceBetween]}>
              <Text style={styles.textSecondary}>Desenvolvido por</Text>
              <Text style={styles.text}>VaiJá Team</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfiguracoesScreen;

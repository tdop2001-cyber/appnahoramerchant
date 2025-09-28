import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { createDynamicStyles } from '../styles/dynamicStyles';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import SvgIcon from '../components/SvgIcon';

const ConfiguracoesScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];
  
  const [notificacoes, setNotificacoes] = useState(true);
  const [som, setSom] = useState(true);
  const [vibracao, setVibracao] = useState(true);

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
    <SafeAreaWrapper>
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
          <View style={styles.row}>
            <SvgIcon name="home" size={20} color={colors.primary} style={{ marginRight: 8 }} />
            <Text style={styles.cardTitle}>Informações do Restaurante</Text>
          </View>
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
          <TouchableOpacity 
            style={[styles.button, { marginTop: 16 }]}
            onPress={() => navigation.navigate('InformacoesRestaurante')}
          >
            <View style={styles.row}>
              <SvgIcon name="edit" size={16} color={colors.primaryText} style={{ marginRight: 8 }} />
              <Text style={styles.buttonText}>Editar Informações</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Configurações de Notificações */}
        <View style={styles.card}>
          <View style={styles.row}>
            <SvgIcon name="bell" size={20} color={colors.primary} style={{ marginRight: 8 }} />
            <Text style={styles.cardTitle}>Notificações</Text>
          </View>
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
                trackColor={{ false: colors.secondary, true: colors.primary }}
                thumbColor={notificacoes ? colors.primaryText : colors.textSecondary}
                style={styles.toggleSwitch}
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
                trackColor={{ false: colors.secondary, true: colors.primary }}
                thumbColor={som ? colors.primaryText : colors.textSecondary}
                style={styles.toggleSwitch}
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
                trackColor={{ false: colors.secondary, true: colors.primary }}
                thumbColor={vibracao ? colors.primaryText : colors.textSecondary}
                style={styles.toggleSwitch}
              />
            </View>
          </View>
        </View>

        {/* Configurações de Aparência */}
        <View style={styles.card}>
          <View style={styles.row}>
            <SvgIcon name="palette" size={20} color={colors.primary} style={{ marginRight: 8 }} />
            <Text style={styles.cardTitle}>Aparência</Text>
          </View>
          <View style={{ marginTop: 16 }}>
            <View style={[styles.row, styles.spaceBetween]}>
              <View style={styles.flex1}>
                <Text style={styles.text}>Modo Escuro</Text>
                <Text style={styles.textSecondary}>
                  {theme.isDarkMode ? 'Usar tema escuro (recomendado)' : 'Usar tema claro com dock laranja'}
                </Text>
              </View>
              <Switch
                value={theme.isDarkMode}
                onValueChange={theme.toggleTheme}
                trackColor={{ false: colors.secondary, true: colors.primary }}
                thumbColor={theme.isDarkMode ? colors.primaryText : colors.textSecondary}
                style={styles.toggleSwitch}
              />
            </View>
          </View>
        </View>

        {/* Configurações de Conta */}
        <View style={styles.card}>
          <View style={styles.row}>
            <SvgIcon name="user" size={20} color={colors.primary} style={{ marginRight: 8 }} />
            <Text style={styles.cardTitle}>Conta</Text>
          </View>
          <View style={{ marginTop: 16 }}>
            <TouchableOpacity 
              style={[styles.row, styles.spaceBetween, { marginBottom: 16 }]}
              onPress={() => navigation.navigate('AlterarSenha')}
            >
              <View style={styles.row}>
                <SvgIcon name="lock" size={20} color={colors.text} style={{ marginRight: 12 }} />
                <View>
                  <Text style={styles.text}>Alterar Senha</Text>
                  <Text style={styles.textSecondary}>Atualizar sua senha de acesso</Text>
                </View>
              </View>
              <Text style={styles.textSecondary}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.row, styles.spaceBetween, { marginBottom: 16 }]}
              onPress={() => navigation.navigate('MetodosPagamento')}
            >
              <View style={styles.row}>
                <SvgIcon name="credit-card" size={20} color={colors.text} style={{ marginRight: 12 }} />
                <View>
                  <Text style={styles.text}>Métodos de Pagamento</Text>
                  <Text style={styles.textSecondary}>Gerenciar formas de recebimento</Text>
                </View>
              </View>
              <Text style={styles.textSecondary}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.row, styles.spaceBetween, { marginBottom: 16 }]}
              onPress={() => navigation.navigate('EnderecosRetirada')}
            >
              <View style={styles.row}>
                <SvgIcon name="location" size={20} color={colors.text} style={{ marginRight: 12 }} />
                <View>
                  <Text style={styles.text}>Endereços de Retirada</Text>
                  <Text style={styles.textSecondary}>Gerenciar endereços para coleta</Text>
                </View>
              </View>
              <Text style={styles.textSecondary}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.row, styles.spaceBetween, { marginBottom: 16 }]}
              onPress={() => navigation.navigate('Relatorios')}
            >
              <View style={styles.row}>
                <SvgIcon name="chart" size={20} color={colors.text} style={{ marginRight: 12 }} />
                <View>
                  <Text style={styles.text}>Relatórios</Text>
                  <Text style={styles.textSecondary}>Visualizar relatórios de vendas</Text>
                </View>
              </View>
              <Text style={styles.textSecondary}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.row, styles.spaceBetween]}
              onPress={() => navigation.navigate('AjudaSuporte')}
            >
              <View style={styles.row}>
                <SvgIcon name="question" size={20} color={colors.text} style={{ marginRight: 12 }} />
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
          <View style={styles.row}>
            <SvgIcon name="warning" size={20} color={colors.destructive || '#FF4500'} style={{ marginRight: 8 }} />
            <Text style={styles.cardTitle}>Ações da Conta</Text>
          </View>
          <View style={{ marginTop: 16 }}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary, { marginBottom: 12 }]}
              onPress={handleLogout}
            >
              <View style={styles.row}>
                <SvgIcon name="exit" size={16} color={colors.textSecondary} style={{ marginRight: 8 }} />
                <Text style={styles.buttonSecondaryText}>Sair da Conta</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#FF4500' }]}
              onPress={handleDeleteAccount}
            >
              <View style={styles.row}>
                <SvgIcon name="trash" size={16} color={colors.primaryText} style={{ marginRight: 8 }} />
                <Text style={styles.buttonText}>Excluir Conta</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Informações do App */}
        <View style={styles.card}>
          <View style={styles.row}>
            <SvgIcon name="info" size={20} color={colors.primary} style={{ marginRight: 8 }} />
            <Text style={styles.cardTitle}>Sobre o App</Text>
          </View>
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
    </SafeAreaWrapper>
  );
};

export default ConfiguracoesScreen;

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { createDynamicStyles } from '../styles/dynamicStyles';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

const AjudaSuporteScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];
  
  const [pergunta, setPergunta] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

  const categorias = [
    {
      id: 'conta',
      titulo: 'Conta e Perfil',
      descricao: 'Gerenciamento de conta, senha e dados pessoais',
      icone: '👤',
      cor: '#4CAF50',
    },
    {
      id: 'pedidos',
      titulo: 'Pedidos e Entregas',
      descricao: 'Como gerenciar pedidos e acompanhar entregas',
      icone: '📦',
      cor: '#2196F3',
    },
    {
      id: 'pagamentos',
      titulo: 'Pagamentos',
      descricao: 'Métodos de pagamento e problemas financeiros',
      icone: '💳',
      cor: '#FF9800',
    },
    {
      id: 'produtos',
      titulo: 'Produtos e Cardápio',
      descricao: 'Como adicionar e gerenciar produtos',
      icone: '🍽️',
      cor: '#9C27B0',
    },
    {
      id: 'tecnico',
      titulo: 'Problemas Técnicos',
      descricao: 'Erros no app e problemas de funcionamento',
      icone: '🔧',
      cor: '#F44336',
    },
  ];

  const perguntasFrequentes = [
    {
      pergunta: 'Como alterar minha senha?',
      resposta: 'Vá em Configurações > Conta > Alterar Senha e siga as instruções.',
      categoria: 'conta',
    },
    {
      pergunta: 'Como adicionar um novo produto?',
      resposta: 'Acesse Produtos > + Adicionar Produto e preencha as informações necessárias.',
      categoria: 'produtos',
    },
    {
      pergunta: 'Como acompanhar minhas entregas?',
      resposta: 'Na tela Entregas você pode ver o status de todos os pedidos em tempo real.',
      categoria: 'pedidos',
    },
    {
      pergunta: 'Como configurar métodos de pagamento?',
      resposta: 'Vá em Configurações > Métodos de Pagamento para adicionar ou editar.',
      categoria: 'pagamentos',
    },
    {
      pergunta: 'O app está travando, o que fazer?',
      resposta: 'Tente fechar e reabrir o app. Se persistir, entre em contato conosco.',
      categoria: 'tecnico',
    },
  ];

  const contatos = [
    {
      tipo: 'WhatsApp',
      valor: '(11) 99999-9999',
      icone: '📱',
      cor: '#25D366',
      acao: () => Linking.openURL('https://wa.me/5511999999999'),
    },
    {
      tipo: 'Email',
      valor: 'suporte@vaija.com',
      icone: '📧',
      cor: '#FF9800',
      acao: () => Linking.openURL('mailto:suporte@vaija.com'),
    },
    {
      tipo: 'Telefone',
      valor: '(11) 3333-4444',
      icone: '📞',
      cor: '#2196F3',
      acao: () => Linking.openURL('tel:+551133334444'),
    },
  ];

  const handleEnviarPergunta = () => {
    if (!pergunta.trim()) {
      Alert.alert('Erro', 'Digite sua pergunta');
      return;
    }

    if (!categoriaSelecionada) {
      Alert.alert('Erro', 'Selecione uma categoria');
      return;
    }

    Alert.alert(
      'Pergunta Enviada',
      'Sua pergunta foi enviada com sucesso! Entraremos em contato em breve.',
      [{ text: 'OK', onPress: () => {
        setPergunta('');
        setCategoriaSelecionada('');
      }}]
    );
  };

  const handleContato = (contato) => {
    contato.acao();
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
          <Text style={styles.headerTitle}>Ajuda e Suporte</Text>
          <Text style={styles.headerSubtitle}>
            Central de ajuda e contato para resolver suas dúvidas
          </Text>
        </View>

        {/* Busca Rápida */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔍 Busca Rápida</Text>
          <View style={{ marginTop: 16 }}>
            <TextInput
              style={[styles.input, { marginBottom: 12 }]}
              placeholder="Digite sua dúvida aqui..."
              placeholderTextColor={colors.textSecondary}
              value={pergunta}
              onChangeText={setPergunta}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => Alert.alert('Busca', 'Funcionalidade em desenvolvimento')}
            >
              <Text style={styles.buttonText}>🔍 Buscar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categorias de Ajuda */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📚 Categorias de Ajuda</Text>
          <View style={{ marginTop: 16 }}>
            {categorias.map((categoria) => (
              <TouchableOpacity
                key={categoria.id}
                style={[
                  styles.row,
                  {
                    padding: 16,
                    borderRadius: 8,
                    marginBottom: 12,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderLeftWidth: 4,
                    borderLeftColor: categoria.cor,
                  }
                ]}
                onPress={() => setCategoriaSelecionada(categoria.id)}
              >
                <View style={{ marginRight: 16 }}>
                  <Text style={{ fontSize: 24 }}>{categoria.icone}</Text>
                </View>
                <View style={styles.flex1}>
                  <Text style={[styles.text, { fontWeight: '600', marginBottom: 4 }]}>
                    {categoria.titulo}
                  </Text>
                  <Text style={[styles.textSecondary, { fontSize: 12, lineHeight: 16 }]}>
                    {categoria.descricao}
                  </Text>
                </View>
                <View style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: categoriaSelecionada === categoria.id ? categoria.cor : '#555555',
                  backgroundColor: categoriaSelecionada === categoria.id ? categoria.cor : 'transparent',
                }} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Perguntas Frequentes */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>❓ Perguntas Frequentes</Text>
          <View style={{ marginTop: 16 }}>
            {perguntasFrequentes.map((faq, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }}
                onPress={() => Alert.alert(faq.pergunta, faq.resposta)}
              >
                <Text style={[styles.text, { fontWeight: '600', marginBottom: 4 }]}>
                  {faq.pergunta}
                </Text>
                <Text style={[styles.textSecondary, { fontSize: 12 }]}>
                  Toque para ver a resposta
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Enviar Pergunta */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💬 Enviar Pergunta</Text>
          <View style={{ marginTop: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Sua Pergunta
            </Text>
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: 'top', marginBottom: 16 }]}
              placeholder="Descreva sua dúvida ou problema..."
              placeholderTextColor={colors.textSecondary}
              value={pergunta}
              onChangeText={setPergunta}
              multiline
            />
            
            <TouchableOpacity
              style={[styles.button, { marginBottom: 16 }]}
              onPress={handleEnviarPergunta}
            >
              <Text style={styles.buttonText}>📤 Enviar Pergunta</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contatos */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📞 Entre em Contato</Text>
          <View style={{ marginTop: 16 }}>
            {contatos.map((contato, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.row,
                  styles.spaceBetween,
                  {
                    padding: 16,
                    borderRadius: 8,
                    marginBottom: 12,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderLeftWidth: 4,
                    borderLeftColor: contato.cor,
                  }
                ]}
                onPress={() => handleContato(contato)}
              >
                <View style={styles.row}>
                  <Text style={{ fontSize: 20, marginRight: 12 }}>{contato.icone}</Text>
                  <View>
                    <Text style={[styles.text, { fontWeight: '600' }]}>
                      {contato.tipo}
                    </Text>
                    <Text style={styles.textSecondary}>
                      {contato.valor}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.textSecondary, { fontSize: 20 }]}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Informações Adicionais */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>ℹ️ Informações</Text>
          <View style={{ marginTop: 16 }}>
            <View style={[styles.row, styles.spaceBetween, { marginBottom: 12 }]}>
              <Text style={styles.textSecondary}>Horário de Atendimento</Text>
              <Text style={styles.text}>24h por dia</Text>
            </View>
            <View style={[styles.row, styles.spaceBetween, { marginBottom: 12 }]}>
              <Text style={styles.textSecondary}>Tempo de Resposta</Text>
              <Text style={styles.text}>Até 2 horas</Text>
            </View>
            <View style={[styles.row, styles.spaceBetween]}>
              <Text style={styles.textSecondary}>Versão do App</Text>
              <Text style={styles.text}>1.0.0</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default AjudaSuporteScreen;

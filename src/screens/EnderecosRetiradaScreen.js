import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { createDynamicStyles } from '../styles/dynamicStyles';

const EnderecosRetiradaScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];
  
  const [enderecos, setEnderecos] = useState([
    {
      id: 1,
      nome: 'Restaurante Principal',
      rua: 'Rua das Flores',
      numero: '123',
      bairro: 'Centro',
      referencia: 'Próximo ao shopping',
      ativo: true,
    },
    {
      id: 2,
      nome: 'Filial Norte',
      rua: 'Av. Paulista',
      numero: '1000',
      bairro: 'Bela Vista',
      referencia: 'Edifício comercial',
      ativo: false,
    },
  ]);

  const [novoEndereco, setNovoEndereco] = useState({
    nome: '',
    rua: '',
    numero: '',
    bairro: '',
    referencia: '',
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleAdicionarEndereco = () => {
    if (!novoEndereco.nome.trim() || !novoEndereco.rua.trim() || 
        !novoEndereco.numero.trim() || !novoEndereco.bairro.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    const endereco = {
      id: Date.now(),
      ...novoEndereco,
      ativo: enderecos.length === 0, // Primeiro endereço fica ativo por padrão
    };

    setEnderecos([...enderecos, endereco]);
    setNovoEndereco({ nome: '', rua: '', numero: '', bairro: '', referencia: '' });
    setMostrarFormulario(false);
    Alert.alert('Sucesso', 'Endereço adicionado com sucesso!');
  };

  const handleToggleAtivo = (id) => {
    setEnderecos(enderecos.map(endereco => ({
      ...endereco,
      ativo: endereco.id === id ? !endereco.ativo : false // Só um pode estar ativo
    })));
  };

  const handleRemoverEndereco = (id) => {
    Alert.alert(
      'Remover Endereço',
      'Tem certeza que deseja remover este endereço?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Remover', 
          style: 'destructive',
          onPress: () => {
            setEnderecos(enderecos.filter(endereco => endereco.id !== id));
            Alert.alert('Sucesso', 'Endereço removido com sucesso!');
          }
        },
      ]
    );
  };

  const handleEditarEndereco = (endereco) => {
    // Implementar edição de endereço
    Alert.alert('Editar', 'Funcionalidade de edição será implementada em breve!');
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
          <Text style={styles.headerTitle}>Endereços de Retirada</Text>
          <Text style={styles.headerSubtitle}>
            Gerencie os endereços onde os motoboys podem buscar os pedidos
          </Text>
        </View>

        {/* Lista de Endereços */}
        {enderecos.length === 0 ? (
          <View style={[styles.card, styles.center, { paddingVertical: 40 }]}>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>📍</Text>
            <Text style={[styles.text, { fontSize: 18, marginBottom: 8 }]}>
              Nenhum endereço cadastrado
            </Text>
            <Text style={styles.textSecondary}>
              Adicione pelo menos um endereço para começar
            </Text>
          </View>
        ) : (
          enderecos.map((endereco) => (
            <View key={endereco.id} style={styles.card}>
              <View style={styles.listItemHeader}>
                <View style={styles.flex1}>
                  <Text style={styles.listItemTitle}>{endereco.nome}</Text>
                  <Text style={styles.listItemSubtitle}>
                    {endereco.rua}, {endereco.numero} - {endereco.bairro}
                  </Text>
                  {endereco.referencia && (
                    <Text style={[styles.textSecondary, { fontSize: 12, marginTop: 4 }]}>
                      📍 {endereco.referencia}
                    </Text>
                  )}
                </View>
                <View style={[
                  styles.statusBadge,
                  endereco.ativo 
                    ? { backgroundColor: 'rgba(30, 203, 79, 0.2)' }
                    : { backgroundColor: 'rgba(153, 153, 153, 0.2)' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    endereco.ativo ? { color: '#1ecb4f' } : { color: '#999999' }
                  ]}>
                    {endereco.ativo ? 'Ativo' : 'Inativo'}
                  </Text>
                </View>
              </View>

              <View style={[styles.row, styles.spaceBetween, { marginTop: 12 }]}>
                <TouchableOpacity
                  style={[styles.button, { flex: 1, marginRight: 4, paddingVertical: 8 }]}
                  onPress={() => handleToggleAtivo(endereco.id)}
                >
                  <Text style={[styles.buttonText, { textAlign: 'center', fontSize: 12 }]}>
                    {endereco.ativo ? '✅ Ativo' : '⚪ Ativar'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSecondary, { flex: 1, marginHorizontal: 4, paddingVertical: 8 }]}
                  onPress={() => handleEditarEndereco(endereco)}
                >
                  <Text style={[styles.buttonSecondaryText, { textAlign: 'center', fontSize: 12 }]}>✏️ Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: '#FF4500', borderColor: '#FF4500', flex: 1, marginLeft: 4, paddingVertical: 8 }]}
                  onPress={() => handleRemoverEndereco(endereco.id)}
                >
                  <Text style={[styles.buttonText, { color: '#ffffff', textAlign: 'center', fontSize: 12 }]}>🗑️ Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {/* Formulário de Novo Endereço */}
        {mostrarFormulario && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Adicionar Novo Endereço</Text>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Nome do Endereço *
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#333333',
                  borderRadius: 8,
                  padding: 12,
                  color: '#ffffff',
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: '#555555',
                }}
                placeholder="Ex: Restaurante Principal"
                placeholderTextColor="#999999"
                value={novoEndereco.nome}
                onChangeText={(value) => setNovoEndereco(prev => ({ ...prev, nome: value }))}
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Rua/Logradouro *
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#333333',
                  borderRadius: 8,
                  padding: 12,
                  color: '#ffffff',
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: '#555555',
                }}
                placeholder="Ex: Rua das Flores"
                placeholderTextColor="#999999"
                value={novoEndereco.rua}
                onChangeText={(value) => setNovoEndereco(prev => ({ ...prev, rua: value }))}
              />
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 16 }}>
              <View style={{ flex: 2, marginRight: 8 }}>
                <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                  Bairro *
                </Text>
                <TextInput
                  style={{
                    backgroundColor: '#333333',
                    borderRadius: 8,
                    padding: 12,
                    color: '#ffffff',
                    fontSize: 16,
                    borderWidth: 1,
                    borderColor: '#555555',
                  }}
                  placeholder="Ex: Centro"
                  placeholderTextColor="#999999"
                  value={novoEndereco.bairro}
                  onChangeText={(value) => setNovoEndereco(prev => ({ ...prev, bairro: value }))}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                  Número *
                </Text>
                <TextInput
                  style={{
                    backgroundColor: '#333333',
                    borderRadius: 8,
                    padding: 12,
                    color: '#ffffff',
                    fontSize: 16,
                    borderWidth: 1,
                    borderColor: '#555555',
                  }}
                  placeholder="123"
                  placeholderTextColor="#999999"
                  value={novoEndereco.numero}
                  onChangeText={(value) => setNovoEndereco(prev => ({ ...prev, numero: value }))}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Referência
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#333333',
                  borderRadius: 8,
                  padding: 12,
                  color: '#ffffff',
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: '#555555',
                }}
                placeholder="Ex: Próximo ao shopping"
                placeholderTextColor="#999999"
                value={novoEndereco.referencia}
                onChangeText={(value) => setNovoEndereco(prev => ({ ...prev, referencia: value }))}
              />
            </View>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[styles.button, styles.buttonSecondary, { flex: 1, marginRight: 8 }]}
                onPress={() => {
                  setMostrarFormulario(false);
                  setNovoEndereco({ nome: '', rua: '', numero: '', bairro: '', referencia: '' });
                }}
              >
                <Text style={styles.buttonSecondaryText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { flex: 1, marginLeft: 8 }]}
                onPress={handleAdicionarEndereco}
              >
                <Text style={styles.buttonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Botão Adicionar */}
        {!mostrarFormulario && (
          <View style={styles.card}>
            <TouchableOpacity
              style={[styles.button, { marginBottom: 12 }]}
              onPress={() => setMostrarFormulario(true)}
            >
              <Text style={styles.buttonText}>➕ Adicionar Endereço</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EnderecosRetiradaScreen;

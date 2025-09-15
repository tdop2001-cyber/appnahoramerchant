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
import styles from '../styles/styles';

const NovaEntregaScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    nomeCliente: '',
    telefoneCliente: '',
    // Endereço de Retirada
    ruaRetirada: '',
    bairroRetirada: '',
    numeroRetirada: '',
    referenciaRetirada: '',
    // Endereço de Entrega
    ruaEntrega: '',
    bairroEntrega: '',
    numeroEntrega: '',
    referenciaEntrega: '',
    detalhesPacote: '',
    instrucoesEntrega: '',
    valorEntrega: '',
    tipoEntrega: 'normal',
  });

  const [tiposEntrega] = useState([
    { id: 'normal', nome: 'Normal', emoji: '📦', descricao: 'Entrega padrão' },
    { id: 'expressa', nome: 'Expressa', emoji: '⚡', descricao: 'Entrega rápida' },
    { id: 'fragil', nome: 'Frágil', emoji: '🔔', descricao: 'Cuidado especial' },
    { id: 'urgente', nome: 'Urgente', emoji: '🚨', descricao: 'Máxima prioridade' },
  ]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTipoEntregaSelect = (tipo) => {
    setFormData(prev => ({
      ...prev,
      tipoEntrega: tipo.id
    }));
  };

  const validateForm = () => {
    if (!formData.nomeCliente.trim()) {
      Alert.alert('Erro', 'Nome do cliente é obrigatório');
      return false;
    }
    if (!formData.telefoneCliente.trim()) {
      Alert.alert('Erro', 'Telefone do cliente é obrigatório');
      return false;
    }
    if (!formData.ruaRetirada.trim()) {
      Alert.alert('Erro', 'Rua de retirada é obrigatória');
      return false;
    }
    if (!formData.bairroRetirada.trim()) {
      Alert.alert('Erro', 'Bairro de retirada é obrigatório');
      return false;
    }
    if (!formData.numeroRetirada.trim()) {
      Alert.alert('Erro', 'Número de retirada é obrigatório');
      return false;
    }
    if (!formData.ruaEntrega.trim()) {
      Alert.alert('Erro', 'Rua de entrega é obrigatória');
      return false;
    }
    if (!formData.bairroEntrega.trim()) {
      Alert.alert('Erro', 'Bairro de entrega é obrigatório');
      return false;
    }
    if (!formData.numeroEntrega.trim()) {
      Alert.alert('Erro', 'Número de entrega é obrigatório');
      return false;
    }
    if (!formData.detalhesPacote.trim()) {
      Alert.alert('Erro', 'Detalhes do pacote são obrigatórios');
      return false;
    }
    return true;
  };

  const handleSolicitarEntrega = () => {
    if (validateForm()) {
      // Aqui você adicionaria a lógica para solicitar a entrega
      Alert.alert(
        'Sucesso',
        'Entrega solicitada com sucesso! Um motoboy será notificado.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    }
  };

  const formatPhoneNumber = (text) => {
    // Remove todos os caracteres não numéricos
    const cleaned = text.replace(/\D/g, '');
    
    // Aplica a máscara (XX) XXXXX-XXXX
    if (cleaned.length <= 2) {
      return cleaned;
    } else if (cleaned.length <= 7) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
    }
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
          <Text style={styles.headerTitle}>Nova Entrega</Text>
          <Text style={styles.headerSubtitle}>
            Preencha os detalhes para solicitar uma nova entrega
          </Text>
        </View>

        {/* Informações do Cliente */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informações do Cliente</Text>
          
          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Nome do Cliente *
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
                placeholder="Nome completo"
                placeholderTextColor="#999999"
                value={formData.nomeCliente}
                onChangeText={(value) => handleInputChange('nomeCliente', value)}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Telefone *
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
                placeholder="(XX) XXXXX-XXXX"
                placeholderTextColor="#999999"
                value={formData.telefoneCliente}
                onChangeText={(value) => handleInputChange('telefoneCliente', formatPhoneNumber(value))}
                keyboardType="phone-pad"
                maxLength={15}
              />
            </View>
          </View>
        </View>

        {/* Endereço de Retirada */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Endereço de Retirada</Text>
          <Text style={[styles.textSecondary, { fontSize: 12, marginBottom: 16 }]}>
            Este é o endereço onde o motoboy irá buscar o pacote
          </Text>
          
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
              value={formData.ruaRetirada}
              onChangeText={(value) => handleInputChange('ruaRetirada', value)}
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
                value={formData.bairroRetirada}
                onChangeText={(value) => handleInputChange('bairroRetirada', value)}
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
                value={formData.numeroRetirada}
                onChangeText={(value) => handleInputChange('numeroRetirada', value)}
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
              placeholder="Ex: Próximo ao shopping, casa azul"
              placeholderTextColor="#999999"
              value={formData.referenciaRetirada}
              onChangeText={(value) => handleInputChange('referenciaRetirada', value)}
            />
          </View>
        </View>

        {/* Endereço de Entrega */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Endereço de Entrega</Text>
          <Text style={[styles.textSecondary, { fontSize: 12, marginBottom: 16 }]}>
            Este é o endereço onde o pacote será entregue
          </Text>
          
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
              placeholder="Ex: Avenida Paulista"
              placeholderTextColor="#999999"
              value={formData.ruaEntrega}
              onChangeText={(value) => handleInputChange('ruaEntrega', value)}
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
                placeholder="Ex: Bela Vista"
                placeholderTextColor="#999999"
                value={formData.bairroEntrega}
                onChangeText={(value) => handleInputChange('bairroEntrega', value)}
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
                placeholder="1000"
                placeholderTextColor="#999999"
                value={formData.numeroEntrega}
                onChangeText={(value) => handleInputChange('numeroEntrega', value)}
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
              placeholder="Ex: Prédio comercial, portão azul"
              placeholderTextColor="#999999"
              value={formData.referenciaEntrega}
              onChangeText={(value) => handleInputChange('referenciaEntrega', value)}
            />
          </View>
        </View>

        {/* Detalhes do Pacote */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalhes do Pacote</Text>
          
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Tipo e Tamanho do Pacote *
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
              placeholder="Ex: Caixa pequena, envelope, etc."
              placeholderTextColor="#999999"
              value={formData.detalhesPacote}
              onChangeText={(value) => handleInputChange('detalhesPacote', value)}
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Instruções de Entrega
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
                height: 80,
                textAlignVertical: 'top',
              }}
              placeholder="Instruções adicionais para o entregador (opcional)"
              placeholderTextColor="#999999"
              value={formData.instrucoesEntrega}
              onChangeText={(value) => handleInputChange('instrucoesEntrega', value)}
              multiline
            />
          </View>
        </View>

        {/* Tipo de Entrega */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tipo de Entrega</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
            {tiposEntrega.map((tipo) => (
              <TouchableOpacity
                key={tipo.id}
                style={[
                  styles.button,
                  formData.tipoEntrega === tipo.id ? {} : styles.buttonSecondary,
                  { 
                    marginRight: 8, 
                    marginBottom: 8, 
                    paddingHorizontal: 16,
                    minWidth: 100,
                  },
                ]}
                onPress={() => handleTipoEntregaSelect(tipo)}
              >
                <Text
                  style={[
                    formData.tipoEntrega === tipo.id ? styles.buttonText : styles.buttonSecondaryText,
                    { fontSize: 14, textAlign: 'center' },
                  ]}
                >
                  {tipo.emoji} {tipo.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={[styles.textSecondary, { fontSize: 12, marginTop: 8 }]}>
            {tiposEntrega.find(t => t.id === formData.tipoEntrega)?.descricao}
          </Text>
        </View>

        {/* Valor da Entrega */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Valor da Entrega</Text>
          
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Valor (opcional)
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
              placeholder="Ex: 15,00"
              placeholderTextColor="#999999"
              value={formData.valorEntrega}
              onChangeText={(value) => handleInputChange('valorEntrega', value)}
              keyboardType="numeric"
            />
            <Text style={[styles.textSecondary, { fontSize: 12, marginTop: 4 }]}>
              Deixe em branco para usar o valor padrão baseado na distância
            </Text>
          </View>
        </View>

        {/* Botões de Ação */}
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', marginBottom: 12 }}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary, { flex: 1, marginRight: 8 }]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonSecondaryText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { flex: 1, marginLeft: 8 }]}
              onPress={handleSolicitarEntrega}
            >
              <Text style={styles.buttonText}>Solicitar Entrega</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NovaEntregaScreen;

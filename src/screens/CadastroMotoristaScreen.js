import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { createDynamicStyles } from '../styles/dynamicStyles';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import SvgIcon from '../components/SvgIcon';

const CadastroMotoristaScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cpf: '',
    cnh: '',
    veiculo: '',
    placa: '',
    cor: '',
    ano: '',
    endereco: '',
    observacoes: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatTelefone = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 2) {
      return cleaned;
    } else if (cleaned.length <= 7) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
    }
  };

  const formatCPF = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    } else if (cleaned.length <= 9) {
      return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
    } else {
      return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
    }
  };

  const validateForm = () => {
    if (!formData.nome.trim()) {
      Alert.alert('Erro', 'Nome é obrigatório');
      return false;
    }
    if (!formData.telefone.trim()) {
      Alert.alert('Erro', 'Telefone é obrigatório');
      return false;
    }
    if (!formData.cpf.trim()) {
      Alert.alert('Erro', 'CPF é obrigatório');
      return false;
    }
    if (!formData.cnh.trim()) {
      Alert.alert('Erro', 'CNH é obrigatória');
      return false;
    }
    if (!formData.veiculo.trim()) {
      Alert.alert('Erro', 'Modelo do veículo é obrigatório');
      return false;
    }
    if (!formData.placa.trim()) {
      Alert.alert('Erro', 'Placa é obrigatória');
      return false;
    }
    return true;
  };

  const handleCadastrar = () => {
    if (!validateForm()) return;

    Alert.alert(
      '✅ Motorista Cadastrado!',
      `${formData.nome} foi cadastrado com sucesso!\n\nVeículo: ${formData.veiculo}\nPlaca: ${formData.placa}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  return (
    <SafeAreaWrapper>
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
            <View style={styles.row}>
              <SvgIcon name="arrow-left" size={16} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={styles.textPrimary}>Voltar</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cadastrar Motorista</Text>
          <Text style={styles.headerSubtitle}>
            Adicione um novo motorista à sua equipe
          </Text>
        </View>

        {/* Dados Pessoais */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dados Pessoais</Text>

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Nome Completo *
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: João Silva Santos"
              placeholderTextColor={colors.textSecondary}
              value={formData.nome}
              onChangeText={(value) => handleInputChange('nome', value)}
            />
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Telefone *
              </Text>
              <TextInput
                style={styles.input}
                placeholder="(11) 99999-9999"
                placeholderTextColor={colors.textSecondary}
                value={formData.telefone}
                onChangeText={(value) => handleInputChange('telefone', formatTelefone(value))}
                keyboardType="phone-pad"
                maxLength={15}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                CPF *
              </Text>
              <TextInput
                style={styles.input}
                placeholder="000.000.000-00"
                placeholderTextColor={colors.textSecondary}
                value={formData.cpf}
                onChangeText={(value) => handleInputChange('cpf', formatCPF(value))}
                keyboardType="numeric"
                maxLength={14}
              />
            </View>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              CNH *
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Número da CNH"
              placeholderTextColor={colors.textSecondary}
              value={formData.cnh}
              onChangeText={(value) => handleInputChange('cnh', value)}
              keyboardType="numeric"
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Endereço
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Endereço completo"
              placeholderTextColor={colors.textSecondary}
              value={formData.endereco}
              onChangeText={(value) => handleInputChange('endereco', value)}
            />
          </View>
        </View>

        {/* Dados do Veículo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dados do Veículo</Text>

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Modelo/Marca *
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Honda CG 160, Yamaha Fazer 250"
              placeholderTextColor={colors.textSecondary}
              value={formData.veiculo}
              onChangeText={(value) => handleInputChange('veiculo', value)}
            />
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            <View style={{ flex: 2, marginRight: 8 }}>
              <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Placa *
              </Text>
              <TextInput
                style={styles.input}
                placeholder="ABC-1234"
                placeholderTextColor={colors.textSecondary}
                value={formData.placa}
                onChangeText={(value) => handleInputChange('placa', value.toUpperCase())}
                maxLength={8}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Ano
              </Text>
              <TextInput
                style={styles.input}
                placeholder="2020"
                placeholderTextColor={colors.textSecondary}
                value={formData.ano}
                onChangeText={(value) => handleInputChange('ano', value)}
                keyboardType="numeric"
                maxLength={4}
              />
            </View>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Cor
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Preta, Azul, Vermelha"
              placeholderTextColor={colors.textSecondary}
              value={formData.cor}
              onChangeText={(value) => handleInputChange('cor', value)}
            />
          </View>
        </View>

        {/* Observações */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Observações</Text>

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Informações Adicionais
            </Text>
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
              placeholder="Ex: Horário preferido, restrições, observações sobre o motorista..."
              placeholderTextColor={colors.textSecondary}
              value={formData.observacoes}
              onChangeText={(value) => handleInputChange('observacoes', value)}
              multiline
            />
          </View>
        </View>

        {/* Resumo */}
        {(formData.nome || formData.veiculo) && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Resumo</Text>

            {formData.nome && (
              <View style={[styles.row, { marginBottom: 8, alignItems: 'center' }]}>
                <SvgIcon
                  name="user"
                  size={16}
                  color={colors.primary}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.text}>
                  Motorista: {formData.nome}
                </Text>
              </View>
            )}

            {formData.telefone && (
              <View style={[styles.row, { marginBottom: 8, alignItems: 'center' }]}>
                <SvgIcon
                  name="phone"
                  size={16}
                  color={colors.primary}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.text}>
                  Telefone: {formData.telefone}
                </Text>
              </View>
            )}

            {formData.veiculo && (
              <View style={[styles.row, { marginBottom: 8, alignItems: 'center' }]}>
                <SvgIcon
                  name="truck"
                  size={16}
                  color={colors.primary}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.text}>
                  Veículo: {formData.veiculo}
                </Text>
              </View>
            )}

            {formData.placa && (
              <View style={[styles.row, { marginBottom: 8, alignItems: 'center' }]}>
                <SvgIcon
                  name="card"
                  size={16}
                  color={colors.primary}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.text}>
                  Placa: {formData.placa}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Botões de Ação */}
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary, { flex: 1 }]}
              onPress={() => navigation.goBack()}
            >
              <View style={styles.row}>
                <SvgIcon name="cancel" size={16} color={colors.textSecondary} style={{ marginRight: 6 }} />
                <Text style={styles.buttonSecondaryText}>Cancelar</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { flex: 1 }]}
              onPress={handleCadastrar}
            >
              <View style={styles.row}>
                <SvgIcon name="check-circle" size={16} color={colors.primaryText} style={{ marginRight: 6 }} />
                <Text style={styles.buttonText}>Cadastrar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default CadastroMotoristaScreen;
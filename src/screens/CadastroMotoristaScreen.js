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
    email: '',
    cpf: '',
    cnh: '',
    // Tipo de veículo (modelo NaHora!)
    tipoVeiculo: '', // 'bike', 'moto', 'car'
    veiculo: '',
    placa: '',
    cor: '',
    ano: '',
    endereco: '',
    // Documentos (modelo NaHora!)
    urlFotoCNH: '',
    urlCRLV: '',
    urlSeguro: '',
    // Conta bancária (modelo NaHora!)
    banco: '',
    agencia: '',
    conta: '',
    tipoConta: '', // 'corrente', 'poupanca'
    // Status de aprovação (modelo NaHora!)
    status: 'pendente', // 'pendente', 'aprovado', 'rejeitado', 'suspenso'
    observacoes: '',
  });

  // Tipos de veículo disponíveis (modelo NaHora!)
  const [tiposVeiculo] = useState([
    { id: 'bike', nome: 'Bicicleta', emoji: '🚲' },
    { id: 'moto', nome: 'Moto', emoji: '🏍️' },
    { id: 'car', nome: 'Carro', emoji: '🚗' },
  ]);

  // Tipos de conta bancária
  const [tiposConta] = useState([
    { id: 'corrente', nome: 'Corrente' },
    { id: 'poupanca', nome: 'Poupança' },
  ]);

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

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              E-mail *
            </Text>
            <TextInput
              style={styles.input}
              placeholder="motorista@exemplo.com"
              placeholderTextColor={colors.textSecondary}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
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

          {/* Tipo de Veículo (Modelo NaHora!) */}
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Tipo de Veículo *
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {tiposVeiculo.map((tipo) => (
                <TouchableOpacity
                  key={tipo.id}
                  style={[
                    styles.button,
                    formData.tipoVeiculo === tipo.id ? {} : styles.buttonSecondary,
                    { marginRight: 8, marginBottom: 8, paddingHorizontal: 16 }
                  ]}
                  onPress={() => handleInputChange('tipoVeiculo', tipo.id)}
                >
                  <Text
                    style={[
                      formData.tipoVeiculo === tipo.id ? styles.buttonText : styles.buttonSecondaryText,
                      { fontSize: 14 }
                    ]}
                  >
                    {tipo.emoji} {tipo.nome}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

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

        {/* Documentos (Modelo NaHora!) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📄 Documentos</Text>
          <Text style={[styles.textSecondary, { fontSize: 12, marginBottom: 16 }]}>
            URLs ou referências dos documentos obrigatórios
          </Text>

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Foto da CNH
            </Text>
            <TextInput
              style={styles.input}
              placeholder="URL da foto da CNH"
              placeholderTextColor={colors.textSecondary}
              value={formData.urlFotoCNH}
              onChangeText={(value) => handleInputChange('urlFotoCNH', value)}
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              CRLV (Certificado do Veículo)
            </Text>
            <TextInput
              style={styles.input}
              placeholder="URL do CRLV"
              placeholderTextColor={colors.textSecondary}
              value={formData.urlCRLV}
              onChangeText={(value) => handleInputChange('urlCRLV', value)}
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Seguro do Veículo
            </Text>
            <TextInput
              style={styles.input}
              placeholder="URL do seguro (opcional)"
              placeholderTextColor={colors.textSecondary}
              value={formData.urlSeguro}
              onChangeText={(value) => handleInputChange('urlSeguro', value)}
            />
          </View>
        </View>

        {/* Conta Bancária (Modelo NaHora!) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏦 Dados Bancários</Text>
          <Text style={[styles.textSecondary, { fontSize: 12, marginBottom: 16 }]}>
            Para recebimento dos repasses (85% do valor das entregas)
          </Text>

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Banco *
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 001 - Banco do Brasil"
              placeholderTextColor={colors.textSecondary}
              value={formData.banco}
              onChangeText={(value) => handleInputChange('banco', value)}
            />
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Agência *
              </Text>
              <TextInput
                style={styles.input}
                placeholder="0000"
                placeholderTextColor={colors.textSecondary}
                value={formData.agencia}
                onChangeText={(value) => handleInputChange('agencia', value)}
                keyboardType="numeric"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Conta *
              </Text>
              <TextInput
                style={styles.input}
                placeholder="00000-0"
                placeholderTextColor={colors.textSecondary}
                value={formData.conta}
                onChangeText={(value) => handleInputChange('conta', value)}
              />
            </View>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Tipo de Conta *
            </Text>
            <View style={{ flexDirection: 'row' }}>
              {tiposConta.map((tipo) => (
                <TouchableOpacity
                  key={tipo.id}
                  style={[
                    styles.button,
                    formData.tipoConta === tipo.id ? {} : styles.buttonSecondary,
                    { marginRight: 8, paddingHorizontal: 16 }
                  ]}
                  onPress={() => handleInputChange('tipoConta', tipo.id)}
                >
                  <Text
                    style={[
                      formData.tipoConta === tipo.id ? styles.buttonText : styles.buttonSecondaryText,
                      { fontSize: 14 }
                    ]}
                  >
                    {tipo.nome}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Status de Aprovação (Modelo NaHora!) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>✅ Status de Aprovação</Text>
          <Text style={[styles.textSecondary, { fontSize: 12, marginBottom: 16 }]}>
            Motoristas novos iniciam como "Pendente" até aprovação
          </Text>

          <View style={[
            {
              backgroundColor: formData.status === 'pendente' ? 'rgba(255, 215, 0, 0.1)' :
                             formData.status === 'aprovado' ? 'rgba(30, 203, 79, 0.1)' :
                             'rgba(255, 69, 0, 0.1)',
              borderRadius: 8,
              padding: 12,
              borderWidth: 1,
              borderColor: formData.status === 'pendente' ? 'rgba(255, 215, 0, 0.3)' :
                          formData.status === 'aprovado' ? 'rgba(30, 203, 79, 0.3)' :
                          'rgba(255, 69, 0, 0.3)',
            }
          ]}>
            <Text style={[styles.text, { fontWeight: '600', marginBottom: 8 }]}>
              Status atual: {
                formData.status === 'pendente' ? '🟡 Pendente' :
                formData.status === 'aprovado' ? '🟢 Aprovado' :
                formData.status === 'rejeitado' ? '🔴 Rejeitado' :
                '⚠️ Suspenso'
              }
            </Text>
            <Text style={[styles.textSecondary, { fontSize: 11 }]}>
              {formData.status === 'pendente' ? 'Aguardando análise da documentação e aprovação do cadastro' :
               formData.status === 'aprovado' ? 'Motorista aprovado e apto para realizar entregas' :
               formData.status === 'rejeitado' ? 'Cadastro rejeitado. Entre em contato para mais informações' :
               'Motorista temporariamente suspenso do sistema'}
            </Text>
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
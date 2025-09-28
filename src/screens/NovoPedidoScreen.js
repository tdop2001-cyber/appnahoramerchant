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

const NovoPedidoScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];

  const [formData, setFormData] = useState({
    // Endereço de Retirada
    logradouroRetirada: '',
    numeroRetirada: '',
    bairroRetirada: '',
    referenciaRetirada: '',
    // Endereço de Entrega
    logradouroEntrega: '',
    numeroEntrega: '',
    bairroEntrega: '',
    referenciaEntrega: '',
    descricaoProduto: '',
    valorPedido: '',
    tipoProduto: '',
    tamanhoProduto: '',
    observacoes: '',
  });

  // Tipos de produto focados em entrega
  const [tiposProduto] = useState([
    { id: 'normal', nome: 'Normal', emoji: '📦', descricao: 'Produto comum' },
    { id: 'congelado', nome: 'Congelado', emoji: '🧊', descricao: 'Requer refrigeração' },
    { id: 'sensivel', nome: 'Sensível', emoji: '⚠️', descricao: 'Cuidado especial' },
    { id: 'fragil', nome: 'Frágil', emoji: '🔔', descricao: 'Manuseio delicado' },
  ]);

  // Tamanhos de produto
  const [tamanhosProduto] = useState([
    { id: 'pequeno', nome: 'Pequeno', emoji: '🔸', descricao: 'Até 2kg' },
    { id: 'medio', nome: 'Médio', emoji: '🔹', descricao: '2kg - 5kg' },
    { id: 'grande', nome: 'Grande', emoji: '🔶', descricao: '5kg - 10kg' },
    { id: 'extra_grande', nome: 'Extra Grande', emoji: '🔷', descricao: 'Acima de 10kg' },
  ]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTipoProdutoSelect = (tipo) => {
    setFormData(prev => ({
      ...prev,
      tipoProduto: tipo.id
    }));
  };

  const handleTamanhoProdutoSelect = (tamanho) => {
    setFormData(prev => ({
      ...prev,
      tamanhoProduto: tamanho.id
    }));
  };

  const formatCurrency = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const number = parseFloat(cleaned) / 100;
    return number.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const validateForm = () => {
    if (!formData.logradouroRetirada.trim()) {
      Alert.alert('Erro', 'Logradouro de retirada é obrigatório');
      return false;
    }
    if (!formData.numeroRetirada.trim()) {
      Alert.alert('Erro', 'Número de retirada é obrigatório');
      return false;
    }
    if (!formData.bairroRetirada.trim()) {
      Alert.alert('Erro', 'Bairro de retirada é obrigatório');
      return false;
    }
    if (!formData.logradouroEntrega.trim()) {
      Alert.alert('Erro', 'Logradouro de entrega é obrigatório');
      return false;
    }
    if (!formData.numeroEntrega.trim()) {
      Alert.alert('Erro', 'Número de entrega é obrigatório');
      return false;
    }
    if (!formData.bairroEntrega.trim()) {
      Alert.alert('Erro', 'Bairro de entrega é obrigatório');
      return false;
    }
    if (!formData.descricaoProduto.trim()) {
      Alert.alert('Erro', 'Descrição do produto é obrigatória');
      return false;
    }
    if (!formData.tipoProduto) {
      Alert.alert('Erro', 'Selecione o tipo do produto');
      return false;
    }
    if (!formData.tamanhoProduto) {
      Alert.alert('Erro', 'Selecione o tamanho do produto');
      return false;
    }
    return true;
  };

  const handleCriarPedido = () => {
    if (!validateForm()) return;

    Alert.alert(
      '✅ Pedido Criado!',
      `Pedido criado com sucesso!\n\nProduto: ${formData.descricaoProduto}\nTipo: ${tiposProduto.find(t => t.id === formData.tipoProduto)?.nome}\nTamanho: ${tamanhosProduto.find(t => t.id === formData.tamanhoProduto)?.nome}${formData.valorPedido ? `\nValor: R$ ${formData.valorPedido}` : ''}`,
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
          <Text style={styles.headerTitle}>Novo Pedido</Text>
          <Text style={styles.headerSubtitle}>
            Criar pedido para entrega
          </Text>
        </View>

        {/* Endereço de Retirada */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Endereço de Retirada</Text>
          <Text style={[styles.textSecondary, { fontSize: 12, marginBottom: 16 }]}>
            Local onde o motorista irá buscar o pedido
          </Text>

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Logradouro *
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Rua das Flores, Avenida Paulista"
              placeholderTextColor={colors.textSecondary}
              value={formData.logradouroRetirada}
              onChangeText={(value) => handleInputChange('logradouroRetirada', value)}
            />
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Número *
              </Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                placeholderTextColor={colors.textSecondary}
                value={formData.numeroRetirada}
                onChangeText={(value) => handleInputChange('numeroRetirada', value)}
                keyboardType="numeric"
              />
            </View>
            <View style={{ flex: 2, marginLeft: 8 }}>
              <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Bairro *
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Centro, Jardins"
                placeholderTextColor={colors.textSecondary}
                value={formData.bairroRetirada}
                onChangeText={(value) => handleInputChange('bairroRetirada', value)}
              />
            </View>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Referência
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Próximo ao shopping, loja de esquina"
              placeholderTextColor={colors.textSecondary}
              value={formData.referenciaRetirada}
              onChangeText={(value) => handleInputChange('referenciaRetirada', value)}
            />
          </View>
        </View>

        {/* Endereço de Entrega */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Endereço de Entrega</Text>
          <Text style={[styles.textSecondary, { fontSize: 12, marginBottom: 16 }]}>
            Local onde o pedido será entregue
          </Text>

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Logradouro *
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Avenida Paulista, Rua Augusta"
              placeholderTextColor={colors.textSecondary}
              value={formData.logradouroEntrega}
              onChangeText={(value) => handleInputChange('logradouroEntrega', value)}
            />
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Número *
              </Text>
              <TextInput
                style={styles.input}
                placeholder="1000"
                placeholderTextColor={colors.textSecondary}
                value={formData.numeroEntrega}
                onChangeText={(value) => handleInputChange('numeroEntrega', value)}
                keyboardType="numeric"
              />
            </View>
            <View style={{ flex: 2, marginLeft: 8 }}>
              <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Bairro *
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Bela Vista, Vila Madalena"
                placeholderTextColor={colors.textSecondary}
                value={formData.bairroEntrega}
                onChangeText={(value) => handleInputChange('bairroEntrega', value)}
              />
            </View>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Referência
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Prédio comercial, portão azul"
              placeholderTextColor={colors.textSecondary}
              value={formData.referenciaEntrega}
              onChangeText={(value) => handleInputChange('referenciaEntrega', value)}
            />
          </View>
        </View>

        {/* Detalhes do Produto */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalhes do Produto</Text>

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Descrição do Produto *
            </Text>
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
              placeholder="Ex: 2x Pizza Margherita, 1x Refrigerante Cola"
              placeholderTextColor={colors.textSecondary}
              value={formData.descricaoProduto}
              onChangeText={(value) => handleInputChange('descricaoProduto', value)}
              multiline
            />
          </View>

          {/* Tipo do Produto */}
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Tipo do Produto *
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', paddingRight: 16 }}>
                {tiposProduto.map((tipo) => (
                  <TouchableOpacity
                    key={tipo.id}
                    style={[
                      styles.button,
                      formData.tipoProduto === tipo.id ? {} : styles.buttonSecondary,
                      { marginRight: 8, paddingHorizontal: 12, paddingVertical: 8, minWidth: 100 }
                    ]}
                    onPress={() => handleTipoProdutoSelect(tipo)}
                  >
                    <Text style={[
                      formData.tipoProduto === tipo.id ? styles.buttonText : styles.buttonSecondaryText,
                      { fontSize: 12, textAlign: 'center' }
                    ]}>
                      {tipo.emoji} {tipo.nome}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            {formData.tipoProduto && (
              <Text style={[styles.textSecondary, { fontSize: 12, marginTop: 8 }]}>
                {tiposProduto.find(t => t.id === formData.tipoProduto)?.descricao}
              </Text>
            )}
          </View>

          {/* Tamanho do Produto */}
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Tamanho do Produto *
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', paddingRight: 16 }}>
                {tamanhosProduto.map((tamanho) => (
                  <TouchableOpacity
                    key={tamanho.id}
                    style={[
                      styles.button,
                      formData.tamanhoProduto === tamanho.id ? {} : styles.buttonSecondary,
                      { marginRight: 8, paddingHorizontal: 12, paddingVertical: 8, minWidth: 100 }
                    ]}
                    onPress={() => handleTamanhoProdutoSelect(tamanho)}
                  >
                    <Text style={[
                      formData.tamanhoProduto === tamanho.id ? styles.buttonText : styles.buttonSecondaryText,
                      { fontSize: 12, textAlign: 'center' }
                    ]}>
                      {tamanho.emoji} {tamanho.nome}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            {formData.tamanhoProduto && (
              <Text style={[styles.textSecondary, { fontSize: 12, marginTop: 8 }]}>
                {tamanhosProduto.find(t => t.id === formData.tamanhoProduto)?.descricao}
              </Text>
            )}
          </View>

          {/* Valor do Pedido */}
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Valor do Pedido
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 45,90"
              placeholderTextColor={colors.textSecondary}
              value={formData.valorPedido}
              onChangeText={(value) => handleInputChange('valorPedido', value)}
              keyboardType="numeric"
            />
            <Text style={[styles.textSecondary, { fontSize: 12, marginTop: 4 }]}>
              Valor total do pedido (opcional)
            </Text>
          </View>

          {/* Observações */}
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Observações para Entrega
            </Text>
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
              placeholder="Ex: Entregar até 19h, produto frágil, campainha quebrada"
              placeholderTextColor={colors.textSecondary}
              value={formData.observacoes}
              onChangeText={(value) => handleInputChange('observacoes', value)}
              multiline
            />
          </View>
        </View>

        {/* Resumo do Pedido */}
        {(formData.tipoProduto || formData.tamanhoProduto || formData.valorPedido) && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Resumo do Pedido</Text>

            {formData.tipoProduto && (
              <View style={[styles.row, { marginBottom: 8, alignItems: 'center' }]}>
                <SvgIcon
                  name="check-circle"
                  size={16}
                  color={colors.primary}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.text}>
                  Tipo: {tiposProduto.find(t => t.id === formData.tipoProduto)?.emoji} {tiposProduto.find(t => t.id === formData.tipoProduto)?.nome}
                </Text>
              </View>
            )}

            {formData.tamanhoProduto && (
              <View style={[styles.row, { marginBottom: 8, alignItems: 'center' }]}>
                <SvgIcon
                  name="check-circle"
                  size={16}
                  color={colors.primary}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.text}>
                  Tamanho: {tamanhosProduto.find(t => t.id === formData.tamanhoProduto)?.emoji} {tamanhosProduto.find(t => t.id === formData.tamanhoProduto)?.nome}
                </Text>
              </View>
            )}

            {formData.valorPedido && (
              <View style={[styles.row, { marginBottom: 8, alignItems: 'center' }]}>
                <SvgIcon
                  name="money"
                  size={16}
                  color={colors.primary}
                  style={{ marginRight: 8 }}
                />
                <Text style={[styles.text, { fontWeight: '600' }]}>
                  Valor: R$ {formData.valorPedido}
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
              onPress={handleCriarPedido}
            >
              <View style={styles.row}>
                <SvgIcon name="check-circle" size={16} color={colors.primaryText} style={{ marginRight: 6 }} />
                <Text style={styles.buttonText}>Criar Pedido</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default NovoPedidoScreen;
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

const CriarProdutoScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];
  
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    categoria: '',
    disponivel: true,
    emoji: '🍽️',
  });

  const [categorias] = useState([
    { id: 'pizzas', nome: 'Pizzas', emoji: '🍕' },
    { id: 'hamburgers', nome: 'Hambúrgueres', emoji: '🍔' },
    { id: 'bebidas', nome: 'Bebidas', emoji: '🥤' },
    { id: 'sobremesas', nome: 'Sobremesas', emoji: '🍰' },
    { id: 'lanches', nome: 'Lanches', emoji: '🥪' },
    { id: 'saladas', nome: 'Saladas', emoji: '🥗' },
  ]);

  const [emojis] = useState([
    '🍕', '🍔', '🥤', '🍰', '🥪', '🥗', '🍝', '🍜', '🍲', '🍛', '🍱', '🍣'
  ]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCategoriaSelect = (categoria) => {
    setFormData(prev => ({
      ...prev,
      categoria: categoria.id,
      emoji: categoria.emoji
    }));
  };

  const handleEmojiSelect = (emoji) => {
    setFormData(prev => ({
      ...prev,
      emoji
    }));
  };

  const validateForm = () => {
    if (!formData.nome.trim()) {
      Alert.alert('Erro', 'Nome do produto é obrigatório');
      return false;
    }
    if (!formData.descricao.trim()) {
      Alert.alert('Erro', 'Descrição do produto é obrigatória');
      return false;
    }
    if (!formData.preco.trim()) {
      Alert.alert('Erro', 'Preço do produto é obrigatório');
      return false;
    }
    if (!formData.categoria) {
      Alert.alert('Erro', 'Categoria do produto é obrigatória');
      return false;
    }
    return true;
  };

  const handleSalvar = () => {
    if (validateForm()) {
      // Aqui você adicionaria a lógica para salvar o produto
      Alert.alert(
        'Sucesso',
        'Produto criado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
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
          <Text style={styles.headerTitle}>Criar Produto</Text>
          <Text style={styles.headerSubtitle}>
            Adicione um novo produto ao seu cardápio
          </Text>
        </View>

        {/* Formulário */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informações do Produto</Text>
          
          {/* Nome do Produto */}
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Nome do Produto *
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Pizza Margherita"
              placeholderTextColor={colors.textSecondary}
              value={formData.nome}
              onChangeText={(value) => handleInputChange('nome', value)}
            />
          </View>

          {/* Descrição */}
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Descrição *
            </Text>
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
              placeholder="Descreva os ingredientes e características do produto"
              placeholderTextColor={colors.textSecondary}
              value={formData.descricao}
              onChangeText={(value) => handleInputChange('descricao', value)}
              multiline
            />
          </View>

          {/* Preço */}
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Preço *
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 25,90"
              placeholderTextColor={colors.textSecondary}
              value={formData.preco}
              onChangeText={(value) => handleInputChange('preco', value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Categoria */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Categoria *</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
            {categorias.map((categoria) => (
              <TouchableOpacity
                key={categoria.id}
                style={[
                  styles.button,
                  formData.categoria === categoria.id ? {} : styles.buttonSecondary,
                  { 
                    marginRight: 8, 
                    marginBottom: 8, 
                    paddingHorizontal: 16,
                    minWidth: 100,
                  },
                ]}
                onPress={() => handleCategoriaSelect(categoria)}
              >
                <Text
                  style={[
                    formData.categoria === categoria.id ? styles.buttonText : styles.buttonSecondaryText,
                    { fontSize: 14, textAlign: 'center' },
                  ]}
                >
                  {categoria.emoji} {categoria.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Emoji */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ícone do Produto</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
            {emojis.map((emoji) => (
              <TouchableOpacity
                key={emoji}
                style={[
                  {
                    backgroundColor: formData.emoji === emoji ? colors.primary : colors.surface,
                    borderRadius: 8,
                    padding: 12,
                    marginRight: 8,
                    marginBottom: 8,
                    borderWidth: 1,
                    borderColor: formData.emoji === emoji ? colors.primary : colors.border,
                  }
                ]}
                onPress={() => handleEmojiSelect(emoji)}
              >
                <Text style={{ fontSize: 24 }}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Status */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Status do Produto</Text>
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <TouchableOpacity
              style={[
                styles.button,
                formData.disponivel ? {} : styles.buttonSecondary,
                { flex: 1, marginRight: 8 }
              ]}
              onPress={() => handleInputChange('disponivel', true)}
            >
              <Text style={formData.disponivel ? styles.buttonText : styles.buttonSecondaryText}>
                ✅ Disponível
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                !formData.disponivel ? {} : styles.buttonSecondary,
                { flex: 1, marginLeft: 8 }
              ]}
              onPress={() => handleInputChange('disponivel', false)}
            >
              <Text style={!formData.disponivel ? styles.buttonText : styles.buttonSecondaryText}>
                ⏸️ Indisponível
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botões de Ação */}
        <View style={styles.card}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary, { flex: 1, marginRight: 8 }]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonSecondaryText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { flex: 1, marginLeft: 8 }]}
              onPress={handleSalvar}
            >
              <Text style={styles.buttonText}>Salvar Produto</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CriarProdutoScreen;

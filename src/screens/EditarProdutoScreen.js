import React, { useState, useEffect } from 'react';
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

const EditarProdutoScreen = ({ navigation, route }) => {
  const { produto } = route.params || {};
  
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

  useEffect(() => {
    if (produto) {
      setFormData({
        nome: produto.nome || '',
        descricao: produto.descricao || '',
        preco: produto.preco || '',
        categoria: produto.categoria || '',
        disponivel: produto.disponivel !== undefined ? produto.disponivel : true,
        emoji: produto.emoji || '🍽️',
      });
    }
  }, [produto]);

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
      // Aqui você adicionaria a lógica para salvar as alterações do produto
      Alert.alert(
        'Sucesso',
        'Produto atualizado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    }
  };

  const handleExcluir = () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este produto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            // Aqui você adicionaria a lógica para excluir o produto
            Alert.alert('Sucesso', 'Produto excluído com sucesso!');
            navigation.goBack();
          }
        }
      ]
    );
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
          <Text style={styles.headerTitle}>Editar Produto</Text>
          <Text style={styles.headerSubtitle}>
            Edite as informações do produto
          </Text>
        </View>

        {/* Preview do Produto */}
        {produto && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Produto Atual</Text>
            <View style={styles.listItem}>
              <View style={styles.listItemHeader}>
                <View style={[styles.row, { flex: 1 }]}>
                  <Text style={{ fontSize: 24, marginRight: 12 }}>
                    {produto.emoji}
                  </Text>
                  <View style={styles.flex1}>
                    <Text style={styles.listItemTitle}>{produto.nome}</Text>
                    <Text style={styles.listItemSubtitle}>
                      {produto.descricao}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    produto.disponivel
                      ? { backgroundColor: 'rgba(30, 203, 79, 0.2)' }
                      : { backgroundColor: 'rgba(255, 69, 0, 0.2)' },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      produto.disponivel
                        ? { color: '#1ecb4f' }
                        : { color: '#FF4500' },
                    ]}
                  >
                    {produto.disponivel ? 'Disp' : 'Indis'}
                  </Text>
                </View>
              </View>
              <View style={[styles.row, styles.spaceBetween, { marginTop: 12, alignItems: 'flex-end' }]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.textSecondary}>Preço</Text>
                  <Text style={[styles.textPrimary, { fontSize: 20, fontWeight: 'bold' }]}>
                    {produto.preco}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Formulário */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informações do Produto</Text>
          
          {/* Nome do Produto */}
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Nome do Produto *
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
              placeholder="Ex: Pizza Margherita"
              placeholderTextColor="#999999"
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
              placeholder="Descreva os ingredientes e características do produto"
              placeholderTextColor="#999999"
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
              style={{
                backgroundColor: '#333333',
                borderRadius: 8,
                padding: 12,
                color: '#ffffff',
                fontSize: 16,
                borderWidth: 1,
                borderColor: '#555555',
              }}
              placeholder="Ex: 25,90"
              placeholderTextColor="#999999"
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
                    backgroundColor: formData.emoji === emoji ? '#FF7300' : '#333333',
                    borderRadius: 8,
                    padding: 12,
                    marginRight: 8,
                    marginBottom: 8,
                    borderWidth: 1,
                    borderColor: formData.emoji === emoji ? '#FF7300' : '#555555',
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
          <View style={{ flexDirection: 'row', marginBottom: 12 }}>
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
              <Text style={styles.buttonText}>Salvar Alterações</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={[
              styles.button,
              { 
                backgroundColor: '#FF4500',
                borderColor: '#FF4500',
                borderWidth: 1,
              }
            ]}
            onPress={handleExcluir}
          >
            <Text style={[styles.buttonText, { color: '#ffffff' }]}>
              🗑️ Excluir Produto
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditarProdutoScreen;

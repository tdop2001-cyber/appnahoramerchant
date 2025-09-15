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

const NovaCategoriaScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    emoji: '🍽️',
    ativa: true,
  });

  const [emojis] = useState([
    '🍕', '🍔', '🥤', '🍰', '🥪', '🥗', '🍝', '🍜', '🍲', '🍛', '🍱', '🍣',
    '🌮', '🌯', '🥙', '🧆', '🥘', '🍳', '🥞', '🧇', '🍞', '🥖', '🥨', '🧀',
    '🍽️', '🍴', '🥄', '🍯', '🧂', '🥜', '🌰', '🍇', '🍈', '🍉', '🍊', '🍋'
  ]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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
      Alert.alert('Erro', 'Nome da categoria é obrigatório');
      return false;
    }
    if (!formData.descricao.trim()) {
      Alert.alert('Erro', 'Descrição da categoria é obrigatória');
      return false;
    }
    return true;
  };

  const handleSalvar = () => {
    if (validateForm()) {
      // Aqui você adicionaria a lógica para salvar a categoria
      Alert.alert(
        'Sucesso',
        'Categoria criada com sucesso!',
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
          <Text style={styles.headerTitle}>Nova Categoria</Text>
          <Text style={styles.headerSubtitle}>
            Adicione uma nova categoria ao seu cardápio
          </Text>
        </View>

        {/* Formulário */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informações da Categoria</Text>
          
          {/* Nome da Categoria */}
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Nome da Categoria *
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
              placeholder="Ex: Pizzas, Hambúrgueres, Bebidas"
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
              placeholder="Descreva o que esta categoria representa"
              placeholderTextColor="#999999"
              value={formData.descricao}
              onChangeText={(value) => handleInputChange('descricao', value)}
              multiline
            />
          </View>
        </View>

        {/* Emoji */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ícone da Categoria</Text>
          <Text style={[styles.textSecondary, { fontSize: 12, marginBottom: 16 }]}>
            Escolha um emoji que represente esta categoria
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
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
          <Text style={styles.cardTitle}>Status da Categoria</Text>
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            <TouchableOpacity
              style={[
                styles.button,
                formData.ativa ? {} : styles.buttonSecondary,
                { flex: 1, marginRight: 8 }
              ]}
              onPress={() => handleInputChange('ativa', true)}
            >
              <Text style={formData.ativa ? styles.buttonText : styles.buttonSecondaryText}>
                ✅ Ativa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                !formData.ativa ? {} : styles.buttonSecondary,
                { flex: 1, marginLeft: 8 }
              ]}
              onPress={() => handleInputChange('ativa', false)}
            >
              <Text style={!formData.ativa ? styles.buttonText : styles.buttonSecondaryText}>
                ⏸️ Inativa
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.textSecondary, { fontSize: 12, marginTop: 8 }]}>
            Categorias ativas aparecem no cardápio para os clientes
          </Text>
        </View>

        {/* Preview */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Preview da Categoria</Text>
          <View style={[styles.listItem, { marginTop: 12 }]}>
            <View style={styles.listItemHeader}>
              <View style={[styles.row, { flex: 1 }]}>
                <Text style={{ fontSize: 32, marginRight: 16 }}>
                  {formData.emoji}
                </Text>
                <View style={styles.flex1}>
                  <Text style={styles.listItemTitle}>
                    {formData.nome || 'Nome da categoria'}
                  </Text>
                  <Text style={styles.listItemSubtitle}>
                    {formData.descricao || 'Descrição da categoria'}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  formData.ativa
                    ? { backgroundColor: 'rgba(30, 203, 79, 0.2)' }
                    : { backgroundColor: 'rgba(255, 69, 0, 0.2)' },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    formData.ativa
                      ? { color: '#1ecb4f' }
                      : { color: '#FF4500' },
                  ]}
                >
                  {formData.ativa ? 'Ativa' : 'Inativa'}
                </Text>
              </View>
            </View>
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
              <Text style={styles.buttonText}>Salvar Categoria</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NovaCategoriaScreen;

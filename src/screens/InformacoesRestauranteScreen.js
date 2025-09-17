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

const InformacoesRestauranteScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];
  
  const [isEditing, setIsEditing] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState({
    nome: 'Restaurante Sabor & Arte',
    endereco: 'Rua das Flores, 123 - Centro',
    telefone: '(11) 99999-9999',
    email: 'contato@saborarte.com',
    cnpj: '12.345.678/0001-90',
  });

  const [editInfo, setEditInfo] = useState(restaurantInfo);

  const handleEdit = () => {
    setIsEditing(true);
    setEditInfo(restaurantInfo);
  };

  const handleSave = () => {
    setRestaurantInfo(editInfo);
    setIsEditing(false);
    Alert.alert('Sucesso', 'Informações do restaurante atualizadas com sucesso!');
  };

  const handleCancel = () => {
    setEditInfo(restaurantInfo);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderField = (label, field, value, placeholder = '') => {
    return (
      <View style={[styles.row, styles.spaceBetween, { marginBottom: 16 }]}>
        <Text style={styles.textSecondary}>{label}</Text>
        {isEditing ? (
          <TextInput
            style={[styles.input, { flex: 1, marginLeft: 16, textAlign: 'right' }]}
            value={value}
            onChangeText={(text) => handleInputChange(field, text)}
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
          />
        ) : (
          <Text style={[styles.text, { flex: 1, marginLeft: 16, textAlign: 'right' }]}>
            {value}
          </Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaWrapper>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Informações do Restaurante</Text>
        <Text style={styles.headerSubtitle}>
          Gerencie as informações do seu restaurante
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Informações do Restaurante */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>🏢 Informações do Restaurante</Text>
          </View>

          {renderField('Nome', 'nome', isEditing ? editInfo.nome : restaurantInfo.nome, 'Nome do restaurante')}
          {renderField('Endereço', 'endereco', isEditing ? editInfo.endereco : restaurantInfo.endereco, 'Endereço completo')}
          {renderField('Telefone', 'telefone', isEditing ? editInfo.telefone : restaurantInfo.telefone, '(11) 99999-9999')}
          {renderField('Email', 'email', isEditing ? editInfo.email : restaurantInfo.email, 'email@exemplo.com')}
          {renderField('CNPJ', 'cnpj', isEditing ? editInfo.cnpj : restaurantInfo.cnpj, '00.000.000/0000-00')}

          {isEditing ? (
            <View style={[styles.row, { marginTop: 16, gap: 8 }]}>
              <TouchableOpacity 
                style={[styles.button, styles.buttonSecondary, { flex: 1 }]}
                onPress={handleCancel}
              >
                <Text style={styles.buttonSecondaryText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, { flex: 1 }]}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              style={[styles.button, { marginTop: 16 }]}
              onPress={handleEdit}
            >
              <Text style={styles.buttonText}>✏️ Editar Informações</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Informações Adicionais */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>ℹ️ Informações Adicionais</Text>
          </View>
          
          <View style={[styles.row, styles.spaceBetween, { marginBottom: 16 }]}>
            <Text style={styles.textSecondary}>Horário de Funcionamento</Text>
            <Text style={[styles.text, { flex: 1, marginLeft: 16, textAlign: 'right' }]}>
              11:00 - 23:00
            </Text>
          </View>
          
          <View style={[styles.row, styles.spaceBetween, { marginBottom: 16 }]}>
            <Text style={styles.textSecondary}>Tempo Médio de Entrega</Text>
            <Text style={[styles.text, { flex: 1, marginLeft: 16, textAlign: 'right' }]}>
              30-45 min
            </Text>
          </View>
          
          <View style={[styles.row, styles.spaceBetween, { marginBottom: 16 }]}>
            <Text style={styles.textSecondary}>Taxa de Entrega</Text>
            <Text style={[styles.text, { flex: 1, marginLeft: 16, textAlign: 'right' }]}>
              R$ 5,00
            </Text>
          </View>
          
          <View style={[styles.row, styles.spaceBetween, { marginBottom: 16 }]}>
            <Text style={styles.textSecondary}>Pedido Mínimo</Text>
            <Text style={[styles.text, { flex: 1, marginLeft: 16, textAlign: 'right' }]}>
              R$ 25,00
            </Text>
          </View>
        </View>

        {/* Estatísticas */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>📊 Estatísticas</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={[styles.row, { justifyContent: 'space-around' }]}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>1.2k</Text>
                <Text style={styles.statLabel}>Pedidos</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>4.8</Text>
                <Text style={styles.statLabel}>Avaliação</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>156</Text>
                <Text style={styles.statLabel}>Clientes</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default InformacoesRestauranteScreen;


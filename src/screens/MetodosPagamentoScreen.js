import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { createDynamicStyles } from '../styles/dynamicStyles';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

const MetodosPagamentoScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];
  
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      name: 'Dinheiro',
      type: 'cash',
      enabled: true,
      icon: '💵',
      description: 'Pagamento em dinheiro na entrega',
      fee: 0,
    },
    {
      id: '2',
      name: 'Cartão de Débito',
      type: 'debit',
      enabled: true,
      icon: '💳',
      description: 'Cartão de débito na entrega',
      fee: 2.5,
    },
    {
      id: '3',
      name: 'Cartão de Crédito',
      type: 'credit',
      enabled: true,
      icon: '💳',
      description: 'Cartão de crédito na entrega',
      fee: 3.5,
    },
    {
      id: '4',
      name: 'PIX',
      type: 'pix',
      enabled: true,
      icon: '📱',
      description: 'Transferência instantânea PIX',
      fee: 0,
    },
    {
      id: '5',
      name: 'Vale Refeição',
      type: 'meal_voucher',
      enabled: false,
      icon: '🍽️',
      description: 'Vale refeição/alimentação',
      fee: 1.5,
    },
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newMethod, setNewMethod] = useState({
    name: '',
    type: '',
    fee: '',
    description: '',
  });

  const togglePaymentMethod = (id) => {
    setPaymentMethods(prev => 
      prev.map(method => 
        method.id === id 
          ? { ...method, enabled: !method.enabled }
          : method
      )
    );
  };

  const handleAddNewMethod = () => {
    if (!newMethod.name || !newMethod.type) {
      Alert.alert('Erro', 'Por favor, preencha pelo menos o nome e tipo do método de pagamento.');
      return;
    }

    const newId = (paymentMethods.length + 1).toString();
    const newPaymentMethod = {
      id: newId,
      name: newMethod.name,
      type: newMethod.type,
      enabled: true,
      icon: '💳',
      description: newMethod.description || 'Método de pagamento personalizado',
      fee: parseFloat(newMethod.fee) || 0,
    };

    setPaymentMethods(prev => [...prev, newPaymentMethod]);
    setNewMethod({ name: '', type: '', fee: '', description: '' });
    setIsAddingNew(false);
    Alert.alert('Sucesso', 'Método de pagamento adicionado com sucesso!');
  };

  const handleDeleteMethod = (id) => {
    Alert.alert(
      'Excluir Método',
      'Tem certeza que deseja excluir este método de pagamento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => {
            setPaymentMethods(prev => prev.filter(method => method.id !== id));
            Alert.alert('Sucesso', 'Método de pagamento excluído!');
          }
        }
      ]
    );
  };

  const getTotalFee = () => {
    return paymentMethods
      .filter(method => method.enabled)
      .reduce((total, method) => total + method.fee, 0);
  };

  const renderPaymentMethod = (method) => (
    <View key={method.id} style={styles.card}>
      <View style={[styles.row, styles.spaceBetween, { marginBottom: 8 }]}>
        <View style={styles.row}>
          <Text style={{ fontSize: 24, marginRight: 12 }}>{method.icon}</Text>
          <View>
            <Text style={styles.listItemTitle}>{method.name}</Text>
            <Text style={styles.textSecondary}>{method.description}</Text>
          </View>
        </View>
        <Switch
          value={method.enabled}
          onValueChange={() => togglePaymentMethod(method.id)}
          trackColor={{ false: colors.secondary, true: colors.primary }}
          thumbColor={method.enabled ? colors.primaryText : colors.textSecondary}
          style={styles.toggleSwitch}
        />
      </View>
      
      <View style={[styles.row, styles.spaceBetween, { marginTop: 8 }]}>
        <Text style={styles.textSecondary}>
          Taxa: {method.fee > 0 ? `R$ ${method.fee.toFixed(2)}` : 'Sem taxa'}
        </Text>
        {method.type !== 'cash' && method.type !== 'pix' && (
          <TouchableOpacity
            onPress={() => handleDeleteMethod(method.id)}
            style={{ padding: 8 }}
          >
            <Text style={{ color: '#FF4500', fontSize: 16 }}>🗑️</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderAddNewForm = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>➕ Adicionar Novo Método</Text>
      
      <TextInput
        style={[styles.input, { marginBottom: 12 }]}
        placeholder="Nome do método (ex: Cartão de Crédito)"
        placeholderTextColor={colors.textSecondary}
        value={newMethod.name}
        onChangeText={(text) => setNewMethod(prev => ({ ...prev, name: text }))}
      />
      
      <TextInput
        style={[styles.input, { marginBottom: 12 }]}
        placeholder="Tipo (ex: credit, debit, pix)"
        placeholderTextColor={colors.textSecondary}
        value={newMethod.type}
        onChangeText={(text) => setNewMethod(prev => ({ ...prev, type: text }))}
      />
      
      <TextInput
        style={[styles.input, { marginBottom: 12 }]}
        placeholder="Taxa (ex: 2.5)"
        placeholderTextColor={colors.textSecondary}
        value={newMethod.fee}
        onChangeText={(text) => setNewMethod(prev => ({ ...prev, fee: text }))}
        keyboardType="numeric"
      />
      
      <TextInput
        style={[styles.input, { marginBottom: 16 }]}
        placeholder="Descrição (opcional)"
        placeholderTextColor={colors.textSecondary}
        value={newMethod.description}
        onChangeText={(text) => setNewMethod(prev => ({ ...prev, description: text }))}
        multiline
        numberOfLines={2}
      />
      
      <View style={[styles.row, { gap: 8 }]}>
        <TouchableOpacity 
          style={[styles.button, styles.buttonSecondary, { flex: 1 }]}
          onPress={() => {
            setIsAddingNew(false);
            setNewMethod({ name: '', type: '', fee: '', description: '' });
          }}
        >
          <Text style={styles.buttonSecondaryText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, { flex: 1 }]}
          onPress={handleAddNewMethod}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
        <Text style={styles.headerTitle}>Métodos de Pagamento</Text>
        <Text style={styles.headerSubtitle}>
          Gerencie as formas de recebimento aceitas
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Resumo */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>📊 Resumo</Text>
          </View>
          
          <View style={[styles.row, styles.spaceBetween, { marginBottom: 12 }]}>
            <Text style={styles.textSecondary}>Métodos Ativos</Text>
            <Text style={styles.text}>
              {paymentMethods.filter(method => method.enabled).length} de {paymentMethods.length}
            </Text>
          </View>
          
          <View style={[styles.row, styles.spaceBetween, { marginBottom: 12 }]}>
            <Text style={styles.textSecondary}>Taxa Total Média</Text>
            <Text style={styles.text}>
              R$ {getTotalFee().toFixed(2)}
            </Text>
          </View>
          
          <View style={[styles.row, styles.spaceBetween]}>
            <Text style={styles.textSecondary}>Método Mais Usado</Text>
            <Text style={styles.text}>PIX</Text>
          </View>
        </View>

        {/* Métodos de Pagamento */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>💳 Métodos de Pagamento</Text>
          </View>
          
          {paymentMethods.map(renderPaymentMethod)}
        </View>

        {/* Adicionar Novo Método */}
        {isAddingNew ? (
          renderAddNewForm()
        ) : (
          <TouchableOpacity 
            style={[styles.button, { marginHorizontal: 16, marginBottom: 16 }]}
            onPress={() => setIsAddingNew(true)}
          >
            <Text style={styles.buttonText}>➕ Adicionar Novo Método</Text>
          </TouchableOpacity>
        )}

        {/* Configurações Avançadas */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>⚙️ Configurações Avançadas</Text>
          </View>
          
          <View style={[styles.row, styles.spaceBetween, { marginBottom: 16 }]}>
            <View style={styles.flex1}>
              <Text style={styles.text}>Cobrar Taxa do Cliente</Text>
              <Text style={styles.textSecondary}>
                Adicionar taxa de pagamento ao valor final
              </Text>
            </View>
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: colors.secondary, true: colors.primary }}
              thumbColor={colors.primaryText}
              style={styles.toggleSwitch}
            />
          </View>
          
          <View style={[styles.row, styles.spaceBetween, { marginBottom: 16 }]}>
            <View style={styles.flex1}>
              <Text style={styles.text}>Aceitar Pagamento Parcial</Text>
              <Text style={styles.textSecondary}>
                Permitir que o cliente pague parte em dinheiro
              </Text>
            </View>
            <Switch
              value={false}
              onValueChange={() => {}}
              trackColor={{ false: colors.secondary, true: colors.primary }}
              thumbColor={colors.textSecondary}
              style={styles.toggleSwitch}
            />
          </View>
          
          <View style={[styles.row, styles.spaceBetween]}>
            <View style={styles.flex1}>
              <Text style={styles.text}>Troco Disponível</Text>
              <Text style={styles.textSecondary}>
                Manter troco para pagamentos em dinheiro
              </Text>
            </View>
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: colors.secondary, true: colors.primary }}
              thumbColor={colors.primaryText}
              style={styles.toggleSwitch}
            />
          </View>
        </View>

        {/* Informações Importantes */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>ℹ️ Informações Importantes</Text>
          </View>
          
          <Text style={[styles.textSecondary, { marginBottom: 12 }]}>
            • Os métodos de pagamento ativos aparecerão para os clientes no app
          </Text>
          <Text style={[styles.textSecondary, { marginBottom: 12 }]}>
            • As taxas são calculadas sobre o valor total do pedido
          </Text>
          <Text style={[styles.textSecondary, { marginBottom: 12 }]}>
            • PIX e dinheiro não possuem taxas adicionais
          </Text>
          <Text style={styles.textSecondary}>
            • Você pode adicionar métodos personalizados conforme necessário
          </Text>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default MetodosPagamentoScreen;

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { createDynamicStyles } from '../styles/dynamicStyles';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import SvgIcon from '../components/SvgIcon';

const EditarMotoristaScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];

  const { motorista } = route.params || {};

  const handleEditar = () => {
    Alert.alert(
      '✅ Funcionalidade em Desenvolvimento',
      'A edição de motoristas será implementada em breve!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
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
          <Text style={styles.headerTitle}>Editar Motorista</Text>
          <Text style={styles.headerSubtitle}>
            {motorista ? `Editando: ${motorista.nome}` : 'Carregando dados...'}
          </Text>
        </View>

        {/* Conteúdo */}
        <View style={[styles.card, styles.center, { flex: 1 }]}>
          <Text style={{ fontSize: 64, marginBottom: 16 }}>🚧</Text>
          <Text style={[styles.text, { fontSize: 18, marginBottom: 8, textAlign: 'center' }]}>
            Funcionalidade em Desenvolvimento
          </Text>
          <Text style={[styles.textSecondary, { textAlign: 'center', marginBottom: 32 }]}>
            A edição de motoristas será implementada na próxima versão
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={handleEditar}
          >
            <Text style={styles.buttonText}>Entendi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default EditarMotoristaScreen;
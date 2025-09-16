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

const AlterarSenhaScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];
  
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
  const [mostrarNovaSenha, setMostrarNovaSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const handleAlterarSenha = () => {
    if (!senhaAtual.trim()) {
      Alert.alert('Erro', 'Digite sua senha atual');
      return;
    }

    if (!novaSenha.trim()) {
      Alert.alert('Erro', 'Digite a nova senha');
      return;
    }

    if (novaSenha.length < 6) {
      Alert.alert('Erro', 'A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (senhaAtual === novaSenha) {
      Alert.alert('Erro', 'A nova senha deve ser diferente da senha atual');
      return;
    }

    Alert.alert(
      'Confirmar Alteração',
      'Tem certeza que deseja alterar sua senha?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Alterar', 
          onPress: () => {
            // Aqui seria feita a validação da senha atual e alteração
            Alert.alert('Sucesso', 'Senha alterada com sucesso!');
            navigation.goBack();
          }
        },
      ]
    );
  };

  return (
    <SafeAreaWrapper>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
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
          <Text style={styles.headerTitle}>Alterar Senha</Text>
          <Text style={styles.headerSubtitle}>
            Atualize sua senha de acesso para manter sua conta segura
          </Text>
        </View>

        {/* Formulário */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔒 Informações de Segurança</Text>
          
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Senha Atual *
            </Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                style={[styles.input, { paddingRight: 50 }]}
                placeholder="Digite sua senha atual"
                placeholderTextColor={colors.textSecondary}
                value={senhaAtual}
                onChangeText={setSenhaAtual}
                secureTextEntry={!mostrarSenhaAtual}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 12,
                  top: 12,
                  padding: 4,
                }}
                onPress={() => setMostrarSenhaAtual(!mostrarSenhaAtual)}
              >
                <Text style={{ color: '#999999', fontSize: 16 }}>
                  {mostrarSenhaAtual ? '🙈' : '👁️'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Nova Senha *
            </Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                style={[styles.input, { paddingRight: 50 }]}
                placeholder="Digite a nova senha"
                placeholderTextColor={colors.textSecondary}
                value={novaSenha}
                onChangeText={setNovaSenha}
                secureTextEntry={!mostrarNovaSenha}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 12,
                  top: 12,
                  padding: 4,
                }}
                onPress={() => setMostrarNovaSenha(!mostrarNovaSenha)}
              >
                <Text style={{ color: '#999999', fontSize: 16 }}>
                  {mostrarNovaSenha ? '🙈' : '👁️'}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.textSecondary, { fontSize: 12, marginTop: 4 }]}>
              Mínimo de 6 caracteres
            </Text>
          </View>

          <View style={{ marginBottom: 24 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Confirmar Nova Senha *
            </Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                style={[styles.input, { paddingRight: 50 }]}
                placeholder="Confirme a nova senha"
                placeholderTextColor={colors.textSecondary}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry={!mostrarConfirmarSenha}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 12,
                  top: 12,
                  padding: 4,
                }}
                onPress={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
              >
                <Text style={{ color: '#999999', fontSize: 16 }}>
                  {mostrarConfirmarSenha ? '🙈' : '👁️'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Dicas de Segurança */}
          <View style={{
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            borderRadius: 8,
            padding: 12,
            marginBottom: 24,
            borderLeftWidth: 4,
            borderLeftColor: '#FFC107',
          }}>
            <Text style={[styles.text, { fontWeight: '600', marginBottom: 8 }]}>
              💡 Dicas para uma senha segura:
            </Text>
            <Text style={[styles.textSecondary, { fontSize: 12, lineHeight: 18 }]}>
              • Use pelo menos 8 caracteres{'\n'}
              • Combine letras maiúsculas e minúsculas{'\n'}
              • Inclua números e símbolos{'\n'}
              • Evite informações pessoais óbvias
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary, { flex: 1, marginRight: 8 }]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonSecondaryText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { flex: 1, marginLeft: 8 }]}
              onPress={handleAlterarSenha}
            >
              <Text style={styles.buttonText}>Alterar Senha</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default AlterarSenhaScreen;

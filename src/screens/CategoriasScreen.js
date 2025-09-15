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

const CategoriasScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [categorias, setCategorias] = useState([
    { id: 1, nome: 'Pizzas', emoji: '🍕', descricao: 'Pizzas tradicionais e especiais', ativa: true },
    { id: 2, nome: 'Hambúrgueres', emoji: '🍔', descricao: 'Hambúrgueres artesanais', ativa: true },
    { id: 3, nome: 'Bebidas', emoji: '🥤', descricao: 'Refrigerantes e sucos', ativa: true },
    { id: 4, nome: 'Sobremesas', emoji: '🍰', descricao: 'Doces e sobremesas', ativa: true },
    { id: 5, nome: 'Lanches', emoji: '🥪', descricao: 'Sanduíches e lanches rápidos', ativa: false },
    { id: 6, nome: 'Saladas', emoji: '🥗', descricao: 'Saladas frescas e saudáveis', ativa: true },
  ]);

  const [emojis] = useState([
    '🍕', '🍔', '🥤', '🍰', '🥪', '🥗', '🍝', '🍜', '🍲', '🍛', '🍱', '🍣',
    '🌮', '🌯', '🥙', '🧆', '🥘', '🍳', '🥞', '🧇', '🍞', '🥖', '🥨', '🧀'
  ]);

  const categoriasFiltradas = categorias.filter((categoria) => {
    const matchSearch = categoria.nome.toLowerCase().includes(searchText.toLowerCase()) ||
                       categoria.descricao.toLowerCase().includes(searchText.toLowerCase());
    return matchSearch;
  });

  const toggleCategoriaStatus = (id) => {
    setCategorias(prev => prev.map(cat => 
      cat.id === id ? { ...cat, ativa: !cat.ativa } : cat
    ));
  };

  const handleExcluirCategoria = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta categoria?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setCategorias(prev => prev.filter(cat => cat.id !== id));
            Alert.alert('Sucesso', 'Categoria excluída com sucesso!');
          }
        }
      ]
    );
  };

  const handleEditarCategoria = (categoria) => {
    navigation.navigate('EditarCategoria', { categoria });
  };

  const handleNovaCategoria = () => {
    navigation.navigate('NovaCategoria');
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
          <Text style={styles.headerTitle}>Categorias</Text>
          <Text style={styles.headerSubtitle}>
            Gerencie as categorias do seu cardápio
          </Text>
          <TouchableOpacity 
            style={[styles.button, { marginTop: 16 }]}
            onPress={handleNovaCategoria}
          >
            <Text style={styles.buttonText}>➕ Nova Categoria</Text>
          </TouchableOpacity>
        </View>

        {/* Busca */}
        <View style={[styles.card, { marginBottom: 16 }]}>
          <TextInput
            style={{
              backgroundColor: '#333333',
              borderRadius: 8,
              padding: 12,
              color: '#ffffff',
              fontSize: 16,
            }}
            placeholder="Buscar categorias..."
            placeholderTextColor="#999999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Estatísticas */}
        <View style={[styles.statsContainer, { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }]}>
          <View style={[styles.statCard, { width: '48%', marginBottom: 12 }]}>
            <Text style={styles.statValue}>{categorias.length}</Text>
            <Text style={styles.statLabel}>Total de Categorias</Text>
          </View>
          <View style={[styles.statCard, { width: '48%', marginBottom: 12 }]}>
            <Text style={styles.statValue}>
              {categorias.filter(c => c.ativa).length}
            </Text>
            <Text style={styles.statLabel}>Categorias Ativas</Text>
          </View>
        </View>

        {/* Lista de Categorias */}
        {categoriasFiltradas.length === 0 ? (
          <View style={[styles.card, styles.center, { paddingVertical: 40 }]}>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>🔍</Text>
            <Text style={[styles.text, { fontSize: 18, marginBottom: 8 }]}>
              Nenhuma categoria encontrada
            </Text>
            <Text style={styles.textSecondary}>
              Tente ajustar sua busca
            </Text>
          </View>
        ) : (
          categoriasFiltradas.map((categoria) => (
            <View key={categoria.id} style={styles.card}>
              <View style={styles.listItemHeader}>
                <View style={[styles.row, { flex: 1 }]}>
                  <Text style={{ fontSize: 32, marginRight: 16 }}>
                    {categoria.emoji}
                  </Text>
                  <View style={styles.flex1}>
                    <Text style={styles.listItemTitle}>{categoria.nome}</Text>
                    <Text style={styles.listItemSubtitle}>
                      {categoria.descricao}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    categoria.ativa
                      ? { backgroundColor: 'rgba(30, 203, 79, 0.2)' }
                      : { backgroundColor: 'rgba(255, 69, 0, 0.2)' },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      categoria.ativa
                        ? { color: '#1ecb4f' }
                        : { color: '#FF4500' },
                    ]}
                  >
                    {categoria.ativa ? 'Ativa' : 'Inativa'}
                  </Text>
                </View>
              </View>

              <View style={[styles.row, styles.spaceBetween, { marginTop: 12, alignItems: 'flex-end' }]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.textSecondary}>ID: #{categoria.id}</Text>
                </View>
                <View style={[styles.row, { flex: 1, justifyContent: 'flex-end' }]}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      { paddingHorizontal: 12, marginRight: 8, minWidth: 80 },
                    ]}
                    onPress={() => handleEditarCategoria(categoria)}
                  >
                    <Text style={[styles.buttonText, { fontSize: 12 }]}>✏️ Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      styles.buttonSecondary,
                      { paddingHorizontal: 12, marginRight: 8, minWidth: 80 },
                    ]}
                    onPress={() => toggleCategoriaStatus(categoria.id)}
                  >
                    <Text style={[styles.buttonSecondaryText, { fontSize: 12 }]}>
                      {categoria.ativa ? '⏸️ Pausar' : '▶️ Ativar'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      { 
                        paddingHorizontal: 12, 
                        minWidth: 80,
                        backgroundColor: '#FF4500',
                        borderColor: '#FF4500',
                        borderWidth: 1,
                      },
                    ]}
                    onPress={() => handleExcluirCategoria(categoria.id)}
                  >
                    <Text style={[styles.buttonText, { fontSize: 12, color: '#ffffff' }]}>
                      🗑️ Excluir
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}

        {/* Ações Rápidas */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ações Rápidas</Text>
          <View style={[styles.row, styles.spaceBetween, { marginTop: 16 }]}>
            <TouchableOpacity 
              style={[styles.button, { flex: 1, marginRight: 8 }]}
              onPress={handleNovaCategoria}
            >
              <Text style={styles.buttonText}>➕ Nova Categoria</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.buttonSecondary, { flex: 1, marginLeft: 8 }]}
              onPress={() => navigation.navigate('ProdutosList')}
            >
              <Text style={styles.buttonSecondaryText}>📦 Ver Produtos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoriasScreen;

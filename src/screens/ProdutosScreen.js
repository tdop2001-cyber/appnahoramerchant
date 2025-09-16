import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { createDynamicStyles } from '../styles/dynamicStyles';
import SafeAreaWrapper from '../components/SafeAreaWrapper';

const ProdutosScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];
  
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');

  const [categorias] = useState([
    { id: 'todos', nome: 'Todos', emoji: '🍽️' },
    { id: 'pizzas', nome: 'Pizzas', emoji: '🍕' },
    { id: 'hamburgers', nome: 'Hambúrgueres', emoji: '🍔' },
    { id: 'bebidas', nome: 'Bebidas', emoji: '🥤' },
    { id: 'sobremesas', nome: 'Sobremesas', emoji: '🍰' },
  ]);

  const [produtos] = useState([
    {
      id: 1,
      nome: 'Pizza Margherita',
      categoria: 'pizzas',
      preco: 'R$ 25,90',
      descricao: 'Molho de tomate, mussarela e manjericão',
      disponivel: true,
      emoji: '🍕',
    },
    {
      id: 2,
      nome: 'Hambúrguer Clássico',
      categoria: 'hamburgers',
      preco: 'R$ 18,50',
      descricao: 'Pão, carne, queijo, alface e tomate',
      disponivel: true,
      emoji: '🍔',
    },
    {
      id: 3,
      nome: 'Coca-Cola 350ml',
      categoria: 'bebidas',
      preco: 'R$ 4,50',
      descricao: 'Refrigerante gelado',
      disponivel: true,
      emoji: '🥤',
    },
    {
      id: 4,
      nome: 'Pizza Calabresa',
      categoria: 'pizzas',
      preco: 'R$ 28,90',
      descricao: 'Molho de tomate, mussarela e calabresa',
      disponivel: false,
      emoji: '🍕',
    },
    {
      id: 5,
      nome: 'Brownie com Sorvete',
      categoria: 'sobremesas',
      preco: 'R$ 12,90',
      descricao: 'Brownie quente com sorvete de baunilha',
      disponivel: true,
      emoji: '🍰',
    },
    {
      id: 6,
      nome: 'Hambúrguer Bacon',
      categoria: 'hamburgers',
      preco: 'R$ 22,90',
      descricao: 'Pão, carne, queijo, bacon e cebola',
      disponivel: true,
      emoji: '🍔',
    },
  ]);

  const produtosFiltrados = produtos.filter((produto) => {
    const matchSearch = produto.nome.toLowerCase().includes(searchText.toLowerCase()) ||
                       produto.descricao.toLowerCase().includes(searchText.toLowerCase());
    const matchCategory = activeCategory === 'todos' || produto.categoria === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <SafeAreaWrapper>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Produtos</Text>
          <Text style={styles.headerSubtitle}>
            Gerencie seu cardápio e produtos
          </Text>
        <View style={{ flexDirection: 'row', marginTop: 16 }}>
          <TouchableOpacity 
            style={[styles.button, { flex: 1, marginRight: 8 }]}
            onPress={() => navigation.navigate('CriarProduto')}
          >
            <Text style={styles.buttonText}>➕ Novo Produto</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.buttonSecondary, { flex: 1, marginLeft: 8 }]}
            onPress={() => navigation.navigate('Categorias')}
          >
            <Text style={styles.buttonSecondaryText}>📂 Categorias</Text>
          </TouchableOpacity>
        </View>
        </View>

        {/* Busca */}
        <View style={[styles.card, { marginBottom: 16 }]}>
          <TextInput
            style={styles.input}
            placeholder="Buscar produtos..."
            placeholderTextColor={colors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Categorias */}
        <View style={{ marginBottom: 16 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {categorias.map((categoria) => (
              <TouchableOpacity
                key={categoria.id}
                style={[
                  styles.button,
                  activeCategory === categoria.id ? {} : styles.buttonSecondary,
                  { marginRight: 8, paddingHorizontal: 16, minWidth: 100 },
                ]}
                onPress={() => setActiveCategory(categoria.id)}
              >
                <Text
                  style={[
                    activeCategory === categoria.id ? styles.buttonText : styles.buttonSecondaryText,
                    { fontSize: 14, textAlign: 'center' },
                  ]}
                >
                  {categoria.emoji} {categoria.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Estatísticas */}
        <View style={[styles.statsContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
          <View style={[styles.statCard, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.statValue}>{produtos.length}</Text>
            <Text style={styles.statLabel}>Total de Produtos</Text>
          </View>
          <View style={[styles.statCard, { flex: 1, marginHorizontal: 4 }]}>
            <Text style={styles.statValue}>
              {produtos.filter(p => p.disponivel).length}
            </Text>
            <Text style={styles.statLabel}>Disponíveis</Text>
          </View>
          <View style={[styles.statCard, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.statValue}>
              {produtos.filter(p => !p.disponivel).length}
            </Text>
            <Text style={styles.statLabel}>Indisponíveis</Text>
          </View>
        </View>
        {/* Lista de Produtos */}
        {produtosFiltrados.length === 0 ? (
          <View style={[styles.card, styles.center, { paddingVertical: 40 }]}>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>🔍</Text>
            <Text style={[styles.text, { fontSize: 18, marginBottom: 8 }]}>
              Nenhum produto encontrado
            </Text>
            <Text style={styles.textSecondary}>
              Tente ajustar sua busca ou filtro
            </Text>
          </View>
        ) : (
          produtosFiltrados.map((produto) => (
            <View key={produto.id} style={styles.card}>
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
                <View style={[styles.row, { flex: 1, justifyContent: 'flex-end' }]}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      { paddingHorizontal: 12, marginRight: 8, minWidth: 80 },
                    ]}
                    onPress={() => navigation.navigate('EditarProduto', { produto })}
                  >
                    <Text style={[styles.buttonText, { fontSize: 12 }]}>✏️ Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      styles.buttonSecondary,
                      { paddingHorizontal: 12, minWidth: 80 },
                    ]}
                  >
                    <Text style={[styles.buttonSecondaryText, { fontSize: 12 }]}>
                      {produto.disponivel ? '⏸️ Pausar' : '▶️ Ativar'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default ProdutosScreen;

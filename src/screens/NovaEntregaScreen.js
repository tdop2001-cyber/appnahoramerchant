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

const NovaEntregaScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];
  
  const [formData, setFormData] = useState({
    nomeCliente: '',
    telefoneCliente: '',
    // Endereço de Retirada
    enderecoRetiradaId: '',
    ruaRetirada: '',
    bairroRetirada: '',
    numeroRetirada: '',
    referenciaRetirada: '',
    // Endereço de Entrega
    ruaEntrega: '',
    bairroEntrega: '',
    numeroEntrega: '',
    referenciaEntrega: '',
    detalhesPacote: '',
    instrucoesEntrega: '',
    valorEntrega: '',
    tipoEntrega: 'normal',
    tipoPacote: '',
    tamanhoPacote: '',
    // Desconto/Acréscimo
    tipoAjuste: '', // 'desconto' ou 'acrescimo'
    valorAjuste: '',
    percentualAjuste: '',
    // Produtos do Pedido
    itensPedido: [],
  });

  // Endereços de retirada cadastrados (simulando dados do banco)
  const [enderecosRetirada] = useState([
    {
      id: 1,
      nome: 'Restaurante Principal',
      rua: 'Rua das Flores',
      numero: '123',
      bairro: 'Centro',
      referencia: 'Próximo ao shopping',
      ativo: true,
    },
    {
      id: 2,
      nome: 'Filial Norte',
      rua: 'Av. Paulista',
      numero: '1000',
      bairro: 'Bela Vista',
      referencia: 'Edifício comercial',
      ativo: false,
    },
  ]);

  // Produtos disponíveis (simulando dados do banco)
  const [produtosDisponiveis] = useState([
    {
      id: 1,
      nome: 'Pizza Margherita',
      categoria: 'pizzas',
      preco: 25.90,
      precoOriginal: 29.90,
      descricao: 'Molho de tomate, mussarela e manjericão',
      disponivel: true,
      emoji: '🍕',
      destaque: 'promocao',
      avaliacao: 4.8,
      tempoPreparo: '15-20 min',
      calorias: 450,
    },
    {
      id: 2,
      nome: 'Hambúrguer Clássico',
      categoria: 'hamburgers',
      preco: 18.50,
      descricao: 'Pão, carne, queijo, alface e tomate',
      disponivel: true,
      emoji: '🍔',
      destaque: 'popular',
      avaliacao: 4.9,
      tempoPreparo: '10-15 min',
      calorias: 520,
    },
    {
      id: 3,
      nome: 'Coca-Cola 350ml',
      categoria: 'bebidas',
      preco: 4.50,
      descricao: 'Refrigerante gelado',
      disponivel: true,
      emoji: '🥤',
      avaliacao: 4.5,
      tempoPreparo: '2-3 min',
      calorias: 140,
    },
    {
      id: 4,
      nome: 'Pizza Calabresa',
      categoria: 'pizzas',
      preco: 28.90,
      descricao: 'Molho de tomate, mussarela e calabresa',
      disponivel: true,
      emoji: '🍕',
      avaliacao: 4.7,
      tempoPreparo: '15-20 min',
      calorias: 480,
    },
    {
      id: 5,
      nome: 'Brownie com Sorvete',
      categoria: 'sobremesas',
      preco: 12.90,
      descricao: 'Brownie quente com sorvete de baunilha',
      disponivel: true,
      emoji: '🍰',
      destaque: 'novo',
      avaliacao: 4.6,
      tempoPreparo: '5-8 min',
      calorias: 320,
    },
    {
      id: 6,
      nome: 'Hambúrguer Bacon',
      categoria: 'hamburgers',
      preco: 22.90,
      descricao: 'Pão, carne, queijo, bacon e cebola',
      disponivel: true,
      emoji: '🍔',
      avaliacao: 4.8,
      tempoPreparo: '12-18 min',
      calorias: 680,
    },
    {
      id: 7,
      nome: 'Pizza Quatro Queijos',
      categoria: 'pizzas',
      preco: 32.90,
      descricao: 'Mussarela, parmesão, gorgonzola e catupiry',
      disponivel: true,
      emoji: '🍕',
      avaliacao: 4.9,
      tempoPreparo: '18-25 min',
      calorias: 520,
    },
    {
      id: 8,
      nome: 'Hambúrguer Vegetariano',
      categoria: 'hamburgers',
      preco: 19.90,
      descricao: 'Hambúrguer de quinoa com vegetais',
      disponivel: true,
      emoji: '🍔',
      avaliacao: 4.5,
      tempoPreparo: '10-15 min',
      calorias: 380,
    },
    {
      id: 9,
      nome: 'Pizza Frango Catupiry',
      categoria: 'pizzas',
      preco: 30.90,
      descricao: 'Frango desfiado com catupiry',
      disponivel: true,
      emoji: '🍕',
      avaliacao: 4.8,
      tempoPreparo: '18-25 min',
      calorias: 500,
    },
    {
      id: 10,
      nome: 'Hambúrguer Duplo',
      categoria: 'hamburgers',
      preco: 25.50,
      descricao: 'Duas carnes, queijo e bacon',
      disponivel: true,
      emoji: '🍔',
      avaliacao: 4.9,
      tempoPreparo: '15-20 min',
      calorias: 750,
    },
    {
      id: 11,
      nome: 'Pizza Portuguesa',
      categoria: 'pizzas',
      preco: 29.90,
      descricao: 'Presunto, ovos, cebola e azeitonas',
      disponivel: true,
      emoji: '🍕',
      avaliacao: 4.7,
      tempoPreparo: '18-25 min',
      calorias: 480,
    },
    {
      id: 12,
      nome: 'Hambúrguer Artesanal',
      categoria: 'hamburgers',
      preco: 24.90,
      descricao: 'Carne artesanal com queijo especial',
      disponivel: true,
      emoji: '🍔',
      avaliacao: 4.8,
      tempoPreparo: '12-18 min',
      calorias: 580,
    },
    {
      id: 13,
      nome: 'Pizza Napolitana',
      categoria: 'pizzas',
      preco: 27.90,
      descricao: 'Tomate, mussarela e manjericão fresco',
      disponivel: true,
      emoji: '🍕',
      avaliacao: 4.9,
      tempoPreparo: '15-20 min',
      calorias: 420,
    },
    {
      id: 14,
      nome: 'Hambúrguer Picante',
      categoria: 'hamburgers',
      preco: 21.90,
      descricao: 'Carne com molho picante e jalapeños',
      disponivel: true,
      emoji: '🍔',
      avaliacao: 4.6,
      tempoPreparo: '12-18 min',
      calorias: 550,
    },
    {
      id: 15,
      nome: 'Pizza Vegetariana',
      categoria: 'pizzas',
      preco: 24.90,
      descricao: 'Vegetais frescos e queijo de cabra',
      disponivel: true,
      emoji: '🍕',
      avaliacao: 4.5,
      tempoPreparo: '15-20 min',
      calorias: 380,
    },
  ]);

  const [tiposEntrega] = useState([
    { id: 'normal', nome: 'Normal', emoji: '📦', descricao: 'Entrega padrão' },
    { id: 'expressa', nome: 'Expressa', emoji: '⚡', descricao: 'Entrega rápida' },
    { id: 'fragil', nome: 'Frágil', emoji: '🔔', descricao: 'Cuidado especial' },
    { id: 'urgente', nome: 'Urgente', emoji: '🚨', descricao: 'Máxima prioridade' },
  ]);

  // Tipos de pacote disponíveis
  const [tiposPacote] = useState([
    { id: 'caixa', nome: 'Caixa', emoji: '📦' },
    { id: 'envelope', nome: 'Envelope', emoji: '📮' },
    { id: 'saco', nome: 'Saco', emoji: '🛍️' },
    { id: 'bolsa', nome: 'Bolsa', emoji: '🎒' },
    { id: 'garrafa', nome: 'Garrafa', emoji: '🍼' },
    { id: 'outro', nome: 'Outro', emoji: '📋' },
  ]);

  // Tamanhos de pacote disponíveis (seguindo modelo NaHora!)
  const [tamanhosPacote] = useState([
    { id: 'pequeno', nome: 'Pequeno', emoji: '🔸', multiplicador: 1.0 },
    { id: 'medio', nome: 'Médio', emoji: '🔹', multiplicador: 1.5 },
    { id: 'grande', nome: 'Grande', emoji: '🔶', multiplicador: 2.0 },
  ]);

  // Configuração de precificação dinâmica (modelo NaHora!)
  const [precificacao] = useState({
    tarifaBase: 8.00,
    precoPorKm: 1.50,
    taxaPlataforma: 0.15, // 15% para plataforma
    horarioPicoMultiplicador: 1.10, // +10% em horário de pico
  });

  // Estados para precificação
  const [distanciaEstimada, setDistanciaEstimada] = useState(0);
  const [precoCalculado, setPrecoCalculado] = useState(null);
  const [isHorarioPico, setIsHorarioPico] = useState(false);

  // Estados para filtros e busca
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [buscaProduto, setBuscaProduto] = useState('');
  
  // Estados para layout e visualização
  const [modoVisualizacao, setModoVisualizacao] = useState('lista'); // 'lista' ou 'grade'
  const [ultimaAcao, setUltimaAcao] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [produtosPorPagina] = useState(6); // Para undo/redo
  
  // Estados para tipo e tamanho de pacote
  const [tipoPacoteSelecionado, setTipoPacoteSelecionado] = useState('');
  const [tamanhoPacoteSelecionado, setTamanhoPacoteSelecionado] = useState('');
  
  // Estados para desconto/acréscimo
  const [mostrarAjuste, setMostrarAjuste] = useState(false);
  const [tipoAjusteSelecionado, setTipoAjusteSelecionado] = useState('');

  // Categorias disponíveis
  const [categorias] = useState([
    { id: 'todos', nome: 'Todos', emoji: '🍽️' },
    { id: 'pizzas', nome: 'Pizzas', emoji: '🍕' },
    { id: 'hamburgers', nome: 'Hambúrgueres', emoji: '🍔' },
    { id: 'bebidas', nome: 'Bebidas', emoji: '🥤' },
    { id: 'sobremesas', nome: 'Sobremesas', emoji: '🍰' },
  ]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTipoEntregaSelect = (tipo) => {
    setFormData(prev => ({
      ...prev,
      tipoEntrega: tipo.id
    }));
  };

  const handleEnderecoRetiradaSelect = (endereco) => {
    setFormData(prev => ({
      ...prev,
      enderecoRetiradaId: endereco.id,
      ruaRetirada: endereco.rua,
      bairroRetirada: endereco.bairro,
      numeroRetirada: endereco.numero,
      referenciaRetirada: endereco.referencia,
    }));
  };

  const handleEnderecoRetiradaCustom = () => {
    setFormData(prev => ({
      ...prev,
      enderecoRetiradaId: '',
      ruaRetirada: '',
      bairroRetirada: '',
      numeroRetirada: '',
      referenciaRetirada: '',
    }));
  };

  const handleAdicionarProduto = (produto) => {
    // Salvar estado anterior para undo
    setUltimaAcao({
      tipo: 'adicionar',
      produto: produto,
      itensAnteriores: [...formData.itensPedido]
    });

    const itemExistente = formData.itensPedido.find(item => item.id === produto.id);
    
    if (itemExistente) {
      // Se o produto já existe, aumenta a quantidade
      setFormData(prev => ({
        ...prev,
        itensPedido: prev.itensPedido.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      }));
    } else {
      // Se é um novo produto, adiciona ao pedido
      setFormData(prev => ({
        ...prev,
        itensPedido: [...prev.itensPedido, {
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          quantidade: 1,
          emoji: produto.emoji
        }]
      }));
    }

    // Feedback visual (simulado)
    Alert.alert('✅', `${produto.nome} adicionado ao pedido!`, [{ text: 'OK' }], { cancelable: true });
  };

  const handleRemoverProduto = (produtoId) => {
    setFormData(prev => ({
      ...prev,
      itensPedido: prev.itensPedido.filter(item => item.id !== produtoId)
    }));
  };

  const handleAlterarQuantidade = (produtoId, novaQuantidade) => {
    if (novaQuantidade <= 0) {
      handleRemoverProduto(produtoId);
      return;
    }

    setFormData(prev => ({
      ...prev,
      itensPedido: prev.itensPedido.map(item =>
        item.id === produtoId
          ? { ...item, quantidade: novaQuantidade }
          : item
      )
    }));
  };

  const calcularTotalPedido = () => {
    return formData.itensPedido.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  // Função de precificação dinâmica (modelo NaHora!)
  const calcularTaxaEntrega = (distancia, categoriaTamanho) => {
    if (!distancia || !categoriaTamanho) return null;

    const tamanho = tamanhosPacote.find(t => t.id === categoriaTamanho);
    if (!tamanho) return null;

    // Cálculo base: tarifa inicial + preço por km
    let taxaEntrega = precificacao.tarifaBase + (distancia * precificacao.precoPorKm);

    // Aplicar multiplicador de categoria
    taxaEntrega *= tamanho.multiplicador;

    // Aplicar multiplicador de horário de pico
    if (isHorarioPico) {
      taxaEntrega *= precificacao.horarioPicoMultiplicador;
    }

    // Arredondar para 2 casas decimais
    taxaEntrega = Math.round(taxaEntrega * 100) / 100;

    // Calcular split (15% plataforma / 85% entregador)
    const totalProdutos = calcularTotalPedido();
    const totalGeral = totalProdutos + taxaEntrega;
    const taxaPlataforma = totalGeral * precificacao.taxaPlataforma;
    const ganhoEntregador = totalGeral - taxaPlataforma;

    return {
      taxaEntrega,
      totalProdutos,
      totalGeral,
      taxaPlataforma: Math.round(taxaPlataforma * 100) / 100,
      ganhoEntregador: Math.round(ganhoEntregador * 100) / 100,
      distancia,
      categoria: tamanho.nome,
      horarioPico: isHorarioPico
    };
  };

  // Atualizar cálculo quando distância ou tamanho mudar
  React.useEffect(() => {
    if (distanciaEstimada > 0 && tamanhoPacoteSelecionado) {
      const preco = calcularTaxaEntrega(distanciaEstimada, tamanhoPacoteSelecionado);
      setPrecoCalculado(preco);
      if (preco) {
        handleInputChange('valorEntrega', preco.taxaEntrega.toString());
      }
    }
  }, [distanciaEstimada, tamanhoPacoteSelecionado, isHorarioPico]);

  // Função para calcular valor final com desconto/acréscimo
  const calcularValorFinal = () => {
    const totalProdutos = calcularTotalPedido();
    const valorEntrega = parseFloat(formData.valorEntrega) || 0;
    const valorBase = totalProdutos + valorEntrega;

    if (!formData.tipoAjuste || (!formData.valorAjuste && !formData.percentualAjuste)) {
      return valorBase;
    }

    let valorAjuste = 0;

    if (formData.percentualAjuste) {
      // Calcular baseado em percentual
      const percentual = parseFloat(formData.percentualAjuste) / 100;
      valorAjuste = valorBase * percentual;
    } else if (formData.valorAjuste) {
      // Calcular baseado em valor fixo
      valorAjuste = parseFloat(formData.valorAjuste);
    }

    if (formData.tipoAjuste === 'desconto') {
      return Math.max(0, valorBase - valorAjuste);
    } else if (formData.tipoAjuste === 'acrescimo') {
      return valorBase + valorAjuste;
    }

    return valorBase;
  };

  // Função para desfazer última ação
  const handleUndo = () => {
    if (ultimaAcao) {
      setFormData(prev => ({
        ...prev,
        itensPedido: ultimaAcao.itensAnteriores
      }));
      setUltimaAcao(null);
      Alert.alert('↩️', 'Última ação desfeita!', [{ text: 'OK' }]);
    }
  };

  // Filtrar produtos por categoria e busca
  const produtosFiltrados = produtosDisponiveis.filter(produto => {
    const matchCategoria = filtroCategoria === 'todos' || produto.categoria === filtroCategoria;
    const matchBusca = buscaProduto === '' || 
      produto.nome.toLowerCase().includes(buscaProduto.toLowerCase()) ||
      produto.descricao.toLowerCase().includes(buscaProduto.toLowerCase());
    return matchCategoria && matchBusca;
  });

  // Lógica de paginação
  const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);
  const indiceInicio = (paginaAtual - 1) * produtosPorPagina;
  const indiceFim = indiceInicio + produtosPorPagina;
  const produtosPaginaAtual = produtosFiltrados.slice(indiceInicio, indiceFim);

  // Resetar página quando filtros mudarem
  React.useEffect(() => {
    setPaginaAtual(1);
  }, [filtroCategoria, buscaProduto]);

  // Verificar se produto já está no pedido
  const produtoJaNoPedido = (produtoId) => {
    return formData.itensPedido.some(item => item.id === produtoId);
  };

  // Separar produtos por categoria
  const produtosPorCategoria = produtosFiltrados.reduce((acc, produto) => {
    if (!acc[produto.categoria]) {
      acc[produto.categoria] = [];
    }
    acc[produto.categoria].push(produto);
    return acc;
  }, {});

  // Produtos em destaque
  const produtosDestaque = produtosFiltrados.filter(produto => produto.destaque);

  // Função para solicitar entrega
  const handleSolicitarEntrega = () => {
    // Validação dos campos obrigatórios
    if (!formData.cliente.trim()) {
      Alert.alert('Erro', 'Por favor, informe o nome do cliente');
      return;
    }
    if (!formData.telefone.trim()) {
      Alert.alert('Erro', 'Por favor, informe o telefone do cliente');
      return;
    }
    if (!formData.ruaEntrega.trim()) {
      Alert.alert('Erro', 'Por favor, informe o endereço de entrega');
      return;
    }
    if (!formData.ruaRetirada.trim()) {
      Alert.alert('Erro', 'Por favor, informe o endereço de retirada');
      return;
    }
    if (!tipoPacoteSelecionado) {
      Alert.alert('Erro', 'Por favor, selecione o tipo do pacote');
      return;
    }
    if (!tamanhoPacoteSelecionado) {
      Alert.alert('Erro', 'Por favor, selecione o tamanho do pacote');
      return;
    }
    if (formData.itensPedido.length === 0) {
      Alert.alert('Erro', 'Por favor, adicione pelo menos um produto ao pedido');
      return;
    }

    // Simular envio da entrega
    const valorFinal = calcularValorFinal();
    const temAjuste = formData.tipoAjuste && (formData.valorAjuste || formData.percentualAjuste);
    
    Alert.alert(
      '✅ Entrega Solicitada!',
      `Entrega solicitada com sucesso!\n\nCliente: ${formData.cliente}\nProdutos: ${formData.itensPedido.length}\n${temAjuste ? `Total Final: R$ ${valorFinal.toFixed(2)}` : `Total: R$ ${valorFinal.toFixed(2)}`}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  // Componente para renderizar card de produto
  const renderCardProduto = (produto, isGrid = false) => {
    const jaNoPedido = produtoJaNoPedido(produto.id);
    
    const getBadgeDestaque = () => {
      switch (produto.destaque) {
        case 'promocao':
          return { text: '🔥 PROMOÇÃO', color: '#FF4500' };
        case 'popular':
          return { text: '⭐ POPULAR', color: '#FFD700' };
        case 'novo':
          return { text: '🆕 NOVO', color: '#1ecb4f' };
        default:
          return null;
      }
    };

    const badge = getBadgeDestaque();

    if (isGrid) {
      // Layout em grade (2x2)
      return (
        <TouchableOpacity
          key={produto.id}
          style={[
            styles.button,
            jaNoPedido ? { backgroundColor: 'rgba(30, 203, 79, 0.2)', borderColor: '#1ecb4f' } : styles.buttonSecondary,
            { 
              width: '48%', 
              marginBottom: 12,
              paddingHorizontal: 8,
              paddingVertical: 12,
              minHeight: 160,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
          onPress={() => handleAdicionarProduto(produto)}
        >
          {badge && (
            <View style={{
              position: 'absolute',
              top: 4,
              right: 4,
              backgroundColor: badge.color,
              paddingHorizontal: 4,
              paddingVertical: 2,
              borderRadius: 6,
            }}>
              <Text style={{ color: '#ffffff', fontSize: 8, fontWeight: 'bold' }}>
                {badge.text}
              </Text>
            </View>
          )}
          
          <Text style={{ fontSize: 28, marginBottom: 6 }}>
            {produto.emoji}
          </Text>
          
          <Text style={[
            jaNoPedido ? { color: '#1ecb4f' } : styles.buttonSecondaryText, 
            { fontSize: 12, textAlign: 'center', fontWeight: '600', marginBottom: 4 }
          ]} numberOfLines={2}>
            {produto.nome}
          </Text>
          
          
          <Text style={[
            jaNoPedido ? { color: '#1ecb4f' } : styles.buttonSecondaryText, 
            { fontSize: 12, fontWeight: 'bold', marginBottom: 2 }
          ]}>
            R$ {produto.preco.toFixed(2)}
          </Text>
          
          {produto.precoOriginal && (
            <Text style={[
              styles.buttonSecondaryText, 
              { fontSize: 9, textDecorationLine: 'line-through' }
            ]}>
              R$ {produto.precoOriginal.toFixed(2)}
            </Text>
          )}
          
          {jaNoPedido && (
            <Text style={[
              { color: '#1ecb4f', fontSize: 9, fontWeight: 'bold', marginTop: 2 }
            ]}>
              ✓ No pedido
            </Text>
          )}
        </TouchableOpacity>
      );
    } else {
      // Layout em lista
      return (
        <TouchableOpacity
          key={produto.id}
          style={[
            styles.button,
            jaNoPedido ? { backgroundColor: 'rgba(30, 203, 79, 0.2)', borderColor: '#1ecb4f' } : styles.buttonSecondary,
            { 
              marginBottom: 12,
              paddingHorizontal: 16,
              paddingVertical: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}
          onPress={() => handleAdicionarProduto(produto)}
        >
          <View style={[styles.row, { flex: 1, alignItems: 'center' }]}>
            <Text style={{ fontSize: 24, marginRight: 12 }}>
              {produto.emoji}
            </Text>
            <View style={{ flex: 1 }}>
              <View style={[styles.row, { alignItems: 'center', marginBottom: 2 }]}>
                <Text style={[
                  jaNoPedido ? { color: '#1ecb4f' } : styles.buttonSecondaryText, 
                  { fontSize: 16, fontWeight: '600', marginRight: 8 }
                ]}>
                  {produto.nome}
                </Text>
                {badge && (
                  <View style={{
                    backgroundColor: badge.color,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 8,
                  }}>
                    <Text style={{ color: '#ffffff', fontSize: 8, fontWeight: 'bold' }}>
                      {badge.text}
                    </Text>
                  </View>
                )}
              </View>
              
              <Text style={[
                jaNoPedido ? { color: '#1ecb4f' } : styles.buttonSecondaryText, 
                { fontSize: 12, marginBottom: 4 }
              ]}>
                {produto.descricao}
              </Text>
              
              <View style={[styles.row, { alignItems: 'center' }]}>
                <Text style={[styles.buttonSecondaryText, { fontSize: 10 }]}>
                  🔥 {produto.calorias} kcal
                </Text>
              </View>
            </View>
          </View>
          
          <View style={{ alignItems: 'flex-end' }}>
            <View style={[styles.row, { alignItems: 'center', marginBottom: 2 }]}>
              <Text style={[
                jaNoPedido ? { color: '#1ecb4f' } : styles.buttonSecondaryText, 
                { fontSize: 16, fontWeight: 'bold', marginRight: 4 }
              ]}>
                R$ {produto.preco.toFixed(2)}
              </Text>
              {produto.precoOriginal && (
                <Text style={[
                  styles.buttonSecondaryText, 
                  { fontSize: 10, textDecorationLine: 'line-through' }
                ]}>
                  R$ {produto.precoOriginal.toFixed(2)}
                </Text>
              )}
            </View>
            {jaNoPedido && (
              <Text style={[
                { color: '#1ecb4f', fontSize: 10, fontWeight: 'bold' }
              ]}>
                ✓ No pedido
              </Text>
            )}
          </View>
        </TouchableOpacity>
      );
    }
  };

  const validateForm = () => {
    if (!formData.nomeCliente.trim()) {
      Alert.alert('Erro', 'Nome do cliente é obrigatório');
      return false;
    }
    if (!formData.telefoneCliente.trim()) {
      Alert.alert('Erro', 'Telefone do cliente é obrigatório');
      return false;
    }
    if (!formData.ruaRetirada.trim()) {
      Alert.alert('Erro', 'Rua de retirada é obrigatória');
      return false;
    }
    if (!formData.bairroRetirada.trim()) {
      Alert.alert('Erro', 'Bairro de retirada é obrigatório');
      return false;
    }
    if (!formData.numeroRetirada.trim()) {
      Alert.alert('Erro', 'Número de retirada é obrigatório');
      return false;
    }
    if (!formData.ruaEntrega.trim()) {
      Alert.alert('Erro', 'Rua de entrega é obrigatória');
      return false;
    }
    if (!formData.bairroEntrega.trim()) {
      Alert.alert('Erro', 'Bairro de entrega é obrigatório');
      return false;
    }
    if (!formData.numeroEntrega.trim()) {
      Alert.alert('Erro', 'Número de entrega é obrigatório');
      return false;
    }
    if (!formData.detalhesPacote.trim()) {
      Alert.alert('Erro', 'Detalhes do pacote são obrigatórios');
      return false;
    }
    if (formData.itensPedido.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos um produto ao pedido');
      return false;
    }
    return true;
  };


  const formatPhoneNumber = (text) => {
    // Remove todos os caracteres não numéricos
    const cleaned = text.replace(/\D/g, '');
    
    // Aplica a máscara (XX) XXXXX-XXXX
    if (cleaned.length <= 2) {
      return cleaned;
    } else if (cleaned.length <= 7) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
    }
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
            <Text style={styles.textPrimary}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nova Entrega</Text>
          <Text style={styles.headerSubtitle}>
            Preencha os detalhes para solicitar uma nova entrega
          </Text>
        </View>

        {/* Informações do Cliente */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informações do Cliente</Text>
          
          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Nome do Cliente *
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Nome completo"
                placeholderTextColor={colors.textSecondary}
                value={formData.nomeCliente}
                onChangeText={(value) => handleInputChange('nomeCliente', value)}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Telefone *
              </Text>
              <TextInput
                style={styles.input}
                placeholder="(XX) XXXXX-XXXX"
                placeholderTextColor={colors.textSecondary}
                value={formData.telefoneCliente}
                onChangeText={(value) => handleInputChange('telefoneCliente', formatPhoneNumber(value))}
                keyboardType="phone-pad"
                maxLength={15}
              />
            </View>
          </View>
        </View>

        {/* Endereço de Retirada */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Endereço de Retirada</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Configurações', { 
              screen: 'EnderecosRetirada' 
            })}>
              <Text style={styles.textPrimary}>⚙️ Gerenciar</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.textSecondary, { fontSize: 12, marginBottom: 16 }]}>
            Este é o endereço onde o motoboy irá buscar o pacote
          </Text>

          {/* Seleção de Endereços Cadastrados */}
          {enderecosRetirada.length > 0 && (
            <View style={{ marginBottom: 16 }}>
              <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Endereços Cadastrados
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {enderecosRetirada.map((endereco) => (
                  <TouchableOpacity
                    key={endereco.id}
                    style={[
                      styles.button,
                      formData.enderecoRetiradaId === endereco.id ? {} : styles.buttonSecondary,
                      { 
                        marginRight: 8, 
                        paddingHorizontal: 12,
                        minWidth: 120,
                      },
                    ]}
                    onPress={() => handleEnderecoRetiradaSelect(endereco)}
                  >
                    <Text
                      style={[
                        formData.enderecoRetiradaId === endereco.id ? styles.buttonText : styles.buttonSecondaryText,
                        { fontSize: 12, textAlign: 'center' },
                      ]}
                    >
                      📍 {endereco.nome}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.buttonSecondary,
                    { 
                      marginRight: 8, 
                      paddingHorizontal: 12,
                      minWidth: 100,
                    },
                  ]}
                  onPress={handleEnderecoRetiradaCustom}
                >
                  <Text style={[styles.buttonSecondaryText, { fontSize: 12, textAlign: 'center' }]}>
                    ✏️ Personalizar
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}

          {/* Indicador de Endereço Selecionado */}
          {formData.enderecoRetiradaId && (
            <View style={{ 
              backgroundColor: 'rgba(30, 203, 79, 0.1)', 
              borderRadius: 8, 
              padding: 12, 
              marginBottom: 16,
              borderWidth: 1,
              borderColor: 'rgba(30, 203, 79, 0.3)'
            }}>
              <Text style={[styles.text, { fontSize: 12, color: '#1ecb4f', fontWeight: '600' }]}>
                ✅ Endereço selecionado: {enderecosRetirada.find(e => e.id === formData.enderecoRetiradaId)?.nome}
              </Text>
            </View>
          )}
          
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Rua/Logradouro *
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Rua das Flores"
              placeholderTextColor={colors.textSecondary}
              value={formData.ruaRetirada}
              onChangeText={(value) => handleInputChange('ruaRetirada', value)}
            />
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            <View style={{ flex: 2, marginRight: 8 }}>
              <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Bairro *
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Centro"
                placeholderTextColor={colors.textSecondary}
                value={formData.bairroRetirada}
                onChangeText={(value) => handleInputChange('bairroRetirada', value)}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
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
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Referência
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Próximo ao shopping, casa azul"
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
            Este é o endereço onde o pacote será entregue
          </Text>
          
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Rua/Logradouro *
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
              placeholder="Ex: Avenida Paulista"
              placeholderTextColor="#999999"
              value={formData.ruaEntrega}
              onChangeText={(value) => handleInputChange('ruaEntrega', value)}
            />
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            <View style={{ flex: 2, marginRight: 8 }}>
              <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                Bairro *
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Bela Vista"
                placeholderTextColor={colors.textSecondary}
                value={formData.bairroEntrega}
                onChangeText={(value) => handleInputChange('bairroEntrega', value)}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
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

        {/* Produtos do Pedido */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Produtos do Pedido</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Produtos', { 
              screen: 'CriarProduto' 
            })}>
              <Text style={styles.textPrimary}>➕ Novo Produto</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.textSecondary, { fontSize: 12, marginBottom: 16 }]}>
            Selecione os produtos que serão entregues
          </Text>

          {/* Busca de Produtos */}
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Buscar Produtos
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome do produto..."
              placeholderTextColor={colors.textSecondary}
              value={buscaProduto}
              onChangeText={setBuscaProduto}
            />
          </View>

          {/* Filtros por Categoria */}
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Categorias
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categorias.map((categoria) => (
                <TouchableOpacity
                  key={categoria.id}
                  style={[
                    styles.button,
                    filtroCategoria === categoria.id ? {} : styles.buttonSecondary,
                    { 
                      marginRight: 8, 
                      paddingHorizontal: 16,
                      minWidth: 100,
                    },
                  ]}
                  onPress={() => setFiltroCategoria(categoria.id)}
                >
                  <Text
                    style={[
                      filtroCategoria === categoria.id ? styles.buttonText : styles.buttonSecondaryText,
                      { fontSize: 14, textAlign: 'center' },
                    ]}
                  >
                    {categoria.emoji} {categoria.nome}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Toggle de Visualização e Paginação */}
          <View style={{ marginBottom: 16 }}>
            <View style={[styles.row, styles.spaceBetween, { marginBottom: 8 }]}>
              <Text style={[styles.text, { fontWeight: '600' }]}>
                Produtos Disponíveis
              </Text>
              <View style={[styles.row, { alignItems: 'center' }]}>
                <Text style={[styles.textSecondary, { fontSize: 12, marginRight: 12 }]}>
                  {produtosFiltrados.length} produto(s)
                </Text>
                <TouchableOpacity
                  style={[
                    styles.button,
                    modoVisualizacao === 'lista' ? {} : styles.buttonSecondary,
                    { paddingHorizontal: 8, paddingVertical: 4, marginRight: 4 }
                  ]}
                  onPress={() => setModoVisualizacao('lista')}
                >
                  <Text style={[
                    modoVisualizacao === 'lista' ? styles.buttonText : styles.buttonSecondaryText,
                    { fontSize: 12 }
                  ]}>
                    📋
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    modoVisualizacao === 'grade' ? {} : styles.buttonSecondary,
                    { paddingHorizontal: 8, paddingVertical: 4 }
                  ]}
                  onPress={() => setModoVisualizacao('grade')}
                >
                  <Text style={[
                    modoVisualizacao === 'grade' ? styles.buttonText : styles.buttonSecondaryText,
                    { fontSize: 12 }
                  ]}>
                    ⚏
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Controle de Paginação */}
            {totalPaginas > 1 && (
              <View style={[styles.row, styles.spaceBetween, { marginBottom: 12 }]}>
                <Text style={[styles.textSecondary, { fontSize: 12 }]}>
                  Página {paginaAtual} de {totalPaginas}
                </Text>
                <View style={[styles.row, { alignItems: 'center' }]}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      paginaAtual === 1 ? styles.buttonSecondary : {},
                      { paddingHorizontal: 12, paddingVertical: 6, marginRight: 8 }
                    ]}
                    onPress={() => setPaginaAtual(paginaAtual - 1)}
                    disabled={paginaAtual === 1}
                  >
                    <Text style={[
                      paginaAtual === 1 ? styles.buttonSecondaryText : styles.buttonText,
                      { fontSize: 14 }
                    ]}>
                      ← Anterior
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      paginaAtual === totalPaginas ? styles.buttonSecondary : {},
                      { paddingHorizontal: 12, paddingVertical: 6 }
                    ]}
                    onPress={() => setPaginaAtual(paginaAtual + 1)}
                    disabled={paginaAtual === totalPaginas}
                  >
                    <Text style={[
                      paginaAtual === totalPaginas ? styles.buttonSecondaryText : styles.buttonText,
                      { fontSize: 14 }
                    ]}>
                      Próxima →
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          {/* Lista de Produtos */}
          {produtosFiltrados.length === 0 ? (
            <View style={[styles.center, { paddingVertical: 20 }]}>
              <Text style={{ fontSize: 32, marginBottom: 8 }}>🔍</Text>
              <Text style={[styles.text, { fontSize: 16, marginBottom: 4 }]}>
                Nenhum produto encontrado
              </Text>
              <Text style={styles.textSecondary}>
                Tente ajustar sua busca ou filtro
              </Text>
            </View>
          ) : (
            <View>
              {modoVisualizacao === 'grade' ? (
                // Layout em grade (2x2)
                <View style={{ 
                  flexDirection: 'row', 
                  flexWrap: 'wrap', 
                  justifyContent: 'space-between' 
                }}>
                  {produtosPaginaAtual.map((produto) => renderCardProduto(produto, true))}
                </View>
              ) : (
                // Layout em lista
                <View>
                  {produtosPaginaAtual.map((produto) => renderCardProduto(produto, false))}
                </View>
              )}
            </View>
          )}

          {/* Botão Undo */}
          {ultimaAcao && (
            <View style={{ marginTop: 16 }}>
              <TouchableOpacity
                style={[styles.button, styles.buttonSecondary, { marginBottom: 12 }]}
                onPress={handleUndo}
              >
                <Text style={styles.buttonSecondaryText}>↩️ Desfazer Última Ação</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Itens do Pedido */}
          {formData.itensPedido.length === 0 ? (
            <View style={[styles.center, { paddingVertical: 20 }]}>
              <Text style={{ fontSize: 32, marginBottom: 8 }}>🛒</Text>
              <Text style={[styles.text, { fontSize: 16, marginBottom: 4 }]}>
                Nenhum produto adicionado
              </Text>
              <Text style={styles.textSecondary}>
                Toque nos produtos acima para adicionar ao pedido
              </Text>
            </View>
          ) : (
            <View>
              <Text style={[styles.text, { marginBottom: 12, fontWeight: '600' }]}>
                Itens do Pedido ({formData.itensPedido.length})
              </Text>
              {formData.itensPedido.map((item) => (
                <View key={item.id} style={[
                  styles.row, 
                  styles.spaceBetween, 
                  { 
                    marginBottom: 12, 
                    padding: 12, 
                    backgroundColor: '#333333', 
                    borderRadius: 8,
                    alignItems: 'center'
                  }
                ]}>
                  <View style={styles.flex1}>
                    <Text style={styles.text}>
                      {item.emoji} {item.nome}
                    </Text>
                    <Text style={[styles.textSecondary, { fontSize: 12 }]}>
                      R$ {item.preco.toFixed(2)} cada
                    </Text>
                  </View>
                  
                  <View style={[styles.row, { alignItems: 'center' }]}>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        { 
                          paddingHorizontal: 8, 
                          paddingVertical: 4, 
                          marginRight: 8,
                          minWidth: 30
                        }
                      ]}
                      onPress={() => handleAlterarQuantidade(item.id, item.quantidade - 1)}
                    >
                      <Text style={[styles.buttonText, { fontSize: 16 }]}>-</Text>
                    </TouchableOpacity>
                    
                    <Text style={[styles.text, { marginHorizontal: 8, minWidth: 20, textAlign: 'center' }]}>
                      {item.quantidade}
                    </Text>
                    
                    <TouchableOpacity
                      style={[
                        styles.button,
                        { 
                          paddingHorizontal: 8, 
                          paddingVertical: 4, 
                          marginLeft: 8,
                          minWidth: 30
                        }
                      ]}
                      onPress={() => handleAlterarQuantidade(item.id, item.quantidade + 1)}
                    >
                      <Text style={[styles.buttonText, { fontSize: 16 }]}>+</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[
                        styles.button,
                        { 
                          backgroundColor: '#FF4500', 
                          borderColor: '#FF4500', 
                          paddingHorizontal: 8, 
                          paddingVertical: 4, 
                          marginLeft: 12,
                          minWidth: 30
                        }
                      ]}
                      onPress={() => handleRemoverProduto(item.id)}
                    >
                      <Text style={[styles.buttonText, { fontSize: 12 }]}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              
              {/* Total do Pedido */}
              <View style={[
                { 
                  marginTop: 16, 
                  paddingTop: 16, 
                  borderTopWidth: 1, 
                  borderTopColor: colors.border 
                }
              ]}>
                <View style={[styles.row, styles.spaceBetween, { marginBottom: 8 }]}>
                  <Text style={[styles.text, { fontSize: 14 }]}>
                    Subtotal dos Produtos:
                  </Text>
                  <Text style={[styles.text, { fontSize: 14 }]}>
                    R$ {calcularTotalPedido().toFixed(2)}
                  </Text>
                </View>
                
                {formData.valorEntrega && (
                  <View style={[styles.row, styles.spaceBetween, { marginBottom: 8 }]}>
                    <Text style={[styles.text, { fontSize: 14 }]}>
                      Taxa de Entrega:
                    </Text>
                    <Text style={[styles.text, { fontSize: 14 }]}>
                      R$ {parseFloat(formData.valorEntrega).toFixed(2)}
                    </Text>
                  </View>
                )}
                
                {formData.tipoAjuste && (formData.valorAjuste || formData.percentualAjuste) && (
                  <View style={[styles.row, styles.spaceBetween, { marginBottom: 8 }]}>
                    <Text style={[styles.text, { fontSize: 14 }]}>
                      {formData.tipoAjuste === 'desconto' ? 'Desconto:' : 'Acréscimo:'}
                    </Text>
                    <Text style={[
                      styles.text, 
                      { 
                        fontSize: 14,
                        color: formData.tipoAjuste === 'desconto' ? '#1ecb4f' : '#FF6B35'
                      }
                    ]}>
                      {formData.tipoAjuste === 'desconto' ? '-' : '+'} R$ {
                        formData.percentualAjuste 
                          ? ((calcularTotalPedido() + (parseFloat(formData.valorEntrega) || 0)) * parseFloat(formData.percentualAjuste) / 100).toFixed(2)
                          : parseFloat(formData.valorAjuste || 0).toFixed(2)
                      }
                    </Text>
                  </View>
                )}
                
                <View style={[styles.row, styles.spaceBetween, { 
                  paddingTop: 8, 
                  borderTopWidth: 1, 
                  borderTopColor: colors.border 
                }]}>
                  <Text style={[styles.text, { fontWeight: 'bold', fontSize: 16 }]}>
                    Total Final:
                  </Text>
                  <Text style={[styles.textPrimary, { fontWeight: 'bold', fontSize: 18 }]}>
                    R$ {calcularValorFinal().toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Detalhes do Pacote */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalhes do Pacote</Text>
          
          {/* Tipo de Pacote */}
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Tipo do Pacote *
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 8 }}
            >
              <View style={{ flexDirection: 'row', paddingRight: 16 }}>
                {tiposPacote.map((tipo) => (
                  <TouchableOpacity
                    key={tipo.id}
                    style={[
                      styles.button,
                      tipoPacoteSelecionado === tipo.id ? {} : styles.buttonSecondary,
                      { marginRight: 8, paddingHorizontal: 12, paddingVertical: 8 }
                    ]}
                    onPress={() => {
                      setTipoPacoteSelecionado(tipo.id);
                      handleInputChange('tipoPacote', tipo.nome);
                    }}
                  >
                    <Text style={[
                      tipoPacoteSelecionado === tipo.id ? styles.buttonText : styles.buttonSecondaryText,
                      { fontSize: 14 }
                    ]}>
                      {tipo.emoji} {tipo.nome}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Tamanho do Pacote */}
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Tamanho do Pacote *
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 8 }}
            >
              <View style={{ flexDirection: 'row', paddingRight: 16 }}>
                {tamanhosPacote.map((tamanho) => (
                  <TouchableOpacity
                    key={tamanho.id}
                    style={[
                      styles.button,
                      tamanhoPacoteSelecionado === tamanho.id ? {} : styles.buttonSecondary,
                      { marginRight: 8, paddingHorizontal: 12, paddingVertical: 8 }
                    ]}
                    onPress={() => {
                      setTamanhoPacoteSelecionado(tamanho.id);
                      handleInputChange('tamanhoPacote', tamanho.nome);
                    }}
                  >
                    <Text style={[
                      tamanhoPacoteSelecionado === tamanho.id ? styles.buttonText : styles.buttonSecondaryText,
                      { fontSize: 14 }
                    ]}>
                      {tamanho.emoji} {tamanho.nome}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Instruções de Entrega
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: 80,
                  textAlignVertical: 'top',
                }
              ]}
              placeholder="Instruções adicionais para o entregador (opcional)"
              placeholderTextColor={colors.textSecondary}
              value={formData.instrucoesEntrega}
              onChangeText={(value) => handleInputChange('instrucoesEntrega', value)}
              multiline
            />
          </View>
        </View>

        {/* Tipo de Entrega */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tipo de Entrega</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
            {tiposEntrega.map((tipo) => (
              <TouchableOpacity
                key={tipo.id}
                style={[
                  styles.button,
                  formData.tipoEntrega === tipo.id ? {} : styles.buttonSecondary,
                  { 
                    marginRight: 8, 
                    marginBottom: 8, 
                    paddingHorizontal: 16,
                    minWidth: 100,
                  },
                ]}
                onPress={() => handleTipoEntregaSelect(tipo)}
              >
                <Text
                  style={[
                    formData.tipoEntrega === tipo.id ? styles.buttonText : styles.buttonSecondaryText,
                    { fontSize: 14, textAlign: 'center' },
                  ]}
                >
                  {tipo.emoji} {tipo.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={[styles.textSecondary, { fontSize: 12, marginTop: 8 }]}>
            {tiposEntrega.find(t => t.id === formData.tipoEntrega)?.descricao}
          </Text>
        </View>

        {/* Valor da Entrega - Precificação Dinâmica */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💰 Precificação Dinâmica</Text>
          <Text style={[styles.textSecondary, { fontSize: 12, marginBottom: 16 }]}>
            Calcule automaticamente o valor da entrega baseado na distância e categoria
          </Text>

          {/* Distância Estimada */}
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Distância Estimada (km)
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Ex: 5"
                placeholderTextColor={colors.textSecondary}
                value={distanciaEstimada > 0 ? distanciaEstimada.toString() : ''}
                onChangeText={(value) => setDistanciaEstimada(parseFloat(value) || 0)}
                keyboardType="numeric"
              />
              <Text style={[styles.text, { marginLeft: 8 }]}>km</Text>
            </View>
            <Text style={[styles.textSecondary, { fontSize: 11, marginTop: 4 }]}>
              Base: R$ {precificacao.tarifaBase.toFixed(2)} + R$ {precificacao.precoPorKm.toFixed(2)}/km
            </Text>
          </View>

          {/* Horário de Pico */}
          <View style={{ marginBottom: 16 }}>
            <TouchableOpacity
              style={[
                styles.button,
                isHorarioPico ? {} : styles.buttonSecondary,
                { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }
              ]}
              onPress={() => setIsHorarioPico(!isHorarioPico)}
            >
              <Text style={isHorarioPico ? styles.buttonText : styles.buttonSecondaryText}>
                {isHorarioPico ? '⚡ Horário de Pico (+10%)' : '🕐 Horário Normal'}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.textSecondary, { fontSize: 11, marginTop: 4, textAlign: 'center' }]}>
              Horário de pico: 11h-14h e 18h-21h
            </Text>
          </View>

          {/* Preview do Cálculo */}
          {precoCalculado && (
            <View style={[
              {
                backgroundColor: 'rgba(255, 115, 0, 0.1)',
                borderRadius: 8,
                padding: 16,
                borderWidth: 1,
                borderColor: 'rgba(255, 115, 0, 0.3)',
                marginBottom: 16
              }
            ]}>
              <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 12, fontSize: 16 }]}>
                📊 Resumo da Precificação
              </Text>

              <View style={[styles.row, styles.spaceBetween, { marginBottom: 6 }]}>
                <Text style={[styles.text, { fontSize: 14 }]}>Distância:</Text>
                <Text style={[styles.text, { fontSize: 14 }]}>{precoCalculado.distancia} km</Text>
              </View>

              <View style={[styles.row, styles.spaceBetween, { marginBottom: 6 }]}>
                <Text style={[styles.text, { fontSize: 14 }]}>Categoria:</Text>
                <Text style={[styles.text, { fontSize: 14 }]}>{precoCalculado.categoria}</Text>
              </View>

              <View style={[styles.row, styles.spaceBetween, { marginBottom: 6 }]}>
                <Text style={[styles.text, { fontSize: 14 }]}>Taxa de Entrega:</Text>
                <Text style={[styles.textPrimary, { fontSize: 14, fontWeight: 'bold' }]}>
                  R$ {precoCalculado.taxaEntrega.toFixed(2)}
                </Text>
              </View>

              <View style={[styles.row, styles.spaceBetween, { marginBottom: 6 }]}>
                <Text style={[styles.text, { fontSize: 14 }]}>Produtos:</Text>
                <Text style={[styles.text, { fontSize: 14 }]}>
                  R$ {precoCalculado.totalProdutos.toFixed(2)}
                </Text>
              </View>

              <View style={[
                styles.row,
                styles.spaceBetween,
                {
                  paddingTop: 8,
                  marginTop: 8,
                  borderTopWidth: 1,
                  borderTopColor: 'rgba(255, 115, 0, 0.3)',
                  marginBottom: 12
                }
              ]}>
                <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>Total:</Text>
                <Text style={[styles.textPrimary, { fontSize: 16, fontWeight: 'bold' }]}>
                  R$ {precoCalculado.totalGeral.toFixed(2)}
                </Text>
              </View>

              {/* Split Financeiro (15% plataforma / 85% entregador) */}
              <View style={[
                {
                  backgroundColor: colors.surface,
                  borderRadius: 6,
                  padding: 12,
                  marginTop: 8
                }
              ]}>
                <Text style={[styles.text, { fontWeight: '600', marginBottom: 8, fontSize: 13 }]}>
                  💸 Split Financeiro (Modelo NaHora!)
                </Text>

                <View style={[styles.row, styles.spaceBetween, { marginBottom: 4 }]}>
                  <Text style={[styles.textSecondary, { fontSize: 12 }]}>
                    Taxa Plataforma (15%):
                  </Text>
                  <Text style={[styles.textSecondary, { fontSize: 12, fontWeight: '600' }]}>
                    R$ {precoCalculado.taxaPlataforma.toFixed(2)}
                  </Text>
                </View>

                <View style={[styles.row, styles.spaceBetween]}>
                  <Text style={[styles.text, { fontSize: 12, color: '#1ecb4f' }]}>
                    Ganho Entregador (85%):
                  </Text>
                  <Text style={[styles.text, { fontSize: 12, fontWeight: '600', color: '#1ecb4f' }]}>
                    R$ {precoCalculado.ganhoEntregador.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Valor Manual (Opcional) */}
          <View style={{ marginBottom: 0 }}>
            <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
              Ou defina valor manualmente
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 15,00"
              placeholderTextColor={colors.textSecondary}
              value={formData.valorEntrega}
              onChangeText={(value) => {
                handleInputChange('valorEntrega', value);
                setPrecoCalculado(null); // Limpar cálculo automático
              }}
              keyboardType="numeric"
            />
            <Text style={[styles.textSecondary, { fontSize: 11, marginTop: 4 }]}>
              Deixe em branco para usar precificação automática
            </Text>
          </View>
        </View>

        {/* Desconto/Acréscimo */}
        <View style={styles.card}>
          <View style={[styles.row, styles.spaceBetween, { marginBottom: 16 }]}>
            <Text style={styles.cardTitle}>Desconto/Acréscimo</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary, { paddingHorizontal: 12, paddingVertical: 6 }]}
              onPress={() => setMostrarAjuste(!mostrarAjuste)}
            >
              <Text style={styles.buttonSecondaryText}>
                {mostrarAjuste ? 'Ocultar' : 'Aplicar'}
              </Text>
            </TouchableOpacity>
          </View>
          
          {mostrarAjuste && (
            <View>
              {/* Tipo de Ajuste */}
              <View style={{ marginBottom: 16 }}>
                <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                  Tipo de Ajuste
                </Text>
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      tipoAjusteSelecionado === 'desconto' ? {} : styles.buttonSecondary,
                      { flex: 1, marginRight: 8, paddingHorizontal: 12, paddingVertical: 8 }
                    ]}
                    onPress={() => {
                      setTipoAjusteSelecionado('desconto');
                      handleInputChange('tipoAjuste', 'desconto');
                    }}
                  >
                    <Text style={[
                      tipoAjusteSelecionado === 'desconto' ? styles.buttonText : styles.buttonSecondaryText,
                      { fontSize: 14 }
                    ]}>
                      💰 Desconto
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      tipoAjusteSelecionado === 'acrescimo' ? {} : styles.buttonSecondary,
                      { flex: 1, marginLeft: 8, paddingHorizontal: 12, paddingVertical: 8 }
                    ]}
                    onPress={() => {
                      setTipoAjusteSelecionado('acrescimo');
                      handleInputChange('tipoAjuste', 'acrescimo');
                    }}
                  >
                    <Text style={[
                      tipoAjusteSelecionado === 'acrescimo' ? styles.buttonText : styles.buttonSecondaryText,
                      { fontSize: 14 }
                    ]}>
                      📈 Acréscimo
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Valor Fixo */}
              <View style={{ marginBottom: 16 }}>
                <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                  Valor Fixo (opcional)
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 5,00"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.valorAjuste}
                  onChangeText={(value) => {
                    handleInputChange('valorAjuste', value);
                    if (value) handleInputChange('percentualAjuste', '');
                  }}
                  keyboardType="numeric"
                />
              </View>

              {/* Percentual */}
              <View style={{ marginBottom: 16 }}>
                <Text style={[styles.text, { marginBottom: 8, fontWeight: '600' }]}>
                  Percentual (opcional)
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 10"
                  placeholderTextColor={colors.textSecondary}
                  value={formData.percentualAjuste}
                  onChangeText={(value) => {
                    handleInputChange('percentualAjuste', value);
                    if (value) handleInputChange('valorAjuste', '');
                  }}
                  keyboardType="numeric"
                />
                <Text style={[styles.textSecondary, { fontSize: 12, marginTop: 4 }]}>
                  Digite apenas o número (ex: 10 para 10%)
                </Text>
              </View>

              {/* Preview do Ajuste */}
              {formData.tipoAjuste && (formData.valorAjuste || formData.percentualAjuste) && (
                <View style={[
                  styles.card,
                  { 
                    backgroundColor: colors.surface,
                    marginBottom: 0,
                    padding: 12
                  }
                ]}>
                  <Text style={[styles.text, { fontWeight: '600', marginBottom: 8 }]}>
                    Resumo do Ajuste:
                  </Text>
                  <Text style={[styles.text, { fontSize: 14 }]}>
                    {formData.tipoAjuste === 'desconto' ? 'Desconto' : 'Acréscimo'} de{' '}
                    {formData.percentualAjuste 
                      ? `${formData.percentualAjuste}%` 
                      : `R$ ${parseFloat(formData.valorAjuste || 0).toFixed(2)}`
                    }
                  </Text>
                  <Text style={[styles.text, { fontSize: 12, marginTop: 4, color: colors.textSecondary }]}>
                    Valor final: R$ {calcularValorFinal().toFixed(2)}
                  </Text>
                </View>
              )}
            </View>
          )}
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
              onPress={handleSolicitarEntrega}
            >
              <Text style={styles.buttonText}>Solicitar Entrega</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default NovaEntregaScreen;

# Documentação Frontend - VaiJá Restaurante App

## Visão Geral

O **VaiJá Restaurante App** é um aplicativo React Native desenvolvido para gerenciamento de entregas de restaurantes. O app possui uma interface moderna com tema escuro/claro, sistema de navegação por abas e componentes reutilizáveis.

## Arquitetura do Projeto

### Estrutura de Pastas

```
src/
├── components/          # Componentes reutilizáveis
├── contexts/           # Contextos React (Theme)
├── screens/           # Telas do aplicativo
└── styles/           # Sistema de estilos
```

## Tecnologias Utilizadas

- **React Native 0.81.4**
- **React Navigation 7.x** (Stack e Bottom Tabs)
- **React Native Safe Area Context**
- **React Native Video** (para splash screen)
- **TypeScript** (configuração)

## Sistema de Temas e Cores

### ThemeContext

O aplicativo utiliza um sistema de temas dinâmico com suporte a modo escuro e claro:

```javascript
// Cores do modo escuro (padrão)
dark: {
  background: '#1a1a1a',
  surface: '#2a2a2a',
  card: '#333333',
  text: '#ffffff',
  textSecondary: '#cccccc',
  primary: '#FF6B35',
  primaryText: '#ffffff',
  secondary: '#555555',
  border: '#444444',
  success: '#1ecb4f',
  error: '#FF4500',
  warning: '#FFD700'
}

// Cores do modo claro
light: {
  background: '#f5f5f5',
  surface: '#ffffff',
  card: '#ffffff',
  text: '#333333',
  textSecondary: '#666666',
  primary: '#FF6B35',
  // ... outras cores
}
```

### Paleta de Cores Principais

- **Primária**: `#FF6B35` (Laranja vibrante)
- **Sucesso**: `#1ecb4f` (Verde)
- **Erro**: `#FF4500` (Vermelho)
- **Aviso**: `#FFD700` (Dourado)
- **Info**: `#2196F3` (Azul)

## Componentes Principais

### 1. SafeAreaWrapper

Componente wrapper que aplica SafeAreaView com estilos dinâmicos:

```javascript
<SafeAreaWrapper edges={['top', 'left', 'right']}>
  {children}
</SafeAreaWrapper>
```

**Props:**
- `children`: Conteúdo a ser renderizado
- `style`: Estilos customizados
- `edges`: Bordas para aplicar safe area (padrão: ['top', 'left', 'right'])

### 2. StatusCard

Card com barra lateral colorida baseada no status:

```javascript
<StatusCard 
  status="pending" 
  title="Título do Card"
  subtitle="Subtítulo opcional"
>
  Conteúdo do card
</StatusCard>
```

**Props:**
- `status`: Status do card ('pending', 'accepted', 'picked', 'delivered', 'operational', 'warning', 'error', 'info')
- `title`: Título do card
- `subtitle`: Subtítulo opcional
- `children`: Conteúdo do card
- `style`: Estilos customizados

**Status disponíveis:**
- `pending`: Dourado (#FFD700)
- `accepted`: Verde (#1ecb4f)
- `picked`: Laranja (#FF6B35)
- `delivered`: Verde (#1ecb4f)
- `operational`: Verde (#1ecb4f)
- `warning`: Dourado (#FFD700)
- `error`: Vermelho (#FF4500)
- `info`: Azul (#2196F3)

### 3. TabBarIcon

Componente de ícone para navegação por abas usando emojis:

```javascript
<TabBarIcon 
  route={{ name: 'Início' }}
  focused={true}
  color="#FF6B35"
  size={24}
/>
```

**Ícones por rota:**
- Início: 🏠
- Entregas: 📦
- Produtos: 🍽️
- Configurações: ⚙️

## Sistema de Estilos

### Estilos Estáticos (styles.js)

Define estilos base e constantes:

```javascript
// Cores principais
colors: {
  primary: '#FF7300',
  secondary: '#1a1a1a',
  background: '#0a0a0a',
  surface: '#1a1a1a',
  text: '#ffffff',
  textSecondary: '#999999',
  border: '#333333',
  success: '#1ecb4f',
  warning: '#FFD700',
  error: '#FF4500'
}

// Cards
card: {
  backgroundColor: '#1a1a1a',
  borderRadius: 12,
  padding: 16,
  marginHorizontal: 16,
  marginVertical: 8,
  borderWidth: 1,
  borderColor: '#333333'
}

// Botões
button: {
  backgroundColor: '#FF7300',
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center'
}
```

### Estilos Dinâmicos (dynamicStyles.js)

Cria estilos baseados no tema atual:

```javascript
const styles = createDynamicStyles(theme);
```

**Características:**
- Adapta cores baseado no tema (escuro/claro)
- Aplica sombras condicionais
- Suporte a diferentes estados de componentes

## Telas Principais

### 1. SplashScreen

Tela de inicialização com vídeo animado:

**Características:**
- Reproduz vídeo de animação (`Criação_de_Animação_NaHora_.mp4`)
- Navegação automática após 8 segundos ou fim do vídeo
- Fallback para erro de carregamento
- StatusBar oculta durante reprodução

**Estados:**
- Loading: Mostra indicador de carregamento
- Error: Exibe mensagem de erro
- Success: Navega para HomeScreen

### 2. HomeScreen

Dashboard principal com estatísticas e entregas ativas:

**Componentes:**
- **Header**: Título, subtítulo e botão "Nova Entrega"
- **Estatísticas**: 4 cards com métricas principais
  - Entregas Hoje
  - Em Andamento
  - Tempo Médio
  - Faturamento
- **Status do Sistema**: Informações sobre motoboys
- **Entregas Ativas**: Lista das últimas 2 entregas
- **Ações Rápidas**: Botões para funcionalidades principais

**Dados Mock:**
```javascript
const stats = {
  entregasHoje: 12,
  entregasAndamento: 5,
  tempoMedio: '28 min',
  faturamentoDia: 'R$ 380,00'
}
```

### 3. EntregasScreen

Gerenciamento de entregas com abas e filtros:

**Funcionalidades:**
- **Abas**: Ativas e Histórico
- **Busca**: Por cliente, endereço ou ID
- **Filtros**: Por status (Todos, Pendente, Coletado, Entregue, Cancelado)
- **Cards de Entrega**: Com barra lateral colorida por status
- **Ações**: Detalhes e Rastreamento

**Status de Entregas:**
- `pending`: ⏳ Pendente (Dourado)
- `accepted`: ✅ Aceito (Verde)
- `picked`: 📦 Coletado (Azul)
- `delivered`: 🎉 Entregue (Verde)
- `completed`: ✅ Concluída (Verde escuro)
- `cancelled`: ❌ Cancelada (Vermelho)

### 4. ProdutosScreen

Gerenciamento de cardápio e produtos:

**Funcionalidades:**
- **Busca**: Por nome ou descrição
- **Categorias**: Filtro por tipo de produto
- **Estatísticas**: Total, disponíveis, indisponíveis
- **Lista de Produtos**: Com status de disponibilidade
- **Ações**: Editar e Ativar/Pausar

**Categorias:**
- Todos: 🍽️
- Pizzas: 🍕
- Hambúrgueres: 🍔
- Bebidas: 🥤
- Sobremesas: 🍰

### 5. EntregaDetalhesScreen

Visualização detalhada de uma entrega:

**Seções:**
- **Status**: Emoji e badge de status
- **Cliente**: Nome, telefone, endereço
- **Motoboy**: Informações do entregador
- **Itens**: Lista de produtos com preços
- **Observações**: Notas especiais
- **Histórico**: Timeline de status
- **Ações**: Botões contextuais por status

**Ações por Status:**
- `pending`: ✅ Aceitar Pedido
- `accepted`: 👨‍🍳 Iniciar Preparo
- `preparing`: 📦 Marcar como Coletado
- `picked`: 🎉 Marcar como Entregue
- `delivered`: Entrega finalizada

### 6. ConfiguracoesScreen

Configurações do aplicativo e conta:

**Seções:**
- **Informações do Restaurante**: Dados cadastrais
- **Notificações**: Push, som, vibração
- **Aparência**: Toggle modo escuro/claro
- **Conta**: Alterar senha, pagamentos, endereços
- **Ações da Conta**: Logout e excluir conta
- **Sobre o App**: Versão e informações

## Sistema de Navegação

### Stack Navigator

```javascript
<Stack.Navigator 
  initialRouteName="Splash"
  screenOptions={{
    headerShown: false,
    animation: 'fade'
  }}
>
  <Stack.Screen name="Splash" component={SplashScreen} />
  <Stack.Screen name="Home" component={HomeScreen} />
</Stack.Navigator>
```

### Rotas Principais

- `Splash` → `HomeScreen`
- `Home` → `HomeScreen`
- `Entregas` → `EntregasScreen`
- `Produtos` → `ProdutosScreen`
- `Configurações` → `ConfiguracoesScreen`
- `EntregaDetalhes` → `EntregaDetalhesScreen`

## Padrões de Design

### Cards

Todos os cards seguem o padrão:
- Background: `#1a1a1a` (escuro) / `#ffffff` (claro)
- Border radius: `12px`
- Padding: `16px`
- Margin: `16px` horizontal, `8px` vertical
- Border: `1px solid #333333`

### Botões

**Botão Primário:**
- Background: `#FF7300`
- Text: `#ffffff`
- Border radius: `8px`
- Padding: `12px 24px`

**Botão Secundário:**
- Background: `transparent`
- Border: `1px solid #FF7300`
- Text: `#FF7300`

### Status Badges

Badges com cores específicas por status:
- Background: Cor com 20% de opacidade
- Text: Cor sólida correspondente
- Border radius: `8px`
- Padding: `6px 12px`

### Typography

**Títulos:**
- Header: `24px`, `bold`
- Card: `18px`, `600`
- Item: `16px`, `600`

**Textos:**
- Principal: `16px`
- Secundário: `14px`
- Pequeno: `12px`

## Funcionalidades Implementadas

### ✅ Completas

1. **Sistema de Temas**: Modo escuro/claro
2. **Navegação**: Stack e Bottom Tabs
3. **Componentes Reutilizáveis**: SafeAreaWrapper, StatusCard, TabBarIcon
4. **Splash Screen**: Com vídeo animado
5. **Dashboard**: Estatísticas e métricas
6. **Gestão de Entregas**: Lista, filtros, detalhes
7. **Gestão de Produtos**: Cardápio, categorias, status
8. **Configurações**: App e conta
9. **Status System**: Cores e badges por status
10. **Responsive Design**: Adaptável a diferentes telas

### 🚧 Em Desenvolvimento

1. **Rastreamento em Tempo Real**: GPS e mapas
2. **Notificações Push**: Sistema de alertas
3. **Integração Backend**: APIs e dados reais
4. **Autenticação**: Login e registro
5. **Relatórios**: Gráficos e análises

## Configurações de Build

### Dependências Principais

```json
{
  "react": "19.1.0",
  "react-native": "0.81.4",
  "@react-navigation/native": "^7.1.17",
  "@react-navigation/bottom-tabs": "^7.4.7",
  "@react-navigation/native-stack": "^7.3.26",
  "react-native-safe-area-context": "^5.6.1",
  "react-native-video": "^6.16.1"
}
```

### Scripts Disponíveis

```json
{
  "android": "react-native run-android",
  "ios": "react-native run-ios",
  "start": "react-native start",
  "test": "jest",
  "lint": "eslint ."
}
```

## Considerações de Performance

1. **Lazy Loading**: Componentes carregados sob demanda
2. **Memoização**: Uso de React.memo onde apropriado
3. **Otimização de Imagens**: Compressão e cache
4. **Bundle Splitting**: Separação de código por funcionalidade
5. **Safe Area**: Otimização para diferentes dispositivos

## Acessibilidade

1. **Contraste**: Cores com contraste adequado
2. **Tamanhos de Fonte**: Legíveis em diferentes dispositivos
3. **Touch Targets**: Botões com tamanho mínimo de 44px
4. **Screen Reader**: Labels apropriados
5. **Navegação**: Suporte a navegação por teclado

## Conclusão

O VaiJá Restaurante App possui uma arquitetura sólida e bem estruturada, com foco na experiência do usuário e facilidade de manutenção. O sistema de temas dinâmico, componentes reutilizáveis e padrões de design consistentes garantem uma interface moderna e profissional.

O aplicativo está preparado para expansão futura com integração de APIs, funcionalidades de rastreamento em tempo real e sistema de notificações push.


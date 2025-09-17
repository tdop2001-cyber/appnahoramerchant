# 🎨 ESTÉTICA DO APLICATIVO VAIJÁ RESTAURANTE

## 📋 ÍNDICE
1. [Visão Geral](#visão-geral)
2. [Sistema de Temas](#sistema-de-temas)
3. [Paleta de Cores](#paleta-de-cores)
4. [Tipografia](#tipografia)
5. [Componentes de Design](#componentes-de-design)
6. [Layout e Espaçamentos](#layout-e-espaçamentos)
7. [Navegação](#navegação)
8. [Estados e Interações](#estados-e-interações)
9. [Elementos Visuais](#elementos-visuais)
10. [Guia de Implementação](#guia-de-implementação)

---

## 🎯 VISÃO GERAL

O **VaiJá Restaurante** é um aplicativo mobile desenvolvido em React Native com foco em **gerenciamento de entregas** para restaurantes. O design segue princípios de **usabilidade**, **clareza visual** e **profissionalismo**, criando uma experiência intuitiva para gestores de restaurante.

### Características Principais:
- ✅ **Design moderno e limpo**
- ✅ **Sistema de temas (claro/escuro)**
- ✅ **Interface responsiva**
- ✅ **Foco na usabilidade**
- ✅ **Visual profissional para ambiente de negócios**

---

## 🌙 SISTEMA DE TEMAS

### Modo Escuro (Padrão)
```javascript
dark: {
  background: '#1a1a1a',      // Fundo principal
  surface: '#2a2a2a',         // Superfícies secundárias
  card: '#333333',            // Cards e containers
  text: '#ffffff',            // Texto principal
  textSecondary: '#cccccc',   // Texto secundário
  primary: '#FF6B35',         // Cor primária (laranja)
  primaryText: '#ffffff',     // Texto em botões primários
  secondary: '#555555',       // Elementos secundários
  secondaryText: '#cccccc',   // Texto em elementos secundários
  border: '#444444',          // Bordas
  success: '#1ecb4f',         // Verde para sucesso
  error: '#FF4500',           // Vermelho para erro
  warning: '#FFD700',         // Dourado para avisos
  tabBarActive: '#FF6B35',    // Tab ativa
  tabBarInactive: '#666666',  // Tab inativa
  tabBarBackground: '#1a1a1a' // Fundo da tab bar
}
```

### Modo Claro
```javascript
light: {
  background: '#f5f5f5',      // Fundo principal
  surface: '#ffffff',         // Superfícies secundárias
  card: '#ffffff',            // Cards e containers
  text: '#333333',            // Texto principal
  textSecondary: '#666666',   // Texto secundário
  primary: '#FF6B35',         // Cor primária (laranja)
  primaryText: '#ffffff',     // Texto em botões primários
  secondary: '#e0e0e0',       // Elementos secundários
  secondaryText: '#666666',   // Texto em elementos secundários
  border: '#e0e0e0',          // Bordas
  success: '#1ecb4f',         // Verde para sucesso
  error: '#FF4500',           // Vermelho para erro
  warning: '#FFD700',         // Dourado para avisos
  tabBarActive: '#FF6B35',    // Tab ativa
  tabBarInactive: '#999999',  // Tab inativa
  tabBarBackground: '#ffffff' // Fundo da tab bar
}
```

---

## 🎨 PALETA DE CORES

### Cores Principais
| Cor | Hex | Uso |
|-----|-----|-----|
| **Laranja Primário** | `#FF6B35` | Botões principais, elementos de destaque |
| **Laranja Alternativo** | `#FF7300` | Variação da cor primária |
| **Verde Sucesso** | `#1ecb4f` | Status de sucesso, entregas concluídas |
| **Vermelho Erro** | `#FF4500` | Erros, alertas críticos |
| **Dourado Aviso** | `#FFD700` | Avisos, status pendente |

### Cores de Status de Entrega
| Status | Cor | Fundo | Emoji |
|--------|-----|-------|-------|
| **Pendente** | `#FFD700` | `rgba(255, 215, 0, 0.2)` | ⏳ |
| **Aceito** | `#1ecb4f` | `rgba(30, 203, 79, 0.2)` | ✅ |
| **Coletado** | `#FF6B35` | `rgba(255, 107, 53, 0.2)` | 📦 |
| **Entregue** | `#1ecb4f` | `rgba(30, 203, 79, 0.3)` | 🎉 |

---

## 📝 TIPOGRAFIA

### Hierarquia de Textos
```javascript
// Títulos principais
headerTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  color: colors.text
}

// Títulos de cards
cardTitle: {
  fontSize: 18,
  fontWeight: '600',
  color: colors.text
}

// Textos normais
text: {
  fontSize: 16,
  color: colors.text
}

// Textos secundários
textSecondary: {
  fontSize: 14,
  color: colors.textSecondary
}

// Labels pequenos
statLabel: {
  fontSize: 12,
  color: colors.textSecondary
}
```

### Pesos de Fonte
- **Bold (700)**: Títulos principais
- **Semi-bold (600)**: Títulos de seções, botões
- **Normal (400)**: Textos padrão
- **Light (300)**: Textos secundários

---

## 🧩 COMPONENTES DE DESIGN

### Cards
```javascript
card: {
  backgroundColor: colors.card,
  borderRadius: 12,
  padding: 16,
  marginHorizontal: 16,
  marginVertical: 8,
  borderWidth: 1,
  borderColor: colors.border,
  shadowColor: theme.isDarkMode ? '#000' : '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: theme.isDarkMode ? 0.3 : 0.1,
  shadowRadius: 3.84,
  elevation: 5
}
```

### Botões
```javascript
// Botão primário
button: {
  backgroundColor: colors.primary,
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 48
}

// Botão secundário
buttonSecondary: {
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: colors.primary
}
```

### Badges de Status
```javascript
statusBadge: {
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 12,
  alignSelf: 'flex-start'
}

// Exemplo para status pendente
statusPending: {
  backgroundColor: 'rgba(255, 215, 0, 0.2)'
}
statusPendingText: {
  color: '#FFD700',
  fontSize: 12,
  fontWeight: '600'
}
```

### Cards de Estatísticas
```javascript
statCard: {
  backgroundColor: colors.card,
  borderRadius: 12,
  padding: 16,
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 100,
  borderWidth: 1,
  borderColor: colors.border
}

statValue: {
  fontSize: 24,
  fontWeight: 'bold',
  color: colors.primary,
  marginBottom: 4
}
```

---

## 📐 LAYOUT E ESPAÇAMENTOS

### Sistema de Espaçamento
```javascript
// Espaçamentos padrão
marginHorizontal: 16,    // Margem horizontal padrão
marginVertical: 16,      // Margem vertical padrão
paddingHorizontal: 16,   // Padding horizontal padrão
paddingVertical: 16,     // Padding vertical padrão

// Espaçamentos específicos
header: {
  paddingTop: 20,
  paddingBottom: 20,
  paddingHorizontal: 20
}

card: {
  padding: 16,
  marginHorizontal: 16,
  marginVertical: 8
}
```

### Grid System
- **Cards de estatísticas**: Layout 2x2 com `width: '48%'`
- **Botões em linha**: `flex: 1` com margens laterais
- **Lista de entregas**: Cards empilhados verticalmente

### Flexbox Utilities
```javascript
row: { flexDirection: 'row' }
column: { flexDirection: 'column' }
center: { alignItems: 'center', justifyContent: 'center' }
spaceBetween: { justifyContent: 'space-between' }
flex1: { flex: 1 }
```

---

## 🧭 NAVEGAÇÃO

### Tab Bar
```javascript
tabBarStyle: {
  backgroundColor: colors.tabBarBackground,
  borderTopColor: colors.border,
  borderTopWidth: 1,
  height: 80,
  paddingBottom: 20,
  paddingTop: 10,
  paddingHorizontal: 10,
  shadowColor: theme.isDarkMode ? '#000' : '#000',
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: theme.isDarkMode ? 0.3 : 0.1,
  shadowRadius: 3.84,
  elevation: 5
}
```

### Headers
```javascript
header: {
  backgroundColor: colors.surface,
  paddingTop: 20,
  paddingBottom: 20,
  paddingHorizontal: 20,
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
  marginTop: 10
}
```

---

## ⚡ ESTADOS E INTERAÇÕES

### TouchableOpacity
```javascript
// Configuração padrão
activeOpacity: 0.7

// Exemplo de uso
<TouchableOpacity 
  style={styles.button}
  activeOpacity={0.7}
  onPress={handlePress}
>
  <Text style={styles.buttonText}>Botão</Text>
</TouchableOpacity>
```

### Estados de Botões
- **Normal**: Cor primária com texto branco
- **Pressionado**: `activeOpacity={0.7}`
- **Desabilitado**: Opacidade reduzida
- **Loading**: Indicador de carregamento

---

## 🎭 ELEMENTOS VISUAIS

### Ícones e Emojis
O aplicativo utiliza **emojis** para identificação rápida:

| Elemento | Emoji | Uso |
|----------|-------|-----|
| **Entregas** | 📦 | Cards de entrega, botões |
| **Status Pendente** | ⏳ | Badges de status |
| **Status Aceito** | ✅ | Badges de status |
| **Status Coletado** | 📦 | Badges de status |
| **Status Entregue** | 🎉 | Badges de status |
| **Cliente** | 👤 | Informações do cliente |
| **Localização** | 📍 | Endereços, rastreamento |
| **Tempo** | ⏰ | Timestamps |
| **Detalhes** | 📋 | Botões de ação |
| **Rastrear** | 📍 | Botões de rastreamento |

### Sombras e Elevação
```javascript
// Sombra padrão para cards
shadowColor: theme.isDarkMode ? '#000' : '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: theme.isDarkMode ? 0.3 : 0.1,
shadowRadius: 3.84,
elevation: 5
```

---

## 🛠️ GUIA DE IMPLEMENTAÇÃO

### Estrutura de Arquivos
```
src/
├── styles/
│   ├── styles.js          # Estilos estáticos
│   └── dynamicStyles.js   # Estilos dinâmicos com tema
├── contexts/
│   └── ThemeContext.js    # Contexto de tema
└── components/
    └── SafeAreaWrapper.js # Wrapper com tema
```

### Como Usar o Sistema de Temas
```javascript
import { useTheme } from '../contexts/ThemeContext';
import { createDynamicStyles } from '../styles/dynamicStyles';

const MeuComponente = () => {
  const theme = useTheme();
  const styles = createDynamicStyles(theme);
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Texto com tema</Text>
    </View>
  );
};
```

### Adicionando Novos Estilos
```javascript
// Em dynamicStyles.js
export const createDynamicStyles = (theme) => {
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];
  
  return StyleSheet.create({
    // Estilos existentes...
    
    // Novo estilo
    meuNovoEstilo: {
      backgroundColor: colors.surface,
      borderRadius: 8,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border
    }
  });
};
```

### Boas Práticas
1. **Sempre use o sistema de temas** para cores
2. **Mantenha consistência** nos espaçamentos
3. **Use os componentes base** (cards, botões, badges)
4. **Teste em ambos os modos** (claro/escuro)
5. **Mantenha a hierarquia visual** clara
6. **Use emojis consistentemente** para identificação rápida

---

## 📱 RESPONSIVIDADE

### Breakpoints
- **Mobile**: < 768px (foco principal)
- **Tablet**: 768px - 1024px (adaptação futura)

### Adaptações
- **Grid flexível**: Cards se adaptam ao tamanho da tela
- **Texto responsivo**: Tamanhos de fonte proporcionais
- **Espaçamentos**: Margens e paddings adaptáveis

---

## 🎯 CONCLUSÃO

O **VaiJá Restaurante** apresenta uma estética **moderna, profissional e funcional**, com foco na **experiência do usuário** e **eficiência operacional**. O sistema de temas permite adaptação às preferências do usuário, enquanto a paleta de cores e tipografia criam uma identidade visual consistente e reconhecível.

### Pontos Fortes:
- ✅ **Design consistente** em todas as telas
- ✅ **Sistema de temas robusto**
- ✅ **Usabilidade otimizada** para ambiente de negócios
- ✅ **Visual moderno** e profissional
- ✅ **Código bem estruturado** e manutenível

---

*Documento criado em: $(date)*
*Versão do App: 1.0.0*
*Framework: React Native*


import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Line, Rect } from 'react-native-svg';

// Componentes SVG baseados nos ícones da pasta assets/icons
const HomeIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Início">
    <Path
      d="M3 10.5 L12 4 L21 10.5 V20 A1 1 0 0 1 20 21 H4 A1 1 0 0 1 3 20 Z"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <Rect x="10" y="13" width="4" height="6" rx="0.6" fill={color} />
  </Svg>
);

const BoxIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Caixa">
    <Path
      d="M3 7.5 L12 3 L21 7.5 V16.5 L12 21 L3 16.5 Z"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <Path
      d="M3 7.5 L12 12 L21 7.5"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </Svg>
);

const SettingsIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Configurações">
    <Path
      d="M19.4 13.5c.04-.5.1-1 .1-1.5s-.06-1-.1-1.5l2-1.5a.5.5 0 0 0 .1-.7l-1.9-3.3a.5.5 0 0 0-.6-.2l-2.3 1a6.5 6.5 0 0 0-2.6-1.5l-.3-2.4a.5.5 0 0 0-.5-.4h-3.8a.5.5 0 0 0-.5.4l-.3 2.4a6.5 6.5 0 0 0-2.6 1.5l-2.3-1a.5.5 0 0 0-.6.2L2.4 8.3a.5.5 0 0 0 .1.7l2 1.5c-.04.5-.1 1-.1 1.5s.06 1 .1 1.5l-2 1.5a.5.5 0 0 0-.1.7l1.9 3.3c.14.2.4.3.6.2l2.3-1a6.5 6.5 0 0 0 2.6 1.5l.3 2.4c.03.2.24.4.5.4h3.8c.26 0 .47-.2.5-.4l.3-2.4a6.5 6.5 0 0 0 2.6-1.5l2.3 1c.2.1.5 0 .6-.2l1.9-3.3a.5.5 0 0 0-.1-.7l-2-1.5zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ProfileIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Perfil">
    <Circle cx="12" cy="8" r="4" fill="none" stroke={color} strokeWidth="1.6" />
    <Path
      d="M4 20c0-4 4-6 8-6s8 2 8 6"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </Svg>
);

const MoneyIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Cifrão">
    <Line x1="12" y1="3" x2="12" y2="21" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <Path
      d="M15 8c0-2-1.5-3.5-3.5-3.5s-3.5 1.2-3.5 2.8c0 2.5 3 3 5 3.5 2 .5 3.5 1.2 3.5 3s-1.8 3.2-4 3.2-4-1.2-4-3"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ClockIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Relógio">
    <Circle cx="12" cy="12" r="8.2" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <Line x1="12" y1="3.5" x2="12" y2="5.2" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <Line x1="12" y1="18.8" x2="12" y2="20.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <Line x1="3.5" y1="12" x2="5.2" y2="12" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <Line x1="18.8" y1="12" x2="20.5" y2="12" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <Line x1="12" y1="12" x2="12" y2="8.2" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <Line x1="12" y1="12" x2="15.3" y2="12" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </Svg>
);

const StarIcon = ({ size = 24, color = '#FBBF24' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Estrela">
    <Path
      d="M12 2.5 L14.8 9 H22 L16.6 13.5 L18.8 20.5 L12 16.5 L5.2 20.5 L7.4 13.5 L2 9 H9.2 L12 2.5 Z"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </Svg>
);

const LocationIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Localização">
    <Path
      d="M12 2 C8.1 2 5 5.1 5 9 C5 14.25 12 22 12 22 C12 22 19 14.25 19 9 C19 5.1 15.9 2 12 2 Z"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="9" r="2.5" fill="none" stroke={color} strokeWidth="1.6" />
  </Svg>
);

// Ícones específicos para as telas de entregas
const CheckCircleIcon = ({ size = 24, color = '#FF9800' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Check">
    <Circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1.6" />
    <Path
      d="M9 12l2 2 4-4"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HourglassIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Ampulheta">
    <Path
      d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2H7v4.172a2 2 0 0 0 .586 1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22h10z"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PhoneIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Telefone">
    <Path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const AlarmClockIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Relógio de Alarme">
    <Circle cx="12" cy="13" r="8" fill="none" stroke={color} strokeWidth="1.6" />
    <Path d="M12 9v4l3 3" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M5 3l2-2" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M19 3l2-2" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M1 13h2" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M21 13h2" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const DetailsIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Detalhes">
    {/* Linhas de detalhes */}
    <Line x1="8" y1="6" x2="20" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Line x1="8" y1="12" x2="20" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Line x1="8" y1="18" x2="20" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    
    {/* Bolinhas de cada detalhe */}
    <Circle cx="4" cy="6" r="1.5" fill={color} />
    <Circle cx="4" cy="12" r="1.5" fill={color} />
    <Circle cx="4" cy="18" r="1.5" fill={color} />
  </Svg>
);

const SyncIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Sincronizar">
    <Path
      d="M12 4V2C7.03 2 3 6.03 3 11s4.03 9 9 9c3.87 0 7.18-2.49 8.48-6H21c-.6 3.9-3.92 7-8 7-5.52 0-10-4.48-10-10S6.48 2 12 2z"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 11h-2c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5h2"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Additional icons for extended functionality
const InfoIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Info">
    <Circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1.6" />
    <Line x1="12" y1="16" x2="12" y2="12" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <Circle cx="12" cy="8" r="1" fill={color} />
  </Svg>
);

const BellIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Notificação">
    <Path
      d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.73 21a2 2 0 0 1-3.46 0"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PaletteIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Paleta">
    <Circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1.6" />
    <Circle cx="8.5" cy="8.5" r="1.5" fill={color} />
    <Circle cx="15.5" cy="8.5" r="1.5" fill={color} />
    <Circle cx="8.5" cy="15.5" r="1.5" fill={color} />
    <Circle cx="15.5" cy="15.5" r="1.5" fill={color} />
  </Svg>
);

const LockIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Cadeado">
    <Rect x="3" y="11" width="18" height="10" rx="2" ry="2" fill="none" stroke={color} strokeWidth="1.6" />
    <Circle cx="12" cy="16" r="1" fill={color} />
    <Path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </Svg>
);

const CreditCardIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Cartão">
    <Rect x="1" y="4" width="22" height="16" rx="2" ry="2" fill="none" stroke={color} strokeWidth="1.6" />
    <Line x1="1" y1="10" x2="23" y2="10" stroke={color} strokeWidth="1.6" />
  </Svg>
);

const ChartIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Gráfico">
    <Path d="M3 3v18h18" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M18 9l-5 5-4-4-6 6" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const QuestionIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Ajuda">
    <Circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1.6" />
    <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="17" r="1" fill={color} />
  </Svg>
);

const ExitIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Sair">
    <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 17l5-5-5-5" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <Line x1="21" y1="12" x2="9" y2="12" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </Svg>
);

const TrashIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Lixeira">
    <Path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const WarningIcon = ({ size = 24, color = '#FF4500' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Aviso">
    <Path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <Line x1="12" y1="9" x2="12" y2="13" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <Circle cx="12" cy="17" r="1" fill={color} />
  </Svg>
);

const EditIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Editar">
    <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CanceledIcon = ({ size = 24, color = '#FF4500' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Cancelado">
    <Circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1.6" />
    <Path
      d="M15 9l-6 6M9 9l6 6"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SuccessIcon = ({ size = 24, color = '#1ecb4f' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Sucesso">
    <Circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1.6" />
    <Path
      d="M9 12l2 2 4-4"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChampionsIcon = ({ size = 24, color = '#F59E0B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Troféu">
    {/* Base do troféu */}
    <Rect x="9" y="18" width="6" height="3" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    
    {/* Taça */}
    <Path d="M8 4h8v4a4 4 0 0 1-8 0V4z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    
    {/* Alças laterais */}
    <Path d="M8 5H5a2 2 0 0 0 0 4h2M16 5h3a2 2 0 0 1 0 4h-2" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const RelatoriosIcon = ({ size = 24, color = '#111827' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Relatórios">
    <Path d="M3 3v18h18" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M18 9l-5 5-4-4-6 6" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const DeleteIcon = ({ size = 24, color = '#FF4500' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Excluir">
    <Path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);


const iconComponents = {
  // Ícones principais
  home: HomeIcon,
  house: HomeIcon,
  box: BoxIcon,
  package: BoxIcon,
  settings: SettingsIcon,
  gear: SettingsIcon,
  profile: ProfileIcon,
  user: ProfileIcon,
  person: ProfileIcon,
  money: MoneyIcon,
  dollar: MoneyIcon,
  currency: MoneyIcon,
  clock: ClockIcon,
  time: ClockIcon,
  star: StarIcon,
  rating: StarIcon,
  location: LocationIcon,
  navigation: LocationIcon,
  pin: LocationIcon,
  info: InfoIcon,
  bell: BellIcon,
  notification: InfoIcon,
  palette: SettingsIcon,
  theme: SettingsIcon,
  lock: SettingsIcon,
  security: SettingsIcon,
  'credit-card': MoneyIcon,
  card: MoneyIcon,
  chart: InfoIcon,
  analytics: InfoIcon,
  question: InfoIcon,
  help: InfoIcon,
  exit: InfoIcon,
  logout: InfoIcon,
  trash: InfoIcon,
  delete: InfoIcon,
  warning: InfoIcon,
  alert: InfoIcon,
  edit: InfoIcon,
  pencil: InfoIcon,
  success: SuccessIcon,
  check: CheckCircleIcon,
  checkmark: CheckCircleIcon,
  'check-circle': CheckCircleIcon,
  champions: ChampionsIcon,
  relatorios: RelatoriosIcon,
  delete: DeleteIcon,
  // Ícones específicos para entregas
  hourglass: HourglassIcon,
  pending: HourglassIcon,
  phone: PhoneIcon,
  call: PhoneIcon,
  'alarm-clock': AlarmClockIcon,
  'alarm-time': AlarmClockIcon,
  details: DetailsIcon,
  document: DetailsIcon,
  sync: SyncIcon,
  refresh: SyncIcon,
  // Fallback para ícones não encontrados
  restaurant: HomeIcon,
  wave: HomeIcon,
  cancel: HomeIcon,
  canceled: CanceledIcon,
  eye: HomeIcon,
  'eye-off': HomeIcon,
  pause: HomeIcon,
  celebration: HomeIcon,
  'shopping-bag': HomeIcon,
};

const SvgIcon = ({ name, size = 24, color = '#111827', style, ...props }) => {
  const IconComponent = iconComponents[name];

  if (!IconComponent) {
    console.warn(`SvgIcon: Icon '${name}' not found`);
    return null;
  }

  return (
    <View style={[{ width: size, height: size }, style]} {...props}>
      <IconComponent size={size} color={color} />
    </View>
  );
};

export default SvgIcon;
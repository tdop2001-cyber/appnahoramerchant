import { StyleSheet } from 'react-native';

export const createDynamicStyles = (theme) => {
  const colors = theme.colors[theme.isDarkMode ? 'dark' : 'light'];
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      paddingTop: 20,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      marginHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: theme.isDarkMode ? '#000' : '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: theme.isDarkMode ? 0.3 : 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 12,
    },
    text: {
      color: colors.text,
      fontSize: 16,
    },
    textSecondary: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    textPrimary: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: '600',
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.primary,
      minHeight: 48,
    },
    buttonText: {
      color: colors.primaryText,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
      numberOfLines: 1,
    },
    buttonSecondary: {
      backgroundColor: colors.secondary,
      borderColor: colors.border,
    },
    buttonSecondaryText: {
      color: colors.secondaryText,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
      numberOfLines: 1,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    spaceBetween: {
      justifyContent: 'space-between',
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      backgroundColor: colors.surface,
      borderRadius: 8,
      padding: 12,
      color: colors.text,
      fontSize: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    toggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
    },
    toggleLabel: {
      flex: 1,
      marginRight: 12,
    },
    toggleTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 2,
    },
    toggleDescription: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    toggleSwitch: {
      transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    },
    restaurantInfo: {
      marginBottom: 12,
    },
    infoLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 2,
    },
    infoValue: {
      fontSize: 14,
      color: colors.text,
      fontWeight: '500',
    },
    editButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 8,
    },
    editButtonText: {
      color: colors.primaryText,
      fontSize: 14,
      fontWeight: '600',
      marginLeft: 6,
    },
    // Estilos específicos para o HomeScreen
    statsContainer: {
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    statCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: theme.isDarkMode ? '#000' : '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: theme.isDarkMode ? 0.3 : 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    statValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: colors.textSecondary,
      textAlign: 'center',
      fontWeight: '500',
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    cardSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
    },
    listItem: {
      backgroundColor: colors.surface,
      borderRadius: 8,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    listItemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    listItemTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    listItemSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: colors.secondary,
    },
    statusText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: colors.text,
    },
    statusPending: {
      backgroundColor: 'rgba(255, 215, 0, 0.2)',
    },
    statusAccepted: {
      backgroundColor: 'rgba(30, 203, 79, 0.2)',
    },
    statusPicked: {
      backgroundColor: 'rgba(255, 107, 53, 0.2)',
    },
    statusDelivered: {
      backgroundColor: 'rgba(30, 203, 79, 0.3)',
    },
    statusPendingText: {
      color: '#FFD700',
    },
    statusAcceptedText: {
      color: '#1ecb4f',
    },
    statusPickedText: {
      color: '#FF6B35',
    },
    statusDeliveredText: {
      color: '#1ecb4f',
    },
    backButton: {
      marginBottom: 8,
    },
    backButtonText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: '600',
    },
    flex1: {
      flex: 1,
    },
    // Cards com barra lateral colorida
    cardWithStatus: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      marginHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: theme.isDarkMode ? '#000' : '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: theme.isDarkMode ? 0.3 : 0.1,
      shadowRadius: 3.84,
      elevation: 5,
      position: 'relative',
    },
    cardStatusBar: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
    },
    cardStatusBarPending: {
      backgroundColor: '#FFD700',
    },
    cardStatusBarAccepted: {
      backgroundColor: '#1ecb4f',
    },
    cardStatusBarPicked: {
      backgroundColor: '#FF6B35',
    },
    cardStatusBarDelivered: {
      backgroundColor: '#1ecb4f',
    },
    cardStatusBarOperational: {
      backgroundColor: '#1ecb4f',
    },
    cardStatusBarWarning: {
      backgroundColor: '#FFD700',
    },
    cardStatusBarError: {
      backgroundColor: '#FF4500',
    },
    cardStatusBarInfo: {
      backgroundColor: '#2196F3',
    },
  });
};

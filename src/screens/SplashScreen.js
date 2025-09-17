import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Navegar para a tela principal após o vídeo terminar ou timeout
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 8000); // 8 segundos máximo

    return () => clearTimeout(timer);
  }, [navigation]);

  const onVideoEnd = () => {
    // Navegar imediatamente quando o vídeo terminar
    navigation.replace('Home');
  };

  const onVideoError = (error) => {
    console.log('Erro ao reproduzir vídeo:', error);
    setVideoError(true);
    // Se houver erro, navegar após 3 segundos
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
  };

  const onVideoLoad = () => {
    setVideoLoaded(true);
  };

  const onVideoLoadStart = () => {
    setVideoLoaded(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      {!videoError ? (
        <Video
          ref={videoRef}
          source={{ uri: 'file:///android_asset/Criação_de_Animação_NaHora_.mp4' }}
          style={styles.video}
          resizeMode="cover"
          onEnd={onVideoEnd}
          onError={onVideoError}
          onLoad={onVideoLoad}
          onLoadStart={onVideoLoadStart}
          repeat={false}
          muted={false}
          playInBackground={false}
          playWhenInactive={false}
          ignoreSilentSwitch="ignore"
          mixWithOthers="mix"
        />
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Erro ao carregar vídeo</Text>
          <Text style={styles.errorSubtext}>Carregando aplicativo...</Text>
        </View>
      )}

      {!videoLoaded && !videoError && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#000',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 16,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    color: '#CCCCCC',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SplashScreen;

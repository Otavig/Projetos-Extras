import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput, KeyboardAvoidingView, ScrollView, Platform, Animated } from 'react-native';

const logo = require('./assets/imgs/logo.png');
const logoCortada = require('./assets/imgs/logoCortada.png');

// Tela inicial
const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.textTitle}>Mountain</Text>
    <View style={styles.imgContainer}>
      <Image source={logo} style={styles.imgHome} />
    </View>

    <View style={styles.containerButtonsHome}>
      <Pressable
        style={styles.buttonHome}
        onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.p_white}>Cadastrar</Text>
      </Pressable>

      <Pressable
        style={styles.buttonHome}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.p_white}>Entrar</Text>
      </Pressable>
    </View>
  </View>
);

// Tela 1
const TelaLogin = ({ navigation, goBack }) => (
  <View style={styles.container}>
    <Pressable style={styles.voltar} onPress={goBack}></Pressable>

    <Text style={[styles.textTitle, styles.linkTitle]}>Mountain-Login</Text>
    <View style={styles.imgContainer}>
      <Image source={logoCortada} style={styles.imgPages} />
    </View>

    <TextInput
      style={[styles.input, { paddingLeft: 10 }]}
      keyboardType="email-address"
      placeholder="Email"
      placeholderTextColor="rgba(0,0,0,0.5)"
      autoCorrect={false}
    />
    <TextInput
      style={[styles.input, { paddingLeft: 10 }]}
      placeholder="Senha"
      secureTextEntry={true}
      placeholderTextColor="rgba(0,0,0,0.5)"
    />
    <Pressable style={styles.buttonLogin} onPress={() => navigation.navigate('Home')}>
      <Text style={styles.p_white}>Entrar</Text>
    </Pressable>
    <Pressable onPress={() => navigation.navigate('Cadastro')}>
      <Text style={styles.textLink}>Não tem conta ainda? Cadastra-se!</Text>
    </Pressable>
  </View>
);

// Tela 2
const TelaCadastro = ({ navigation, goBack }) => (
  <View style={styles.container}>
    <Pressable style={styles.voltar} onPress={goBack}></Pressable>
  
    <Text style={[styles.textTitle, styles.linkTitle]}>Mountain-Cadastro</Text>
    <View style={styles.imgContainer}>
      <Image source={logoCortada} style={styles.imgPages} />
    </View>

    <TextInput
      style={styles.input}
      placeholder="Nome"
      placeholderTextColor="rgba(0,0,0,0.5)"
    />
    <TextInput
      style={[styles.input, { paddingLeft: 10 }]}
      keyboardType="email-address"
      placeholder="Email"
      placeholderTextColor="rgba(0,0,0,0.5)"
      autoCorrect={false}
    />
    <TextInput
      style={[styles.input, { paddingLeft: 10 }]}
      placeholder="Senha"
      secureTextEntry={true}
      placeholderTextColor="rgba(0,0,0,0.5)"
    />
    <Pressable style={styles.buttonLogin} onPress={goBack}>
      <Text style={styles.p_white}>Cadastrar</Text>
    </Pressable>
    <Pressable onPress={() => navigation.navigate('Login')}>
      <Text style={styles.textLink}>Já tem conta? Loga-se!</Text>
    </Pressable>
  </View>
);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [fadeAnim] = useState(new Animated.Value(0));

  const goBack = () => {
    setCurrentScreen('Home');
  };

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]); 

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeScreen navigation={{ navigate: setCurrentScreen }} />;
      case 'Login':
        return <TelaLogin navigation={{ navigate: setCurrentScreen }} goBack={goBack} />;
      case 'Cadastro':
        return <TelaCadastro navigation={{ navigate: setCurrentScreen }} goBack={goBack} />;
      default:
        return <HomeScreen navigation={{ navigate: setCurrentScreen }} />;
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={[styles.keyboardAvoid, { opacity: fadeAnim }]}>
          {renderScreen()}
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  keyboardAvoid: {
    flex: 1,
    opacity: 0, // Define a opacidade inicial
  },
  containerButtonsHome: {
    flexDirection: 'row',
    marginTop: 20,
  },
  textTitle: {
    fontFamily: 'Arial',
    fontSize: 30,
    fontWeight: '200',
    marginBottom: 10,
  },
  linkTitle: {
    marginTop: 20,
  },
  textLink: {
    marginVertical: 15,
    color: 'black',
    textDecorationLine: 'underline',
    borderBottomColor: 'black',
  },
  p_white: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'Arial',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 40,
    marginTop: 20,
    paddingHorizontal: 10,
    fontFamily: 'Arial',
  },
  buttonHome: {
    marginLeft: 10,
    width: 170,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 40,
    elevation: 3,
    backgroundColor: '#00A3FF',
  },

  voltar: {
    alignSelf: 'flex-start',
    marginLeft: 25,
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'black',
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    zIndex: 1,
    top: 90,
    left: 20,
  },

  buttonLogin: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 40,
    elevation: 3,
    backgroundColor: '#00A3FF',
  },
  imgHome: {
    width: '100%',
    height: 210,
    alignSelf: 'center',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  imgPages: {
    width: '100%',
    height: 190,
    alignSelf: 'center',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  imgContainer: {
    margin: 0,
    padding: 0,
    width: '50%',
    marginBottom: 10,
  },
});

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate a loading delay
    setTimeout(() => {
      console.log(`Login attempt by ${email} with password ${password}`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./cool-image.png')} style={styles.logo} />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      
      <TouchableOpacity
        style={[styles.loginBtn, { opacity: isLoading ? 0.5 : 1 }]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <Text style={styles.loginText}>Loading...</Text>
        ) : (
          <Text style={styles.loginText}>Log In</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: -150,
    paddingBottom: -100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0077FF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 300,
    color: '#000',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#003f5c',
    borderRadius: 2,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    borderBottomColor: '#003f5c',
    borderBottomWidth: 1,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  inputText: {
    height: 50,
    color: '#003f5c',
    fontSize: 16,
    paddingLeft: 0,
    width: '100%'
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default LoginScreen;
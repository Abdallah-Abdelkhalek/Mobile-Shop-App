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
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#555"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor="#555"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity
        style={[styles.loginButton, { opacity: isLoading ? 0.5 : 1 }]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <Text style={styles.buttonText}>Loading...</Text>
        ) : (
          <Text style={styles.buttonText}>Log In</Text>
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
  loginButton: {
    backgroundColor: '#0077FF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
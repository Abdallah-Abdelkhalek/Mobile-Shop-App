import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  const registerUser = () => {
    // Insert code here to register the user
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
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
          placeholder="Phone Number"
          placeholderTextColor="#003f5c"
          keyboardType="phone-pad"
          onChangeText={(text) => setPhone(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={registerUser}>
        <Text style={styles.loginText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterPage;

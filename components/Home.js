import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

function Home({ navigation }) {

  const GoToProduct = () => {
    navigation.navigate('Scan Products');
  };

  const GoToLogin = () => {
    navigation.navigate('Login');
  };

  const GoToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to your Online</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={GoToProduct}>
        <Text style={styles.buttonText}>Check Products</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.leftButton} onPress={GoToLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.rightButton} onPress={GoToRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  header: {
    height: 80,
    backgroundColor: '#007AFF',
    alignSelf: 'stretch',
  },
  headerText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
    paddingVertical: 40,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 25,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 50,
  },
  leftButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    flex: 0.5,
    marginRight: 10,
  },
  rightButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    flex: 0.5,
    marginLeft: 10,
  },
});

export default Home;

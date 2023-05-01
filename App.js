
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Posts from './components/Posts.js';
import Post from './components/Post.js'
import Home from './components/Home.js'
import QRCode from './components/QRCode.js';
import ScanCode from './components/ScanCode.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{title: 'Welcome'  }}/>
          <Stack.Screen name="Scan Products" component={Posts} options={{title: 'Scan Products'}}/>
          <Stack.Screen name="Products Details" component={Post} options={{title: 'Products Details'}}/>
          <Stack.Screen name="QR Code" component={QRCode} options={{title: 'scan code'}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

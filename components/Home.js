import React from 'react'
import {Text , View , Button ,Pressable} from 'react-native'

function Home({navigation}) {

    const GoToProduct = () => {
        navigation.navigate('Scan Products')
    }
  return (
    <View>
        <Text>
            Welcome Home
        </Text> 
        <Button title='Check Products' onPress={GoToProduct}/>
    </View>

  )
}

export default Home
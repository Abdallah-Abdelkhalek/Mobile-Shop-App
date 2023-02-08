import React from 'react'
import {Image , Button , ScrollView , ImageBackground , TouchableOpacity , View , StyleSheet , Dimensions} from 'react-native'

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

function QRCode({navigation,route}) {

    
    function QRClicked(){
        navigation.navigate('Products Details' , {modal:true,id : route.params.id})
    }
  return (
    
    <View style={styles.viewStyle}>
        <ImageBackground imageStyle={styles.bgImgsty} source={{uri:"https://iili.io/HEzudoF.png"}} style={styles.bgImg}>
            <Image  style={ styles.qrImg} source={{uri:"https://iili.io/HEoDAhu.jpg"}} />
        </ImageBackground>
        <TouchableOpacity style={{flex:1}} onPress={QRClicked}>
            <Image source={{uri: "https://iili.io/HEzlX9a.png"}} style={{width:70,height:70}}/>
        </TouchableOpacity>
    </View>
  )
}

export default QRCode

const styles = StyleSheet.create({
    viewStyle:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"white",
    },
    bgImg:{
        width:240,
        height:240,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode:"contain",
        marginTop:screenHeight*(25/100),
        marginBottom:screenHeight*(10/100)
        
    },
    bgImgsty:{
        resizeMode:"contain" ,
        width:240,height:240,
        
    },
    qrImg:{
        width:190,
        height:190,
        resizeMode:"contain", justifyContent:"center" , alignItems:"center",
        borderRadius:11,
        
    }
})
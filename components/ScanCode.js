import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button ,Modal ,Dimensions,Image , ImageBackground} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const ScanCode = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    function close() {
      setTimeout(() => {navigation.pop(1)}, 3000)
    }

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        };
    
        getBarCodeScannerPermissions();
      }, []);
    const showModal = () =>{
      return(
        <Modal onShow={close()} animationType="fade" transparent={true} visible={modalVisible} >
          <ImageBackground source={{uri: "https://iili.io/H1bHDdB.webp"}}style={{width:screenWidth, height:screenHeight}}>
              <Image style={styles.modalStyle} source={{uri: "https://iili.io/H1i0Hsp.png"}}/>
          </ImageBackground>
        </Modal> 
      )
    }
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      
      setModalVisible(true);
    };

    

    if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    }
    
  return (
    <View style={{ alignItems: 'center',justifyContent: 'center'}}>
      { !scanned ? 
        // <ImageBackground source={{uri:"https://iili.io/H1sJirX.png"}} resizeMode="cover" style={{width:"100%",height:"100%", marginHorizontal:20}}>
          <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]} style={styles.QRStyle} /> 
        // </ImageBackground>
        : showModal()
      }
      {/* </ImageBackground>
        {scanned? showModal() : null} */}
    </View>
  )
}

export default ScanCode

const styles = StyleSheet.create({
  modalStyle: {
      flexDirection: 'row',
      justifyContent:"center",
      alignItems:"center",
      marginLeft: screenWidth/2 - 100,
      marginTop:screenHeight/2 -100,
      position:"absolute",
      width: 200,
      height: 200,
      border: 20,
      borderWidth:20,
      borderRadius: 200,
      borderColor: "rgba(0, 0, 0, .4)"
      
  },
  QRStyle: {
    width: screenWidth,
    height: screenWidth,
    borderRadius:15,
    aspectRatio:1
}
});
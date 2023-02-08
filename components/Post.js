import React,{useState,useEffect} from 'react'
import { ScrollView , Text , View , Image, Pressable , ImageBackground , StyleSheet , Dimensions, Modal, TouchableOpacity} from 'react-native'
import axios from 'axios'
import { useScrollToTop } from '@react-navigation/native';


const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const Post = ({navigation,route}) => {

    const [post, setPost] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const [modalVisible, setModalVisible] = useState(route.params.modal);
    const [selectedColor,setSelectedColor] = useState();

    const showModal = () =>{
        return(
          <Modal onShow={close()} animationType="fade" transparent={true} visible={modalVisible} >
            <ImageBackground source={{uri: "https://iili.io/H1bHDdB.webp"}}style={{width:screenWidth, height:screenHeight}}>
                <Image style={styles.modalStyle} source={{uri: "https://iili.io/H1i0Hsp.png"}}/>
            </ImageBackground>
          </Modal> 
        )
      }
      // closing modal after 2.5 secs
      function close() {
        setTimeout(() => {setModalVisible(false)}, 2500)
        
      }
    // navigation to qr screen
    const GoToQr = () => {
        var id = {id:route.params.id}
        navigation.navigate('QR Code',id)
    }
    // get unique values in array
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    
    useEffect(() => {
        {
        axios.get(`https://api-dev.yeshtery.com/v1/yeshtery/product?product_id=${route.params.id}`)
        .then(res => {
            setPost(res.data)
            setIsloading(false)
            
        })
        .catch(err => {
            console.log(err)
        })}
    }, []);
    
    
    // }
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -- getting and displaying unique colors -- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
     // colors mapping
                function displayColors() {
                const variants = post.variants;
                var colors = [];
        
                for (var i = 0 ; i < variants.length; i++){
                colors.push(variants[i].color)
                colors[i] = colors[i].toString().toLowerCase();
                }
                const filtered_colors = colors.filter(onlyUnique)
                
            
                
                return( filtered_colors.map((color, i) =>{ 
                    if(color.includes('/')  || color.includes('-')){
                        //removing the colors to get 
                        var mixedColors;
                        var bulkColor = color;
                        if(color.includes('/'))
                            mixedColors = color.split('/');
                        if(color.includes('-'))
                            mixedColors = color.split('-');
                        

                        return mixedColors.map((color1, i1) =>{
                            return (
                                <TouchableOpacity onPress={()=>setSelectedColor(bulkColor)} key={i1} style={[styles.multiBtn,{backgroundColor:`${color1}`}]}></TouchableOpacity>  
                                );
                            })}
                            else{
                    return (
                <TouchableOpacity onPress={()=>setSelectedColor(color)} key={i} style={[styles.colorBtn,{backgroundColor:`${color}`}]}></TouchableOpacity>  
                );}
        }));}
    ////===============================================================================================================================///
    ////============================================Display Images=====================================================///
    ////===============================================================================================================================///
    function displayImages() {
            const images = post.images;
            var finalImg = [];
    
            for (var i = 0 ; i < images.length; i++)
                finalImg.push(images[i].url)

                
                return( finalImg.map((url, i) =>{ return (
                    <Image key={i} style={styles.itemImg} source={{uri: `https://develop.yeshtery.com/files/${url}` }} />
                );}))
        ;}



    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -- getting and displaying unique Sizes -- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
     
     function displaySize() {
        const variants = post.variants;
        var sizes = [];

        //select size by color 
        if(selectedColor){
            for (var i = 0 ; i < variants.length; i++){
                if(variants[i].color.toString().toLowerCase() == selectedColor)
                sizes.push(variants[i].size)
            }
        }
        else{
            for (var i = 0 ; i < variants.length; i++){
            sizes.push(variants[i].size)
            }
        }
        const filtered_sizes = sizes.filter(onlyUnique)
        const sorted_sizes = filtered_sizes.sort(function(a,b){return a-b})
        //setFilteredsizes(filtered_sizes)
        return( sorted_sizes.map((size, i) =>{ return (<TouchableOpacity key={i}><Text  style={styles.sizeBtn}>{size}</Text></TouchableOpacity>  );}))
        };
    ////===============================================================================================================================///
    
  return (
    <ScrollView style={{backgroundColor: "#ffffff" , borderRadius:20 }}>
        {isLoading ? <Text style={{textAlign:"center",fontSize:30 , fontWeight:"bold" , marginTop:100}} >Loading</Text> :
        <View style={styles.Container}>          
            {/* modal demo */}
            {(route.params.modal) && showModal()}
            {/* Image */}
            <View style={{width:screenWidth}}>
                {post.images.length === 0 ? 
                 <Image  style={styles.itemImg} source={{uri: `https://develop.yeshtery.com/files/${post.image_url}` }} /> 
                 :
                <ScrollView horizontal >
                    {displayImages()}
                </ScrollView>
                }
            </View>
            {/* Name and prices */}
            <View  style={[styles.width,{ flexWrap:'nowrap', flexDirection:"row" }]} >
                {/* name */}
                <Text style={{fontWeight:"bold"}}>
                    {post.name}  
                </Text>
                <View style={{position:"absolute",right:0, flexDirection:"column", alignItems:"flex-end"}}>
                    {/* min price */}
                    <Text style={[styles.bluetxt,{textAlign:"right" ,alignSelf:"flex-end"}]}>
                        ( {Math.ceil( post.price - (post.price * 0.20 ))} EGP )
                    </Text>
                    {/* max price */}
                    { !post.prices?
                    <Text style={{textDecorationLine: "line-through" , fontSize:15 , color:"grey"}}>     
                        { post.prices? post.prices.min : <Text>( {post.price} EGP )</Text>}
                    </Text> : null
                    }
                </View>
            </View>
            {/* description */}
            <View  style={[styles.width]}>
                <Text style={{fontSize:15 , color:"grey"}}>
                    {post.description}
                </Text>   
            </View>
            {/* Color */}
            <View style={[styles.width,{}]}>
                <Text style={[styles.bluetxt,{marginBottom:5 , fontSize:15 }]}>Color</Text>    
                <TouchableOpacity onPress={()=>setSelectedColor(null)} style={{position:"absolute",right:10,top:2}}>
                    <Text style={{ fontSize:12 , color:"#404040" , fontWeight:"bold"}}>
                        Reset Color
                    </Text>
                </TouchableOpacity>
                <View style = {{flexDirection:"row" , justifyContent:"flex-start", alignItems: "flex-start" , flexWrap:"nowrap"}}>
                    {displayColors()!=null ?displayColors(): null}
                    {displayColors()==null ?<Text>Mixed Colors</Text>: null}          
                </View>
            </View>
            {/* size */}
            <View style={[styles.width,{}]}>
                <Text style={styles.bluetxt}>
                    Size
                </Text>   
                {/* size buttons */}
                <View style = {{flexDirection:"row" , justifyContent:"flex-start", alignItems: "flex-start" , flexWrap:"wrap"}}>
                    {displaySize()}
                </View>
            </View>
            {/* QR */}
            <View style={[styles.width,{flex: 0.5}]}>
                <TouchableOpacity style={styles.qr}  onPress={GoToQr}>
                    <Image style={styles.Logo} source={{uri: "https://iili.io/H1ilbea.png"}}/>
                    <View style={{flexDirection:"column" , flexWrap:"wrap"}}>
                        <Text style={styles.bluetxt}>Scan</Text>
                        <Text >& get 100 points</Text>
                    </View>
                    <Image style={styles.rightbtns} source={{uri: "https://iili.io/H1i0dqN.png"}}/>
                </TouchableOpacity>
            </View>      
            {/* Add to cart */}
            <View style={[styles.width,{flex: 0.5}]}>
                <TouchableOpacity style={styles.qr} >
                    <Image style={styles.Logo} source={{uri: "https://iili.io/H1ilmmJ.png"}}/>
                    <View style={{flexDirection:"column" , flexWrap:"wrap"}}>
                        <Text style={styles.bluetxt}>Buy & Submit</Text>
                        <Text>the receipt for 120 points</Text>
                    </View>
                    <Image style={[styles.rightbtns,styles.pics]} source={{uri: "https://iili.io/H1ilyzv.png"}}/>
                </TouchableOpacity>
            </View>
        </View>}
    </ScrollView>)
}

export default Post

const styles = StyleSheet.create({
    bluetxt: {
        color: '#0040ff',
        fontWeight:"600",
    },
    modalStyle: {
    //   flexDirection: 'row',
    //   justifyContent:"center",
    //   alignItems:"center",
    //   marginLeft: screenWidth/2 - 100,
    //   marginTop:screenHeight/2 -100,
    //   position:"absolute",
    //   width: 200,
    //   height: 200,
    //   border: 220,
      
    //   borderColor: "rgba(255, 255, 255, .4)",
    // borderRadius: 100,
    flexDirection: 'row',
    justifyContent:"center",
    alignItems:"center",
    marginLeft: screenWidth/2 - 100,
    marginTop:screenHeight/2 -100,
    position:"absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    borderWidth: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0,
    elevation: Platform.OS === 'ios' ? null : 0,
      
  },
    itemImg: {
        width: screenWidth*(90/100),
        height: undefined,
        resizeMode: 'stretch',
        aspectRatio: 1,
        flex: 2, 

        //shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 1.41,
        borderRadius: 1,
        elevation: 2,
    },
    Container : {
        justifyContent: 'flex-start',
        alignItems:'center',
        flexDirection: 'column',
        flex: 2,
        width: screenWidth*(90/100),
        marginHorizontal: screenWidth*(5/100),
        
    },
    width :{
        width: screenWidth*(90/100),
        marginVertical: 10
    },
    sizeBtn :{
        minWidth:60,
        minHeight:30,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
        backgroundColor:'white',
        marginHorizontal: 5,
        marginVertical:3,
        borderRadius: 20 ,
        border: "1px solid",
        borderColor: "blue",
        borderWidth: 2,
    },
    colorBtn :{
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        border: "1px solid black",
        borderWidth: 1.5,
        marginHorizontal: 3,
        overflow: "hidden"
    },
    multiBtn :{
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        border: 20,
        overflow: "hidden"
    },
    qr :{
        height: 40,
        width: screenWidth*(90/100),
        flexDirection: 'row',
        flexWrap:"wrap",
    },
    Logo: {
        width: 40,
        height: 40,
        resizeMode:"contain",
        marginRight: 10
    },
    pics: {
        flexDirection: 'row',
        justifyContent:"center",
        alignItems:"center",
    },
    rightbtns :{
        position:"absolute",
        right:10,
        width:80,
        height:30,
        borderRadius:10
        
    }

});
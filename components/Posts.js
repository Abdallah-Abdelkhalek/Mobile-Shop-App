import React, {useState , useEffect} from 'react'
import {Image, Text , View , FlatList , Pressable , StyleSheet, TouchableOpacity , Dimensions} from 'react-native'
import axios from 'axios'

const screenWidth = Dimensions.get('screen').width;

export default function Posts({navigation}) {
    
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    
    
  
    useEffect(() => {
        axios.get("https://api-dev.yeshtery.com/v1/yeshtery/products")
        .then(res => {
            
            setPosts(res.data.products)
            setIsloading(false)
        })
        .catch(err => {
            console.log(err)
        })
}, []);

    
    
    return (
      <View style={{backgroundColor: "#ffffff",borderRadius:30 }}>
        {isLoading ?

        <Text style={{textAlign:"center" ,fontSize:30 , fontWeight:"bold" , marginTop:100}}>Loading</Text> :

        <View style={{alignItems: "stretch"}}>
            <FlatList data={posts} renderItem={({item}) => (
                <TouchableOpacity onPress={()=>navigation.navigate('Products Details' ,item)}>
                    <View  key={item.id} style={styles.post}>
                        {/* left container */}
                        <View style={styles.leftContainer}>
                            <Image style={styles.itemImg} source={{uri: `https://develop.yeshtery.com/files/${item.image_url}` }} />
                        </View>
                        {/* right container  */}
                        <View>
                            {/* post title */}
                            <Text  style={{fontWeight:"600" , marginTop:20}}>{item.name}</Text>

                            {/* buttons */}
                            <View style={styles.btns}>
                                    {/* price btn */}
                                    <Pressable style={styles.pricebtn} >
                                        <Image style={styles.priceLogo} source={{uri: "https://iili.io/H1ilmmJ.png"}}/>
                                        <Text style={styles.price}> 120 </Text>
                                    </Pressable>
                                    {/* logo btn */}
                                    <Pressable style={styles.pricebtn} >
                                        <Image style={styles.priceLogo} source={{uri: "https://iili.io/H1ilbea.png"}}/>
                                        <Text style={styles.price}> {item.prices.min_price} </Text>
                                    </Pressable>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                )} keyExtractor={(item, id) => item.id}
            />
        </View>
        }
        
      </View>
    );
}

const styles = StyleSheet.create({
    post: {
        marginVertical: 10,
        marginHorizontal:screenWidth*(5/100),
        height: 100,
        alignSelf: "stretch",
        width:"90%",
        flex: 1,
        justifyContent: "flex-start" ,
        flexDirection: "row",
        flexWrap:"nowrap",
        alignItems: "center",

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
    rightContainer : {
        height : 100,
        width: "60%",
        justifyContent: "flex-end" ,
        flexDirection: "row",
        alignItems: "center"
    }, 
    leftContainer : {
        height : 100,
        width: "35%",
        justifyContent: "flex-start" ,
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10
    }, 
    itemImg: {
        width: "auto",
        height: '94%',
        resizeMode: "contain",
        aspectRatio: 1,
        borderRadius: 10,
        marginLeft:2
    }
    ,pricebtn: {
        width: 60,
        height: 30,
        backgroundColor: '#FAFAFA',
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent:"center",
        alignItems:"center",
        
    },
    price: {
        color: '#0040ff',
        textAlign: "center"
    },
    priceLogo: {
        width: 20,
        height: 30
    },
    btns :{
        justifyContent: "space-between" ,
        alignItems: "flex-end" ,
        width: 150 ,
        height: 50 ,
        flexDirection:"row",
        marginTop: 30,
    },
    rightspc :{
        alignSelf : "flex-end"
    }
});
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList,  TouchableOpacity,Pressable,Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, selectCartItems } from '../redux/cartSlice';
import Cartscreen from './Cartscreen';

export default function DetailScreen({ route, navigation }) {
  const { item } = route.params;
  const [add, setadd] = useState("Add to Cart");
  const dispatch = useDispatch();
   const additemtocart=(item)=>{
    dispatch(addToCart(item));
    setadd("Added to Cart");
   }

  return (
   
     

    <View style={styles.container}>
     
     
     <View style={{marginLeft:"8px"}}>
        <TouchableOpacity onPress={()=>navigation.pop(1)}>
          <Image
           style={{height:"30px",width:"30px"}}
           source={require('../assets/back.png')}
          />
        </TouchableOpacity>
       </View>
      <View style={styles.imageGrid}>
        {item.images.map((image, index) => (
          <TouchableOpacity key={index} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.productDetails}>
        <Text style={styles.brand}>Brand: {item.brand}</Text>
        <Text style={styles.title}>Title: {item.title}</Text>
        <Text style={styles.description}>Description: {item.description}</Text>
        <Text style={styles.price}>Price: ${item.price}</Text>
        <Text style={styles.rating}>Rating: {item.rating}</Text>
        <Text style={styles.stock}>Stock: {item.stock}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.addToCartButton}
        onPress={()=>additemtocart(item)}
       
        >
          
          <Text style={styles.buttonText}>{add}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton}
         onPress={()=>navigation.navigate("Cart")}
        >
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  imageContainer: {
    width: '48%',
    marginBottom: 8,
    aspectRatio: 1, // Maintain aspect ratio
    overflow: 'hidden',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productDetails: {
    marginBottom: 16,
  },
  brand: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  price: {
    fontWeight: 'bold',
    color: '#ff4500',
    fontSize: 18,
    marginBottom: 8,
  },
  rating: {
    marginBottom: 8,
  },
  stock: {
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#ff4500',
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, emptyCart, selectCartItems } from '../redux/cartSlice';
import { Button } from 'react-native-elements';

export default function Cartscreen({ navigation }) {
  
  const dispatch = useDispatch();


  // Assuming 'data' is the correct selector, use it to get cartItems
  const cart = useSelector((state) => state.cart.cart);

  const total=cart.map((item)=>item.price*item.quantity).reduce((prev,curr)=>prev+curr,0);
  const grandTotal=total+50;

  const emptycartbutton=()=>{
    dispatch(emptyCart());
  }
  
  return (

    <View>
        <View>
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16 }}>
      <TouchableOpacity onPress={() => navigation.pop(1)}>
        <Image
          style={{ height: 30, width: 30 }}
          source={require('../assets/back.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={emptycartbutton}>
        <Text style={{ fontSize: 20, fontWeight: 'bold',marginLeft:"20px" }}>Clear Cart</Text>
      </TouchableOpacity>
    </View>
  </View>
        </View>
      <Text style={{alignItems:"center",justifyContent:"center", fontSize: 50, fontWeight: 'bold' }}>Cartscreen</Text>
      <View>
        {cart?.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.image}
            />
            <View style={styles.cardDetails}>
              <Text style={styles.title}>Title: {item?.title}</Text>
              <Text style={styles.brand}>Brand: {item?.brand}</Text>
              <Text style={styles.description}>Description: {item?.description}</Text>
              <Text style={styles.rating}>Rating: {item?.rating}</Text>
              <Text style={styles.stock}>Stock: {item?.stock}</Text>
              <Text style={styles.stock}>Price: {item?.price}</Text>
              <Text style={styles.quantity}>Quantity: {item?.quantity}</Text>
            </View>
          </View>
        ))}
      </View >
       <View style={{alignItems:"center",justifyContent:"center",marginTop:"40px"}}>
        <Text style={{fontSize:"15px",fontWeight:"bold"}}> 
             Total Price: {total}
        </Text>
        <Text style={{fontSize:"15px",fontWeight:"bold",marginBottom:"40px"}}>
            GrandTotal  Price:  {grandTotal}
        </Text>
      
      <Button
          title="Pay Now "
          style={{height:"60",width:"150"}}
        />
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    height: 100,
    width: 100,
    marginRight: 10,
  },
  cardDetails: {
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
  },
  brand: {
    fontWeight: 'bold',
  },
  description: {
    fontWeight: 'bold',
  },
  rating: {
    fontWeight: 'bold',
  },
  stock: {
    fontWeight: 'bold',
  },
  quantity: {
    fontWeight: 'bold',
  },
});

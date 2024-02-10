
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, FlatList, Pressable } from 'react-native';
import { SearchBar, Icon, Badge } from 'react-native-elements';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, emptyCart, selectCartItems } from '../redux/cartSlice';
import RNPickerSelect from 'react-native-picker-select';

export default function Homescreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]); // To store the filtered data
  const [searchQuery, setSearchQuery] = useState('');
  
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalquantity=cart.map((item)=>item.quantity).reduce((prev,curr)=>prev+curr,0);
  
  const handleSearch = async (query) => {
    try {
      setSearchQuery(query);
  
       if(!query)
       {
          fetchData();
       }
        const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
        setData(response.data.products);
              
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

   
  const fetchData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setData(response.data.products);
      setLoading(false);
      console.log(response.data.products);
    
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const categorydata = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      const Smartphonesdataget=response.data.products.filter((item)=>item.category==='smartphones')
       setData(Smartphonesdataget);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  const categorydata2 = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      const laptopsdataget=response.data.products.filter((item)=>item.category==='laptops')
       setData(laptopsdataget);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const categorydata3 = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      const fragdataget=response.data.products.filter((item)=>item.category==='fragrances')
       setData(fragdataget);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  
  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate('Detail', { item })}
      style={({ pressed }) => ({
        backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
      })}
    >
      <View style={styles.productContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
        <Text style={styles.productBrand}>Brand: {item.brand}</Text>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>Price: ${item.price}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
       <Text style={{marginLeft:"130px",fontSize:"30px",fontWeight:"bold"}}>Tech-Mart</Text>
      <View style={styles.header}>
         <View style={{flexDirection:"row"}}>
         <Pressable onPress={() => navigation.navigate('Cart', { data })}>
          <Image
            style={styles.cartIcon} 
            source={require('./shopping-cart (1).png')} 
          />
          
        </Pressable>
        {totalquantity >0 && (
        <View>
         <Text style={{fontWeight:"bold",fontSize:"23px"}}>{totalquantity}</Text>
        </View>
      )}
         </View>

         
        </View>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
          <Pressable
           onPress={categorydata}
          >
            <Text style={{fontSize:"15px",fontWeight:"bold"}}>Smartphones</Text>
          </Pressable>
          <Pressable
          style={{marginLeft:"8px"}}
           onPress={categorydata2}
          >
            <Text style={{fontSize:"15px",fontWeight:"bold"}}>Laptops</Text>
          </Pressable>
           <Pressable
          style={{marginLeft:"8px"}}
           onPress={categorydata2}
          >
            <Text style={{fontSize:"15px",fontWeight:"bold"}}>Perfumes</Text>
          </Pressable>
          <Pressable
          style={{marginLeft:"8px"}}
           onPress={categorydata3}
          >
            <Text style={{fontSize:"15px",fontWeight:"bold"}}>furniture</Text>
          </Pressable>
          <Pressable
          style={{marginLeft:"8px"}}
           onPress={categorydata2}
          >
            <Text style={{fontSize:"15px",fontWeight:"bold"}}>Medicines</Text>
          </Pressable>
          </View>
      <SearchBar
        placeholder="Search products..."
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        searchIcon={<Icon name="search" type="font-awesome" color="#86939e" />}
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : data.length === 0 ? (
        <Text>No data available</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tagBadge: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#4CAF50',
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginBottom: 16,
  },
  inputContainer: {
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
  },
  inputText: {
    color: '#333',
  },
  productContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
  },
  productImage: {
    width: 300,
    height: 180,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  productBrand: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productTitle: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  productPrice: {
    fontWeight: 'bold',
    color: '#007BFF',
    fontSize: 18,
  },
  header: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cartIcon: {
    height: 30,
    width: 30,
  },
});

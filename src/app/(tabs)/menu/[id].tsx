import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import products from '@/assets/data/products'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Button from '@/src/components/Button'

const sizes = ['S', 'M', 'L', 'XL']


const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams()
  const [selectedSize, setSelectedSize] = useState('M')
  const product = products.find(p => p.id.toString() === id)
  
  const addToCart = () => {
    console.warn("adding to cart, size: " + selectedSize);
  }

  if (!product) {
    return <Text>Product not found</Text>
  }
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{title: product.name}} />
      <Image source={{uri: product.image || defaultPizzaImage}} style={styles.image} />
      <View style={styles.sizes}>
      {sizes.map(size => 
        <Pressable onPress={() => setSelectedSize(size)}  style={[styles.size, {backgroundColor: selectedSize === size ? 'gainsboro' : 'white'}]}  key={size}>
          <Text style={[styles.sizeText, {
            color: selectedSize === size ? 'black' : 'gray'
          }]}>{size}</Text>
        </Pressable>
      )}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text='Add to cart' />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10
  },
  image: {
    width: '100%',
    aspectRatio: 1
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 25
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500'
  },
  price: {
    fontWeight: 'bold',
    marginTop: 'auto'
  }
})
export default ProductDetailScreen
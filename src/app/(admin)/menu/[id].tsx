import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@/assets/data/products'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Button from '@/src/components/Button'
import { useCart } from '@/src/providers/CardProvider'
import { PizzaSize } from '@/src/types'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']


const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams()
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')
  const product = products.find(p => p.id.toString() === id)
  const { addItem } = useCart();
  const router = useRouter()
  
  const addToCart = () => {
    if (!product) {return}
    addItem(product, selectedSize);
    router.push('/cart')
  }

  if (!product) {
    return <Text>Product not found</Text>
  }
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{title: product.name}} />
      <Image source={{uri: product.image || defaultPizzaImage}} style={styles.image} />
      
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
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
  name: {
    fontWeight: '500',
    fontSize: 20
  },
  price: {
    fontWeight: 'bold',
  }
})
export default ProductDetailScreen
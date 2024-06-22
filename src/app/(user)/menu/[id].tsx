import { View, Text, StyleSheet, Image, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@/assets/data/products'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Button from '@/src/components/Button'
import { useCart } from '@/src/providers/CardProvider'
import { PizzaSize } from '@/src/types'
import { useProduct } from '../../api/products'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']


const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams()
  // const id = 
  const { data: product, error, isLoading } = useProduct(parseInt(typeof id === 'string' ? id : id[0]));

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')
  
  const { addItem } = useCart();
  const router = useRouter()

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Product not found</Text>
  }
  
  const addToCart = () => {
    if (!product) {return}
    addItem(product, selectedSize);
    router.push('/cart')
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
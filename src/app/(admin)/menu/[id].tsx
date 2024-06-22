import { View, Text, StyleSheet, Image, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@/assets/data/products'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Button from '@/src/components/Button'
import { useCart } from '@/src/providers/CardProvider'
import { PizzaSize } from '@/src/types'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/src/constants/Colors'
import { useProduct } from '../../api/products'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']


const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams()
  const { data: product, error, isLoading } = useProduct(parseInt(typeof id === 'string' ? id : id[0]));

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')
  
  const { addItem } = useCart();
  const router = useRouter()

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (!product || error) {
    return <Text>Product not found</Text>
  }

  
  
  const addToCart = () => {
    if (!product) {return}
    addItem(product, selectedSize);
    router.push('/cart')
  }

  
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen 
            options={{title: 'Menu',
              headerRight: () => (
                <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <FontAwesome
                        name="pencil"
                        size={25}
                        color={Colors.light.tint}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              )}
            }
        />
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
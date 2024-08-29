import { Text, View, Platform, FlatList } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '../providers/CardProvider'
import CartListItem from '../components/CartListItem'
import Button from '../components/Button'

export function CartScreen() {
    const { items, total, saveOrder } = useCart()
    return (
      <View style={{padding: 5}}>
        <FlatList 
            data={items}
            renderItem={({item}) => <CartListItem cartItem={item} />}
            contentContainerStyle={{padding: 10, gap: 10}}
        />
        <Text style={{marginTop: 5, fontWeight: '600' }}>Total: ${total}</Text>
        <Button text='Checkout' onPress={saveOrder}/>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
    )
}

export default CartScreen
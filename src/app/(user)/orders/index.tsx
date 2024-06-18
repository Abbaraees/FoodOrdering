import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import orders from '@/assets/data/orders'
import OrderListItem from '@/src/components/OrderListItem'


const Orders = () => {
  return (
    <View>
      <Stack.Screen options={{title: 'Orders'}} />
      <FlatList 
        data={orders} 
        renderItem={({item}) => <OrderListItem order={item} />} 
        contentContainerStyle={{gap: 10, padding: 10}}  
      />
    </View>
  )
}

export default Orders
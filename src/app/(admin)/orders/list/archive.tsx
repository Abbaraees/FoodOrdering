import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import orders from '@/assets/data/orders'
import OrderListItem from '@/src/components/OrderListItem'
import { useAdminOrders } from '@/src/api/orders'


const Orders = () => {
  const { data: orders, isLoading, error } = useAdminOrders({archived: true})
  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch orders</Text>
  }
  
  return (
    <View>
      <Stack.Screen options={{title: 'Archive'}} />
      <FlatList 
        data={orders} 
        renderItem={({item}) => <OrderListItem order={item} />} 
        contentContainerStyle={{gap: 10, padding: 10}}  
      />
    </View>
  )
}

export default Orders
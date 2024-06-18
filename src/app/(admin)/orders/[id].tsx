import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@/assets/data/orders'
import OrderListItem from '@/src/components/OrderListItem'
import CartListItem from '@/src/components/CartListItem'
import OrderItemListItem from '@/src/components/OrderItemListItem'

const OrderDetail = () => {
  const { id } = useLocalSearchParams()
  const order = orders.find((order) => order.id.toString() == id)
  console.log(order)
  if (!order) {
    return <Text>Order Not Found</Text>
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: `Order #${id}`}} />
      <OrderListItem order={order} />
      <FlatList
        data={order.order_items}
        renderItem={({item}) => <OrderItemListItem item={item} />}
        contentContainerStyle={{gap: 10}}
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10
  }
})
export default OrderDetail
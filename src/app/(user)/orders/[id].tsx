import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@/assets/data/orders'
import OrderListItem from '@/src/components/OrderListItem'
import OrderItemListItem from '@/src/components/OrderItemListItem'
import { useOrderDetail } from '@/src/api/orders'

const OrderDetail = () => {
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])
  const { data: order, isLoading, error } = useOrderDetail(id)

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error || !order) {
    return <Text>Failed to fetch order</Text>
  }

  console.log(order)
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: `Order #${id}`}} />
      
      <FlatList
        data={order.order_items}
        renderItem={({item}) => <OrderItemListItem item={item} />}
        contentContainerStyle={{gap: 10}}
        ListHeaderComponent={<OrderListItem order={order} />}
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  }
})
export default OrderDetail
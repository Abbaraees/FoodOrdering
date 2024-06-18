import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@/assets/data/orders'
import OrderListItem from '@/src/components/OrderListItem'
import CartListItem from '@/src/components/CartListItem'
import OrderItemListItem from '@/src/components/OrderItemListItem'
import { OrderStatusList } from '@/src/types'
import Colors from '@/src/constants/Colors'

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
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: 'bold' }}>Status</Text>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => console.warn('Update status')}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? 'white' : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>

        )}
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
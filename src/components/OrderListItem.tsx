import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Order } from '../types'
import dayjs from 'dayjs';
import { Link, useSegments } from 'expo-router';

type OrderListItemProp = {
    order: Order
}

const OrderListItem = ({ order }: OrderListItemProp) => {
  const segments = useSegments()
  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.orderDetail}>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <Text style={styles.orderTime}>{dayjs(order.created_at).format('H')} hours ago</Text>
        </View>
        <Text style={styles.orderStatus}>{order.status}</Text>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10

  }, 
  orderDetail: {
    flexDirection: 'column'
  },
  orderId: {
    fontWeight: 'bold'
  },
  orderTime: {
    color: 'gray'
  },
  orderStatus: {
    marginLeft: 'auto',
    fontWeight: '600'
  }
})

export default OrderListItem
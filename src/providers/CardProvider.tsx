import { PropsWithChildren, createContext, useContext, useState } from "react";
import React from 'react'
import { CartItem, Tables } from "../types";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "../api/orders";
import { useRouter } from "expo-router";
import { useAuth } from "./AuthProvider";
import { useInsertOrderItems } from "../api/order-items";

type CartType = {
    items: CartItem[],
    addItem: (product: Tables<'products'>, size: CartItem['size']) => void,
    updateQuantity: (itemId: string, amount: -1 | 1) => void,
    total: number,
    saveOrder: () => void
}
const CardContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  saveOrder: () => {}
})


const CardProvider = ({ children }: PropsWithChildren) => {
const [items, setItems] = useState<CartItem[]>([])
  const { session } = useAuth()
  const router = useRouter()

  const {mutate: inserOrder} = useInsertOrder()
  const {mutate: insertOrderItems} = useInsertOrderItems()

  const saveOrder = async () => {
    inserOrder(
      {
        total: total,
        user_id: session?.user.id
      },
      {
        onSuccess(data) {
          const orderItems = items.map(item => (
            {
              product_id: item.product_id, 
              size: item.size, 
              order_id: data.id, 
              quantity: item.quantity
            })
          )

          insertOrderItems(orderItems,
            {
              onSuccess() {
                clearItems()
                router.push(`/(user)/orders/${data.id}`)
              },
              onError(error) {
                console.warn(error.message)
              }
            }  
          )

        },
        onError(error) {
          console.warn(error.message)
        }
      }
    )
  }

  const addItem = (product: Tables<'products'>, size: CartItem['size']) => {
    const existingItem = items.find(item => item.product === product && item.size === size )

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }
    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1
    }

    setItems([newCartItem, ...items])
  }

  const clearItems = () => setItems([])

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items.map(
        (item) => item.id !== itemId 
          ? item 
          : {...item, quantity: item.quantity + amount}
      ).filter(item => item.quantity > 0)
    )
  }

  const total = items.reduce((sum, item) => item.product.price * item.quantity, 0)
  
  return (
    <CardContext.Provider value={{items, addItem, updateQuantity, total, saveOrder}}>
      {children}
    </CardContext.Provider>
  )
}

export default CardProvider
export const useCart = () => useContext(CardContext);
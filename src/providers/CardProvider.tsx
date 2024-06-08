import { PropsWithChildren, createContext, useContext, useState } from "react";
import { View, Text } from 'react-native'
import React from 'react'
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";

type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void,
    updateQuantity: (itemId: string, amount: -1 | 1) => void,
    total: number
}
const CardContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
    total: 0
})


const CardProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (product: Product, size: CartItem['size']) => {
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
    <CardContext.Provider value={{items, addItem, updateQuantity, total}}>
      {children}
    </CardContext.Provider>
  )
}

export default CardProvider
export const useCart = () => useContext(CardContext);
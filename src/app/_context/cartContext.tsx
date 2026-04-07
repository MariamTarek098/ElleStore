'use client'
import { CartResponse, WishlistResponse } from '@/interfaces/product.interface'
import React, { createContext, ReactNode, useState, useContext } from 'react'

export interface CartContextType {
  numberOfCartItems: number
  updateNumberOfCart: (num: number) => void
}

export interface WishlistContextType {
  numberOfWishlistItems: number
  wishlistIds: string[] 
  updateNumberOfWishlist: (num: number) => void
  setWishlistIds: (ids: string[]) => void 
}

export const cartContext = createContext<CartContextType | null>(null)
export const wishlistContext = createContext<WishlistContextType | null>(null)

export default function CartContextProvider({ children, res, resp }: { 
  children: ReactNode; 
  res: CartResponse | undefined; 
  resp: WishlistResponse | undefined 
}) {

  //  Cart State
  const [numberOfCartItems, setNumberOfCartItems] = useState(res?.products?.length || 0)

  //  Wishlist Count State 
  const [numberOfWishlistItems, setNumberOfWishlistItems] = useState(resp?.count || 0)
  
  //  Protect Wishlist IDs 
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {

    return resp?.data?.map((prod) => prod._id) || []
  })

  return (
    <cartContext.Provider value={{ numberOfCartItems, updateNumberOfCart: setNumberOfCartItems }}>
      <wishlistContext.Provider
        value={{ 
          numberOfWishlistItems, 
          wishlistIds, 
          updateNumberOfWishlist: setNumberOfWishlistItems, 
          setWishlistIds 
        }}
      >
        {children}
      </wishlistContext.Provider>
    </cartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(cartContext);
  if (!context) throw new Error('useCart must be used inside Provider');
  return context;
}

export const useWishlist = () => {
  const context = useContext(wishlistContext);
  if (!context) throw new Error('useWishlist must be used inside Provider');
  return context as WishlistContextType;
}

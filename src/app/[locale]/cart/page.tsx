'use client'

import scss from './scss/page.module.scss'

import type { UserInitState } from "@/store/user/user.type"
import type { RootState } from "@/store/store"

import { useSelector } from "react-redux"

import CartList from "./component/cartList"
import CartCost from "./component/cartCost"

export default function Page() {
  const { cart } = useSelector<RootState, UserInitState>(state => state.user)

  return(
    <main className={scss.cart_container}>
      <CartList products={cart}/>
      <CartCost products={cart}/>
    </main>
  )
}
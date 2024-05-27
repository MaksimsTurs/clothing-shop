'use client'

import scss from './scss/page.module.scss'

import type { UserInitState } from "@/store/user/user.type"
import type { RootState } from "@/store/store"

import { useSelector } from "react-redux"

import CartList from "./component/cartList"
import CartPrice from "./component/cartpRICE"

export default function Page() {
  const { cart } = useSelector<RootState, UserInitState>(state => state.user)

  return(
    <main className={scss.cart_container}>
      <CartList products={cart}/>
      <CartPrice products={cart}/>
    </main>
  )
}
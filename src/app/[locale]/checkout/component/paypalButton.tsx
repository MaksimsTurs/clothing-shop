import { PayPalButtonsComponentProps, PayPalButtons } from "@paypal/react-paypal-js";

import createOrderID from "../fetching/createOrderID";
import closeTransaction from "../fetching/closeTransaction";

import { useRouter } from "next/navigation";
import { useCurrentLocale } from "@/localization/client";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "@/store/store";
import type { RootState } from "@/store/store";
import type { UserInitState } from "@/store/user/user.type";

import { clearCart } from "@/store/user/user";

export default function PaypalButton() {
  const router = useRouter()
  const language = useCurrentLocale()

  const dispatch = useDispatch<AppDispatch>()

  const { yourself } = useSelector<RootState, UserInitState>(state => state.user)

  
  const createOrder: PayPalButtonsComponentProps['createOrder'] = async () => {
    const checkID = localStorage.getItem('checkID')

    const { orderID } = await createOrderID(checkID!)
    return orderID
  }
  
  const onApprove: PayPalButtonsComponentProps['onApprove'] = async (data, actions) => {
    const adress = localStorage.getItem('adress')
    const checkID = localStorage.getItem('checkID')

    actions.order?.capture()
    await closeTransaction(yourself?.token!, checkID!, adress!)
    localStorage.removeItem('checkID')
    router.replace(`/${language}/checkout/thank`)
    dispatch(clearCart())
  }

  return <PayPalButtons 
           style={{ label: "paypal", color: 'blue', tagline: false, disableMaxWidth: true }} 
           createOrder={createOrder} 
           onApprove={onApprove}/>
}
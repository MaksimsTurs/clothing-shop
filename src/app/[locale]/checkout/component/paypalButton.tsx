import scss from '../scss/createOrder.module.scss'

import { PayPalButtonsComponentProps, PayPalButtons } from "@paypal/react-paypal-js";

import createOrderID from "../fetching/createOrderID";
import closeTransaction from "../fetching/closeTransaction";

import { useRouter } from "next/navigation";
import { useCurrentLocale, useI18n } from "@/localization/client";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "@/store/store";
import type { RootState } from "@/store/store";
import type { UserInitState } from "@/store/user/user.type";

import { clearCart } from "@/store/user/user";
import { Fragment, useState } from "react";
import { CircleAlert } from 'lucide-react';
import ResponseError from '@/util/exeption/ResponseError';

export default function PaypalButton() {
  const [error, setError] = useState<string | undefined>(undefined)

  const router = useRouter()
  const language = useCurrentLocale()

  const dispatch = useDispatch<AppDispatch>()

  const t = useI18n()
  
  const paypalStyle: PayPalButtonsComponentProps['style'] = {
    tagline: false,
    disableMaxWidth: true,
    color: 'blue',
    label: 'pay',
    layout: 'vertical',
  }
  
  const giroPayStyle: PayPalButtonsComponentProps['style'] = {
    tagline: false,
    disableMaxWidth: true,
    label: 'pay',
    layout: 'vertical',
  }
  
  const createOrder: PayPalButtonsComponentProps['createOrder'] = async (data, actions) => {
    const checkID = localStorage.getItem('checkID')
    if(!checkID) throw new Error(`${t('create-order.yourself-undefined')}!`)

    try {
      const { orderID } = await createOrderID(checkID)
      setError(undefined)
      return orderID
    } catch(error) {
      throw new ResponseError(error)
    }
  }
  
  const onError: PayPalButtonsComponentProps['onError'] = async (_error) => {
    const error = String(_error).replaceAll('Error:', '').trim()

    if(error[0] === '{' && error[error.length - 1] === '}') setError(JSON.parse(error).message)
    else setError(error)
  }
  
  const onApprove: PayPalButtonsComponentProps['onApprove'] = async (data, actions) => {
    const userOrderData = JSON.parse(localStorage.getItem('user-order-data') || 'null')
    const checkID = localStorage.getItem('checkID')
    if(!userOrderData || !checkID) throw new Error(`${t('create-order.yourself-undefined')}!`)
    
    try {
      await actions.order?.capture()
      await closeTransaction({...userOrderData, checkID })     
      localStorage.removeItem('checkID')
      dispatch(clearCart())
      router.replace(`/${language}/checkout/thank`) 
    } catch(error) {
      throw new ResponseError(error)
    }
  }

  return(
    <Fragment>
      <PayPalButtons 
        fundingSource="paypal" 
        style={paypalStyle} 
        createOrder={createOrder} 
        onApprove={onApprove} 
        onError={onError}/>
      <PayPalButtons 
        fundingSource="card" 
        style={giroPayStyle} 
        createOrder={createOrder} 
        onApprove={onApprove} 
        onError={onError}/>
      {error ? <section className={scss.checkout_paypal_error}><CircleAlert size={20}/><p>{error}</p></section> : null}
    </Fragment>
  )
}
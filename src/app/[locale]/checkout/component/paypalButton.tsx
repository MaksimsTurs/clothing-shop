import scss from '../scss/createOrder.module.scss'

import { type PayPalButtonsComponentProps, PayPalButtons } from "@paypal/react-paypal-js";

import createOrder from "../fetching/createOrder";
import closeTransaction from "../fetching/closeTransaction";

import ResponseError from '@/util/exeption/ResponseError';

import { useRouter } from "next/navigation";
import { useCurrentLocale, useI18n } from "@/localization/client";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/store/store";

import { clearCart } from "@/store/user/user";
import { Fragment, useState } from "react";
import { CircleAlert } from 'lucide-react';
import { PaypalButtonProps } from '../page.type';

export default function PaypalButton({ orderData, setIsPaymentModalOpen }: PaypalButtonProps) {
  const [error, setError] = useState<string | undefined>(undefined)

  const router = useRouter()
  const language = useCurrentLocale()

  const dispatch = useDispatch<AppDispatch>()

  const t = useI18n()
  
  const paypalCreateOrder: PayPalButtonsComponentProps['createOrder'] = async () => {    
    console.log(orderData)
    if(!orderData) throw new Error(`${t('create-order.yourself-undefined')}!`)

    try {
      const { id } = await createOrder(orderData.checkID)
      setError(undefined)
      return id
    } catch(error) {
      throw new ResponseError(error)
    }
  }

  const onError: PayPalButtonsComponentProps['onError'] = async (_error) => {
    const error = String(_error).replaceAll('Error:', '').trim()

    if(error[0] === '{' && error[error.length - 1] === '}') setError(JSON.parse(error).message)
    else setError(error)
  }
  
  const onApprove: PayPalButtonsComponentProps['onApprove'] = async (data) => {
    if(!orderData) throw new Error(`${t('create-order.yourself-undefined')}!`)
    
    try {
      await closeTransaction(orderData)     
      dispatch(clearCart())
      router.replace(`/${language}/checkout/thank`) 
    } catch(error) {
      throw new ResponseError(error)
    }
  }

  const closeModal = (): void => setIsPaymentModalOpen(false)

  return(
    <div className={scss.checkout_paypal_payment_methods}>
      <section className={scss.checkout_payment_methods_title}>
        <p>{t('create-order.payment-methods')}</p>
        <button onClick={closeModal}>&#10005;</button>
      </section>
      <PayPalButtons 
        fundingSource="paypal" 
        createOrder={paypalCreateOrder} 
        onApprove={onApprove} 
        onError={onError}/>
      <PayPalButtons 
        fundingSource="giropay" 
        createOrder={paypalCreateOrder} 
        onApprove={onApprove} 
        onError={onError}/>
      <PayPalButtons 
        fundingSource="trustly" 
        createOrder={paypalCreateOrder} 
        onApprove={onApprove} 
        onError={onError}/>
      <PayPalButtons 
        fundingSource="card" 
        createOrder={paypalCreateOrder} 
        onApprove={onApprove} 
        onError={onError}/>
      {error ? <section className={scss.checkout_paypal_error}><CircleAlert size={15  }/><p>{error}</p></section> : null}
    </div>
  )
}
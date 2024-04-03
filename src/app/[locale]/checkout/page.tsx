'use client'

import scss from './page.module.scss'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PayPalButtons } from '@paypal/react-paypal-js'
import Image from "next/image"

import type { PayPalButtonsComponentProps } from '@paypal/react-paypal-js'
import type { CheckoutResult } from './checkout.type'
import type { AppDispatch, RootState } from "@/store/store"
import type { UserInitState } from "@/store/user/user.type"

import fetcher from "@/lib/fetcher/fetcher"
import parseJSONError from "@/lib/parseJSONError/parseJSONError"

import { CURR_CURRENCY } from '@/const'

export default function PaypalCheckout() {
  const [checkoutResult, setCheckoutResult] = useState<CheckoutResult>({ 
    deliveryCost: '0', 
    discount: '0', 
    totalProductsCost: '0',
    totalCost: '0', 
    isLoading: true, 
    products: [], 
    error: undefined 
  })

  const dispatch = useDispatch<AppDispatch>()

  const { cart } = useSelector<RootState, UserInitState>(state => state.user)

  const productsInfo: { id: string, count: number, sectionID?: string }[] = cart.map(product => ({ count: product.count, id: product._id, sectionID: product?.sectionID  }))

  useEffect(() => {
    const makeCheckout = async() => {
      try {
        const response = await fetcher.post<CheckoutResult>('/common/checkout', { productsInfo })
        setCheckoutResult(() => ({...response, isLoading: false}))
      } catch(error) {
        setCheckoutResult(prev => ({...prev, error: parseJSONError(error as string), isLoading: false}))
      }
    }
    
    makeCheckout()
  }, [])

  const createOrder: PayPalButtonsComponentProps['createOrder'] = async (_data, actions) => {
    return actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [{ 
        amount: { currency_code: 'EUR', value: checkoutResult.totalCost },
        reference_id: (Math.random() + 2000).toString(36), 
        description: 'Purchasing the cart.' 
      }]
    })  
  }

  const onApprove = async () => {
    // checkoutResult.products.map(product => dispatch(removeFullProduct(product._id)))
    // await fetcher.post('/common/buy', { productIDs })
  }

  return(
    <main className={scss.checkout_container}>
      <div className={`${scss.checkout_border} ${scss.checkout_data}`}>
        {
          checkoutResult.products.length <= 0 ? 
          <div style={{ padding: '1rem', color: 'silver', textAlign: 'center', fontSize: '1.5rem' }} >NO DATA</div> : 
          checkoutResult.products.map(product => (
            <div className={scss.checkout_product_container} key={product._id}>
              <Image alt={product.title} src={product.images[0]} width={120} height={120}/>
              <div>
                <section className={scss.checkout_data_container}>
                  <p>Title:</p>
                  <p>{product.title}</p>
                </section>
                <section className={scss.checkout_data_container}>
                  <p>Price:</p>
                  <p>{product.price.toFixed(2)} {CURR_CURRENCY}</p>
                </section>
                <section className={scss.checkout_data_container}>
                  <p>Precent:</p>
                  <p>{((product.precent || 0) * 100).toFixed(2)}%</p>
                </section>
                <section className={scss.checkout_data_container}>
                  <p>Price with Precent:</p>
                  <p>{(product.price - ((product.precent || 0) * product.price)).toFixed(2)} {CURR_CURRENCY}</p>
                </section>
                <section className={scss.checkout_data_container}>
                  <p>Count:</p>
                  <p>{product.count} count</p>
                </section>
                <section className={scss.checkout_data_container}>
                  <p>Total price:</p>
                  <p>{((product.price - ((product.precent || 0) * product.price)) * product.count).toFixed(2)} {CURR_CURRENCY}</p>
                </section>
              </div>
            </div>
          ))
        }
      </div>
      <div className={`${scss.checkout_border} ${scss.checkout_data_cost}`}>
        <section className={scss.checkout_data_container}>
          <p>Products price:</p>
          <p>{checkoutResult.totalProductsCost} {CURR_CURRENCY}</p>
        </section>
        <section className={scss.checkout_data_container}>
          <p>Delivery price:</p>
          <p>{checkoutResult.deliveryCost} {CURR_CURRENCY}</p>
        </section>
        <section className={scss.checkout_data_container}>
          <p>Discount:</p>
          <p style={{ color: parseFloat(checkoutResult.discount) > 0 ? '#700' : undefined }}>{parseFloat(checkoutResult.discount) > 0 ? `-${checkoutResult.discount}` : 0} {CURR_CURRENCY}</p>
        </section>
        <section className={scss.checkout_data_container}>
          <p>Total price:</p>
          <p>{checkoutResult.totalCost} {CURR_CURRENCY}</p>
        </section>
        <PayPalButtons displayOnly={['vaultable']} createOrder={createOrder} onApprove={onApprove}/>
      </div>
    </main>
  )
}
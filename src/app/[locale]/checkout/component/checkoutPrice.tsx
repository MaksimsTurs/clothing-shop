'use client'

import scss from '../scss/checkoutPrice.module.scss'

import type { CheckoutProps } from "../page.type";

import { useI18n } from '@/localization/client';

export default function CheckoutPrice({ prices, title }: CheckoutProps) {
  const t = useI18n()

  return(
    <div className={scss.checkout_price_container}>
      <h4>{title}</h4>
      <section className={scss.price_data_container}>
        <p>{t('checkout-page.products-price')}:</p>
        <p>{(prices?.totalItemsPrice || 0).toFixed(2)}€</p>
      </section>
      <section className={`${scss.price_data_container} ${scss.price_data_red}`}>
        <p>{t('discount')}:</p>
        <p>-{(prices?.discount || 0).toFixed(2)}€</p>
      </section>
      <section className={scss.price_data_container}>
        <p>{t('delivery-fee')}:</p>
        <p>{(prices?.delivery || 0).toFixed(2)}€</p>
      </section>
      <section className={scss.price_data_container}>
        <p>{t('total-price')}:</p>
        <p>{(prices.totalOrderPrice || 0).toFixed(2)}€</p>
      </section>
    </div>
  )
}
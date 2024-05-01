'use client'

import scss from '../scss/checkoutPrice.module.scss'

import type { CheckoutProps } from "../page.type";

import { useScopedI18n } from '@/localization/client';

export default function CheckoutPrice({ prices, title }: CheckoutProps) {
  const t = useScopedI18n('checkout-page')

  return(
    <div className={scss.checkout_price_container}>
      <h4>{title}</h4>
      <section className={scss.price_data_container}>
        <p>{t('products-price')}:</p>
        <p>{prices?.totalItemsPrice || 0}€</p>
      </section>
      <section className={`${scss.price_data_container} ${scss.price_data_red}`}>
        <p>{t('discount')}:</p>
        <p>-{prices?.discount || 0}€</p>
      </section>
      <section className={scss.price_data_container}>
        <p>{t('delivery-fee')}:</p>
        <p>{prices?.delivery || 0}€</p>
      </section>
      <section className={scss.price_data_container}>
        <p>{t('total-price')}:</p>
        <p>{prices.totalOrderPrice || 0}€</p>
      </section>
    </div>
  )
}
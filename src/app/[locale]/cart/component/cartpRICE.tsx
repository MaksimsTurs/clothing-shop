import scss from '../scss/cartPrice.module.scss'

import { useCurrentLocale, useI18n } from '@/localization/client'

import Link from 'next/link'

import type { CartTotalCostProps } from '../page.type'

export default function CartPrice({ products }: CartTotalCostProps) {
  const tr = useI18n()
  const currLanguage = useCurrentLocale()

  const withoutPrecent = products?.reduce((prev, curr) => prev + (curr.count * (curr.price - (curr.price * (curr.precent || 0)))), 0) || 0
  const discount = products?.reduce((prev, curr) => prev + curr.count * (curr.price * (curr.precent || 0)), 0) || 0

  return(
    <aside>
      <h4 className={scss.cart_title}>{tr('cart.cart-order')}</h4>
      <div className={scss.cart_container}>
        <section className={scss.cart_cost_container}>
          <p className={scss.cart_cost_num}>{tr('cart.product-sum')}:</p>
          <p className={scss.cart_sub_total_cost}>{withoutPrecent.toFixed(2)}€</p>
        </section>
        {discount ?
          <section className={scss.cart_cost_container}>
            <p className={scss.cart_cost_num}>{tr('discount')}:</p>
            <p style={{ color: '#700' }} className={scss.cart_sub_total_cost}>-{discount.toFixed(2)}€</p>
          </section> : null}
        <div className={`${scss.cart_cost_container} ${scss.cart_total_cost_container}`}>
          <p className={scss.cart_cost_num}>{tr('cart.total-sum')}:</p>
          <p className={scss.cart_total_cost}>{(withoutPrecent - discount).toFixed(2)}€</p>
        </div>
      </div>
      {/* <Link className={scss.check_out_link} href={`/${currLanguage}/checkout`}>CHECKOUT</Link> */}
    </aside>
  )
}
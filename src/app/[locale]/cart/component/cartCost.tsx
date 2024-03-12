import scss from '../scss/cartCost.module.scss'

import { useScopedI18n } from '@/i18n/client'
import { useCurrentLocale } from '@/i18n/client'

import Link from 'next/link'

import type { CartTotalCostProps } from '../cart.type'

import { CURR_CURRENCY } from '@/const'

export default function CartCost({ products, deliveryFee }: CartTotalCostProps) {
  const tr = useScopedI18n('Cart')
  const currLanguage = useCurrentLocale()

  const productsCostPercentCount: number[] = products?.map(product => parseFloat((product.count * (product.price - (product.price * (product.precent || 0)))).toFixed(2))) || [0]
  const totalProductsCost: number = productsCostPercentCount?.reduce((prev, curr) => prev + curr, 0) || 0
  const productsOnlyPrice: number = products?.reduce((prev, curr) => prev + (curr.price * curr.count), 0) || 0

  let discountCost: number = 0, deliveryFeeCost: number = 15, totalCost: number = 0

  if(deliveryFee) deliveryFeeCost = deliveryFee

  discountCost = productsOnlyPrice - totalProductsCost
  totalCost = totalProductsCost + deliveryFeeCost

  return(
    <aside>
      <h4 className={scss.cart_title}>{tr('product.sum')}</h4>
      <div className={scss.cart_container}>
        <section className={scss.cart_cost_container}>
          <p className={scss.cart_cost_num}>{tr('products.cost')}:</p>
          <p className={scss.cart_sub_total_cost}>{productsOnlyPrice.toFixed(2)}{CURR_CURRENCY}</p>
        </section>
        {discountCost ?
          <section className={scss.cart_cost_container}>
            <p className={scss.cart_cost_num}>{tr('product.discount')}:</p>
            <p style={{ color: '#700' }} className={scss.cart_sub_total_cost}>-{discountCost.toFixed(2)}{CURR_CURRENCY}</p>
          </section> : null}
        {deliveryFeeCost ?
          <section className={scss.cart_cost_container}>
            <p className={scss.cart_cost_num}>{tr('product.delivery-fee')}:</p>
            <p className={scss.cart_sub_total_cost}>{deliveryFeeCost.toFixed(2)}{CURR_CURRENCY}</p>
          </section> : null}
        <div className={`${scss.cart_cost_container} ${scss.cart_total_cost_container}`}>
          <p className={scss.cart_cost_num}>{tr('product.total-sum')}:</p>
          <p className={scss.cart_total_cost}>{totalCost.toFixed(2)}{CURR_CURRENCY}</p>
        </div>
      </div>
      <Link className={scss.check_out_link} href={`/${currLanguage}/checkout`}>CHECKOUT</Link>
    </aside>
  )
}
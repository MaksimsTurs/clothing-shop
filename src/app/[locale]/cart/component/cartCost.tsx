import scss from '../scss/cartCost.module.scss'

import type { CartTotalCostProps } from '../cart.type'
import { useScopedI18n } from '@/i18n/client'

export default function CartCost({ products, deliveryFee, discount }: CartTotalCostProps) {
  const tr = useScopedI18n('Cart')

  const productsCostWithPercent = products?.map(product => product.count * (product.price - Number((product.price * (product.precent || 0)).toFixed(2))))
  const totalProductsCost = productsCostWithPercent?.reduce((prev, curr) => prev + curr, 0) || 0

  let discountCost = 0
  let deliveryFeeCost = 0
  let totalCost = 0

  if(discount) discountCost = totalProductsCost - (totalProductsCost * discount)
  if(deliveryFee) deliveryFeeCost = deliveryFee

  totalCost = totalProductsCost + deliveryFeeCost - discountCost

  return(
    <aside>
      <h4 className={scss.cart_title}>{tr('product.sum')}</h4>
      <div className={scss.cart_container}>
        <section className={scss.cart_cost_container}>
          <p className={scss.cart_cost_num}>{tr('products.cost')}:</p>
          <p className={scss.cart_sub_total_cost}>{totalProductsCost.toFixed(2)}$</p>
        </section>
        {discount && 
          <section className={scss.cart_cost_container}>
            <p className={scss.cart_cost_num}>{tr('product.discount')} (-${(discount * 100).toFixed(0)}):</p>
            <p style={{ color: 'red' }} className={scss.cart_sub_total_cost}>{discountCost.toFixed(2)}$</p>
          </section>}
        {deliveryFee &&
          <section className={scss.cart_cost_container}>
            <p className={scss.cart_cost_num}>{tr('product.delivery-fee')}:</p>
            <p className={scss.cart_sub_total_cost}>{deliveryFee.toFixed(2)}$</p>
          </section>}
        <div className={`${scss.cart_cost_container} ${scss.cart_total_cost_container}`}>
          <p className={scss.cart_cost_num}>{tr('product.total-sum')}:</p>
          <p className={scss.cart_total_cost}>{totalCost.toFixed(2)}$</p>
        </div>
      </div>
    </aside>
  )
}
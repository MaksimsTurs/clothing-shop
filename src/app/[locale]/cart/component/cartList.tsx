import scss from '../scss/cartList.module.scss'

import type { CartListProps } from '../page.type'
import type { AppDispatch } from '@/store/store'

import { useDispatch } from 'react-redux'

import ProductCount from '@/component/product-count/productCount'
import ExtendedIMG from '@/component/extended-img/extendedIMG'

import { removeProduct } from '@/store/user/user'
import { useI18n } from '@/localization/client'
import { Trash2 } from 'lucide-react'

export default function CartList({ products }: CartListProps) {
  const dispatch = useDispatch<AppDispatch>()
  const tr = useI18n()

  return( 
    <div className={`${scss.cart_products_container} ${scss.flex_column_normal}`}>
      <h4 className={scss.cart_title}>{tr('cart.title')}</h4>
      <ul className={`${scss.cart_products_list} ${scss.flex_column_normal}`}>
        {products.length > 0 ? 
          products.map(product => (
            <li key={product._id} className={scss.cart_list_item}>
              <div className={scss.cart_list_item_data_container}>
                <ExtendedIMG className={scss.cart_list_item_icon} width={100} height={100} src={product.images[0]} alt={product.title}/>
                <aside className={scss.cart_list_item_data_body}>
                  <button onClick={() => dispatch(removeProduct(product._id))} className={scss.cart_delete_product}><Trash2 /></button> 
                  <section>
                    <h4 className={scss.cart_product_name}>{product.title}</h4>
                    <section className={scss.cart_product_data_property}>
                      <p>{tr('cart.rating')}:</p>
                      <p>{product.rating}/5</p>
                    </section>
                    <section className={scss.cart_product_data_property}>
                      <p>{tr('cart.in-cart')}:</p>
                      <p>{product.count}</p>
                    </section>
                    <section className={scss.cart_product_data_property}>
                      <p>{tr('price')}:</p>
                      <p>{(product.price - (product.price * (product.precent || 0))).toFixed(2)}€</p>
                    </section>
                  </section>
                </aside>
              </div>
              <div className={scss.cart_item_action_buttons_container}>
                <ProductCount product={product}/>
                <button title='Remove full product' onClick={() => dispatch(removeProduct(product._id))} className={scss.cart_delete_product}><Trash2 /></button> 
              </div>
            </li>)) : 
          <li className={scss.cart_empty}>{tr('empty')}</li>}
      </ul>
    </div>
  )
}
import scss from '../scss/checkoutProducts.module.scss'

import type { CheckoutProductsProps } from '../page.type'

import Link from 'next/link'
import { useCurrentLocale, useI18n } from '@/localization/client'
import { useState } from 'react'
import { Frown } from 'lucide-react'

export default function CheckoutProducts({ products, title }: CheckoutProductsProps) {
  const maxProducts: number = 3
  
  const [isAllShowed, setAllShowed] = useState<boolean>(!((products?.length || 100) > maxProducts))
  
  const language = useCurrentLocale()
  const t = useI18n()

  const end: number | undefined = isAllShowed ? products?.length : maxProducts

  const showAllProducts = (): void => setAllShowed(prev => !prev)

  return(
    <ul className={scss.checkout_product_list}>
      <p className={scss.checkout_product_title}>{title}</p>
      {(products?.length || 0) > 0 ? products?.slice(0, end)?.map(product => (
        <li key={product._id}>
          <Link href={`/${language}/product/${product._id}`}>{product.title}</Link>
          <section>
            <p>{t('price')}:</p> 
            <p>{product.price.toFixed(2)}€</p>
          </section>
          <section>
            <p>{t('discount')}:</p>
            {/* <p>{((product.precent || 0) * 100).toFixed(2)}%</p> */}
          </section>
          <section>
            <p>{t('checkout-page.price-with-discount')}:</p>
            {/* <p>{(product.price - ((product.price || 0) * (product.precent || 0))).toFixed(2)}€</p> */}
          </section>
          <section>
            <p>{t('count')}:</p>
            <p>{product.count}</p>
          </section>
        </li>
      )) : <section className={scss.checkout_products_empty}><Frown /><p>{t('empty')}</p></section>}
      {(products?.length || 0) > maxProducts ? <button onClick={showAllProducts}>{isAllShowed ? 'HIDDE' : 'SHOW'}</button> : null}
    </ul>
  )
}
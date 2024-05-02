'use client'

import scss from '../scss/cartList.module.scss'

import type { ProductInLocalStorage, UserInitState } from '@/store/user/user.type';
import type { RootState } from '@/store/store';

import { useScopedI18n } from '@/localization/client';
import { Fragment, useState } from 'react';

import ModalWrapper from './modalWrapper';
import DataSection from '../../admin/component/dataSection';

import { useSelector } from 'react-redux';

export default function CartList() {
  const [selectedProduct, setSelectProduct] = useState<ProductInLocalStorage | undefined>(undefined)

  const t = useScopedI18n('user-page')

  const { cart } = useSelector<RootState, UserInitState>(state => state.user)

  const closeModalWindow = (): void => setSelectProduct(undefined)

  return(
    <Fragment>
      {selectedProduct ? 
        <ModalWrapper>
          <div className={scss.cart_data_container}>
            <div className={scss.cart_data_header}>
              <h4>{selectedProduct.title}</h4>
              <button onClick={closeModalWindow}>&#10005;</button>
            </div>
            <DataSection _key={`${t('price')}`} value={`${selectedProduct.price}€`}/>
            <DataSection _key={`${t('price-with-discount')}`} value={`${(selectedProduct.price - ((selectedProduct.precent || 0) * selectedProduct.price)).toFixed(2)}€`}/>
            <DataSection _key={`${t('discount')}`} value={`${(selectedProduct.precent || 0) * 100}%`}/>
            <DataSection _key={`${t('total-price')}`} value={`${(selectedProduct.count * (selectedProduct.price - ((selectedProduct.precent || 0) * selectedProduct.price))).toFixed(2)}€`}/>
            <DataSection _key={`${t('in-cart')}`} value={selectedProduct.count}/>
          </div>
        </ModalWrapper> 
        : null}
      <ul className={scss.cart_list_container}>
        {cart.length > 0 ? cart.map(product => (
          <li key={product._id}>
            <p>{product.title},</p>
            <button onClick={() => setSelectProduct(product)}>{t('show-details')}...</button>
          </li>
        )) : <p className={scss.cart_data_empty}>{t('empty-cart')}</p>}
      </ul>
    </Fragment>
  )
}
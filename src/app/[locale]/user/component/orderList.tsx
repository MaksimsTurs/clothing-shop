'use client'

import scss from '../scss/orderList.module.scss'

import type { OrderListProps } from "../page.type";
import type { Order } from '@/store/admin/admin.type';

import { Fragment, useState } from 'react';

import ModalWrapper from './modalWrapper';
import DataSection from '../../admin/component/dataSection';

import calculatePrice from '@/util/calculatePrice';
import { useScopedI18n } from '@/localization/client';

export default function OrderList({ orders }: OrderListProps) {
  const [selectedOrder, setSelectOrder] = useState<Order | undefined>(undefined)

  const t = useScopedI18n('user-page')

  const status = { 
    'SENT': t('sent-to'), 
    'ON-MY-WAY': t('on-my-way'), 
    'APPEARED': t('appeared')
  }
  
  const statusModl = { 
    'SENT': t('sent-to'), 
    'ON-MY-WAY': t('on-my-way'), 
    'APPEARED': t('appeared')
  }

  const closeModalWindow = (): void => setSelectOrder(undefined)

  return(
    <Fragment>
      {selectedOrder ? 
        <ModalWrapper>
          <div className={scss.order_data_container}>
            <div className={scss.order_data_header}>
              <h4>{t('modal-wrapper')}</h4>
              <button onClick={closeModalWindow}>&#10005;</button>
            </div>
            <DataSection _key={`${t('adress')}:`} value={selectedOrder.adress}/>
            <DataSection _key={`${t('status')}:`} value={statusModl[selectedOrder.status]}/>
            <DataSection _key={`${t('total-products')}:`} value={selectedOrder.toBuy.reduce((prev, curr) => prev + curr.count, 0)}/>
            <DataSection _key={`${t('total-price')}:`} value={`${calculatePrice(selectedOrder.toBuy, { countKey: 'count', precentKey: 'precent', priceKey: 'price' })}`}/>
          </div>
        </ModalWrapper> 
        : null}
      <ul className={scss.order_list_container}>
        {orders.length > 0 ? orders.map(order => (
          <li key={order._id}>
            <p>{status[order.status]} {order.adress},</p>
            <button onClick={() => setSelectOrder(order)}>show details...</button>
          </li>
        )) : <p>{t('no-orders')}</p>}
      </ul>
    </Fragment>
  )
}
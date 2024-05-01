import DataContainer from "../dataContainer"
import DataSection from "../dataSection"
import DataBody from "../dataBody"
import DataItems from "../dataItems"
import RemoveButton from "../removeButton"
import DataLink from "../datLink"
import OrderForm from "./orderForm"

import type { RootState } from "@/store/store"
import type { AdminInitState, Order } from "@/store/admin/admin.type"

import { useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"

import findFrom from "@/store/admin/tool/findFrom"

export default function Order() {
  const id = useSearchParams().get('id')

  const { orders } = useSelector<RootState, AdminInitState>(state => state.admin)

  const order = findFrom({ _id: id! }, orders) as Order | undefined

  const status = { 'SENT': 'Новый' , 'ON-MY-WAY': 'Отправлено', 'APPEARED': 'Получено' }

  const totalPrice: string | 0 = order?.toBuy.reduce((prev, curr) => prev + (curr.count * (curr.price - (curr.price * (curr.precent || 0)))), 0).toFixed(2) ?? 0

  return(
    <DataContainer>
      <DataBody data={order}>
        <DataSection _key="ID:" value={order?._id}/>
        <DataSection _key="Адресс:" value={order?.adress}/>
        <DataSection _key="Статус:" value={status[order?.status || 'SENT']}/>
        <DataSection _key="Общая цена заказа:" value={`${totalPrice}€`}/>
        <DataLink href={`?location=user&id=${order?.userID}`} _key="Покупатель:" value={order?.userID}/>
        <DataItems _key="Продукты" data={order?.toBuy}/>
        <RemoveButton from="order" id={id}/>
      </DataBody>
      <OrderForm id={id}/>
    </DataContainer>
  )
}
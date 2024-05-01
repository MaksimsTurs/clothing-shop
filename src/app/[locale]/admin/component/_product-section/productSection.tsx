
import DataContainer from "../dataContainer";
import DataBody from "../dataBody";
import DataSection from "../dataSection";
import DataItems from "../dataItems";
import RemoveButton from "../removeButton";
import ProductSectionForm from "./productSectionForm";

import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

import type { AdminInitState, ProductSection } from "@/store/admin/admin.type";
import type { RootState } from "@/store/store";

import formatDate from "@/util/formatDate";

export default function ProductsSection() {
  const id = useSearchParams().get('id')

  const { productsSection } = useSelector<RootState, AdminInitState>(state => state.admin)

  const section: ProductSection | undefined = productsSection.find(section => section._id === id)

  const productsCount: number = section?.products?.reduce((prev, curr) => prev + curr.stock, 0) || 0
  const sectionTotalCost: number = section?.products?.reduce((prev, curr) => prev + (curr.stock * (curr.price - (curr.price * (curr?.precent || 0)))), 0) || 0

  const defaultValues= {
    title: section?.title,
    expiredDate: section?.expiredDate,
    isHidden: section?.isHidden,
    position: section?.position,
    precent: section?.precent,
    productsID: section?.productsID
  }

  return(
    <DataContainer>
      <DataBody data={section}>
        <DataSection _key="ID:" value={section?._id}/>
        <DataSection _key="Название:" value={section?.title}/>
        <DataSection _key="Скрыт:" value={section?.isHidden ? 'Да' : 'Нет'}/>
        <DataSection _key="Закончиться в:" value={formatDate(section?.expiredDate, true)}/>
        <DataSection _key="Скидка:" value={`${((section?.precent || 0) * 100).toFixed(2)}%`}/>
        <DataSection _key="Позиция:" value={section?.position}/>
        <DataSection _key="Количество продуктов:" value={productsCount}/>
        <DataSection _key="Общая цена категории:" value={`${sectionTotalCost.toFixed(2)}€`}/>
        {(section?.products?.length || 0) > 0 ? <DataItems _key="Продукты:" data={section?.products}/> : null}
        <RemoveButton from="section" id={id}/>
      </DataBody>
      <ProductSectionForm id={id} defaultValues={defaultValues} isEdit currIDs={section?.productsID}/>
    </DataContainer>
  )
}

import DataContainer from "../dataContainer";
import DataBody from "../dataBody";
import DataSection from "../dataSection";
import DataLink from "../datLink";
import DataItems from "../dataItems";
import RemoveButton from "../removeButton";
import ProductSectionForm from "./productCategoryForm";

import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

import type { AdminInitState, ProductAction, ProductCategory, ProductData } from "@/store/admin/admin.type";
import type { RootState } from "@/store/store";

import Data from "@/store/admin/tool/tool";

export default function ProductCategory() {
  const id = useSearchParams().get('id')

  const { productAction, products, productCategory } = useSelector<RootState, AdminInitState>(state => state.admin)

  const category = Data.find({ _id: id }, productCategory) as ProductCategory | undefined
  const categoryProducts = Data.findMany<ProductData>({ $in: { _id: category?.productsID || [] } }, products)
  const categoryAction = Data.find<ProductAction>({ categoryID: id! }, productAction) as ProductAction | undefined

  let totalPrice: number = categoryProducts.reduce((prev, curr) => prev + curr.stock * (curr.price - (curr.price * (categoryAction?.precent || 0))), 0)
  let totalProcutsCount: number = category?.productsID.length || 0

  return(
    <DataContainer>
      <DataBody data={category}>
        <DataSection _key="ID:" value={category?._id}/>
        <DataSection _key="Название:" value={category?.title}/>
        <DataSection _key="Скрыт:" value={category?.isHidden ? 'Да' : 'Нет'}/>
        <DataSection _key="Позиция:" value={category?.position}/>
        <DataSection _key="Количество продуктов:" value={totalProcutsCount}/>
        <DataSection _key="Общая цена категории:" value={`${totalPrice.toFixed(2)}€`}/>
        {categoryAction ? <DataLink _key="Текущая акция" href={`/ru/admin?location=action&id=${categoryAction?._id}`} value={categoryAction.title}/> : null}
        {(categoryProducts?.length || 0) > 0 ? <DataItems _key="Продукты:" data={categoryProducts} precent={categoryAction?.precent}/> : null}
        <RemoveButton from="category" id={id}/>
      </DataBody>
      <ProductSectionForm id={id} isEdit/>
    </DataContainer>
  )
}
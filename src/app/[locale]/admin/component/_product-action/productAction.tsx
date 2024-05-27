
import DataContainer from "../dataContainer";
import DataBody from "../dataBody";
import DataSection from "../dataSection";
import DataItems from "../dataItems";
import DataList from "../dataList";
import RemoveButton from "../removeButton";
import ProductSectionForm from "./productActionForm";

import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import type { AdminInitState, ProductAction, ProductCategory, ProductData } from "@/store/admin/admin.type";
import type { RootState } from "@/store/store";

import formatDate from "@/util/formatDate";
import findManyFrom from "@/store/admin/tool/findMany";

export default function ProductAction() {
  const id = useSearchParams().get('id')

  const { productAction, products, productCategory } = useSelector<RootState, AdminInitState>(state => state.admin)

  const action: ProductAction | undefined = useMemo(() => productAction.find(action => action._id === id), [productAction])
  const actionProducts = useMemo(() => findManyFrom<ProductData>({ $in: { _id: action?.productsID || [] }, }, products), [products])
  const actionCategories = useMemo(() => findManyFrom<ProductCategory>({ actionID: action?._id || '' }, productCategory), [productCategory])

  let totalPrice: number = 0
  let totalProcutsCount: number = actionProducts.length
  
  totalPrice += actionProducts.reduce((prev, curr) => prev + curr.stock * (curr.price - (curr.price * (action?.precent || 0))), 0)
  totalPrice += actionCategories.reduce((prev, curr) => {
    const categoriesProducts = findManyFrom<ProductData>({ $in: { _id: curr.productsID } }, products)
    
    let price: number = 0
    
    for(let index = 0; index < categoriesProducts.length; index++) {
      if(!categoriesProducts[index].actionID) {
        totalProcutsCount++
        price += categoriesProducts[index].stock * (categoriesProducts[index].price - (categoriesProducts[index].price * (action?.precent || 0))) + price
      }
    }
    
    return prev + price
  }, 0)

  return(
    <DataContainer>
      <DataBody data={action}>
        <DataSection _key="ID:" value={action?._id}/>
        <DataSection _key="Название:" value={action?.title}/>
        <DataSection _key="Скрыт:" value={action?.isHidden ? 'Да' : 'Нет'}/>
        <DataSection _key="Закончиться в:" value={formatDate(action?.expiredAt, true)}/>
        <DataSection _key="Скидка:" value={`${((action?.precent || 0) * 100).toFixed(2)}%`}/>
        <DataSection _key="Позиция:" value={action?.position}/>
        <DataSection _key="Количество продуктов:" value={totalProcutsCount}/>
        <DataSection _key="Общая цена акции:" value={`${totalPrice.toFixed(2)}€`}/>
        {actionCategories.length > 0 ? <DataList _key="Категории" data={actionCategories}/> : null}
        {(actionProducts?.length || 0) > 0 ? <DataItems _key="Продукты:" data={actionProducts} precent={action?.precent}/> : null}
        <RemoveButton from="action" id={id}/>
      </DataBody>
      <ProductSectionForm id={id} isEdit/>
    </DataContainer>
  )
}
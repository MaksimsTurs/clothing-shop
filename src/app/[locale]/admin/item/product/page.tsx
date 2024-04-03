'use client'

import type { AdminInitState, ProductData, ProductSection } from "@/store/admin/admin.type"
import type { RootState } from "@/store/store"
import type { PageProps } from "../../admin.type"

import { useSelector } from "react-redux"

import DataPage from "../../component/data-component/dataPage"
import ProductForm from "../../component/productForm"
import ErrorLoadingWrapper from "../../component/errorLoadingWrapper"

import editProduct from "@/store/admin/action/editProduct"

import handleError from "../../helpers/handleError"

export default function Page({ searchParams }: PageProps) {
  const { products, productsSection } = useSelector<RootState, AdminInitState>(state => state.admin)

  const findedItem: ProductData | undefined = products.find(data => data._id === searchParams.id)
  const itemSection: ProductSection | undefined = productsSection.find(data => data._id === findedItem?.sectionID ? ({ _id: data._id, title: data.title }) : undefined)

  const error = handleError(Boolean(!findedItem), 'NOT_FOUND', `Product with id: ${searchParams.id} not founded!`)

  return(
    <ErrorLoadingWrapper isLoading={false} error={error}>
      <DataPage 
        title="Product Information"
        data={findedItem} 
        id={searchParams.id} 
        children={<ProductForm dispatchFunc={editProduct} formWrapperTitle="Product Edit Form" findedProduct={findedItem} section={itemSection}/>} 
        ignore={{ forData: ['images', '__v', 'sectionID', 'products'] }}/>
    </ErrorLoadingWrapper>
  )
}
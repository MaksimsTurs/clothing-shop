'use client'

import type { AdminInitState, ProductSection } from "@/store/admin/admin.type"
import type { RootState } from "@/store/store"
import type { PageProps } from "../../admin.type"

import { useSelector } from "react-redux"

import DataPage from "../../component/data-component/dataPage"
import ProductsSectionForm from "../../component/productsSectionForm"
import ErrorLoadingWrapper from "../../component/errorLoadingWrapper"

import editProductsSection from "@/store/admin/action/editProductsSection"

import handleError from "../../helpers/handleError"

export default function Page({ searchParams }: PageProps) {
  const { productsSection } = useSelector<RootState, AdminInitState>(state => state.admin)

  const findedSection: ProductSection | undefined = productsSection.find(section => section._id === searchParams.id)

  const error = handleError(Boolean(!findedSection), 'NOT_FOUND', `Section with id: ${searchParams.id} not founded!`)

  return(
    <ErrorLoadingWrapper isLoading={false} error={error}>
      <DataPage 
        children={<ProductsSectionForm currentProductsID={findedSection?.productsID} id={searchParams.id} dispatchFunc={editProductsSection} title="Section Edit Form"/>}
        id={searchParams.id} 
        data={findedSection} 
        ignore={{ forData: ['__v', 'items', 'productID'] }} 
        title="Section Information"/>
    </ErrorLoadingWrapper>
  )
}
'use client'

import type { AdminInitState } from "@/store/admin/admin.type"
import type { RootState } from "@/store/store"
import type { PageProps } from "../admin.type"

import { useSelector } from "react-redux"

import DataPage from "../component/dataPage"
import { Fragment } from "react"
import FetchLoader from "@/component/loader/fetch-loader/fetchLoader"
import ProductsSectionForm from "../component/productsSectionForm"
import editProductsSection from "@/store/admin/action/editProductsSection"

export default function Page({ searchParams }: PageProps) {
  const { productsSection, products, isAdminActionLoading } = useSelector<RootState, AdminInitState>(state => state.admin)

  const findedSection = productsSection.find(section => section._id === searchParams.id)

  return(
    <Fragment>
      {isAdminActionLoading && <FetchLoader/>}
      <DataPage id={searchParams.id} data={findedSection} ignore={{ forData: ['__v', 'items', 'productID'] }} title="Section Information">
        <ProductsSectionForm currentProductsID={findedSection?.productID} id={searchParams.id} dispatchFunc={editProductsSection} title="Section Edit Form"/>
      </DataPage>
    </Fragment>
  )
}
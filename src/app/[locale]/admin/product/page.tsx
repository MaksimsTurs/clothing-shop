'use client'

import type { AdminInitState, ProductSectionExtended } from "@/store/admin/admin.type"
import type { RootState } from "@/store/store"
import type { PageProps } from "../admin.type"

import { useSelector } from "react-redux"

import DataPage from "../component/dataPage"
import ProductForm from "../component/productForm"

import editProduct from "@/store/admin/action/editProduct"
import { Fragment } from "react"
import FetchLoader from "@/component/loader/fetch-loader/fetchLoader"

export default function Page({ searchParams }: PageProps) {
  const { products, isAdminActionLoading, productsSection } = useSelector<RootState, AdminInitState>(state => state.admin)

  const findedItem = products.find(_data => _data._id === searchParams.id)
  const currSection = productsSection.find(section => section._id === findedItem?.sectionID)

  return(
    <Fragment>
      {isAdminActionLoading && <FetchLoader/>}
      <DataPage id={searchParams.id} data={findedItem} ignore={{ forData: ['images', '__v', 'sectionID', 'products'] }} title="Product Information">
        <ProductForm dispatchFunc={editProduct} formWrapperTitle="Product Edit Form" productID={findedItem?._id} section={currSection}/>
      </DataPage>
    </Fragment>
  )
}
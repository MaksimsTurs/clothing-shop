'use client'

import type { AdminInitState } from "@/store/admin/admin.type"
import type { RootState } from "@/store/store"
import type { PageProps } from "../admin.type"

import { useSelector } from "react-redux"
import { Fragment } from "react"

import DataPage from "../component/dataPage"
import ProductForm from "../component/productForm"
import FetchLoader from "@/component/loader/fetch-loader/fetchLoader"

import editProduct from "@/store/admin/action/editProduct"

export default function Page({ searchParams }: PageProps) {
  const { products, isAdminActionLoading, productsSection } = useSelector<RootState, AdminInitState>(state => state.admin)

  const findedItem = products.find(data => data._id === searchParams.id)
  const itemSection = productsSection.find(data => data._id === findedItem?.sectionID)

  return(
    <Fragment>
      {isAdminActionLoading && <FetchLoader/>}
      <DataPage 
        children={<ProductForm dispatchFunc={editProduct} formWrapperTitle="Product Edit Form" findedProduct={findedItem} productSection={itemSection}/>} 
        id={searchParams.id} 
        data={findedItem} 
        ignore={{ forData: ['images', '__v', 'sectionID', 'products'] }} 
        title="Product Information"/>
    </Fragment>
  )
}
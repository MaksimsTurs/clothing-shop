import type { AdminInitState, ProductAction, ProductCategory, ProductData } from "@/store/admin/admin.type";
import type { RootState } from '@/store/store';
  
import RemoveButton from '../removeButton';
import ProductForm from './productForm';

import DataContainer from "../dataContainer";
import DataBody from '../dataBody';
import DataSection from '../dataSection';
import DataLink from '../datLink';
import DataImage from '../dataImage';

import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { useMemo } from "react";

import DataTool from "@/store/admin/tool/dataTool";

export default function Product() {
  const id = useSearchParams().get('id')

  const { products, productAction, productCategory, isAdminActionLoading } = useSelector<RootState, AdminInitState>(state => state.admin)

  const product = useMemo(() => DataTool.find({ _id: id! }, products), [products]) as ProductData | undefined
  const category = useMemo(() => DataTool.find({ _id: product?.categoryID }, productCategory), [productCategory]) as ProductCategory | undefined
  const action = useMemo(() => DataTool.find({ _id: product?.actionID }, productAction), [productAction]) as ProductAction | undefined
  const price = `${product?.price}€ | ${((product?.price || 0) - ((product?.price || 0) * (action?.precent || 0))).toFixed(2)}€ -${((action?.precent || 0) * 100)?.toFixed(2)}%`

  return(
    <DataContainer>
      <DataBody data={product} isLoading={isAdminActionLoading}> 
        <DataImage images={product?.images}/>
        <DataSection _key='ID:' value={product?._id}/>
        {product?.categoryID ? <DataSection _key='ID категории:' value={product?.categoryID}/> : null}
        {product?.actionID ? <DataSection _key='ID акции:' value={product?.actionID}/> : null}
        <DataSection _key='Название:' value={product?.title}/>
        <DataSection _key='В Наличии:' value={product?.stock}/>
        <DataSection _key='Рейтинг:' value={product?.rating}/>
        <DataSection _key='Цена:' value={price}/>
        {action ? <DataSection _key='Скидка:' value={`${(action.precent || 0) * 100}%`}/> : null}
        {category ? <DataLink href={`/ru/admin?location=category&id=${category._id}`} _key='Категория:' value={category.title}/> : null}
        {product?.description ? <DataSection _key='Описание:' value={product?.description}/> : null}
        <RemoveButton from='product' id={product?._id}/>
      </DataBody>      
      <ProductForm id={product?._id} isEdit/>
    </DataContainer>
  )
}
import type { AdminInitState, ProductData } from "@/store/admin/admin.type";
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

import findFrom from "@/store/admin/tool/findFrom";

export default function Product() {
  const id = useSearchParams().get('id')

  const { products } = useSelector<RootState, AdminInitState>(state => state.admin)

  const product = findFrom({ _id: id! }, products) as ProductData | undefined

  const defaultValues = {
    precent: product?.precent,
    price: product?.price,
    rating: product?.rating,
    stock: product?.stock,
    title: product?.title,
    description: product?.description
  }

  return(
    <DataContainer>
      <DataBody data={product}>
        <DataImage images={product?.images}/>
        <DataSection _key='ID:' value={product?._id}/>
        <DataSection _key='Название:' value={product?.title}/>
        {product?.price ? <DataSection _key='Цена:' value={`${product?.price}€ | ${((product?.price || 0) - ((product?.price || 0) * (product?.precent || 0))).toFixed(2)}€ -${((product?.precent || 0) * 100)?.toFixed(2)}%`}/> : null}
        <DataSection _key='Скидка:' value={`${(product?.precent || 0) * 100}%`}/>
        <DataSection _key='В Наличии:' value={product?.stock}/>
        {product?.rating ? <DataSection _key='Рейтинг:' value={product?.rating}/> : null}
        {product?.category ? <DataLink href={`/ru/admin?location=category&id=${product?.sectionID}`} _key='Категория:' value={product?.category}/> : null}
        {product?.description ? <DataSection _key='Описание:' value={product?.description}/> : null}
        <RemoveButton from='product' id={product?._id}/>
      </DataBody>      
      <ProductForm defaultValues={defaultValues} id={product?._id} isEdit/>
    </DataContainer>
  )
}
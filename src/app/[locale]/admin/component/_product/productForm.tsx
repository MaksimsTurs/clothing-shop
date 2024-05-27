'use client'

import scss from '../../scss/formWrapper.module.scss'

import FormWrapper from "@/component/form-wrapper/formWrapper";
import TextInput from "@/component/input/text-input/textInput";
import SelectInput from "@/component/input/select-input/selectInput";
import TextAreaInput from "@/component/input/text-area-input/textAreatInput";
import ImgInput from '@/component/input/file-input/fileInput';
import SmallLoader from '@/component/loader/fetch-loader/smallLoader';
import MultipleInput from "@/component/form-wrapper/component/multipleInput";

import { type SubmitHandler, useForm } from "react-hook-form";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import type { AdminInitState, ProductAction, ProductData } from "@/store/admin/admin.type"
import type { AppDispatch, RootState } from '@/store/store';
import type { FormProps } from '../../page.type';

import createFormData from '@/util/createFormData';

import updateProduct from '@/store/admin/action/updateProduct';
import insertProduct from '@/store/admin/action/insertProduct';

import findFrom from '@/store/admin/tool/find';

export default function ProductForm({ isEdit, id }: FormProps) {
  const [action, setAction] = useState<string>('')
  const [category, setCategory] = useState<string>('')

  const dispatch = useDispatch<AppDispatch>()

  const { isAdminActionLoading, productAction, productCategory, products } = useSelector<RootState, AdminInitState>(state => state.admin)
  const { handleSubmit, register, reset } = useForm<ProductData>()

  let actionOption: string[] = []
  let categoryOption: string[] = []

  const product = findFrom<ProductData>({ _id: id || '' }, products) as ProductData | undefined

  if(!product?.actionID) {
    actionOption = productAction.map(action => action.title) 
  }
  
  if(!product?.categoryID) {
    categoryOption = productCategory.map(category => {
      const action = findFrom<ProductAction>({ categoryID: category._id }, productAction) as ProductAction | undefined
      return `${category.title} ${action ? `(Действующая акция "${action.title}")` : ''}`
    })
  }

  const createOrUpdate: SubmitHandler<ProductData> = async(data) => {
    const formData = createFormData(data)

    formData.append('action', action.trim())
    formData.append('category', category.replace(/\((.+)\)/, '').trim())

    if(isEdit) {
      formData.append('_id', id!)
      await dispatch(updateProduct(formData))
    } else {
      await dispatch(insertProduct(formData))
    }

    setAction('')
    setCategory('')
    reset()
  }

  return(
    <Fragment>
      {isAdminActionLoading ? <SmallLoader/> : null}
      <FormWrapper 
        onSubmit={handleSubmit(createOrUpdate)} 
        className={!isEdit ? scss.form_container_wrapper : undefined}
        styles={{ formInputsStyle: isEdit ? { minWidth: '37.16rem' } : undefined }}
        isLoading={isAdminActionLoading}>
          <TextInput<ProductData> attributes={{ name: 'title', placeholder: 'Название продукта' }} register={register}/>
          <SelectInput<ProductData> title='Акции' options={actionOption} selected={action} setSelect={setAction}/>
          <SelectInput<ProductData> title='Категории' options={categoryOption} selected={category} setSelect={setCategory}/>
          <MultipleInput>
            <TextInput<ProductData> attributes={{ name: 'stock', step: 1, type: 'number', min: 0, placeholder: 'В Наличии' }} register={register}/>
            <TextInput<ProductData> attributes={{ name: 'price', step: 0.01, min: 0, type: 'number', placeholder: 'Цена' }} register={register}/>
            <TextInput<ProductData> attributes={{ name: 'rating', step: 0.1, min: 0, max: 5, type: 'number', placeholder: 'Рейтинг' }} register={register}/>
          </MultipleInput>
          <TextAreaInput<ProductData> attributes={{ name: 'description', placeholder: "Описание продукта" }} register={register}/>
          <ImgInput<ProductData> attributes={{ name: 'images', multiple: true, type: 'file' }} labelText='Добавить картинки' register={register} isSubmited={isAdminActionLoading}/>
      </FormWrapper>
    </Fragment>
  )
}
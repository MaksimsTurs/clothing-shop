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
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import type { AdminInitState, ProductData } from "@/store/admin/admin.type"
import type { AppDispatch, RootState } from '@/store/store';
import type { FormProps } from '../../page.type';

import createFormData from '@/util/createFormData';

import editProduct from '@/store/admin/action/editProduct';
import addProduct from '@/store/admin/action/addProduct';
import { resetLoadingState } from '@/store/user/user';

export default function ProductForm({ isEdit, id, defaultValues }: FormProps<ProductData>) {
  const [selected, setSelect] = useState<string>('undefined')

  const dispatch = useDispatch<AppDispatch>()

  const { isAdminActionLoading, productsSection, products } = useSelector<RootState, AdminInitState>(state => state.admin)

  const { handleSubmit, register, formState: { isSubmitted } } = useForm<ProductData>()

  const sectionTitle = productsSection.map(section => section.title)
  const productCategory = products.find(product => product._id === id)

  const options = productCategory?.category ? [] : sectionTitle

  const productAction: SubmitHandler<ProductData> = (data) => {
    const formData = createFormData(data)

    formData.append('category', selected)

    if(isEdit) {
      formData.append('_id', id!)
      dispatch(editProduct(formData))
    } else dispatch(addProduct(formData))
  }

  useEffect(() => {
    dispatch(resetLoadingState())
  }, [])

  return(
    <Fragment>
      {isAdminActionLoading ? <SmallLoader/> : null}
      <FormWrapper styles={{ formInputsStyle: { width: '30rem' } }} className={scss.form_wrapper} onSubmit={handleSubmit(productAction)} isLoading={isAdminActionLoading}>
        <TextInput<ProductData> attributes={{ name: 'title', placeholder: 'Название продукта', defaultValue: defaultValues?.title }} register={register}/>
        <SelectInput<ProductData> options={options} selected={selected} setSelect={setSelect}/>
        <MultipleInput>
          <TextInput<ProductData> attributes={{ name: 'stock', step: 1, type: 'number', placeholder: 'В Наличии', defaultValue: defaultValues?.stock }} register={register}/>
          <TextInput<ProductData> attributes={{ name: 'price', step: 0.01, type: 'number', placeholder: 'Цена', defaultValue: defaultValues?.price }} register={register}/>
          <TextInput<ProductData> attributes={{ name: 'rating', step: 0.1, type: 'number', placeholder: 'Рейтинг', defaultValue: defaultValues?.rating }} register={register}/>
        </MultipleInput>
        <TextAreaInput<ProductData> attributes={{ name: 'description', placeholder: "Описание продукта", defaultValue: defaultValues?.description }} register={register}/>
        <ImgInput<ProductData> attributes={{ name: 'images', isMultiple: true }} labelText='Добавить картинки' register={register} isSubmited={isSubmitted}/>
      </FormWrapper>
    </Fragment>
  )
}
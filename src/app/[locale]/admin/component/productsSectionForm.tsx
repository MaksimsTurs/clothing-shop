import FormWrapper from '@/component/form-wrapper/formWrapper'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import type { AddProductsSectionData, ProductsSectionFormProps } from '../admin.type'
import type { RootState, AppDispatch } from '@/store/store'
import type { AdminInitState } from '@/store/admin/admin.type'

import TextInput from '@/component/input/text-input/textInput'
import MultipleInput from '@/component/form-wrapper/component/multipleInput'
import SelectProduct from './selectProduct'
import FetchLoader from '@/component/loader/fetch-loader/fetchLoader'

import addProductsSection from '@/store/admin/action/addProductsSection'

export default function ProductsSectionForm({ title, dispatchFunc, id, currentProductsID }: ProductsSectionFormProps) {
  const [productsID, setProductsID] = useState<string[]>([])

  const { products, isAdminActionLoading } = useSelector<RootState, AdminInitState>(state => state.admin)

  const dispatch = useDispatch<AppDispatch>()

  const { register, handleSubmit, watch } = useForm<AddProductsSectionData>()

  const onSubmit: SubmitHandler<AddProductsSectionData> = (sectionData) => {
    if(dispatchFunc) {
      dispatch(dispatchFunc({...sectionData, items: productsID, id, currentProductsID}))
    } else {
      dispatch(addProductsSection({...sectionData, items: productsID}))
    }
  }

  return(
    <Fragment>
      {isAdminActionLoading  && <FetchLoader/>}
      <FormWrapper title={title} isLoading={isAdminActionLoading} onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            htmlFor='title'
            placeholder='Section name'
            register={register}/>
          <MultipleInput>
            <TextInput<AddProductsSectionData>
              htmlFor='precent'
              placeholder='Precent'
              register={register}
              step={0.01}
              type='number'/>
            <TextInput<AddProductsSectionData>
              htmlFor='expiredDate'
              register={register}
              type='date'/>
          </MultipleInput>
          <SelectProduct 
            precent={Number(watch('precent'))} 
            products={products}
            productsID={productsID}
            setProductsID={setProductsID}/>
        </FormWrapper>
    </Fragment>
  )
}
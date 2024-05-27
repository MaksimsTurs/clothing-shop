import scss from '../../scss/formWrapper.module.scss'

import type { FormProps } from '../../page.type';
import type { AppDispatch, RootState } from '@/store/store';
import type { AdminInitState, ProductCategory } from '@/store/admin/admin.type';

import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import updateCategory from '@/store/admin/action/updateCategory';
import insertCategory from '@/store/admin/action/insertCategory';

import FormWrapper from '@/component/form-wrapper/formWrapper';
import TextInput from '@/component/input/text-input/textInput';
import SmallLoader from '@/component/loader/fetch-loader/smallLoader';
import CheckBoxInput from '@/component/input/checkbox-input/checkboxInput';
import ProductSelect from '../productSelect';
import SelectInput from '@/component/input/select-input/selectInput';

export default function ProductCategoryForm({ id, isEdit }: FormProps) {
  const [productsID, setProductIDs] = useState<string[]>([])
  const [action, setAction] = useState<string>('')

  const dispatch = useDispatch<AppDispatch>()

  const { isAdminActionLoading, products, productAction } = useSelector<RootState, AdminInitState>(state => state.admin)

  const { handleSubmit, register, reset } = useForm<ProductCategory>() 

  const productsOption = products.filter(product => !product.categoryID)
  const actionOption = productAction.filter(action => !action.categoryID).map(action => action.title)

  const sectionAction: SubmitHandler<ProductCategory> = (data) => {
    if(isEdit) dispatch(updateCategory({...data, _id: id!, productsID, actionName: action }))
    else dispatch(insertCategory({...data, productsID, actionName: action }))

    setProductIDs([])
    setAction('')
    reset()
  }

  return(
    <Fragment>
      {isAdminActionLoading ? <SmallLoader/> : null}
      <FormWrapper onSubmit={handleSubmit(sectionAction)} className={scss.form_wrapper}>
        <ProductSelect options={productsOption} productsID={productsID} setProductIDs={setProductIDs}/>
        <SelectInput title='Акции' options={actionOption} selected={action} setSelect={setAction}/>
        <TextInput<ProductCategory> attributes={{ name: 'title', placeholder: 'Название' }} register={register}/>
        <CheckBoxInput<ProductCategory> attributes={{ name: 'isHidden' }} label='Скрыть категорию с главной страницы' register={register}/>
        <TextInput<ProductCategory> attributes={{ name: 'position', step: 1, type: 'number', placeholder: 'Позиция' }} register={register}/>
      </FormWrapper>
    </Fragment>
  )
}
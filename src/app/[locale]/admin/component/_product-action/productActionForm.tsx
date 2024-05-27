import scss from '../../scss/formWrapper.module.scss'

import type { FormProps } from '../../page.type';
import type { AppDispatch, RootState } from '@/store/store';
import type { AdminInitState, InsertOrUpdateAction, ProductAction, ProductData } from '@/store/admin/admin.type';

import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import updateProductAction from '@/store/admin/action/updateProductAction';
import inserProductAction from '@/store/admin/action/insertProductAction';

import FormWrapper from '@/component/form-wrapper/formWrapper';
import TextInput from '@/component/input/text-input/textInput';
import SmallLoader from '@/component/loader/fetch-loader/smallLoader';
import MultipleInput from '@/component/form-wrapper/component/multipleInput';
import CheckBoxInput from '@/component/input/checkbox-input/checkboxInput';
import ProductSelect from '../productSelect';
import SelectInput from '@/component/input/select-input/selectInput';

export default function ProductActionForm({ id, isEdit }: FormProps) {
  const [productsID, setProductIDs] = useState<string[]>([])
  const [category, setCategory] = useState<string>('')

  const dispatch = useDispatch<AppDispatch>()

  const { isAdminActionLoading, productCategory, products } = useSelector<RootState, AdminInitState>(state => state.admin)

  const categoriesOptions: string[] = productCategory.filter(category => !category.actionID).map(category => category.title)
  const productsOptions: ProductData[] = products.filter(product => !product.actionID)

  const { handleSubmit, register, reset } = useForm<InsertOrUpdateAction>() 
  
  const sectionAction: SubmitHandler<InsertOrUpdateAction> = (data) => {
    if(isEdit) dispatch(updateProductAction({...data, _id: id!, productsID, categoryName: category }))
    else dispatch(inserProductAction({...data, productsID, categoryName: category }))

    setProductIDs([])
    setCategory('')
    reset()
  }

  return(
    <Fragment>
      {isAdminActionLoading ? <SmallLoader/> : null}
      <FormWrapper onSubmit={handleSubmit(sectionAction)} className={scss.form_wrapper}>
        <ProductSelect options={productsOptions} productsID={productsID} setProductIDs={setProductIDs}/>
        <SelectInput options={categoriesOptions} selected={category} setSelect={setCategory} title='Категории'/>
        <TextInput<InsertOrUpdateAction> attributes={{ name: 'title', placeholder: 'Название' }} register={register}/>
        <CheckBoxInput<InsertOrUpdateAction> attributes={{ name: 'isHidden' }} label='Скрыть акцию с главной страницы' register={register}/>
        <TextInput<InsertOrUpdateAction> attributes={{ name: 'expiredAt', type: 'datetime-local' }} register={register}/>
        <MultipleInput>
          <TextInput<InsertOrUpdateAction> attributes={{ name: 'position', step: 1, type: 'number', placeholder: 'Позиция' }} register={register}/>
          <TextInput<InsertOrUpdateAction> attributes={{ name: 'precent', step: 0.01, type: 'number',  placeholder: 'Скидка' }} register={register}/>
        </MultipleInput>
      </FormWrapper>
    </Fragment>
  )
}
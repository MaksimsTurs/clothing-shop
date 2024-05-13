import scss from '../../scss/formWrapper.module.scss'

import type { SectionFormProps } from '../../page.type';
import type { AppDispatch, RootState } from '@/store/store';
import type { AdminInitState, ProductSectionAction } from '@/store/admin/admin.type';

import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import editProductsSection from '@/store/admin/action/editProductsSection';
import addProductsSection from '@/store/admin/action/addProductsSection';
import { resetLoadingState } from '@/store/user/user';

import FormWrapper from '@/component/form-wrapper/formWrapper';
import TextInput from '@/component/input/text-input/textInput';
import SmallLoader from '@/component/loader/fetch-loader/smallLoader';
import MultipleInput from '@/component/form-wrapper/component/multipleInput';
import CheckBoxInput from '@/component/input/checkbox-input/checkboxInput';
import ProductSelect from '../productSelect';

export default function ProductSectionForm({ id, isEdit, currIDs, defaultValues }: SectionFormProps<ProductSectionAction>) {
  const [productsID, setProductIDs] = useState<string[]>([])

  const dispatch = useDispatch<AppDispatch>()

  const { isAdminActionLoading } = useSelector<RootState, AdminInitState>(state => state.admin)

  const { handleSubmit, register, reset } = useForm<ProductSectionAction>() 

  const sectionAction: SubmitHandler<ProductSectionAction> = (data) => {
    if(isEdit) dispatch(editProductsSection({...data, id, productsID: [...productsID, ...currIDs || []] }))
    else dispatch(addProductsSection({...data, productsID }))

    setProductIDs([])
    reset()
  }

  useEffect(() => {
    dispatch(resetLoadingState())
  }, [])

  return(
    <Fragment>
      {isAdminActionLoading ? <SmallLoader/> : null}
      <FormWrapper onSubmit={handleSubmit(sectionAction)} className={scss.form_wrapper}>
        <TextInput<ProductSectionAction> attributes={{ name: 'title', placeholder: 'Название', defaultValue: defaultValues?.title }} register={register}/>
        <MultipleInput>
          <CheckBoxInput<ProductSectionAction> attributes={{ name: 'isHidden', defaultValue: defaultValues?.isHidden }} label='Скрыть' register={register}/>
          <TextInput<ProductSectionAction> attributes={{ name: 'expiredDate', type: 'datetime-local', defaultValue: defaultValues?.expiredDate }} register={register}/>
        </MultipleInput>
        <MultipleInput>
          <TextInput<ProductSectionAction> attributes={{ name: 'position', step: 1, type: 'number', placeholder: 'Позиция', defaultValue: defaultValues?.position }} register={register}/>
          <TextInput<ProductSectionAction> attributes={{ name: 'precent', step: 0.01, type: 'number', placeholder: 'Скидка', defaultValue: defaultValues?.precent }} register={register}/>
        </MultipleInput>
        <ProductSelect productsID={productsID} setProductIDs={setProductIDs}/>
      </FormWrapper>
    </Fragment>
  )
}
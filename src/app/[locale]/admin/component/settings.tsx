import scss from '../scss/websiteSetting.module.scss'

import MultipleInput from '@/component/form-wrapper/component/multipleInput'
import FormWrapper from '@/component/form-wrapper/formWrapper'
import TextInput from '@/component/input/text-input/textInput'
import CheckBoxInput from '@/component/input/checkbox-input/checkboxInput'

import type { AdminInitState, WebsiteSettings } from '@/store/admin/admin.type'

import { type SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import editWebsiteSetting from '@/store/admin/action/editWebsiteSetting'
import { Fragment } from 'react'
import SmallLoader from '@/component/loader/fetch-loader/smallLoader'

export default function Settings() {
  const { websiteSettings } = useSelector<RootState, AdminInitState>(state => state.admin)

  const dispatch = useDispatch<AppDispatch>()

  const { handleSubmit, register } = useForm<WebsiteSettings>()

  const { isAdminActionLoading } = useSelector<RootState, AdminInitState>(state => state.admin)

  const changeSettings: SubmitHandler<WebsiteSettings> = (settings) => {
    dispatch(editWebsiteSetting(settings))
  }

  return(
    <Fragment>
      {isAdminActionLoading ? <SmallLoader/> : null}
      <FormWrapper className={scss.setting_form_container} onSubmit={handleSubmit(changeSettings)}>
        <MultipleInput>
          <TextInput<WebsiteSettings> 
            attributes={{ 
              name: 'maxProductsPerPage', 
              defaultValue: websiteSettings?.maxProductsPerPage, 
              placeholder: 'Количество продуктов про страницу',
              type: 'number',
              step: 0.01
            }} 
            register={register}/>
          <TextInput<WebsiteSettings> 
            attributes={{ 
              name: 'deliveryFee', 
              defaultValue: websiteSettings?.deliveryFee, 
              step: 0.01, 
              type: 'number', 
              placeholder: 'Цена за доставку' 
            }} 
          register={register}/>
        </MultipleInput>
        <CheckBoxInput<WebsiteSettings> attributes={{ name: 'isAllProductsHidden', defaultValue: websiteSettings?.isAllProductsHidden }} label='Скрыть продукты' register={register}/>
      </FormWrapper>
    </Fragment>
    )
}
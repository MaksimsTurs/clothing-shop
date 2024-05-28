import scss from '../scss/websiteSetting.module.scss'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import TextInput from '@/component/input/text-input/textInput'
import CheckBoxInput from '@/component/input/checkbox-input/checkboxInput'
import ActionButton from './actionButton'
import SmallLoader from '@/component/loader/fetch-loader/smallLoader'

import type { AdminInitState, WebsiteSettings } from '@/store/admin/admin.type'

import { type SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { Fragment } from 'react'

import updateSetting from '@/store/admin/action/updateSetting'
import clearCache from '@/store/admin/action/clearCache'

export default function Settings() {
  const { websiteSettings } = useSelector<RootState, AdminInitState>(state => state.admin)

  const dispatch = useDispatch<AppDispatch>()

  const { handleSubmit, register, reset } = useForm<WebsiteSettings>()

  const { isAdminActionLoading } = useSelector<RootState, AdminInitState>(state => state.admin)

  const changeSettings: SubmitHandler<WebsiteSettings> = (settings): void => {
    dispatch(updateSetting(settings))
    reset()
  }

  const clearServerCache = async(): Promise<void> => {
    dispatch(clearCache())
  }

  return(
    <Fragment>
      {isAdminActionLoading ? <SmallLoader/> : null}
      <FormWrapper className={scss.setting_form_container} onSubmit={handleSubmit(changeSettings)}>
        <TextInput<WebsiteSettings> attributes={{ name: 'maxProductsPerPage', placeholder: 'Количество продуктов про страницу', type: 'number', step: 1 }} register={register}/>
        <TextInput<WebsiteSettings> attributes={{ name: 'deliveryFee', step: 0.01, type: 'number', placeholder: 'Цена за доставку' }}  register={register}/>
        <CheckBoxInput<WebsiteSettings> attributes={{ name: 'isAllProductsHidden', defaultValue: websiteSettings?.isAllProductsHidden }} label='Скрыть продукты' register={register}/>
        <ActionButton label='Очистить кэш' onClick={clearServerCache}/>
      </FormWrapper>
    </Fragment>
    )
}
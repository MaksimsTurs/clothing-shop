'use client'

import scss from '../scss/userHeader.module.scss'

import type { EditUser, UserHeaderProps } from '../page.type'
import type { AppDispatch, RootState } from '@/store/store'
import type { UserClient, UserInitState } from '@/store/user/user.type'

import ExtendedIMG from '@/component/extended-img/extendedIMG'
import ModalWrapper from './modalWrapper'
import ImgInput from '@/component/input/file-input/fileInput'
import FormWrapper from '@/component/form-wrapper/formWrapper'
import MultipleInput from '@/component/form-wrapper/component/multipleInput'
import TextInput from '@/component/input/text-input/textInput'
import SmallLoader from '@/component/loader/fetch-loader/smallLoader'

import firstLetterUpperCase from '@/util/firstLetterUpperCase'
import createFormData from '@/util/createFormData'
import cookies from '@/util/coockies'

import { useCurrentLocale, useScopedI18n } from '@/localization/client'

import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import editMe from '@/store/user/action/editMe'
import { resetLoadingState, logOut } from '@/store/user/user'
import removeMe from '@/store/user/action/removeMe'

export default function UserHeader({ data }: UserHeaderProps) {
  const [isEditMode, setEditMode] = useState<boolean>(false)

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<EditUser>()
  const { isUserActionPending, userActionError } = useSelector<RootState, UserInitState>(state => state.user)

  const language = useCurrentLocale()
  const router = useRouter()
  const t = useScopedI18n('user-page')
  const dispatch = useDispatch<AppDispatch>()
  
  const color: string = data.role === 'admin' ? 'green' : 'red'
  
  async function editUserCall(data: EditUser): Promise<void> {   
    const formData = createFormData(data)
    formData.append('id', cookies.get<UserClient>('user')?.id || 'undefined')
    await dispatch(editMe(formData))
    reset()
    router.refresh()
  }
  const remove = (): any => dispatch(removeMe(cookies.get<UserClient>('user')?.id!))

  const handleModal = (): void =>     setEditMode(prev => !prev)

  function logOutMe(): void {
    dispatch(logOut())
    router.replace(`/${language}/home`)
  }

  useEffect(() => {
    dispatch(resetLoadingState())
  }, [])

  return(
    <Fragment>
      {isUserActionPending ? <SmallLoader/> : null}
      {isEditMode ? 
        <ModalWrapper>
          <FormWrapper serverError={userActionError} onSubmit={handleSubmit(editUserCall)} styles={{ formInputsStyle: { width: '20rem' }, formStyle: { padding: '0rem', position: 'relative' }}}>
            <ImgInput<EditUser> attributes={{ name: 'avatar' }} isSubmited={isSubmitting} labelText={t('avatar-add')} register={register}/>
            <MultipleInput>
              <TextInput<EditUser> attributes={{ name: 'firstName', placeholder: t('firstname-placeholder') }} register={register}/>
              <TextInput<EditUser> attributes={{ name: 'secondName', placeholder: t('secondname-placeholder') }} register={register}/>
            </MultipleInput>
            <TextInput<EditUser> attributes={{ name: 'email', placeholder: t('email') }} register={register}/>
            <button type='button' className={scss.user_header_close_button} onClick={handleModal}>{t('close')}</button>
          </FormWrapper>
        </ModalWrapper> : null}
      <div className={scss.user_header_container}>
        <div className={scss.user_header_data_body}>
          <ExtendedIMG alt={data.name} src={data.avatar} width={1440} height={1440}/>
          <div className={scss.user_header_data_container}>
            <h2>{data.name}</h2>
            <p style={{ color }}>{firstLetterUpperCase(data.role)}</p>
            <p>{data.email}</p>
          </div>
        </div>
        <div className={scss.user_buttons_container}>
          <button onClick={handleModal}>{t('edit')}</button>
          {data.role ? <button onClick={() => router.push('/ru/admin')}>{t('admin-panel')}</button> : null}
          <button onClick={remove} className={scss.user_button_red}>{t('remove')}</button>
          <button onClick={logOutMe} className={scss.user_button_red}>{t('log-out')}</button>
        </div>
      </div>
    </Fragment>
  )
}
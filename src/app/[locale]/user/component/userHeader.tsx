'use client'

import scss from '../scss/userHeader.module.scss'

import type { EditUser, UserHeaderProps } from '../page.type'

import ExtendedIMG from '@/component/extended-img/extendedIMG'
import ModalWrapper from './modalWrapper'
import ImgInput from '@/component/input/file-input/fileInput'
import FormWrapper from '@/component/form-wrapper/formWrapper'
import MultipleInput from '@/component/form-wrapper/component/multipleInput'
import TextInput from '@/component/input/text-input/textInput'
import SmallLoader from '@/component/loader/fetch-loader/smallLoader'

import firstLetterUpperCase from '@/util/firstLetterUpperCase'

import { useCurrentLocale, useScopedI18n } from '@/localization/client'

import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'

import useAuth from '@/custom-hook/useAuth/useAuth'

export default function UserHeader({ userData }: UserHeaderProps) {
  const [isEditMode, setEditMode] = useState<boolean>(false)

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<EditUser>()

  const language = useCurrentLocale()
  const router = useRouter()
  const t = useScopedI18n('user-page')

  const { quit, update, isLoading, error } = useAuth()
  
  const color: string = userData.role === 'ADMIN' ? 'green' : 'red'
  
  async function editUserCall(newUserData: EditUser): Promise<void> { 
    await update({ URL: '/user/edit', body: newUserData })
    reset()
    router.refresh()
  }

  const logOut = (): void => quit({ redirectOnSucces: `/${language}/home` })
  const handleModal = (): void => setEditMode(prev => !prev)

  return(
    <Fragment>
      {isLoading ? <SmallLoader/> : null}
      {isEditMode ? 
        <ModalWrapper>
          <FormWrapper serverError={error} onSubmit={handleSubmit(editUserCall)} styles={{ formInputsStyle: { width: '20rem' }, formStyle: { padding: '0rem', position: 'relative' }}}>
            <ImgInput<EditUser> attributes={{ name: 'avatar', type: 'file' }} isSubmited={isSubmitting} labelText={t('avatar-add')} register={register}/>
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
          <ExtendedIMG alt={userData.name} src={userData.avatar} width={1440} height={1440}/>
          <div className={scss.user_header_data_container}>
            <h2>{userData.name}</h2>
            <p style={{ color }}>{firstLetterUpperCase(userData.role)}</p>
            <p>{userData.email}</p>
          </div>
        </div>
        <div className={scss.user_buttons_container}>
          <button onClick={handleModal}>{t('edit')}</button>
          {userData.role === 'ADMIN' ? <button onClick={() => router.push('/ru/admin')}>{t('admin-panel')}</button> : null}
          <button onClick={logOut} className={scss.user_button_red}>{t('log-out')}</button>
        </div>
      </div>
    </Fragment>
  )
}
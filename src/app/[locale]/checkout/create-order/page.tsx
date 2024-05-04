//@ts-nocheck

'use client'

import scss from '../scss/createOrder.module.scss'

import type { PageProps, UserOrderData } from "../page.type";
import type { UserInitState } from '@/store/user/user.type';
import type { RootState } from '@/store/store';

import PaypalButton from "../component/paypalButton";
import TextInput from "@/component/input/text-input/textInput";
import FormWrapper from "@/component/form-wrapper/formWrapper";
import MultipleInput from '@/component/form-wrapper/component/multipleInput';

import { type SubmitHandler, useForm } from "react-hook-form";

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useI18n } from '@/localization/client'
import { Fragment } from 'react';

export default function Page({ searchParams }: PageProps) {
  const { yourself } = useSelector<RootState, UserInitState>(state => state.user)
  const { register, handleSubmit, clearErrors, formState: { errors } } = useForm<UserOrderData>({ mode: 'onSubmit' })
  
  const t = useI18n()

  const [currTab, setCurrTab] = useState(yourself ? yourself.name : t('create-order.guest'))
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const tabs = []

  if(!yourself) tabs.push(t('create-order.guest'))
  else tabs.push(yourself.name, t('create-order.guest'))

  localStorage.setItem('checkID', searchParams.orderId)

  useEffect(() => {
    clearErrors()
  }, [currTab]) 

  const saveOrderData: SubmitHandler<UserOrderData> = (data) => {
    setIsLoading(true)
    if(currTab === t('create-order.guest')) localStorage.setItem('user-order-data', JSON.stringify(data))
    else localStorage.setItem('user-order-data', JSON.stringify({...data, id: yourself?.id }))
    setTimeout(() => setIsLoading(false), 2000)
  }

  return(
    <main className={scss.create_order_container}>
      <div className={scss.create_order_body}>
        <section className={scss.create_order_tabs_header}>
          {tabs.map(tab => 
            <h5 
              key={tab} 
              className={tab === currTab ? `${scss.create_order_tab} ${scss.create_order_tab_active}` : scss.create_order_tab} 
              onClick={() => setCurrTab(tab)}>
              {tab}
            </h5>)}
        </section>
        <div>
          <FormWrapper 
            styles={{ formInputsStyle: { width: '100%' } }} 
            onSubmit={handleSubmit(saveOrderData)} 
            className={scss.checkout_form} 
            buttonLabel={isLoading ? t('create-order.saved') : t('create-order.save')}
            isLoading={isLoading}>
            {(currTab === t('create-order.guest')) ?
              <Fragment>
                <MultipleInput>
                  <TextInput 
                    attributes={{ name: 'firstName', placeholder: t('firstName') }}
                    required={{ message: t('field-required', { field: t('firstName') }), value: true }} 
                    errors={errors}
                    register={register}/>
                  <TextInput 
                    attributes={{ name: 'secondName', placeholder: t('secondName') }} 
                    required={{ message: t('field-required', { field: t('secondName') }), value: true }}
                    errors={errors}
                    register={register}/>
                </MultipleInput>
                <TextInput 
                  attributes={{ name: 'email', placeholder: t('email') }} 
                  required={{ message: t('field-required', { field: t('email') }), value: true }}
                  errors={errors}
                  register={register}/> 
              </Fragment>
              : null}
            <TextInput 
              attributes={{ name: 'adress', placeholder: t('adress') }}
              required={{ message: t('field-required', { field: t('adress') }), value: true }}
              errors={errors}
              register={register}/>
            <TextInput 
              attributes={{ name: 'city', placeholder: t('create-order.city') }} 
              required={{ message: t('field-required', { field: t('create-order.city') }), value: true }}
              errors={errors}
              register={register}/>
            <TextInput 
              attributes={{ name: 'plz', placeholder: t('create-order.plz'), type: 'number' }} 
              required={{ message: t('field-required', { field: t('create-order.plz') }), value: true }}
              errors={errors}
              register={register}/>
          </FormWrapper>
        </div>
      </div>
      <div className={scss.create_order_body}><PaypalButton/></div>
    </main>
  )
}
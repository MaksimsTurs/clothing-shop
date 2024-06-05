'use client'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import TextInput from '@/component/input/text-input/textInput'
import SmallLoader from '@/component/loader/fetch-loader/smallLoader'

import { Fragment } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import type { UserLogin } from './page.type'

import { useCurrentLocale, useScopedI18n } from '@/localization/client'

import useAuth from '@/custom-hook/useAuth/useAuth'

import createFormData from '@/util/createFormData'

export default function Login() {
	const language = useCurrentLocale()
	const t = useScopedI18n('user-action')

	const auth = useAuth()

	const { register,	handleSubmit, formState: { errors } } = useForm<UserLogin>({ mode: 'onSubmit' })

	const userLogIn: SubmitHandler<UserLogin> = async (userData) => {
		await auth.create({ URL: '/user/login', body: createFormData(userData), redirectOnSucces: `/${language}/home` })
	}

	return (
		<main>
			{auth.isLoading ? <SmallLoader/> : null}
			<FormWrapper
				onSubmit={handleSubmit(userLogIn)}
				title={t('wrapper-log')}
				styles={{ formInputsStyle: { width: '21rem' }}}
				serverError={auth.error}
				link={{ linkURL: `/${language}/registration`, text: t("no-account") }}>
				<TextInput<UserLogin>
					attributes={{ name: 'firstName', type: 'text', placeholder: t("firstname-placeholder"), max: { message: t("firstname-invalid"), value: 20 }}}
					required={{ message: t("firstname-required"), value: true }}
					errors={errors}
					register={register}/>
				<TextInput<UserLogin>
					attributes={{ name: 'secondName', type: 'text', placeholder: t("secondname-placeholder"), max: { message: t("secondname-invalid"), value: 20 }}}
					required={{ message: t("secondname-required"), value: true }}
					errors={errors}
					register={register}/>
				<TextInput<UserLogin>
					attributes={{ name: 'password', type: 'password', placeholder: t("password-placeholder"), min: { message: t("password-invalid"), value: 8 }}}
					required={{ message: t("password-required"), value: true }}
					errors={errors}
					register={register}/>
				<TextInput<UserLogin>
					attributes={{ name: 'email', type: 'email', placeholder: t("email") }}
					required={{ message: t("email-required"), value: true }}
					errors={errors}
					register={register}/>
			</FormWrapper>
		</main>
	)
}

'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useCurrentLocale, useScopedI18n } from '@/localization/client'

import type { UserRegistration } from './page.type'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import ImgInput from '@/component/input/file-input/fileInput'
import TextInput from '@/component/input/text-input/textInput'
import SmallLoader from '@/component/loader/fetch-loader/smallLoader'

import createFormData from '@/util/createFormData'

import useAuth from '@/custom-hook/useAuth/useAuth'

export default function Page() {
	const t = useScopedI18n('user-action')
	const language = useCurrentLocale()

	const { register, handleSubmit, formState: { errors } } = useForm<UserRegistration>({ mode: 'onChange' })

	const auth = useAuth()

	const createUser: SubmitHandler<UserRegistration> = async (userData) => {
		await auth.create({ URL: '/user/registration', body: createFormData(userData), redirectOnSucces: `/${language}/home`})
	}

	return (
		<main>
			{auth.isLoading ? <SmallLoader/> : null}
			<FormWrapper
				styles={{ formInputsStyle: { width: '22rem' }}}
				onSubmit={handleSubmit(createUser)}
				title={t("wrapper-reg")}
				serverError={auth.error}
				link={{ linkURL: `/${language}/login`, text: t("have-account") }}>
				<ImgInput<UserRegistration> attributes={{ name: 'avatar', type: 'file' }} labelText={t("avatar-add")} register={register} />
				<TextInput<UserRegistration>
					attributes={{ name: 'firstName', type: 'text', placeholder: `${t("firstname-placeholder")}`, max: { message: t("firstname-invalid"), value: 15 } }}
					required={{ message: t("firstname-required"), value: true }}
					errors={errors}
					register={register}/>
				<TextInput<UserRegistration>
					attributes={{ name: 'secondName', type: 'text', placeholder: `${t("secondname-placeholder")}`, max: { message: t("secondname-invalid"), value: 15 } }}
					required={{ message: t("secondname-required"), value: true }}
					errors={errors}
					register={register}/>
				<TextInput<UserRegistration>
					attributes={{ name: 'password', type: 'password', placeholder: `${t("password-placeholder")}`, min: { message: t("password-invalid"), value: 8 } }}
					required={{ message: t("password-required"), value: true }}
					errors={errors}
					register={register}/>
				<TextInput<UserRegistration>
					attributes={{ name: 'confirmPassword', type: 'password', placeholder: `${t("password-placeholder")}`, min: { message: t("confirm-password-invalid"), value: 8 } }}
					required={{ message: t("confirm-password-required"), value: true }}
					errors={errors}
					register={register}/>
				<TextInput<UserRegistration>
					attributes={{ name: 'email', placeholder: t("email"), type: 'email' }}
					required={{ message: t("email-required"), value: true }}
					errors={errors}
					register={register}/>
			</FormWrapper>
		</main>
	)
}

'use client'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import TextInput from '@/component/input/text-input/textInput'
import MultipleInput from '@/component/form-wrapper/component/multipleInput'
import FetchLoader from '@/component/loader/fetch-loader/fetchLoader'

import type { UserLogin } from './login.type'
import type { AppDispatch, RootState } from '@/store/store'
import type { UserInitState } from '@/store/user/user.type'

import { type SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Fragment, useEffect } from 'react'

import userLogin from '@/store/user/action/userLogIn'
import { useCurrentLocale, useScopedI18n } from '@/i18n/client'

export default function Login() {
	const dispatch = useDispatch<AppDispatch>()
	const tr = useScopedI18n("User-Log")
	const currLanguage = useCurrentLocale()

	const { register,	handleSubmit,	formState: { errors }, reset } = useForm<UserLogin>({ mode: 'onSubmit' })
	const { isUserActionLoading, userErrorMessage } = useSelector<RootState, UserInitState>(state => state.user)

	const login: SubmitHandler<UserLogin> = async (userData) => {
		dispatch(userLogin(userData))
		// reset()
	}
	
	return (
		<Fragment>
			{isUserActionLoading && <FetchLoader/>}
			<FormWrapper
			onSubmit={handleSubmit(login)}
			title={tr("form.title.log")}
			serverError={userErrorMessage}
			link={{ linkURL: `/${currLanguage}/registration`, text: tr("have-no-account") }}
			isLoading={isUserActionLoading}>
			<MultipleInput>
				<TextInput<UserLogin>
					htmlFor='firstName'
					type='text'
					placeholder={`${tr("firstname-place")} 15`}
					max={{ message: tr("firstname-valid"), value: 15 }}
					required={{ message: tr("firstname-require"), value: true }}
					errors={errors}
					register={register}
				/>
				<TextInput<UserLogin>
					htmlFor='secondName'
					type='text'
					placeholder={`${tr("secondname-place")} 15`}
					max={{ message: tr("secondname-valid"), value: 15 }}
					required={{ message: tr("secondname-require"), value: true }}
					errors={errors}
					register={register}
				/>
			</MultipleInput>
			<TextInput<UserLogin>
				htmlFor='password'
				type='password'
				placeholder={`${tr("password-place")} 8`}
				min={{ message: tr("password-valid"), value: 8 }}
				required={{ message: tr("password-require"), value: true }}
				errors={errors}
				register={register}
			/>
			<TextInput<UserLogin>
				htmlFor='email'
				type='email'
				placeholder={tr("email")}
				required={{ message: tr("email-require"), value: true }}
				errors={errors}
				register={register}
			/>
		</FormWrapper>
		</Fragment>
	)
}

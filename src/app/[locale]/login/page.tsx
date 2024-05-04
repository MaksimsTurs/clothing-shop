'use client'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import TextInput from '@/component/input/text-input/textInput'
import SmallLoader from '@/component/loader/fetch-loader/smallLoader'
import MultipleInput from '@/component/form-wrapper/component/multipleInput'

import { Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import type { UserLogin } from './page.type'
import type { UserInitState } from '@/store/user/user.type'
import type { AppDispatch, RootState } from '@/store/store'

import { useCurrentLocale, useScopedI18n } from '@/localization/client'

import logIn from '@/store/user/action/logIn'
import { resetLoadingState } from '@/store/user/user'
import userFormStatus from '@/util/userFormStatus/userFormStatus'
import UserFormHeader from '@/component/user-form-header/userFormHeader'

export default function Login() {
	const language = useCurrentLocale()
	const t = useScopedI18n('user-action')
	const dispatch = useDispatch<AppDispatch>()

	const { register,	handleSubmit, formState: { errors } } = useForm<UserLogin>({ mode: 'onSubmit' })
	const { isUserActionPending, userActionError, yourself } = useSelector<RootState, UserInitState>(state => state.user)

	async function userLogIn(userData: UserLogin) {
		await dispatch(logIn(userData))
	}

	const { isFormOk, scssClass } = userFormStatus(userActionError || errors, yourself)	

	useEffect(() => {
		dispatch(resetLoadingState())
	}, [])

	return (
		<Fragment>
			{isUserActionPending ? <SmallLoader/> : null}
			<FormWrapper
				onSubmit={handleSubmit(userLogIn)}
				title={<UserFormHeader isFormOk={isFormOk} scssClass={scssClass} title={t('wrapper-log')} yourself={yourself}/>}
				styles={{ formInputsStyle: { width: '21rem' } }}
				serverError={userActionError}
				link={{ linkURL: `/${language}/registration`, text: t("no-account") }}>
			<MultipleInput>
				<TextInput<UserLogin>
					attributes={{ name: 'firstName', type: 'text', placeholder: t("firstname-placeholder"), max: { message: t("firstname-invalid"), value: 20 }}}
					required={{ message: t("firstname-required"), value: true }}
					errors={errors}
					register={register}
				/>
				<TextInput<UserLogin>
					attributes={{ name: 'secondName', type: 'text', placeholder: t("secondname-placeholder"), max: { message: t("secondname-invalid"), value: 20 }}}
					required={{ message: t("secondname-required"), value: true }}
					errors={errors}
					register={register}
				/>
			</MultipleInput>
				<TextInput<UserLogin>
					attributes={{ name: 'password', type: 'password', placeholder: t("password-placeholder"), min: { message: t("password-invalid"), value: 8 }}}
					required={{ message: t("password-required"), value: true }}
					errors={errors}
					register={register}
				/>
				<TextInput<UserLogin>
					attributes={{ name: 'email', type: 'email', placeholder: t("email") }}
					required={{ message: t("email-required"), value: true }}
					errors={errors}
					register={register}
				/>
			</FormWrapper>
		</Fragment>
	)
}

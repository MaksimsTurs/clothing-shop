'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useCurrentLocale, useScopedI18n } from '@/localization/client'

import type { UserRegistration } from './page.type'
import type { AppDispatch, RootState } from '@/store/store'
import type { UserInitState } from '@/store/user/user.type'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import MultipleInput from '@/component/form-wrapper/component/multipleInput'
import ImgInput from '@/component/input/file-input/fileInput'
import TextInput from '@/component/input/text-input/textInput'
import UserFormHeader from '@/component/user-form-header/userFormHeader'
import SmallLoader from '@/component/loader/fetch-loader/smallLoader'

import createFormData from '@/util/createFormData'
import userFormStatus from '@/util/userFormStatus/userFormStatus'

import registration from '@/store/user/action/registration'
import { clearError } from '@/store/user/user'

export default function Page() {
	const dispatch = useDispatch<AppDispatch>()

	const t = useScopedI18n('user-action')
	const language = useCurrentLocale()

	const { register, handleSubmit, formState: { errors }, reset } = useForm<UserRegistration>({ mode: 'onChange' })
	const { isUserActionPending, userActionError, yourself } = useSelector<RootState, UserInitState>(state => state.user)

	const createUser: SubmitHandler<UserRegistration> = (userData) => {
		dispatch(registration(createFormData(userData)))
		reset()
	}

	const { isFormOk, scssClass } = userFormStatus(userActionError || errors, yourself)

	useEffect(() => {
		dispatch(clearError())
	}, [])
	
	return (
		<Fragment>
			{isUserActionPending ? <SmallLoader/> : null}
			<FormWrapper
				styles={{ formInputsStyle: { width: '20rem' } }}
				onSubmit={handleSubmit(createUser)}
				title={<UserFormHeader isFormOk={isFormOk} scssClass={scssClass} yourself={yourself} title={t("wrapper-reg")}/>}
				serverError={userActionError}
				link={{ linkURL: `/${language}/login`, text: t("have-account") }}>
				<ImgInput<UserRegistration> attributes={{ name: 'avatar' }} labelText={t("avatar-add")} register={register} />
				<MultipleInput>
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
				</MultipleInput>
				<MultipleInput>
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
				</MultipleInput>
				<TextInput<UserRegistration>
					attributes={{ name: 'email', placeholder: t("email"), type: 'email' }}
					required={{ message: t("email-required"), value: true }}
					errors={errors}
					register={register}/>
			</FormWrapper>
		</Fragment>
	)
}

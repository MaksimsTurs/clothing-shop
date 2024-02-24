'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import type { UserRegistration } from './registration.type'
import type { AppDispatch, RootState } from '@/store/store'
import type { UserInitState } from '@/store/user/user.type'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import MultipleInput from '@/component/form-wrapper/component/multipleInput'
import ImgInput from '@/component/input/file-input/fileInput'
import TextInput from '@/component/input/text-input/textInput'
import FetchLoader from '@/component/loader/fetch-loader/fetchLoader'

import userRegistration from '@/store/user/action/userRegistration'
import { resetState } from '@/store/user/user'
import { useCurrentLocale, useScopedI18n } from '@/i18n/client'

export default function Page() {
	const currLanguage = useCurrentLocale()
	const tr = useScopedI18n("User-Log")
	const dispatch = useDispatch<AppDispatch>()

	const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<UserRegistration>({ mode: 'onChange' })
	const { isUserActionLoading, userErrorMessage } = useSelector<RootState, UserInitState>(state => state.user)

	const registration: SubmitHandler<UserRegistration> = (userData) => {
		const userFormData = new FormData()

		for(let [key, value] of Object.entries(userData)) {
			if(key === 'avatar') {
				userFormData.append('avatar', userData.avatar[0])
			} else {
				userFormData.append(key, value)
			}
		}
		
		dispatch(userRegistration(userFormData))
		reset()
	}

	console.log(errors)

	useEffect(() => {
		dispatch(resetState())
	}, [])

	return (
		<Fragment>
			{isUserActionLoading && <FetchLoader/>}
			<FormWrapper<UserRegistration>
				onSubmit={handleSubmit(registration)}
				title={tr("form.title.reg")}
				isLoading={isUserActionLoading}
				serverError={userErrorMessage}
				link={{ linkURL: `/${currLanguage}/login`, text: tr("have-account") }}>
				<ImgInput<UserRegistration> 
					htmlFor='avatar'
					labelText={tr("add-avatar")}
					register={register}
				/>
				<MultipleInput>
					<TextInput<UserRegistration>
						placeholder={`${tr("firstname-place")} 15`}
						htmlFor='firstName'
						type='text'
						max={{ message: tr("firstname-valid"), value: 15 }}
						required={{ message: tr("firstname-require"), value: true }}
						errors={errors}
						register={register}
					/>
					<TextInput<UserRegistration>
						placeholder={`${tr("secondname-place")} 15`}
						htmlFor='secondName'
						type='text'
						max={{ message: tr("secondname-valid"), value: 15 }}
						required={{ message: tr("secondname-require"), value: true }}
						errors={errors}
						register={register}
					/>
				</MultipleInput>
				<MultipleInput>
					<TextInput<UserRegistration>
						placeholder={`${tr("password-place")} 8`}
						htmlFor='password'
						type='password'
						min={{ message: tr("password-valid"), value: 8 }}
						required={{ message: tr("password-require"), value: true }}
						errors={errors}
						register={register}
					/>
					<TextInput<UserRegistration>
						placeholder={`${tr("confirm-password-place")} 8`}
						htmlFor='confirmPassword'
						type='password'
						validation={(password: string) => password.trim() !== getValues('confirmPassword').trim() ? tr("passwords-not-match") : undefined}
						min={{ message: tr("confirm-password-valid"), value: 8 }}
						required={{ message: tr("confirm-password-require"), value: true }}
						errors={errors}
						register={register}
					/>
				</MultipleInput>
				<TextInput<UserRegistration>
					placeholder={tr("email")}
					htmlFor='email'
					type='email'
					required={{ message: tr("email-require"), value: true }}
					errors={errors}
					register={register}
				/>
			</FormWrapper>
		</Fragment>
	)
}

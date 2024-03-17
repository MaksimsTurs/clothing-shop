'use client'

import scss from '../scss/userDataHeader.module.scss'

import type { EditUserData, UserDataHeaderProps } from '../userData.type'
import type { AppDispatch, RootState } from '@/store/store'
import type { UserInitState } from '@/store/user/user.type'

import Image from 'next/image'
import { Fragment, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import ImgInput from '@/component/input/file-input/fileInput'
import MultipleInput from '@/component/form-wrapper/component/multipleInput'
import FetchLoader from '@/component/loader/fetch-loader/fetchLoader'
import TextInput from '@/component/input/text-input/textInput'
import editUser from '@/store/user/action/editUser'

import userDefIcon from '../img/def-user-icon.webp'

export default function UserDataHeader({ userData }: UserDataHeaderProps) {
	const router = useRouter()
	const dispatch = useDispatch<AppDispatch>()

	const [isEditMode, setEditMode] = useState<boolean>(false)

	const { handleSubmit, register, reset } = useForm<EditUserData>()

	const { userLocal, isUserActionLoading } = useSelector<RootState, UserInitState>(state => state.user)

	const editUserData: SubmitHandler<EditUserData> = async(newUserData) => {
		const newUserFormData = new FormData()

		for(let [key, value] of Object.entries(newUserData)) {
			if((value as any) instanceof FileList) {
				newUserFormData.append('img', value[0])
			} else {
				newUserFormData.append(key, value)
			}
		}

		newUserFormData.append('token', userLocal?.token || 'undefined')
				
		dispatch(editUser(newUserFormData)).then(() => {
			router.refresh()
			reset()
			setEditMode(false)
		})
	}

	return (
		<Fragment>
			{isUserActionLoading && <FetchLoader/>}
			<section className={scss.user_data_info_container}>
				{
					isEditMode ?
					<FormWrapper onSubmit={handleSubmit(editUserData)} styles={{ formStyle: { padding: '0rem' } }}>
						<ImgInput<EditUserData> htmlFor='avatar' labelText='Chose new avatar!' register={register}/>
						<MultipleInput>
							<TextInput<EditUserData> htmlFor='firstName' register={register} placeholder='First Name'/>
							<TextInput<EditUserData> htmlFor='secondName' register={register} placeholder='Second Name'/>
						</MultipleInput>
						<TextInput<EditUserData> htmlFor='email' register={register} placeholder='E-Mail'/>
					</FormWrapper> :
					<Fragment>
						<Image
							alt={`${userData?.firstName} ${userData?.secondName}` || 'User icon'}
							src={userData?.avatar || userDefIcon}
							width={1400}
							height={1400}
							quality={100}
						/>
						<div className={scss.user_data_info_body}>
							<h4>{userData?.firstName} {userData?.secondName}</h4>
							<h5>{userData?.email}</h5>
						</div>
					</Fragment>
				}
			</section>
			<button onClick={() => setEditMode(prev => !prev)} className={scss.user_set_edit_mode}>{isEditMode ? 'STOP EDITING' : 'EDIT'}</button>
		</Fragment>
	)
}

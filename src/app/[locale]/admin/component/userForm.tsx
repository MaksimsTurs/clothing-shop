'use client'

import FormWrapper from "@/component/form-wrapper/formWrapper"
import TextInput from "@/component/input/text-input/textInput"
import ImgInput from "@/component/input/file-input/fileInput"
import MultipleInput from "@/component/form-wrapper/component/multipleInput"

import { Fragment } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"

import type { UserExtended } from "@/store/admin/admin.type"
import { UserFormProps } from "../admin.type"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { UserInitState } from "@/store/user/user.type"
import { AppDispatch } from "@/store/store"
import { useDispatch } from "react-redux"
import editUser from "@/store/admin/action/editUser"

export default function UserForm({ userID }: UserFormProps) {
  const { handleSubmit, register } = useForm<UserExtended>()
  const dispatch = useDispatch<AppDispatch>()

  const { userLocal } = useSelector<RootState, UserInitState>(state => state.user)

  const editUserData: SubmitHandler<UserExtended> = (userData) => {
    const userFormData = new FormData()

		for (let [key, value] of Object.entries(userData)) {
			if (value instanceof FileList) {
				for (let image in value) if(value[image] instanceof File) userFormData.append('images', value[image])
			} else {
				userFormData.append(key, value as string)
			}
		}

		userFormData.append('token', userLocal?.token || 'null')
		userFormData.append('userID', userID)  
    
    dispatch(editUser(userFormData))
  }

  return(
    <Fragment>
      <FormWrapper title="User Edit Form" onSubmit={handleSubmit(editUserData)}>
        <ImgInput<UserExtended>
          htmlFor="avatar"
          labelText="Edit User Avatar!"
          register={register}/>
        <MultipleInput>
          <TextInput<UserExtended>
            htmlFor="firstName"
            register={register}
            placeholder="First Name"/>
          <TextInput<UserExtended>
            htmlFor="secondName"
            register={register}
            placeholder="Second Name"/>
        </MultipleInput>
        <TextInput<UserExtended>
          htmlFor="role"
          register={register}
          placeholder="User Role"/>
      </FormWrapper>
    </Fragment>
  )
}
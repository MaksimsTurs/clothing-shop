'use client'

import FormWrapper from "@/component/form-wrapper/formWrapper"
import TextInput from "@/component/input/text-input/textInput"
import ImgInput from "@/component/input/file-input/fileInput"
import MultipleInput from "@/component/form-wrapper/component/multipleInput"

import { Fragment } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"

import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

import editUser from "@/store/admin/action/editUser"

import type { UserInitState } from "@/store/user/user.type"
import type { RootState } from "@/store/store"
import type { UserFormProps } from "../admin.type"
import type { AppDispatch } from "@/store/store"
import type { UserData } from "@/store/admin/admin.type"
import createFormData from "@/util/createFormData"

export default function UserForm({ userID }: UserFormProps) {
  const { handleSubmit, register } = useForm<UserData>()
  const dispatch = useDispatch<AppDispatch>()

  const { userLocal } = useSelector<RootState, UserInitState>(state => state.user)

  const editUserData: SubmitHandler<UserData> = (userData) => {
    const userFormData = createFormData(userData)

		userFormData.append('token', userLocal?.token || 'null')
		userFormData.append('userID', userID)  
    
    dispatch(editUser(userFormData))
  }

  return(
    <Fragment>
      <FormWrapper title="User Edit Form" onSubmit={handleSubmit(editUserData)} styles={{ formStyle: { justifyContent: 'start' } }}>
        <ImgInput<UserData>
          htmlFor="avatar"
          labelText="Edit User Avatar!"
          register={register}/>
        <MultipleInput>
          <TextInput<UserData>
            htmlFor="firstName"
            register={register}
            placeholder="First Name"/>
          <TextInput<UserData>
            htmlFor="secondName"
            register={register}
            placeholder="Second Name"/>
        </MultipleInput>
        <TextInput<UserData>
          htmlFor="role"
          register={register}
          placeholder="User Role"/>
      </FormWrapper>
    </Fragment>
  )
}
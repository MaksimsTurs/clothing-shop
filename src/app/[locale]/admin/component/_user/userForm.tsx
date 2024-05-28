import scss from '../../scss/adminFormsWrapper.module.scss'

import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useState } from 'react';

import FormWrapper from "@/component/form-wrapper/formWrapper";
import SmallLoader from '@/component/loader/fetch-loader/smallLoader';
import TextInput from "@/component/input/text-input/textInput";
import SelectInput from '@/component/input/select-input/selectInput';
import ImgInput from "@/component/input/file-input/fileInput";

import type { AdminInitState, UserData } from "@/store/admin/admin.type";
import type { FormProps } from "../../page.type";
import type { AppDispatch, RootState } from "@/store/store";

import createFormData from "@/util/createFormData";

import updateUser from '@/store/admin/action/updateUser';

export default function UserForm({ id }: FormProps) {
  const [role, setRole] = useState<'ADMIN' | 'USER' | string>('')

  const { isAdminActionLoading } = useSelector<RootState, AdminInitState>(state => state.admin)

  const { handleSubmit, register, reset } = useForm<UserData>()

  const dispatch = useDispatch<AppDispatch>()

  const userAction: SubmitHandler<UserData> = (data) => {
    const formData = createFormData({...data, id, role })
    dispatch(updateUser(formData))
    reset()
  }

  return(
    <Fragment>
      {isAdminActionLoading ? <SmallLoader/> : null}
      <FormWrapper className={scss.form_container_wrapper} onSubmit={handleSubmit(userAction)}>
        <SelectInput<UserData> title="Роль" options={['ADMIN', 'USER']} selected={role} setSelect={setRole}/>
        <TextInput<UserData> attributes={{ name: 'firstName', placeholder: "Имя" }} register={register}/>
        <TextInput<UserData> attributes={{ name: 'secondName', placeholder: "Фамилия" }} register={register}/>
        <ImgInput<UserData> attributes={{ name: 'avatar', type: 'file' }} labelText="Изменить аватарку" isSubmited={isAdminActionLoading} register={register}/>
      </FormWrapper>
    </Fragment>
  )
}
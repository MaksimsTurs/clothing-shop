import scss from '../../scss/formWrapper.module.scss'

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

import editUser from '@/store/admin/action/editUser';

export default function UserForm({ id, defaultValues }: FormProps<UserData>) {
  const [role, setRole] = useState<'admin' | 'user' | string>('')


  const { isAdminActionLoading } = useSelector<RootState, AdminInitState>(state => state.admin)

  const { handleSubmit, register, formState: { isSubmitted } } = useForm<UserData>()

  const dispatch = useDispatch<AppDispatch>()

  const userAction: SubmitHandler<UserData> = (data) => {
    const formData = createFormData({...data, id, role })
    dispatch(editUser(formData))
  }

  return(
    <Fragment>
      {isAdminActionLoading ? <SmallLoader/> : null}
      <FormWrapper styles={{ formInputsStyle: { width: '15rem' } }} className={scss.form_wrapper} onSubmit={handleSubmit(userAction)}>
        <ImgInput<UserData> attributes={{ name: 'avatar' }} labelText="Изменить аватарку" isSubmited={isSubmitted} register={register}/>
        <SelectInput<UserData> options={['admin', 'user']} selected={role} setSelect={setRole}/>
        <TextInput<UserData> attributes={{ name: 'firstName', placeholder: "Имя", defaultValue: defaultValues?.firstName }} register={register}/>
        <TextInput<UserData> attributes={{ name: 'secondName', placeholder: "Фамилия", defaultValue: defaultValues?.secondName }} register={register}/>
      </FormWrapper>
    </Fragment>
  )
}
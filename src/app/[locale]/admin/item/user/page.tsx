'use client'

import type { AdminInitState } from "@/store/admin/admin.type"
import type { RootState } from "@/store/store"
import type { PageProps } from "../../admin.type"
import type { UserData } from "@/store/admin/admin.type"

import { useSelector } from "react-redux"

import DataPage from "../../component/data-component/dataPage"
import UserForm from "../../component/userForm"
import ErrorLoadingWrapper from "../../component/errorLoadingWrapper"

import handleError from "../../helpers/handleError"

export default function Page({ searchParams }: PageProps) {
  const { users } = useSelector<RootState, AdminInitState>(state => state.admin)

  const findedUser: UserData | undefined = users.find(user => user._id === searchParams.id)

  const error = handleError(Boolean(!findedUser), 'NOT_FOUND', `User with id: ${searchParams.id} not founded!`)

  return(
    <ErrorLoadingWrapper isLoading={false} error={error}>
      <DataPage 
        title="User Information"
        data={findedUser}
        id={searchParams.id} 
        children={<UserForm userID={findedUser?._id!}/>}
        ignore={{ forData: ['avatar', '__v', 'token', 'password'] }}/>
    </ErrorLoadingWrapper>
  )
}
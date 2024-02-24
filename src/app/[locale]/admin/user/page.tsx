'use client'

import type { AdminInitState } from "@/store/admin/admin.type"
import type { RootState } from "@/store/store"
import type { PageProps } from "../admin.type"

import { useSelector } from "react-redux"

import DataPage from "../component/dataPage"
import UserForm from "../component/userForm"
import { Fragment } from "react"
import FetchLoader from "@/component/loader/fetch-loader/fetchLoader"

export default function Page({ searchParams }: PageProps) {
  const { users, isAdminActionLoading } = useSelector<RootState, AdminInitState>(state => state.admin)

  const findedUser = users.find(user => user._id === searchParams.id)

  return(
    <Fragment>
      {isAdminActionLoading && <FetchLoader/>}
      <DataPage id={searchParams.id} data={findedUser} ignore={{ forData: ['avatar'] }} title="User Information">
        <UserForm userID={findedUser?._id!}/>
      </DataPage>
    </Fragment>
  )
}
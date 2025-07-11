import DataContainer from "../dataContainer"
import DataBody from "../dataBody"
import DataImage from "../dataImage"
import DataSection from "../dataSection"
import DataLink from "../datLink"
import UserForm from "./userForm"

import { useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"
import { useMemo } from "react"

import type { RootState } from "@/store/store"
import type { AdminInitState, UserData } from "@/store/admin/admin.type"

import DataTool from "@/store/admin/tool/dataTool"

export default function User() {
  const id = useSearchParams().get('id')

  const { users } = useSelector<RootState, AdminInitState>(state => state.admin)

  const user = useMemo(() => DataTool.find({ _id: id! }, users), [users]) as UserData | undefined

  return(
    <DataContainer>
      <DataBody data={user}>
        <DataImage images={user?.avatar}/>
        <DataSection _key='ID:' value={user?._id}/>
        <DataSection _key='Имя и Фамилия:' value={`${user?.firstName} ${user?.secondName}`}/>
        <DataLink _key="Е-Маил" value={user?.email} href={`https://mail.google.com/mail/?view=cm&fs=1&to=${user?.email}`}/>
        <DataSection _key="Роль" value={user?.role}/>
      </DataBody>
      <UserForm id={id} isEdit/>
    </DataContainer>
  )
}
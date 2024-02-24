'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import fetcher from "@/lib/fetcher/fetcher"

export default async function userVerification() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  const verifyRes = await fetcher.post<{ message: string }>('/user/verify', token)

  if(verifyRes.message) redirect('/home')
}
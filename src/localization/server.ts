'use server'

import isNullOrUndefined from "@/util/isNullOrUndefined"

import { cookies } from "next/headers"

type Translation = { [key: string]: string }

export default async function getTranslation(scope?: string): Promise<(key: string) => string> {
  const cookie = cookies()
  let locale: string | undefined = cookie.get('locale')?.value
  let translation: Translation = {}, module = undefined

  if(isNullOrUndefined(locale)) locale = 'en'

  module = await import(`./${locale}.json`)

  if(scope) translation = module[scope]

  return (key: string) => translation[key]
}
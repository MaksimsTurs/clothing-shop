import { createI18nClient } from "next-international/client"

import { locales } from "./middleware"

import cookies from "@/util/coockies"

export type Languages = typeof locales[number]

const { useScopedI18n, useChangeLocale, useCurrentLocale, I18nProviderClient, useI18n } = createI18nClient({
  'de': async () => import('./de.json'),
  'en': async () => import('./en.json'),
  'ru': async () => import('./ru.json')
})

function changeLanguage(changeFuncRef: any, language: Languages): void { 
  cookies.set('locale', language, 2)
  changeFuncRef(language)
}

export { useScopedI18n, useChangeLocale, useCurrentLocale, I18nProviderClient, changeLanguage, useI18n }
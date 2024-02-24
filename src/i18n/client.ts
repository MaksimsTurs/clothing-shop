import { createI18nClient } from "next-international/client"
import { locales } from "./middleware"
import cookies from "@/util/coockies"

const {
  useScopedI18n,
  useChangeLocale,
  useCurrentLocale,
  I18nProviderClient,
} = createI18nClient({
  'de': async () => import('./lang/de.json'),
  'en': async () => import('./lang/en.json'),
  'ru': async () => import('./lang/ru.json')
})

type Languages = typeof locales[number]

function changeLanguage(changeFuncRef: any, language: Languages) { 
  cookies.updateCookie('locale', language)
  changeFuncRef(language)
}

export { useScopedI18n, useChangeLocale, useCurrentLocale, I18nProviderClient, changeLanguage }
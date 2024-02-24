import { createI18nClient } from "next-international/client"
import { locales } from "./middleware"


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
  const browserCookie: string = document.cookie
  const cookieSplited: string[][] = browserCookie.split(';').map(cookie => cookie.trim().split('='))
  
  if(browserCookie.length === 0) {
    document.cookie = `locale=${language}`
  } else {
    for(let index = 0; index < cookieSplited.length; index++) {
      if(cookieSplited[index][0] === 'locale') {
        document.cookie = `locale=${language}`
      } else {
        document.cookie += `${cookieSplited[index][0]}=${cookieSplited[index][1]};`
      }
    }
  }
  changeFuncRef(language)
}

export { useScopedI18n, useChangeLocale, useCurrentLocale, I18nProviderClient, changeLanguage }
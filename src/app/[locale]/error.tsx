'use client'

import scss from './error.module.scss'

import Header from '@/component/header/header'

import Footer from '@/component/footer/footer'
import { useCurrentLocale } from "@/localization/client"

import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'

export type ErrorProps = { error?: Error | { code: number, message: string }, isChild?: boolean }

export default function Error({ error, isChild }: ErrorProps) {
  const parsedError = JSON.parse(error?.message || '{}')

  let code = parsedError?.code || 400
  let message = parsedError.message || 'Some goes wrong!'

  const language = useCurrentLocale()
  const router = useRouter()

  const goBack = (): any => router.back()

  return(
    <Fragment>
      {!isChild ? <Header/> : null}
      <div className={scss.error_container}>
        <div>
          <p className={scss.error_message}>{code} - {message}</p>
          <section className={scss.error_help_link}>
            <p>Need help?</p>
            <Link href={`/${language}/help`}>Write a email</Link>
            <p>or</p>
            <p className={scss.error_go_back} onClick={goBack}>Go back.</p>
          </section>
        </div>
      </div>
      {!isChild ? <Footer/> : null}
    </Fragment>
  )
}
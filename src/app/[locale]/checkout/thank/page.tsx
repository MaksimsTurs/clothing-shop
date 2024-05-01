import getTranslation from '@/localization/server'
import scss from '../scss/thank.module.scss'

import { BadgeCheck } from 'lucide-react'
import { cookies } from 'next/headers'

import Link from 'next/link'

export default async function Page() {
  const language: string = cookies().get('locale')?.value || 'en'
  const t = await getTranslation('metadata-checkout-thank')

  return(
    <main className={scss.thank_container}>
      <div className={scss.thank_body}>
        <BadgeCheck color="#0080c0" size={50}/>
        <section>
          <p className={scss.thank_title}>{t('greeting')}!</p>
          <div className={scss.thank_link_container}>
            <Link href={`/${language}/home`}>{t('greeting-go-home')}</Link>
            <p>{t('greeting-or')}</p>
            <Link href={`/${language}/search`}>{t('greeting-find')}</Link>
            <p>{t('greeting-other')}!</p>
          </div>
        </section>
      </div>
    </main>
  )
}
import scss from './page.module.scss'

import { AlertCircle } from 'lucide-react'

import getTranslation from '@/localization/server'

import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslation('header-footer')
  return {
    title: t('other-about')
  }
}

export default async function Page() {
  const t = await getTranslation('about-page')

  return(
    <main className={scss.about_container}>
      <div className={scss.about_body}>
        <div className={scss.about_header}>
          <AlertCircle size={30}/>
          <h4>{t('about-title')}!</h4>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>{t('about-text').split('\n').map(text => <p key={text}>{text}</p>)}</div>
      </div>
    </main>
  )
}
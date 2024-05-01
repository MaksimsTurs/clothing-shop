'use client'

import scss from './footer.module.scss'

import Link from 'next/link'
import cookies from '@/util/coockies'

import { useScopedI18n } from '@/localization/client'

export default function Footer() {
  const language: string = cookies.get('locale') || 'en'
  const t = useScopedI18n('header-footer')

  return(
    <footer className={scss.footer_container}>
      <section className={scss.footer_top_section}>
        <h2 className={scss.footer_website_name}>SHOP.COM</h2>
        <div className={scss.footer_list_container}>
          <div>
            <p className={scss.footer_list_name}>{t('dropdown-pages')}</p>
            <ul>
              <li><Link href={`/${language}/`}>{t('home')}</Link></li>
              <li><Link href={`/${language}/search`}>{t('search')}</Link></li>
              <li><Link href={`/${language}/cart`}>{t('cart')}</Link></li>
            </ul>
          </div>
          <div>
            <p className={scss.footer_list_name}>{t('help')}</p>
            <ul>
              <li><Link href={`/${language}/help`}>{t('website-help')}</Link></li>
              <li><Link href={`/${language}/help`}>{t('translation-help')}</Link></li>
              <li><Link href={'/${language}/'}>FAQ</Link></li>
            </ul>
          </div>
          <div>
            <p className={scss.footer_list_name}>{t('other')}</p>
            <ul>
              <li><Link href={'/${language}/'}>{t('other-about')}</Link></li>
              <li><Link href={'/${language}/'}>{t('other-policy')}</Link></li>
            </ul>
          </div>
        </div>
      </section>
      <section className={scss.footer_bottom_section}>
        <p>© 2000-2021, All rights reserved</p>
      </section>
    </footer>
  )
}
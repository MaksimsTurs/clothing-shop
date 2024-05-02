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
        <div className={scss.footer_links_container}>
          <Link href='https://www.tiktok.com/@elizabeteboutique'>
            <svg viewBox="0 0 512 512">
              <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z"/>
            </svg>
          </Link>
          <Link href='https://www.facebook.com/svetlana.985621'>
          <svg viewBox="0 0 24 24">
            <path d="M17.525,9H14V7c0-1.032,0.084-1.682,1.563-1.682h1.868v-3.18C16.522,2.044,15.608,1.998,14.693,2C11.98,2,10,3.657,10,6.699V9H7v4l3-0.001V22h4v-9.003l3.066-0.001L17.525,9z"/>
          </svg>
          </Link>
        </div>
      </section>
    </footer>
  )
}
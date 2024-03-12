import scss from './footer.module.scss'

import getTranslation from '@/i18n/server'

import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function Footer() {
  const tr = await getTranslation('Footer')
  const currLanguage = cookies().get('locale')?.value || 'en'

  return(
    <footer className={scss.footer_container}>
      <section className={scss.footer_top_section}>
        <h2 className={scss.footer_website_name}>SHOP.COM</h2>
        <div className={scss.footer_list_container}>
          <div>
            <p className={scss.footer_list_name}>{tr('pages.title')}</p>
            <ul>
              <li><Link href={`/${currLanguage}/home`}>{tr('home.link')}</Link></li>
              <li><Link href={`${currLanguage}/search`}>{tr('search.link')}</Link></li>
              <li><Link href={`${currLanguage}/cart`}>{tr('cart.link')}</Link></li>
            </ul>
          </div>
          <div>
            <p className={scss.footer_list_name}>{tr('help.title')}</p>
            <ul>
              <li><Link href={`/${currLanguage}/help`}>{tr('website.link')}</Link></li>
              <li><Link href={`/${currLanguage}/help`}>{tr('translate.link')}</Link></li>
              <li><Link href={''}>FAQ</Link></li>
            </ul>
          </div>
          <div>
            <p className={scss.footer_list_name}>{tr('other.title')}</p>
            <ul>
              <li><Link href={''}>{tr('about.link')}</Link></li>
              <li><Link href={''}>{tr('privacy.policy')}</Link></li>
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
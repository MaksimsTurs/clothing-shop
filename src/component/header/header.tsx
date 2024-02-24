'use client'

import scss from './header.module.scss'

import Link from 'next/link'
import Image from 'next/image'
import { useChangeLocale, useScopedI18n, changeLanguage, useCurrentLocale } from '@/i18n/client'

import SearchForm from './component/searchForm'
import UserSection from './component/userSection'
import NavLinks from './component/navLinks'
import AsideMenu from './component/asideMenu'

import en from './img/united-kingdom.png'
import ru from './img/russia.png'
import de from './img/germany.png'

export default function Header() {
	const useLocale = useChangeLocale()
	const currLanguage = useCurrentLocale()
	const tr = useScopedI18n('Header')

	return (
		<header className={scss.header_container}>
			<div className={scss.header_website_label}>
				<AsideMenu/>
				<Link className={scss.header_website_name} href={`/${currLanguage}`}><h1>SHOP.COM</h1></Link>
			</div>
			<nav className={scss.header_nav_menu_container}>
				<button className={scss.header_dropdown_button}>
					<p>{tr('language.button')}</p>
					<svg viewBox='0 0 12 12'>
						<path d='M11.5306 1.53063L6.53063 6.53063C6.46095 6.60055 6.37816 6.65602 6.28699 6.69388C6.19583 6.73173 6.09809 6.75122 5.99938 6.75122C5.90067 6.75122 5.80293 6.73173 5.71176 6.69388C5.6206 6.65602 5.53781 6.60055 5.46813 6.53063L0.468128 1.53063C0.327232 1.38973 0.248077 1.19864 0.248077 0.999378C0.248077 0.80012 0.327232 0.609024 0.468128 0.468128C0.609025 0.327231 0.800121 0.248077 0.999378 0.248077C1.19864 0.248077 1.38973 0.327231 1.53063 0.468128L6 4.9375L10.4694 0.467503C10.6103 0.326607 10.8014 0.247452 11.0006 0.247452C11.1999 0.247452 11.391 0.326607 11.5319 0.467503C11.6728 0.608399 11.7519 0.799496 11.7519 0.998753C11.7519 1.19801 11.6728 1.38911 11.5319 1.53L11.5306 1.53063Z' />
					</svg>
					<ul className={scss.header_dropdown_list}>
						<li onClick={() => changeLanguage(useLocale, 'en')}>
							<Image src={en} alt='English Language' width={20} height={20}/>
							<p>ENG</p>
						</li>
						<li onClick={() => changeLanguage(useLocale, 'ru')}>
							<Image src={ru} alt='Russian Language' width={20} height={20}/>
							<p>RU</p>
						</li>
						<li onClick={() => changeLanguage(useLocale, 'de')}>
							<Image src={de} alt='Germany Language' width={20} height={20}/>
							<p>DE</p>
						</li>
					</ul>
				</button>
				<NavLinks/>
				<SearchForm />
			</nav>
			<UserSection />
		</header>
	)
}

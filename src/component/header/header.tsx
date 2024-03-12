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
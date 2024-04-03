'use client'

import scss from './header.module.scss'

import Link from 'next/link'
import { useSelector } from 'react-redux'

import SearchForm from './component/searchForm'
import UserSection from './component/userSection'
import AsideMenu from './component/asideMenu'
import DropdownList from '../dropdown-list/dropdownList'

import en from './img/united-kingdom.png'
import ru from './img/russia.png'
import de from './img/germany.png'

import type { ListLink } from '../dropdown-list/dropdownList.type'
import type { RootState } from '@/store/store'
import type { UserInitState } from '@/store/user/user.type'

import { useChangeLocale, useScopedI18n, changeLanguage, useCurrentLocale } from '@/i18n/client'

export default function Header() {
	const useLocale = useChangeLocale()
	const tr = useScopedI18n('Header')
	const currLanguage = useCurrentLocale()

	const { userLocal } = useSelector<RootState, UserInitState>(state => state.user)

	const pagesURL: ListLink[] = [
		{ URL: `/${currLanguage}/home`, text: tr('home.link') }, 
		{ URL: `/${currLanguage}/search`, text: tr('search.link') },
		{ URL: `/${currLanguage}/help`, text: 'Help' },
		{ URL: `/${currLanguage}/cart`, text: tr('cart.link') }
	]
	const langList: ListLink[] = [
		{ clickHandler: () => changeLanguage(useLocale, 'en'), text: 'ENG', icon: en }, 
		{ clickHandler: () => changeLanguage(useLocale, 'de'), text: 'DE', icon: de },
		{ clickHandler: () => changeLanguage(useLocale, 'ru'), text: 'RU', icon: ru }
	]
	const userURL: ListLink[] = []

	if(!userLocal) userURL.unshift({ URL: `/${currLanguage}/registration`, text: 'Registration' }, { URL: `/${currLanguage}/login`, text: 'Log in' })

	return (
		<header className={scss.header_container}>
			<div className={scss.header_website_label}>
				<AsideMenu/>
				<Link className={scss.header_website_name} href={`/${currLanguage}/home`}><h1>EB</h1></Link>
			</div>
			<nav className={scss.header_nav_menu_container}>
				<DropdownList listTitle='Pages' data={pagesURL}/>
				<DropdownList listTitle='Languages' data={langList}/>
				{userURL.length > 0 ? <DropdownList listTitle='User' data={userURL}/> : null}
				<SearchForm />
			</nav>
			<UserSection />
		</header>
	)
}
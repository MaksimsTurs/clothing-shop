'use client'

import scss from './header.module.scss'

import Link from 'next/link'

import _SearchForm from './component/searchForm'
import _UserSection from './component/userSection'
import _AsideMenu from './component/asideMenu'
import _DropdownList from '../dropdown-list/dropdownList'

import en from './img/united-kingdom.png'
import ru from './img/russia.png'
import de from './img/germany.png'

import type { ListLink } from '../dropdown-list/dropdownList.type'

import { useChangeLocale, useCurrentLocale, useScopedI18n, changeLanguage } from '@/localization/client'
import { CircleHelp, Home, Search, ShoppingBag, UserPlus } from 'lucide-react'

import useAuth from '@/custom-hook/useAuth/useAuth'
import { memo, useEffect } from 'react'

const SearchForm = memo(_SearchForm)
const UserSection = memo(_UserSection)
const AsideMenu = memo(_AsideMenu)
const DropdownList = memo(_DropdownList)

export default function Header() {
	const language = useCurrentLocale()
	const useChangeLanguage = useChangeLocale()
	const t = useScopedI18n('header-footer')

	const { user, isAuth } = useAuth()

	useEffect(() => {
		isAuth()
	}, [])

	const pagesURL: ListLink[] = [
		{ URL: `/${language}/home`, text: t('home'), icon: <Home/> }, 
		{ URL: `/${language}/search`, text: t('search'), icon: <Search/> },
		{ URL: `/${language}/help`, text: t('help'), icon: <CircleHelp/> },
		{ URL: `/${language}/cart`, text: t('cart'), icon: <ShoppingBag/> }
	]
	const langList: ListLink[] = [
		{ clickHandler: () => changeLanguage(useChangeLanguage, 'en'), text: 'ENG', icon: en }, 
		{ clickHandler: () => changeLanguage(useChangeLanguage, 'de'), text: 'DE', icon: de },
		{ clickHandler: () => changeLanguage(useChangeLanguage, 'ru'), text: 'RU', icon: ru }
	]
	const userURL: ListLink[] = []

	if(!user) userURL.unshift(
		{ URL: `/${language}/registration`, text: t('registration'), icon: <UserPlus/> }, 
		{ URL: `/${language}/login`, text: t('login'), icon: <UserPlus/> }
	)
	
	return (
		<header className={scss.header_container}>
			<div className={scss.header_website_label}>
				<AsideMenu/>
				<Link className={scss.header_website_name} href={`/${language}/home`}><h1>EB</h1></Link>
			</div>
			<nav className={scss.header_nav_menu_container}>
				<div className={scss.header_dropdown_container}>
					<DropdownList listTitle={t('dropdown-pages')} data={pagesURL}/>
					{userURL.length > 0 ? <DropdownList listTitle={t('dropdown-user')} data={userURL}/> : null}
					<DropdownList listTitle={t('dropdown-language')} data={langList}/>
				</div>
				<SearchForm />
			</nav>
			<UserSection />
		</header>
	)
}
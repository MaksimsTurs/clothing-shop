'use client'

import scss from './header.module.scss'

import Link from 'next/link'

import _SearchForm from './component/searchForm'
import _UserSection from './component/userSection'
import _AsideMenu from './component/asideMenu'
import _DropdownList from '../dropdown-list/dropdownList'

import { NavigationListLoader, UserAvatarLoader } from './component/loader'

import en from './img/united-kingdom.png'
import ru from './img/russia.png'
import de from './img/germany.png'

import type { ListLink } from '../dropdown-list/dropdownList.type'

import { useChangeLocale, useCurrentLocale, useScopedI18n, changeLanguage, useI18n } from '@/localization/client'
import { CircleAlert, CircleHelp, Home, Search, ShoppingBag, UserPlus } from 'lucide-react'
import { memo, useEffect } from 'react'

import useAuth from '@/custom-hook/useAuth/useAuth'

const SearchForm = memo(_SearchForm)
const UserSection = memo(_UserSection)
const AsideMenu = memo(_AsideMenu)
const DropdownList = memo(_DropdownList)

export default function Header() {
	const language = useCurrentLocale()
	const useChangeLanguage = useChangeLocale()
	const t = useI18n()

	const auth = useAuth()

	const pagesURL: ListLink[] = [
		{ URL: `/${language}/home`,   text: t('header-footer.home'), 				icon: <Home/> }, 
		{ URL: `/${language}/search`, text: t('header-footer.search'), 			icon: <Search/> },
		{ URL: `/${language}/help`,   text: t('header-footer.help'), 				icon: <CircleHelp/> },
		{ URL: `/${language}/cart`,   text: t('header-footer.cart'), 				icon: <ShoppingBag/> },
		{ URL: `/${language}/about`,  text: t('header-footer.other-about'), icon: <CircleAlert /> }
	]

	const langList: ListLink[] = [
		{ clickHandler: () => changeLanguage(useChangeLanguage, 'en'), text: 'ENG', icon: en }, 
		{ clickHandler: () => changeLanguage(useChangeLanguage, 'de'), text: 'DE', icon: de },
		{ clickHandler: () => changeLanguage(useChangeLanguage, 'ru'), text: 'RU', icon: ru }
	]

	if(!auth.user) pagesURL.unshift(
		{ URL: `/${language}/registration`, text: t('header-footer.registration'), icon: <UserPlus/> }, 
		{ URL: `/${language}/login`, 				text: t('header-footer.login'), 			 icon: <UserPlus/> }
	)

	useEffect(() => {
		auth.isAuth()
	}, [])
	
	return (
		<header className={scss.header_container}>
			<div className={scss.header_body}>
				<AsideMenu/>
				<Link href={`/${language}/home`}><h1>Boutique</h1></Link>
				<nav className={scss.header_nav_menu_container}>
					{(!auth.user && auth.isLoading) ? <NavigationListLoader/> : 
					<div className={scss.header_nav_menu_container}>
						<DropdownList listTitle={t('header-footer.dropdown-pages')} data={pagesURL}/>
						<DropdownList listTitle={t('header-footer.dropdown-language')} data={langList}/>
					</div>}
					<SearchForm />
				</nav>
				{(!auth.user && auth.isLoading) ? <UserAvatarLoader/> : <UserSection />}
			</div>
		{auth.user?.isNew ? <section className={scss.header_new_user_action}>{t('home-page.registrate-to-get-discount')}</section> : null}
		</header>
	)
}
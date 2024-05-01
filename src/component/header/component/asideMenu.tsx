import scss from '../scss/asideMenu.module.scss'

import { Fragment, useState, useEffect, useRef, ReactNode } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'

import { useChangeLocale, useCurrentLocale, useScopedI18n } from '@/localization/client'
import { CircleHelp, Home, Search, ShoppingBag } from 'lucide-react'

import en from '../img/united-kingdom.png'
import ru from '../img/russia.png'
import de from '../img/germany.png'

import type { UserInitState } from '@/store/user/user.type'
import type { ListLink } from '@/component/dropdown-list/dropdownList.type'
import type { RootState } from '@/store/store'

import ExtendedIMG from '@/component/extended-img/extendedIMG'

export default function AsideMenu() {
	const [isMenuVisible, setMenuVisible] = useState<boolean>(false)

	const closeButtonRef = useRef<HTMLButtonElement>(null)
	const openButtonRef = useRef<HTMLButtonElement>(null)
	const sideMenuRef = useRef<HTMLDivElement>(null)

	const t = useScopedI18n('header-footer')
	const language = useCurrentLocale()
	const changeLanguage = useChangeLocale()
	const { yourself } = useSelector<RootState, UserInitState>(state => state.user)

	const pagesURL: ListLink[] = [
		{ URL: `/${language}/home`, text: t('home'), icon: <Home /> }, 
		{ URL: `/${language}/search`, text: t('search'), icon: <Search/> },
		{ URL: `/${language}/help`, text: t('help'), icon: <CircleHelp/> },
		{ URL: `/${language}/cart`, text: t('cart'), icon: <ShoppingBag/> }
	]

	if(yourself) pagesURL.unshift({ URL: `/${language}/user/${yourself.id}`, text: `${yourself.name}`, icon: <ExtendedIMG width={1440} height={1440} src={yourself.avatar} alt={`${yourself.name}`}/> })

	useEffect(() => {
		const outsideClickHandler = (event: any): void => {
			if(event.target === openButtonRef.current) {
				setMenuVisible(true)
			} else if(event.target === closeButtonRef.current) {
				setMenuVisible(false)
			} else if(sideMenuRef && sideMenuRef.current?.contains(event.target)) {
				return
			} else {
				setMenuVisible(false)
			}
		}

		document.addEventListener('click', outsideClickHandler)

		return () => {
			document.removeEventListener('click', outsideClickHandler)
		}
	}, [])

	return (
		<Fragment>
			<button ref={openButtonRef} className={scss.side_menu_button}>
				<span></span>
				<span></span>
				<span></span>
			</button>
			<div className={isMenuVisible ? `${scss.side_menu_container} ${scss.side_menu_container_visible}` : scss.side_menu_container}>
				<aside ref={sideMenuRef} className={scss.side_menu_body}>
					<div className={scss.side_menu_button_container}>
						<button className={scss.side_menu_close_button} ref={closeButtonRef} type='button'>&#10005;</button>
					</div>
					<ul className={scss.side_menu_link_list}>{pagesURL.map(links => <li key={links.URL}><Link href={links.URL!}>{links.icon as ReactNode}{links.text}</Link></li>)}</ul>
					<ul className={scss.side_menu_languages}>
						<li onClick={() => changeLanguage('en')}>
								<ExtendedIMG src={en} alt='English Language' width={20} height={20}/>
								<p>ENG</p>
							</li>
							<li onClick={() => changeLanguage('ru')}>
								<ExtendedIMG src={ru} alt='Russian Language' width={20} height={20}/>
								<p>RU</p>
							</li>
							<li onClick={() => changeLanguage('de')}>
								<ExtendedIMG src={de} alt='Germany Language' width={20} height={20}/>
								<p>DE</p>
							</li>
					</ul>
				</aside>
      </div>
		</Fragment>
	)
}

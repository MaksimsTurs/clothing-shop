'use client'

import scss from '../scss/asideMenu.module.scss'

import { Fragment, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { useCurrentLocale, changeLanguage, useChangeLocale, useScopedI18n } from '@/i18n/client'

import en from '../img/united-kingdom.png'
import ru from '../img/russia.png'
import de from '../img/germany.png'
import { useSelector } from 'react-redux'
import { UserInitState } from '@/store/user/user.type'
import { RootState } from '@/store/store' 

export default function AsideMenu() {
	const [isMenuVisible, setMenuVisible] = useState<boolean>(false)
	const currLanguage = useCurrentLocale()
	const tr = useScopedI18n('Header')
	const useLocale = useChangeLocale()

	const { userLocal } = useSelector<RootState, UserInitState>(state => state.user)

	const URLs = [{ URL: `/${currLanguage}`, name: tr('home.link') },	{ URL: `/${currLanguage}/search`, name: tr('search.link') }, { URL: `/${currLanguage}/cart`, name: tr('cart.link') }]

	if(userLocal) URLs.unshift({ URL: `/${currLanguage}/user/${userLocal.token}`, name: `${userLocal.firstName} ${userLocal.secondName}`})

	const closeButtonRef = useRef<HTMLButtonElement>(null)
	const openButtonRef = useRef<HTMLButtonElement>(null)
	const sideMenuRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const outsideClickHandler = (event: any) => {
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
					<section className={scss.side_menu_header}>
						<form>
							<input 
								className={scss.side_menu_input} 
								type="text" 
								placeholder={tr('search.product.placeholder')}
							/>
						</form>
						<button ref={closeButtonRef} className={scss.side_menu_close_button} type='button'>&#10005;</button>
					</section>
					<ul className={scss.side_menu_link_list}>
						{URLs.map(links => <li key={links.URL}><Link href={links.URL}>{links.name}</Link></li>)}
					</ul>
					<ul className={scss.side_menu_languages}>
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
				</aside>
      </div>
		</Fragment>
	)
}

import scss from '../scss/asideMenu.module.scss'

import { Fragment, useRef } from 'react'
import Link from 'next/link'
import { CircleAlert, CircleHelp, Home, Search, ShoppingBag, UserPlus } from 'lucide-react'
import { useChangeLocale, useCurrentLocale, useScopedI18n, changeLanguage } from '@/localization/client'

import en from '../img/united-kingdom.png'
import ru from '../img/russia.png'
import de from '../img/germany.png'

import ExtendedIMG from '@/component/extended-img/extendedIMG'

import useAuth from '@/custom-hook/useAuth/useAuth'
import useModal from '@/custom-hook/useModal'

export default function AsideMenu() {
	const openButtonRef = useRef<HTMLButtonElement>(null)
	const sideMenuRef = useRef<HTMLDivElement>(null)

	const t = useScopedI18n('header-footer')
	const useChangeLanguage = useChangeLocale()
	const language = useCurrentLocale()

	const isShowed = useModal(sideMenuRef, openButtonRef)
	const { user } = useAuth()

	const pagesURL = [
		{ URL: `/${language}/home`,   text: t('home'), 				icon: <Home size={20}/> }, 
		{ URL: `/${language}/search`, text: t('search'), 			icon: <Search size={20}/> },
		{ URL: `/${language}/help`,   text: t('help'), 				icon: <CircleHelp size={20}/> },
		{ URL: `/${language}/cart`,   text: t('cart'), 				icon: <ShoppingBag size={20}/> },
		{ URL: `/${language}/about`,  text: t('other-about'), icon: <CircleAlert size={20}/> }
	]

	const langList = [
		{ clickHandler: () => changeLanguage(useChangeLanguage, 'en'), text: 'ENG', icon: en }, 
		{ clickHandler: () => changeLanguage(useChangeLanguage, 'de'), text: 'DE', icon: de },
		{ clickHandler: () => changeLanguage(useChangeLanguage, 'ru'), text: 'RU', icon: ru }
	]

	const privateLink = [
		{ URL: 'https://www.tiktok.com/@elizabeteboutique', icon: <svg width={20} height={20} fill='currentColor' viewBox="0 0 512 512"><path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z"/></svg> },
		{ URL: 'https://www.facebook.com/svetlana.985621', icon: <svg width={20} height={20} fill='currentColor' viewBox="0 0 24 24"><path d="M17.525,9H14V7c0-1.032,0.084-1.682,1.563-1.682h1.868v-3.18C16.522,2.044,15.608,1.998,14.693,2C11.98,2,10,3.657,10,6.699V9H7v4l3-0.001V22h4v-9.003l3.066-0.001L17.525,9z"/></svg> }
	]

	if(!user) pagesURL.unshift(
		{ URL: `/${language}/registration`, text: t('registration'), icon: <UserPlus/> }, 
		{ URL: `/${language}/login`, 				text: t('login'), 			 icon: <UserPlus/> }
	)

	return (
		<Fragment>
			<button ref={openButtonRef} className={scss.side_menu_button}>
				<span></span>
				<span></span>
				<span></span>
			</button>
			<aside ref={sideMenuRef} className={isShowed ? `${scss.side_menu_container} ${scss.side_menu_container_visible}` : scss.side_menu_container}>
				{user ? 
					<section className={scss.side_menu_user_container}>
						<ExtendedIMG src={user.avatar} alt={user.name} width={35} height={37}/>
						<Link href={`/${language}/user/${user.id}`}>{user.name}</Link>
					</section> : null}
				<section className={scss.side_menu_list}>
					<h5>Menu</h5>
					{pagesURL.map(url => <Link key={url.URL} href={url.URL!}>{url.icon}<p>{url.text}</p></Link>)}
				</section>
				<section className={scss.side_menu_list}>
					<h5>Languages</h5>
					{langList.map(lang => (
						<button key={lang.text} onClick={lang.clickHandler}>
							<ExtendedIMG src={lang.icon} alt={lang.text} width={25} height={25}/>
							<p>{lang.text}</p>
						</button>
					))}
				</section>
				<section className={scss.side_menu_list}>
					<h5>Social Media</h5>
					{privateLink.map(link => <Link key={link.URL} href={link.URL}>{link.icon}</Link>)}
				</section>
			</aside>
		</Fragment>
	)
}

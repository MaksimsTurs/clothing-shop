'use client'

import scss from '../scss/asideMenu.module.scss'

import { Fragment, useState, useEffect, useRef, SyntheticEvent } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'

import { useCurrentLocale, changeLanguage, useChangeLocale, useScopedI18n } from '@/i18n/client'
import useDebounce from '@/custom-hook/useDebounce'

import en from '../img/united-kingdom.png'
import ru from '../img/russia.png'
import de from '../img/germany.png'

import type { UserInitState } from '@/store/user/user.type'
import type { RootState } from '@/store/store' 
import type { ListLink } from '@/component/dropdown-list/dropdownList.type'
import type { FetchResult } from '@/global.type'
import type { ProductData } from '@/store/admin/admin.type'

import parseJSONError from '@/lib/parseJSONError/parseJSONError'
import fetcher from '@/lib/fetcher/fetcher'

export default function AsideMenu() {
	const [isMenuVisible, setMenuVisible] = useState<boolean>(false)
	const [searchValue, setSearchValue] = useState<string>('')
	const [result, setResult] = useState<FetchResult<ProductData[]>>({ isLoading: false })

	const closeButtonRef = useRef<HTMLButtonElement>(null)
	const openButtonRef = useRef<HTMLButtonElement>(null)
	const sideMenuRef = useRef<HTMLDivElement>(null)

	const title: string = useDebounce(searchValue, 1000)

	const currLanguage = useCurrentLocale()
	const tr = useScopedI18n('Header')
	const useLocale = useChangeLocale()

	const { userLocal } = useSelector<RootState, UserInitState>(state => state.user)

	const pagesURL: ListLink[] = [
		{ URL: `/${currLanguage}/home`, text: tr('home.link') }, 
		{ URL: `/${currLanguage}/search`, text: tr('search.link') },
		{ URL: `/${currLanguage}/help`, text: 'Help' },
		{ URL: `/${currLanguage}/cart`, text: tr('cart.link') }
	]

	if(userLocal) pagesURL.unshift({ URL: `/${currLanguage}/user/${userLocal.token}`, text: `${userLocal.firstName} ${userLocal.secondName}`})

	const liveSearch = (event: SyntheticEvent<HTMLInputElement>) => setSearchValue(event.currentTarget.value)

	useEffect(() => {
		const fetch = async () => {
			setResult({ isLoading: true })
			try {
        const response = await fetcher.get<{ products: ProductData[] }>(`/product/get/by-title/${title}`)
				setResult({ isLoading: false, data: response.products, error: undefined })
			} catch(error) {
				setResult({ isLoading: false, error: parseJSONError(error as string) })
			}
		}
		
		if(searchValue.length > 0) {
			fetch()
		} else {
			setResult({ data: [], isLoading: false })
		}
	}, [title])

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
					<div className={scss.side_menu_search_container}>
						<form>
							<input className={scss.side_menu_input} type="text" placeholder={tr('search.product.placeholder')} onInput={liveSearch}/>
						</form>
						<button className={scss.side_menu_close_button} ref={closeButtonRef} type='button'>&#10005;</button>
					</div>
					<ul className={scss.side_menu_result_container}>
						{result.data && result.data.length > 0 ? result.data.map(data => <li key={data._id}><Link href={`/${currLanguage}/product/${data._id}`}>{data.title}</Link></li>) : <p>NO DATA</p>}
					</ul>
					</section>
					<ul className={scss.side_menu_link_list}>{pagesURL.map(links => <li key={links.URL}><Link href={links.URL!}>{links.text}</Link></li>)}</ul>
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

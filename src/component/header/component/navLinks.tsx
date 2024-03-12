'use client'

import scss from '../scss/navbar.module.scss'

import Link from 'next/link'
import { Fragment } from 'react'
import { usePathname } from 'next/navigation'
import { useCurrentLocale, useScopedI18n } from '@/i18n/client'

export default function NavLinks() {
	const location: string = usePathname()
	const currLanguage = useCurrentLocale()
	const tr = useScopedI18n('Header')

	const URLs: { URL: string, name: string }[] = [{ URL: `/${currLanguage}`, name: tr('home.link') }, { URL: `/${currLanguage}/search`, name: tr('search.link') }, { URL: `/${currLanguage}/cart`, name: tr('cart.link') }]
	
	return (
		<Fragment>
			{URLs.map(URL => (
				<Link
					key={URL.URL}
					className={`${scss.nav_page_link} ${URL.URL === location ? scss.nav_link_active : ''}`}
					href={URL.URL}>
					{URL.name}
				</Link>
			))}
		</Fragment>
	)
}

import '@/scss/root.scss'

import { Inter } from 'next/font/google'

import type { ReactNode } from 'react'

import Provider from '@/store/provider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children, params }: { children: ReactNode,	params: { locale: string } }) {
	return (
		<html lang={params.locale}>
			<link rel="icon" href="/favicon.ico" />
			<body id='root' className={inter.className}>
				<Provider children={children} locale={params.locale}/>
			</body>
		</html>
	)
}

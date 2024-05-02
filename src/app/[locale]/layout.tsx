import '@/scss/root.scss'

import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/next"

import type { ReactNode } from 'react'
import type { Languages } from '@/localization/client'

import Provider from '@/store/provider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children, params }: { children: ReactNode,	params: { locale: Languages } }) {
	const clientID: string = process.env.NODE_ENV === 'development' ? process.env.PAYPAL_CLIENT_SANDBOX! : process.env.PAYPAL_CLIENT_LIVE!

	return (
		<html lang={params.locale}>
			<link rel="icon" href="/favicon.ico" sizes='any'/>
			<body id='root' className={inter.className}>
				<Provider clientID={clientID} lan={params.locale}>{children}</Provider>
				<Analytics/>
				<SpeedInsights/>
			</body>
		</html>
	)
}

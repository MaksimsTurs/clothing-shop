import fetcher from '@/lib/fetcher/fetcher'

import { REVALIDATE_CONF } from '@/const'

export default async function serverRemoveSection(title: string): Promise<void> {
	try {
		await fetcher.get<void>(`/product/section/remove/${title}`, REVALIDATE_CONF)
	} catch(error) {
		throw new Error(error as string)
	}
}

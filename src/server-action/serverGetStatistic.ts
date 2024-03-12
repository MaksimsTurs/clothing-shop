import fetcher from '@/lib/fetcher/fetcher'

import { REVALIDATE_CONF } from '@/const'

type ReturnType = { usersLenght: number, productsLenght: number, brandsLenght: number }

export default async function serverGetStatistic(): Promise<ReturnType> {
  try {
    const response = await fetcher.get<ReturnType>('/common/get/statistic', REVALIDATE_CONF)
    return response
  } catch(error) {
    throw new Error(error as string)
  }
}

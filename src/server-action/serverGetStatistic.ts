import fetcher from '@/lib/fetcher/fetcher'

type ReturnType = {
  usersLenght: number
  productsLenght: number
  brandsLenght: number
}

export default async function serverGetStatistic(): Promise<ReturnType> {
  const response = await fetcher.get<ReturnType>('/common/get/statistic', { time: 60 })
  return response
}

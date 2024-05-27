import scss from '../scss/dataList.module.scss'

import { DataListProps } from '../page.type'

import { useRouter } from 'next/navigation'

export default function DataList({ data, _key }: DataListProps) {
  const router = useRouter()

  return(
    <ul className={scss.data_list_items}>
      <li className={scss.data_list_key}>{_key}</li>
      {data.map(item => <li key={item.title} onClick={() => router.push(`/ru/admin?location=category&id=${item._id}`)}>{item.title}</li>)}
    </ul>
  )
}
'use client'

import scss from '../scss/root.module.scss'

import tabs from '../tabs'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Home, MoveLeft } from 'lucide-react'

import type { GetStoreData } from '@/store/admin/admin.type'
import type { AppDispatch } from '@/store/store'

import useURLTabs from '@/custom-hook/useURLTabs'
import useRequest from '@/custom-hook/useRequest/useRequest'

import { setAdminData } from '@/store/admin/admin'

export default function Root() {
  const router = useRouter()

  const dispatch = useDispatch<AppDispatch>()

  const { tab, changeURL } = useURLTabs()

  const goBack = (): void => router.back()

  const { data } = useRequest<GetStoreData>({ URL: '/admin/get/store', key: 'admin/get/store' })

  useEffect(() => {
    dispatch(setAdminData(data))
  }, [data])

  return(
    <div className={scss.root_panel_container}>
      <nav className={scss.nav_items_list}>
        <Link href={'/ru/home'}>
          <Home />
          <p>Домой</p>
        </Link>
        <button onClick={goBack}>
          <MoveLeft />
          <p>Назад</p>
        </button>
        {Object.entries(tabs).map(tabEntrie => <button key={tabEntrie[1].title} onClick={() => changeURL(`?tab=${tabEntrie[0]}`)}>{tabEntrie[1].icon}<p style={{ pointerEvents: 'none' }}>{tabEntrie[1].title}</p></button>)}
      </nav>
      {tab}
    </div>
  )
}
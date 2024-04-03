import scss from '../scss/dressType.module.scss'

import type { DressTypeProps } from "../search.type";
import type { FilterActionReturn } from '../search.type';

import { useCurrentLocale } from '@/i18n/client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Category({ setFilterState, filterState }: DressTypeProps) {
  const router = useRouter()
  const currCategory = useSearchParams().get('title')
  const currLanguage = useCurrentLocale()

  const { data } = useQuery<FilterActionReturn>({ queryKey: [`page-0', 'category-${currCategory}`], enabled: false })
  
  return(
    <div className={scss.dress_type_container}>
      {data ? data.categories.map(type => (
          <button 
            key={type} 
            className={(filterState.category.includes(type) || currCategory === type)  ? `${scss.dress_type_active_type} ${scss.dress_type_type}` : scss.dress_type_type }
            onClick={() => {
              if(filterState.category.includes(type)) {
                setFilterState(prev => ({ ...prev, category: prev.category.filter(typeToFilter => typeToFilter !== type)}))
                router.replace(`/${currLanguage}/search?page=0`)
              } else {
                setFilterState(prev => ({...prev, category: [...prev.category, type]}))
              }
            }}>{type}</button>
        )) : <p className={scss.dress_type_empty}>No categories!</p>
      }
    </div>
  )
}
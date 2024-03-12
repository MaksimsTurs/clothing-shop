'use client'

import scss from '../scss/priceRange.module.scss'

import { CURR_CURRENCY } from '@/const'

import type { FilterRange } from '../search.type'

export default function FilterRange({ filterState, setFilterState, filterKey, max, min }: FilterRange) {
  return(
    <div className={scss.price_range_container}>
      <input 
        type='range' 
        className={scss.price_range_input} 
        min={min} 
        max={max} 
        step={1} 
        value={filterState[filterKey]}
        onChange={(event) => setFilterState(prev => ({...prev,  [filterKey]: Number(event.target.value)}))}/>
        <div className={scss.price_min_max_container}>
          <p>{min}{filterKey === 'price' ? CURR_CURRENCY : null}</p>
          <p>{filterState[filterKey]}{filterKey === 'price' ? CURR_CURRENCY : null}</p>
          <p>{max}{filterKey === 'price' ? CURR_CURRENCY : null}</p>
        </div>
    </div>
  )
}
import scss from '../scss/dressType.module.scss'

import type { DressTypeProps } from "../search.type";

export default function Category({ setFilterState, filterState }: DressTypeProps) {
  const productTypes = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans']
  
  return(
    <div className={scss.dress_type_container}>
      {
        productTypes.map(type => (
          <button 
            key={type} 
            className={filterState.category.includes(type) ? `${scss.dress_type_active_type} ${scss.dress_type_type}` : scss.dress_type_type }
            onClick={() => {
              if(filterState.category.includes(type)) {
                setFilterState(prev => ({ ...prev, category: prev.category.filter(typeToFilter => typeToFilter !== type)}))
              } else {
                setFilterState(prev => ({...prev, category: [...prev.category, type]}))
              }
            }}>{type}</button>
        ))
      }
    </div>
  )
}
import scss from './dropdownList.module.scss'

import type { DropdownListProps } from './dropdownList.type'

import Link from 'next/link'
import Image from 'next/image'
import { type SyntheticEvent, type CSSProperties, useState } from 'react'

export default function DropdownList({ data, listTitle }: DropdownListProps) {
  const [isHovered, setHover] = useState<boolean>()

  const hover = (event: SyntheticEvent): void => {
    const { type } = event
    if(type === 'mouseenter') return setHover(true) 
    return setHover(false)
  }

  return(
    <button onMouseEnter={hover} onMouseLeave={hover} className={scss.dropdown_title}>
      {listTitle}
      <ul  className={scss.dropdown_list_container}>
        {data.map(element => (
          <li key={element.text} style={!element.URL ? { padding: '0.6rem 1rem' } : undefined} onClick={element.clickHandler || undefined}>
            {element.icon ? <Image alt={element.text} src={element.icon} width={15} height={15}/> : null}
            {element?.URL ? <Link style={element.URL ? { padding: '0.6rem 1rem' } : undefined} href={element.URL}>{element.text}</Link> : element.text}
          </li>
        ))}
      </ul>
    </button>
  )
}

// style={{ height: isHovered ? `calc(${data.length} * 38px)` : '0rem' }}
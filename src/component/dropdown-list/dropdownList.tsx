// @ts-nocheck
import scss from './dropdownList.module.scss'

import type { DropdownListProps } from './dropdownList.type'

import Link from 'next/link'

import ExtendedIMG from '../extended-img/extendedIMG'

export default function DropdownList({ data, listTitle }: DropdownListProps) {
  return(
    <button className={scss.dropdown_title}>
      {listTitle}
      <ul className={scss.dropdown_list_container}>
        {data.map(element => (
          <li key={element.text} onClick={element.clickHandler || undefined}>
            {element?.URL ? 
              <Link href={element.URL}>
                <section>
                  {typeof element.icon?.type === 'object' ? element.icon : <ExtendedIMG alt={element.text} src={element.icon as string} width={15} height={15}/>}
                  {element.text}
                </section>
              </Link> :
            <div>
              <section>
                {typeof element.icon?.type === 'object' ? element.icon : <ExtendedIMG alt={element.text} src={element.icon as string} width={15} height={15}/>}
                {element.text}
              </section>
            </div>}
          </li>
        ))}
      </ul>
    </button>
  )
}
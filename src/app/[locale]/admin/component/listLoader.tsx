import scss from '../scss/listLoader.module.scss'

import { useEffect, useState } from 'react'

export default function ListLoader() {
  const [state, setState] = useState(false)

  const randWidth = (): number => Math.random() * ((14 - 5 + 1) + 5)

  useEffect(() => {
    const intervalID = setInterval(() => setState(prev => !prev), 1000)
    return () => clearInterval(intervalID)
  }, [state])

  return(
    <div className={scss.list_container}>
      {[...Array(14)].map((element, index) => (
        <div key={index} className={scss.list_header}>
          <div style={{ width: `${randWidth()}rem`, transition: 'width 1s ease' }} className={`${scss.default_style} ${scss.list_text}`}></div>
          <div style={{ width: `${randWidth()}rem`, transition: 'width 1s ease' }} className={`${scss.default_style} ${scss.list_text}`}></div>
          <div style={{ width: `${randWidth()}rem`, transition: 'width 1s ease' }} className={`${scss.default_style} ${scss.list_text}`}></div>
          <div style={{ width: `${randWidth()}rem`, transition: 'width 1s ease' }} className={`${scss.default_style} ${scss.list_text}`}></div>
        </div>
      ))}
    </div>
  )
}
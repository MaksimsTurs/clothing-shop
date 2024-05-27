import scss from './smallLoader.module.scss'

import { useEffect } from 'react'

export default function SmallLoader() {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return <div className={scss.fetch_loader_container}><span className={scss.load_loader}></span></div>
}
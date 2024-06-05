import scss from '../scss/aboutUsMini.module.scss'

import { Truck } from 'lucide-react'

import getTranslation from '@/localization/server'

export default async function AboutUsMini() { 
  const t = await getTranslation('home-page')

  return(
    <section className={scss.about_mini_container}>
      <div className={scss.about_mini_body}>
        <div className={scss.about_mini_body_title_container}>
          <Truck />
          <p>{t('delivery-in-germany')}</p>
        </div>
        <p className={scss.about_mini_description}>{t('delivery-in-germany-description')}</p>       
      </div>
      <div className={scss.about_mini_body}>
        <div className={scss.about_mini_body_title_container}>
          <Truck />
          <p>{t('delivery-in-eu')}</p>
        </div>
        <p className={scss.about_mini_description}>{t('delivery-in-eu-description')}</p>
      </div>
    </section>
  )
}
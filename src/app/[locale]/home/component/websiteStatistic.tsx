import scss from '../scss/websiteStatistic.module.scss'

import formatNumber from '@/util/formatNumber'

import type { WebStatisticProps } from '../page.type'

import getTranslation from '@/localization/server'

import AboutUsMini from './aboutUsMini'

export default async function WebsiteStatistic({ statistic }: WebStatisticProps) {
  const t = await getTranslation('website-statistic')

  return(
    <section className={scss.website_statistic_container}>
      <div className={scss.website_statistic_body}>
        <div>
          <h2>{t('title')}</h2>
          <p className={scss.website_statistic_description}>{t('description')}</p>
        </div>
        <div className={scss.website_data_container}>
          <div>
            <p className={scss.website_data_count}>{formatNumber(statistic.usersCount)}</p>
            <p className={scss.website_data_name}>{t('user-count')}</p>
          </div>  
          <div>
            <p className={scss.website_data_count}>{formatNumber(statistic.productsCount)}</p>
            <p className={scss.website_data_name}>{t('product-count')}</p>
          </div>
          <div>
            <p className={scss.website_data_count}>{formatNumber(statistic.ordersCount)}</p>
            <p className={scss.website_data_name}>{t('brand-count')}</p>
          </div>
        </div>
        <AboutUsMini/>
      </div>
    </section>
  )
}
import scss from '../scss/websiteStatistic.module.scss'

import getTranslation from '@/i18n/server'

import formatNumber from '@/util/formatNumber'

import type { WebStatisticProps } from '../page.type'

export default async function WebsiteStatistic({ brandsNumber, productsNumber, usersNumber }: WebStatisticProps) {
  const tr = await getTranslation('Website-Statistic')

  return(
    <section className={scss.website_statistic_container}>
      <div className={scss.website_statistic_body}>
        <div className={scss.website_statistic_greeting_container}>
          <h2>{tr('statistic.title')}</h2>
          <p>{tr('statistic.description')}</p>
        </div>
        <div className={scss.website_data_container}>
          <div className={scss.website_data_body}>
            <p className={scss.website_data_count}>{formatNumber(usersNumber)}</p>
            <p className={scss.website_data_name}>{tr('account.count')}</p>
          </div>  
          <div className={scss.website_data_body}>
            <p className={scss.website_data_count}>{formatNumber(productsNumber)}</p>
            <p className={scss.website_data_name}>{tr('product.count')}</p>
          </div>
          <div className={scss.website_data_body}>
            <p className={scss.website_data_count}>{formatNumber(brandsNumber)}</p>
            <p className={scss.website_data_name}>{tr('brand.count')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
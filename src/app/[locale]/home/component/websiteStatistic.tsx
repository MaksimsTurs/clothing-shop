import scss from '../scss/websiteStatistic.module.scss'

import getTranslation from '@/i18n/server'
import serverGetStatistic from '@/server-action/serverGetStatistic'
import formatNumber from '@/util/formatNumber'

export default async function WebsiteStatistic() {
  const tr = await getTranslation('Website-Statistic')
  const response = await serverGetStatistic()

  return(
    <section className={scss.website_statistic_container}>
      <div className={scss.website_statistic_body}>
        <div className={scss.website_statistic_greeting_container}>
          <h2>{tr('statistic.title')}</h2>
          <p>{tr('statistic.description')}</p>
        </div>
        <div className={scss.website_data_container}>
          <div className={scss.website_data_body}>
            <p className={scss.website_data_count}>{formatNumber(response.usersLenght)}</p>
            <p className={scss.website_data_name}>{tr('account.count')}</p>
          </div>  
          <div className={scss.website_data_body}>
            <p className={scss.website_data_count}>{formatNumber(response.productsLenght)}</p>
            <p className={scss.website_data_name}>{tr('product.count')}</p>
          </div>
          <div className={scss.website_data_body}>
            <p className={scss.website_data_count}>{formatNumber(response.brandsLenght)}</p>
            <p className={scss.website_data_name}>{tr('brand.count')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
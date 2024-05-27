import scss from '../scss/dataItems.module.scss'

import type { DataItemsProps } from '../page.type'

import ExtendedIMG from '@/component/extended-img/extendedIMG'

import Link from 'next/link'

export default function DataItems({ _key, data, precent }: DataItemsProps) {
  return(
    <div className={scss.data_items_container}>
      <p>{_key}</p>
      <ul className={scss.data_items_list}>
        {data?.map(item => (
          <li key={item._id}>
            <Link href={`/ru/admin?location=product&id=${item._id}`}>
              <ExtendedIMG src={(Array.isArray(item.images)) ? item?.images[0] : ((item?.images as unknown) as string)} alt={item.title} width={160} height={80}/>
              <section className={scss.item_data}>
                <section>
                  <p>Название:</p>
                  <p>{item.title}</p>
                </section>
                <section>
                  <p>{item.count ? 'Заказано:' : 'В Наличии:'}</p>
                  <p>{item.count || item.stock}</p>
                </section>
                <section className={scss.item_price}>
                  <p>Цена:</p>
                  <section>
                    <p>{(item.price - ((precent || 0) * item.price)).toFixed(2)}€</p>
                    <p>(-{(precent || 0) * 100}%)</p>
                  </section>
                </section>
              </section>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
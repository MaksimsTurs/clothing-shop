import scss from '../scss/productSelect.module.scss'

import type { ProductSelectProps } from '../page.type'
import type { RootState } from '@/store/store'
import type { AdminInitState } from '@/store/admin/admin.type'

import { useSelector } from 'react-redux'

import ExtendedIMG from '@/component/extended-img/extendedIMG'

export default function ProductSelect({ productsID, setProductIDs }: ProductSelectProps) {
  const { products } = useSelector<RootState, AdminInitState>(state => state.admin)

  const productToSelect = products.filter(product => !product.sectionID)

  return(
    <ul className={scss.section_list}>
      {productToSelect.length > 0 ? productToSelect.map(product => (
        <li onClick={() => {
          if(productsID.includes(product._id)) return setProductIDs(productsID.filter(id => product._id !== id))
          else return setProductIDs(prev => [...prev, product._id])
        }} 
        key={product._id}
        className={productsID.includes(product._id) ? `${scss.section_item_active} ${scss.section_item}` : scss.section_item}>
          <ExtendedIMG alt={product.title} src={product.images[0]} width={90} height={70}/>
          <div className={scss.section_item_data}>
            <h4>{product.title}</h4>
            <section>
              <p>Цена:</p>
              <p>{product.price}€</p>
            </section>
            <section>
              <p>Рейтинг:</p>
              <p>{product.rating}</p>
            </section>
            <section>
              <p>В наличии:</p>
              <p>{product.stock}</p>
            </section>
          </div>
        </li>
      )) : <li style={{ justifyContent: 'center', padding: '0.7rem 0rem' }} className={scss.section_item}>Нет продуктов!</li>}
    </ul>
  )
}
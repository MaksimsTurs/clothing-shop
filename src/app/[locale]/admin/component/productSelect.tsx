import scss from '../scss/productSelect.module.scss'

import type { ProductSelectProps } from '../page.type'
import type { ProductData } from '@/store/admin/admin.type'

import ExtendedIMG from '@/component/extended-img/extendedIMG'
import SelectWrapper from './selectWrapper'

export default function ProductSelect({ productsID, setProductIDs, options }: ProductSelectProps) {
  
  const changeProductsID = (product: ProductData): void => {
    if(productsID.includes(product._id)) setProductIDs(productsID.filter(id => product._id !== id))
    else setProductIDs(prev => [...prev, product._id])
  }

  return(
    <SelectWrapper title='Продукты'>
      {options.length > 0 ? options.map(product => (
        <li onClick={() => changeProductsID(product)} 
          key={product._id}
          className={productsID.includes(product._id) ? `${scss.section_item_active} ${scss.section_item}` : scss.section_item}>
          <ExtendedIMG alt={product.title} src={product.images[0]} width={90} height={70}/>
          <div>
            <h4>{product.title}</h4>
            <section>
              <p>Цена:</p>
              <p>{product.price}€</p>
            </section>
            <section>
              <p>Рейтинг:</p>
              <p>{product.rating}/5</p>
            </section>
            <section>
              <p>В наличии:</p>
              <p>{product.stock}</p>
            </section>
          </div>
        </li>
      )) : <li style={{ justifyContent: 'center', padding: '0.7rem 0rem' }} className={scss.section_item}>Нет продуктов!</li>}
    </SelectWrapper>
  )
}
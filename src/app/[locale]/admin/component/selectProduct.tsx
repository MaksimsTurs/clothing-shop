import scss from '../scss/selectProduct.module.scss'

import type { SelectProductProps } from "../admin.type"

import Image from 'next/image'

export default function SelectProduct({ products, precent, productsID, setProductsID }: SelectProductProps) {
  const filteredArray = products.filter(product => !product.sectionID)
  return(
    <ul className={scss.product_list_container}>
      {
        filteredArray.length > 0 ?
        filteredArray.map(product => (
          <li 
            onClick={() => {
              if(productsID.find(productID => productID === product._id)) {
                setProductsID(prev => prev.filter(productID => productID !== product._id))
              } else {
                setProductsID(prev => ([...prev, product._id]))
              }
            }} 
            className={productsID.find(productID => productID === product._id) ? `${scss.product_list_item} ${scss.product_list_item_active}` : scss.product_list_item} 
            key={product._id}>
            <Image
              src={product.images[0]}
              alt={product.title}
              width={14400}
              height={14400}
              quality={100}/>
              <div>
                <h5 className={scss.product_item_name}>{product.title}</h5>
                <div className={scss.product_item_cost_data}>
                  <p className={scss.product_item_data}>Cost: {product.price}$</p>
                  {precent ? <p className={scss.product_item_cost_with_precent}>(with {(precent * 100).toFixed(2)} % {(product.price - (product.price * precent)).toFixed(2)}$)</p> : null}
                </div>
                <p className={scss.product_item_data}>In Stock: {product.stock}</p>
              </div>
          </li>
        )) : <p className={scss.product_list_emtpy}>No Products</p>
      }
    </ul>
  )
}
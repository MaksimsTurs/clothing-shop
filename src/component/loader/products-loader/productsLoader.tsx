import scss from './productsLoader.module.scss'

export default function ProductsLoader() {
  return(
      <main className={scss.product_loader_container}>
        {[...Array(12)].map((_, index) => (
          <div key={index} className={`${scss.default_style} ${scss.product_loader_card}`}>
            <div className={`${scss.default_style} ${scss.product_loader_image}`}></div>
            <div className={scss.product_loader_data}>
              <p className={`${scss.default_style} ${scss.product_loader_title}`}></p>
              <p className={`${scss.default_style} ${scss.product_loader_description}`}></p>
              <p className={`${scss.default_style} ${scss.product_loader_title}`}></p>
            </div>
          </div>
        ))}
      </main>
  )
}
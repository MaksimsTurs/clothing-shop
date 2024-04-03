import scss from '../scss/brandList.module.scss'

export default function BrandList() {
  return(
    <section className={scss.brand_list_container}>
      <p>VERSACE</p>
      <p>ZARA</p>
      <p>GUCCI</p>
      <p>Calvin Klein</p>
      <p>PRADA</p>
    </section>
  )
}
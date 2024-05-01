import scss from '../scss/dataSection.module.scss'

import type { DataSectionProps } from '../page.type'

export default function DataSection({ _key, value }: DataSectionProps) {
  return(
    <section className={scss.data_section_container}>
      <p>{_key}</p>
      <p>{value}</p>
    </section>
  )
}
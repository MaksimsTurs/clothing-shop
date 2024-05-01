import scss from '../scss/dataLink.module.scss'

import Link from 'next/link'

import type { DataLinkProps } from '../page.type'

export default function DataLink({ href, _key, value }: DataLinkProps) {
  return(
    <Link href={href} className={scss.data_link_container}>
      <p>{_key}</p>
      <p>{value}</p>
    </Link>
  )
}
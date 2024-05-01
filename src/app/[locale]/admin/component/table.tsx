import scss from '../scss/table.module.scss'

import type { TableProps } from "../page.type";
import type { PropsWithChildren } from 'react';

export default function Table({ theader, children }: PropsWithChildren<TableProps>) {
  return(
    <table className={scss.table_container}>
      <thead className={scss.table_header}>
        <tr>{theader.map(header => <th key={header}>{header}</th>)}</tr>
      </thead>
      <tbody className={scss.table_body}>{children}</tbody>
    </table>
  )
}
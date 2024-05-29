import scss from '../scss/dataContainer.module.scss'

import type { PropsWithChildren } from 'react';

export default function DataContainer({ children }: PropsWithChildren) {
  return <div className={scss.data_container}>{children}</div>
}
import scss from '../scss/dataBody.module.scss'

import { Fragment, type PropsWithChildren } from 'react';

import type { DataContainerProps } from '../page.type';

export default function DataBody({ children, data, isLoading }: PropsWithChildren<DataContainerProps>) {
  return <Fragment>{!data ? null : <div className={scss.data_body}>{children}</div>}</Fragment>
}
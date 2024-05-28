import type { ProductData } from "@/store/admin/admin.type"
import type { Dispatch, SetStateAction } from "react"

export type TableProps = { theader: string[] }

export type RemoveButtonProps = { from: RemoveFrom, id?: string | null }
export type RemoveFrom = 'order' | 'product' | 'action' | 'category'

export type FormProps<T = any> = { id?: string | null, isEdit?: boolean, inputValues?: Partial<Record<keyof T, any>> }

export type DataSectionProps = { _key: string, value?: string | number | null }
export type DataLinkProps = { _key: string, value?: string | number | null, href: string }
export type DataImageProps = { images?: string[] | string }
export type DataContainerProps = { data?: any, isLoading?: boolean }
export type DataItemsProps = { _key: string, data?: DataItem[], precent?: number }
export type DataListProps = { _key: string, data: any[] }
type DataItem = { count?: number } & ProductData

export type ActionButtonProps = { label: string, onClick: any, color?: 'red' }

export type ProductSelectProps = { setProductIDs: Dispatch<SetStateAction<string[]>>, productsID: string[], options: ProductData[] }
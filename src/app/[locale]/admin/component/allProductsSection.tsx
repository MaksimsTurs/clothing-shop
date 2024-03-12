import scss from '../scss/dataList.module.scss'

import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

import type { AdminInitState } from '@/store/admin/admin.type'
import type { RootState } from '@/store/store'

export default function AllProductsSection() {
	const router = useRouter()

	const { productsSection } = useSelector<RootState, AdminInitState>(state => state.admin)

	return (
		<table className={scss.data_list_container}>
			<thead>
				<tr>
					<th>Nr.</th>
					<th>Название</th>
					<th>Проценты</th>
					<th>Кол-ство продуктов</th>
				</tr>
			</thead>
			<tbody>
				{productsSection &&
					productsSection.map((section, index) => (
						<tr
							key={section._id}
							onClick={() => router.push(`/ru/admin/product-section?id=${section._id}`)}>
							<td style={{ textAlign: 'center' }}>{index + 1}</td>
							<td>{section.title}</td>
							<td style={{ textAlign: 'center' }}>{(section.precent * 100).toFixed(2) || 0}%</td>
							<td style={{ textAlign: 'center' }}>{section.productID.length}</td>
						</tr>
					))}
			</tbody>
		</table>
	)
}

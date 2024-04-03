import type { AdminInitState } from "../admin.type"

export default function initState() {
  const state: AdminInitState = { isAdminActionLoading: false, adminActionError: undefined, order: [], products: [], productsSection: [], users: [] }

  //Push products.
  state.products[0] = { _id: '1', title: 'Title 1', category: '', sectionID: '', price: 10, stock: 10, precent: null,            createdAt: '', description: '', updatedAt: '', images: [], rating: null },
  state.products[1] = { _id: '2', title: 'Title 2', category: 'Category 1', sectionID: '1', price: 10, stock: 10, precent: 0.05, createdAt: '', description: '', updatedAt: '', images: [], rating: null }

  //Push sections and product.
  state.productsSection[0] = { _id: '1', title: 'Category 1', precent: 0.05, productsID: ['2'], expiredAt: '', updatedAt: '', createdAt: '', products: [] }
  state.productsSection[0].products![0] = state.products[1] //Push second product from state.product into section products array.

  return state
}
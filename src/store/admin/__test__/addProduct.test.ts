import { test, expect } from 'vitest'

import initState from './state'

import type { ProductData, ProductSection } from '../admin.type'

import updateIn from '../tool/updateIn'

test('Add product into the section products array.', () => {
  let state = initState()

  const createdProduct: ProductData = { _id: '3', title: 'Title 3', category: 'Category 1', sectionID: '1', precent: 0.05, price: 10, stock: 10, rating: null, updatedAt: '', createdAt: '', description: '', images: [] }
  const updatedSection: ProductSection = { _id: '1', title: 'Category 1', precent: 0.05, productsID: ['2', '3'], expiredAt: '', updatedAt: '', createdAt: '', products: [] }

  state.productsSection = updateIn<ProductSection>({ _id: updatedSection._id }, {...updatedSection, $push: { products: [createdProduct] } }, state.productsSection)

  expect(state).toStrictEqual({
    ...state,
    productsSection: [{ _id: '1', title: 'Category 1', precent: 0.05, productsID: ['2', '3'], expiredAt: '', updatedAt: '', createdAt: '', products: [state.products[1], createdProduct] }]
  })
})
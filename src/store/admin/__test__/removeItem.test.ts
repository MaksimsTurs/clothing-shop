import { test, expect } from 'vitest'

import initState from './state'

import deleteFrom from '../tool/deleteFrom'
import updateIn from '../tool/updateIn'

import type { ProductData, ProductSection } from '../admin.type'

test('Remove product from product array and from product section with _id == 2', () => {
  const state = initState()

  state.products = deleteFrom<ProductData>({ title: 'Title 2' }, state.products)!
  state.productsSection = state.productsSection.map(section => ({
    ...section, 
    productsID: deleteFrom<string>('2', section.productsID)!,
    products: deleteFrom<ProductData>({ _id: '2' }, section.products)
  }))

  expect(state).toStrictEqual({
    ...state, 
    products: [{ _id: '1', title: 'Title 1', category: '', sectionID: '', price: 10, stock: 10, precent: null, createdAt: '', description: '', updatedAt: '', images: [], rating: null }],
    productsSection: [{ _id: '1', title: 'Category 1', precent: 0.05, productsID: [], expiredAt: '', updatedAt: '', createdAt: '', products: [] }]
  })
})

test('Remove product section and update product properties with section _id == 1', () => {
  const state = initState()

  state.productsSection = deleteFrom<ProductSection>({ _id: '1' }, state.productsSection)!
  state.products = updateIn<ProductData>({ sectionID: '1' }, { sectionID: '', category: '', precent: null }, state.products)

  expect(state).toStrictEqual({
    ...state,
    productsSection: [],
    products: [
      { _id: '1', title: 'Title 1', category: '', sectionID: '', price: 10, stock: 10, precent: null, createdAt: '', description: '', updatedAt: '', images: [], rating: null },
      { _id: '2', title: 'Title 2', category: '', sectionID: '', price: 10, stock: 10, precent: null, createdAt: '', description: '', updatedAt: '', images: [], rating: null }
    ]
  })
})
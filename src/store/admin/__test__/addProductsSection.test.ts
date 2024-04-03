import { test, expect } from "vitest"

import initState from "./state"

import { isInclude } from "../tool/adminUtils"

import type { ProductData, ProductSection } from "../admin.type"
import updateIn from "../tool/updateIn"

test('Insert product into the new product section and save updated products and section.', () => {
  const state = initState()
  const newSection: ProductSection = { _id: '2', title: 'Category 2', productsID: ['1'], precent: 0.5, expiredAt: '', createdAt: '', updatedAt: '', products: [] }

  let products: ProductData[] = []
  
  for(let index: number = 0; index < state.products.length; index++) {
    const currProduct = state.products[index]
    if(isInclude(newSection.productsID, currProduct._id)) {
      const updatedProduct = {...currProduct, precent: newSection.precent, sectionID: newSection._id, category: newSection.title }

      products = [...products, updatedProduct]
      state.products[index] = updatedProduct
    }
  }

  state.productsSection = [...state.productsSection, {...newSection, products }]

  expect(state).toStrictEqual({
    ...state,
    productsSection: [state.productsSection[0], {...newSection, products }],
    products: [
      { _id: '1', title: 'Title 1', category: 'Category 2', sectionID: '2', price: 10, stock: 10, precent: 0.5, createdAt: '', description: '', updatedAt: '', images: [], rating: null },
      state.products[1]
    ],
  })
})
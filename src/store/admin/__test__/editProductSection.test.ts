import { expect, test } from "vitest"

import initState from "./state"

import type { ProductData } from "../admin.type"

test('Update all products and products in section.', () => {
  let state = initState()
  
  let productsSection: ProductData[] = []

  const updatedProductsSection = { _id: '1', title: 'Category 1 (EDITED)', precent: 0.05, productsID: ['2'], expiredAt: '', updatedAt: '', createdAt: '', products: [] }

  //1) Update all products in section
  state.productsSection = state.productsSection.map(section => {
    if(section._id === updatedProductsSection._id) {
      for(let index: number = 0; index < state.products.length; index++) {
        const currProduct = state.products[index]
        if(updatedProductsSection.productsID.includes(currProduct._id)) productsSection = [...productsSection, {...currProduct, sectionID: section._id, precent: updatedProductsSection.precent, category: updatedProductsSection.title }]
      }
      return {...updatedProductsSection, products: productsSection }
    }
    return section
  })

  //2) Update all products
  state.products = state.products.map(product => {
    for(let index: number = 0; index < productsSection.length; index++) {
      if(product._id === productsSection[index]._id && productsSection[index]) return productsSection[index]
    }
    return product
  })

  expect(state).toStrictEqual({
    ...state,
    products: [state.products[0], {...state.products[1], category: 'Category 1 (EDITED)' }],
    productsSection: [{...state.productsSection[0], products: [{...state.products[1], category: 'Category 1 (EDITED)' }]}]
  })
})
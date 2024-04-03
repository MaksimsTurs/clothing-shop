import { expect, test } from "vitest"

import initState from "./state"

import { isInclude, replaceByKey } from "../tool/adminUtils"

import type { ProductData, ProductSection } from "../admin.type"

test('Replace/Push product from section', () => {
  let state = initState()

  const updatedProduct: ProductData = { _id: '2', title: 'Title 2 (EDITED)', category: 'Category 1', sectionID: '1', precent: 0.05, price: 10, stock: 10, rating: null, updatedAt: '', createdAt: '', description: '', images: [] }
  const updatedProductsSection: ProductSection = { _id: '1', title: 'Category 1', precent: 0.05, productsID: ['2'], expiredAt: '', updatedAt: '', createdAt: '', products: [] }

  state.productsSection = state.productsSection.map(section => {
    if(section._id === updatedProductsSection._id) {
      const include: boolean = isInclude(updatedProductsSection.productsID, updatedProduct._id)
      return {
        ...section, 
        productsID: include ? section.productsID : [...section.productsID, updatedProduct._id], 
        products: include ? replaceByKey('_id', section.products!, updatedProduct) : [...section.products || [], updatedProduct]	
      }
    }
    return section
  })

  expect(state).toStrictEqual({
    ...state, 
    productsSection: [{ _id: '1', title: 'Category 1', precent: 0.05, productsID: ['2'], expiredAt: '', updatedAt: '', createdAt: '', products: [updatedProduct] }] 
  })
})
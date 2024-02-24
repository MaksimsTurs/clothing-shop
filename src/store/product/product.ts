import { createSlice } from "@reduxjs/toolkit"
import { ProductInitState } from "./product.type"

import getFilteredProduct from "./action/getFilteredProducts"

const initialState: ProductInitState = {
  currPageProducts: [],
  maxPages: 0,
  productsLength: 0,
  productsRange: { max: 0, min: 0 },
  isLoading: true
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getFilteredProduct.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getFilteredProduct.fulfilled, (state, { payload }) => {
      if(state.maxPages < payload.maxPages || state.maxPages > payload.maxPages) state.maxPages = payload.maxPages
      state.currPageProducts = payload.currPageProducts
      state.productsLength = payload.productsLength
      state.productsRange = payload.productsRange

      state.isLoading = false
    }).addCase(getFilteredProduct.rejected, (state, { payload }) => {
      state.isLoading = false
    })
  },
})

export default productSlice.reducer
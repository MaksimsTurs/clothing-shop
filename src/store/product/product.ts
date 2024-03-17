import { createSlice } from "@reduxjs/toolkit"
import { ProductInitState } from "./product.type"

import getFilteredProduct from "./action/getFilteredProducts"
import parseJSONError from "@/lib/parseJSONError/parseJSONError"

const initialState: ProductInitState = {
  currPageProducts: [],
  maxPages: 0,
  productsLength: 0,
  productsRange: { max: 0, min: 0 },
  isLoading: true,
  filterError: { code: 0, message: '' }
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
/*--------------------------------------Get filtered products------------------------------------------------*/
    builder.addCase(getFilteredProduct.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getFilteredProduct.fulfilled, (state, { payload }) => {
      if(state.maxPages < payload.maxPages || state.maxPages > payload.maxPages) state.maxPages = payload.maxPages
      
      state.currPageProducts = payload.currPageProducts
      state.productsLength = payload.productsLength
      state.productsRange = payload.productsRange

      state.isLoading = false
      state.filterError = undefined
    }).addCase(getFilteredProduct.rejected, (state, { payload }) => {
      const error = parseJSONError(payload as string)

      state.filterError = error
      state.isLoading = false
    })
/*--------------------------------------Get filtered products------------------------------------------------*/
  },
})

export default productSlice.reducer
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { ProductDataWithCount, UserInitState } from "./user.type";
import type { ProductData } from "../product/product.type";

import userLogin from "./action/userLogIn";
import userRegistration from "./action/userRegistration";
import removeMe from "./action/removeMe";
import editUser from "./action/editUser";

import cookies from "@/util/coockies";
import parseJSONError from "@/lib/parseJSONError/parseJSONError";

const initialState: UserInitState  = {
  cart: [],
  userLocal: undefined,
  isUserActionLoading: false,
  userErrorMessage: '',
}

const cartSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeFullProduct: (state, { payload }: PayloadAction<string>) => {
      state.cart = state.cart!.filter(product => product._id !== payload)
    },
    addCartProductCount: (state, { payload }: PayloadAction<{ product: ProductData | ProductDataWithCount, count: number }>) => {
      if(payload.count === 0) return
 
      const existedProduct: ProductDataWithCount | undefined = state.cart.find(cartProduct => cartProduct._id === payload.product._id)
    
      if(!existedProduct) {
        const newStock: number = payload.product.stock - payload.count
        if(newStock >= 0) {
          state.cart = [
            ...state.cart, 
            {
              ...payload.product, 
              stock: (newStock >= 0) ? newStock : 0, 
              count: (newStock >= 0) ? payload.count : payload.product.stock 
            }
          ]
        } 
      } else {
        const newStock: number = existedProduct.stock - payload.count
        state.cart = state.cart.map(cartProduct => {
          if(cartProduct._id === payload.product._id) {
            return {
              ...existedProduct, 
              stock: (newStock >= 0) ? newStock : 0, 
              count: (newStock >= 0) ? payload.count + existedProduct.count : existedProduct.count + existedProduct.stock
            }
          } else {
            return cartProduct
          }
        })
      }
    },
    removeCartProductCount: (state, { payload }: PayloadAction<{ product: ProductData | ProductDataWithCount, count: number }>) => {
      if(!state.cart || payload.count === 0) return

      state.cart = state.cart.map(product => {
        if(product._id === payload.product._id) {
          if(product.count < payload.count) {
            product.stock += product.count
            product.count -= product.count
          } else {
            product.count = product.count - payload.count
            product.stock += payload.count
          }
        }

        return product
      })
    },
    logOut: (state) => {
      state.userLocal = undefined
      state.cart = []

      window.open(`/${cookies.getCookie('locale') || 'en'}/home`, '_self')
    },
  },
  extraReducers(builder) {
/*----------------------------------------User Registration-------------------------------------------------------------*/
    builder.addCase(userRegistration.pending, (state) => {
      state.isUserActionLoading = true
    })
    builder.addCase(userRegistration.rejected, (state, { payload }) => {
      const { message } = parseJSONError(payload as string)

      state.userErrorMessage = message      
      state.isUserActionLoading = false
    })
    builder.addCase(userRegistration.fulfilled, (state, { payload }) => {
      state.userLocal = payload

      state.isUserActionLoading = false
      state.userErrorMessage = ''

      window.open(`/${cookies.getCookie('locale') || 'en'}/home`, '_self')
    })
/*----------------------------------------User Registration-------------------------------------------------------------*/
/*----------------------------------------User Log in-------------------------------------------------------------------*/
    builder.addCase(userLogin.pending, (state) => {
      state.isUserActionLoading = true
    })
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      const { message } = parseJSONError(payload as string)

      state.userErrorMessage = message      
      state.isUserActionLoading = false
    })
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.userLocal = payload

      state.isUserActionLoading = false
      state.userErrorMessage = ''

      window.open(`/${cookies.getCookie('locale') || 'en'}/home`, '_self')
    })
/*----------------------------------------User Log in-------------------------------------------------------------------*/
/*----------------------------------------Remove user-------------------------------------------------------------------*/
    builder.addCase(removeMe.pending, (state) => {
      state.isUserActionLoading = true
    })
    builder.addCase(removeMe.rejected, (state, { payload }) => {
      const { message } = parseJSONError(payload as string)

      state.userErrorMessage = message
      state.isUserActionLoading = false
    })
    builder.addCase(removeMe.fulfilled, (state, { payload }) => {
      const { isRemoved } = payload
      
      if(isRemoved) {
        state.cart = []
        state.userLocal = undefined

        window.open(`/${cookies.getCookie('locale') || 'en'}/home`, '_self')
      }

      state.isUserActionLoading = false
      state.userErrorMessage = ''
    })
/*----------------------------------------Remove user-------------------------------------------------------------------*/
/*----------------------------------------Edit user---------------------------------------------------------------------*/
    builder.addCase(editUser.pending, (state, { payload }) => {
      state.isUserActionLoading = true
    })
    builder.addCase(editUser.rejected, (state, { payload }) => {
      const { message } = parseJSONError(payload as string)

      state.userErrorMessage = message
      state.isUserActionLoading = false
    })
    builder.addCase(editUser.fulfilled, (state, { payload }) => {
      const { firstName, secondName, avatar, token  } = payload
      
      state.userLocal = { firstName, secondName, avatar, token }

      state.isUserActionLoading = false
      state.userErrorMessage = ''
    })
/*----------------------------------------Edit user---------------------------------------------------------------------*/
  },
})

export const { addCartProductCount, removeCartProductCount, removeFullProduct, logOut } = cartSlice.actions

export default cartSlice.reducer
import { createSlice } from "@reduxjs/toolkit";
import type { UserInitState } from "./user.type";

import userLogin from "./action/userLogIn";
import userRegistration from "./action/userRegistration";
import removeMe from "./action/removeMe";
import parseJSONError from "@/lib/parseJSONError/parseJSONError";
import editUser from "./action/editUser";
import cookies from "@/util/coockies";

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
    removeFullProduct: (state, { payload }) => {
      state.cart = state.cart!.filter(product => product._id !== payload._id)
    },
    addCartProductCount: (state, { payload }) => {
      if(payload.count === 0) return
 
      const existedProduct = state.cart.find(cartProduct => cartProduct._id === payload.product._id)
    
      if(!existedProduct) {
        const newStock: number = payload.product.stock - payload.count
          
        if(newStock > 0) {
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
        const newStock = existedProduct.stock - payload.count

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
    removeCartProductCount: (state, { payload }) => {
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
      window.open(`/${cookies.getCookies('locale')}`, '_self')
    },
    resetState: (state) => {
      state.userErrorMessage = ''
      state.isUserActionLoading = false
    },
  },
  extraReducers(builder) {
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

      state.userErrorMessage = ''
      state.isUserActionLoading = false
    })
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

      state.userErrorMessage = ''
      state.isUserActionLoading = false
    })
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
        window.open(`/${cookies.getCookies('locale')}`, '_self')
      }

      state.isUserActionLoading = false
      state.userErrorMessage = ''
    })
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
      state.userErrorMessage = ''
      state.isUserActionLoading = false
    })
  },
})

export const { 
  addCartProductCount, 
  removeCartProductCount, 
  removeFullProduct, 
  logOut,
  resetState,
} = cartSlice.actions

export default cartSlice.reducer
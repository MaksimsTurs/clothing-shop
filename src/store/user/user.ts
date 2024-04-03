import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { ProductInLocalStorage, UserInitState } from "./user.type";
import type { ProductData } from "../admin/admin.type";

import userLogin from "./action/userLogIn";
import userRegistration from "./action/userRegistration";
import removeMe from "./action/removeMe";
import editUser from "./action/editUser";

import cookies from "@/util/coockies";
import parseJSONError from "@/lib/parseJSONError/parseJSONError";
import deleteFrom from "../admin/tool/deleteFrom";

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
      state.cart = deleteFrom<ProductInLocalStorage>({ _id: payload }, state.cart)!
    },
    addCartProductCount: (state, { payload }: PayloadAction<{ product: ProductData | ProductInLocalStorage, count: number }>) => {
      if(payload.count === 0) return
 
      const existedProduct: ProductInLocalStorage | undefined = state.cart.find(cartProduct => cartProduct._id === payload.product._id)
    
      if(!existedProduct) {
        state.cart = [...state.cart, {...payload.product, count: payload.count }]
      } else {
        state.cart = state.cart.map(product => ({...product, count: product.count + payload.count }))
      }
    },
    removeCartProductCount: (state, { payload }: PayloadAction<{ product: ProductData | ProductInLocalStorage, count: number }>) => {
      if(!state.cart || payload.count === 0) return

      state.cart = state.cart.map(product => ({...product, count: ((product.count - payload.count) <= 0) ? 0 : product.count - payload.count }))
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
      state.userErrorMessage = parseJSONError(payload as string).message      
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
      state.userErrorMessage = parseJSONError(payload as string).message      
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
      state.userErrorMessage = parseJSONError(payload as string).message
      state.isUserActionLoading = false
    })
    builder.addCase(removeMe.fulfilled, (state, { payload }) => {
      if(payload.isRemoved) {
        state.cart = []
        state.userLocal = undefined

        window.open(`/${cookies.getCookie('locale') || 'en'}/home`, '_self')
      }

      state.isUserActionLoading = false
      state.userErrorMessage = ''
    })
/*----------------------------------------Remove user-------------------------------------------------------------------*/
/*----------------------------------------Edit user---------------------------------------------------------------------*/
    builder.addCase(editUser.pending, (state) => {
      state.isUserActionLoading = true
    })
    builder.addCase(editUser.rejected, (state, { payload }) => {
      state.userErrorMessage = parseJSONError(payload as string).message
      state.isUserActionLoading = false
    })
    builder.addCase(editUser.fulfilled, (state, { payload }) => {
      state.userLocal = payload

      state.isUserActionLoading = false
      state.userErrorMessage = ''
    })
/*----------------------------------------Edit user---------------------------------------------------------------------*/
  },
})

export const { addCartProductCount, removeCartProductCount, removeFullProduct, logOut } = cartSlice.actions

export default cartSlice.reducer
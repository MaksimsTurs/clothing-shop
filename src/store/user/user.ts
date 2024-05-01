import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";

import type { ProductInLocalStorage, UserClient, UserInitState } from "./user.type";
import type { ProductData } from "../admin/admin.type";

import deleteFrom from "../admin/tool/deleteFrom";
import cookies from "@/util/coockies";

import editMe from "./action/editMe";
import removeMe from "./action/removeMe";
import logIn from "./action/logIn";
import registration from "./action/registration";

const initialState: UserInitState  = {
  cart: [],
  yourself: undefined,
  userActionError: undefined,
  isUserActionPending: false
}

const cartSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.userActionError = undefined
    },
    removeUser: (state) => {
      state.yourself = undefined
    },
    clearCart: (state) => {
      state.cart = []
    },
    removeProduct: (state, { payload }: PayloadAction<string>) => {
      state.cart = deleteFrom<ProductInLocalStorage>({ _id: payload }, state.cart)!
    },
    removeProductCount: (state, { payload }: PayloadAction<{ product: ProductData | ProductInLocalStorage, count: number }>) => {
      if(!state.cart || payload.count === 0) return

      state.cart = state.cart.map(product => {
        if(product._id === payload.product._id) {
          return {...product, count: (product.count - payload.count) <= 0 ? 0 : product.count - payload.count }
        }
        return product
      })
    },
    insertProductCount: (state, { payload }: PayloadAction<{ product: ProductData | ProductInLocalStorage, count: number }>) => {
      if(payload.count === 0) return

      const existedProduct: ProductInLocalStorage | undefined = state.cart.find(cartProduct => cartProduct._id === payload.product._id)
    
      if(!existedProduct) {
        state.cart = [...state.cart, {...payload.product, count: payload.count }]
      } else {
        state.cart = state.cart.map(product => {
          if(product._id === payload.product._id) return {...product, count: payload.count + product.count }
          return product
        })
      }
    },
    logOut: (state) => {
      state.cart = []
      cookies.set('user', state.yourself = undefined)  
    },
  },
  extraReducers(builder) {
    builder.addCase(editMe.pending, (state) => {
      state.isUserActionPending = true
      state.userActionError = undefined
    })
    .addCase(editMe.rejected, (state, { payload }) => {
      state.isUserActionPending = false
      state.userActionError = JSON.parse(String(payload).replace('Error:', ''))
    })
    .addCase(editMe.fulfilled, (state, { payload }) => {
      const existed = cookies.get<UserClient>('user')!
      cookies.set('user', state.yourself = {...existed, ...payload })

      state.isUserActionPending = false
      state.userActionError = undefined
    })
    builder.addCase(removeMe.pending, (state) => {
      state.isUserActionPending = true
      state.userActionError = undefined
    })
    .addCase(removeMe.rejected, (state, { payload }) => {
      state.isUserActionPending = false
      state.userActionError = JSON.parse(String(payload).replace('Error:', ''))
    })
    .addCase(removeMe.fulfilled, () => {
      window.open(`/${cookies.get('locale') || 'en'}/home`, '_self')
    })
    builder.addCase(logIn.pending, (state) => {
      state.isUserActionPending = true
      state.userActionError = undefined
    })
    .addCase(logIn.rejected, (state, { payload }) => {
      state.isUserActionPending = false
      state.userActionError = JSON.parse(String(payload).replace('Error:', ''))
    })
    .addCase(logIn.fulfilled, (state, { payload }) => {
      cookies.set('user', state.yourself = payload, 2)
      state.userActionError = undefined
      state.isUserActionPending = false
      window.open(`/${cookies.get('locale') || 'en'}/home`, '_self')
    })
    builder.addCase(registration.pending, (state) => {
      state.isUserActionPending = true
    })
    .addCase(registration.rejected, (state, { payload }) => {
      state.isUserActionPending = false
      state.userActionError = JSON.parse(String(payload).replace('Error:', ''))
    })
    .addCase(registration.fulfilled, (state, { payload }) => {
      cookies.set('user', state.yourself = payload, 2)
      state.userActionError = undefined
      state.isUserActionPending = false
      window.open(`/${cookies.get('locale') || 'en'}/home`, '_self')
    })
  },
})

export const { logOut, clearCart, clearError, insertProductCount, removeProduct, removeProductCount, removeUser } = cartSlice.actions

export default cartSlice.reducer
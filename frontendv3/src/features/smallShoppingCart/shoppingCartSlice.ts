import { createAppSlice } from "../../app/createAppSlice"
import { postRequestOptions } from "../../utils/constant"
const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
export interface ItemDetailSliceState {
  status: "idle" | "loading" | "failed"
  cartId: number | null,
  items: {
    itemId: number,
    engName: string,
    chiName: string,
    price: number,
    amount: number,
  }[],
}

const initialState: ItemDetailSliceState = {
  status: "idle",
  cartId: null,
  items: [],
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const shoppingCartSlice = createAppSlice({
  name: "shoppingCart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    getCartByUserId: create.asyncThunk(async (data: any) => {
      let requestOption = {
        ...postRequestOptions,
        body: JSON.stringify({
          userName: data
        })
      }
      const response = await fetch(`${BACKEND_SERVER}/cart/getCartByUserId`, requestOption)
      const result = await response.json()
      return result?.result ?? null
    }, {
      pending: state => {
        state.status = "loading"
      },
      fulfilled: (state, action: any) => {
        state.status = "idle"
        if (action.payload != null) {
          state.cartId = action.payload.cartId
          state.items = action.payload.items
        }
      },
      rejected: state => {
        state.status = "failed"
      },
    }),

    addItem: create.asyncThunk(async (data: any) => {
      let requestOption = {
        ...postRequestOptions,
        body: JSON.stringify({
          cartId: data.cartId,
          itemId: data.itemId,
          amount: data.amount,
          userId: data.userId
        })
      }
      let requestLink = ""
      if(data.mode === "ITEM_DETAIL"){
        requestLink = `${BACKEND_SERVER}/cart/addItem`
      }else if(data.mode === "SHOPPING_CART"){
        requestLink= `${BACKEND_SERVER}/cart/addItemInShoppingCart`
      }
      const response = await fetch(requestLink, requestOption)
      const result = await response.json()
      return result?.result ?? null
    }, {
      pending: state => {
        state.status = "loading"
      },
      fulfilled: (state, action: any) => {
        state.status = "idle"
        if (action.payload != null) {
          state.cartId = action.payload.cartId
          state.items = action.payload.items
        }
      },
      rejected: state => {
        state.status = "failed"
      },
    }),

    deleteItem: create.asyncThunk(async (data: any) => {
      let requestOption = {
        ...postRequestOptions,
        body: JSON.stringify({
          cartId: data.cartId,
          itemId: data.itemId,
          amount: data.amount,
          userId: data.userId
        })
      }
      const response = await fetch(`${BACKEND_SERVER}/cart/deleteItem`, requestOption)
      const result = await response.json()
      return result?.result ?? null
    }, {
      pending: state => {
        state.status = "loading"
      },
      fulfilled: (state, action: any) => {
        state.status = "idle"
        if (action.payload != null) {
          state.cartId = action.payload.cartId
          state.items = action.payload.items
        }
      },
      rejected: state => {
        state.status = "failed"
      },
    }),

    clearShoppingCart: create.reducer(state => {
      state.cartId = null;
      state.items = [];
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectCartId: data => data.cartId,
    selectItems: data => data.items,
  },
})

// Action creators are generated for each case reducer function.
export const { getCartByUserId, addItem, deleteItem } =
  shoppingCartSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectCartId,
  selectItems,
} = shoppingCartSlice.selectors
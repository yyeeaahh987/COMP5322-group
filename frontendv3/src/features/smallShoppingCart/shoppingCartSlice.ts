import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AppThunk } from "../../app/store"
import { postRequestOptions } from "../../utils/constant"
// import { fetchCount } from "./counterAPI"
const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
export interface ItemDetailSliceState {
  status: "idle" | "loading" | "failed"
  cartId: number,
  items: {
    itemId: number,
    engName: string,
    chiName: string,
    price: number,
    amount: number,
  }[],
  // productUnit: string
  // productImage: string
  // inStock: boolean
  // price: number
  // stockAmt: number
  // descriptionDetail: string
  // address: string
  // createdBy: string
  // createdDate: string
  // lastUpdatedBy: string
  // lastUpdatedDate: string
  // language: string
  // used: string
}
interface Item {
  itemId: number,
  engName: string,
  chiName: string,
  price: number,
  amount: number,
}
const initialState: ItemDetailSliceState = {
  status: "idle",
  cartId: 0,
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
      console.log(`async`, data)
      let requestOption = {
        ...postRequestOptions,
        body: JSON.stringify({
          cartId: data.cartId,
          itemId: data.itemId,
          amount: data.amount,
          userId: data.userId
        })
      }
      console.log(`requestOption`, requestOption)
      let requestLink = ""
      if(data.mode === "ITEM_DETAIL"){
        requestLink = `${BACKEND_SERVER}/cart/addItem`
      }else if(data.mode === "SHOPPING_CART"){
        requestLink= `${BACKEND_SERVER}/cart/addItemInShoppingCart`
      }
      console.log(`requestLink`,requestLink)
      const response = await fetch(requestLink, requestOption)
      const result = await response.json()
      console.log(`add item `, result)
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
        console.log(`failed`)
        state.status = "failed"
      },
    }),


    // deleteItem: create.reducer((state, action: any) => {
    //     let itemIndex = 0
    //     state.items.forEach((item, index) => {
    //         if (item.itemId === action.payload.itemId) {
    //             itemIndex = index;
    //         }
    //     })

    //     if (state.items[itemIndex].amount === 1) {
    //         // state.items[itemIndex]
    //         let remainArr = []
    //         remainArr = state.items.filter((item, index) => {
    //             return index != itemIndex
    //         })
    //         state.items = remainArr
    //     } else {
    //         state.items[itemIndex] = {
    //             ...state.items[itemIndex],
    //             amount: state.items[itemIndex].amount - 1
    //         }
    //     }
    // }),

    deleteItem: create.asyncThunk(async (data: any) => {
      console.log(`async`, data)
      let requestOption = {
        ...postRequestOptions,
        body: JSON.stringify({
          cartId: data.cartId,
          itemId: data.itemId,
          amount: data.amount,
          userId: data.userId
        })
      }
      console.log(`requestOption`, requestOption)
      const response = await fetch(`${BACKEND_SERVER}/cart/deleteItem`, requestOption)
      const result = await response.json()
      console.log(`delete item `, result)
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
        console.log(`failed`)
        state.status = "failed"
      },
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectCartId: data => data.cartId,
    selectItems: data => data.items,
    // cartId: data => data.productName,
    // selectProductImage: data => data.productImage,
    // selectProductUnit: data => data.productUnit,
    // selectInStock: data => data.inStock,
    // selectPrice: data => data.price,
    // selectStockAmt: data => data.stockAmt,
    // selectDescriptionDetail: data => data.descriptionDetail,
    // selectAddress: data => data.address,
    // selectCreatedBy: data => data.createdBy,
    // selectCreatedDate: data => data.createdDate,
    // selectLastUpdatedBy: data => data.lastUpdatedBy,
    // selectLastUpdatedDate: data => data.lastUpdatedDate,
    // selectLanguage: data => data.language,
    // selectUsed: data => data.used,
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

// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState())

//     if (currentValue % 2 === 1 || currentValue % 2 === -1) {
//       dispatch(incrementByAmount(amount))
//     }
//   }

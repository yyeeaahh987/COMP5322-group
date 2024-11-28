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
        // login: create.reducer(state => {

        // }),
        // validateLogin: create.asyncThunk(async (data: any) => {
        //   // const response = await fetch(amount)
        //   // // The value we return becomes the `fulfilled` action payload
        //   // return response.data
        //   // console.log(`async`, data)
        //   // return true;
        // }, {
        //   pending: state => {
        //     state.status = "loading"
        //   },
        //   fulfilled: (state, action) => {
        //     state.status = "idle"
        //     // if (action.payload != null) {
        //     //   state.loginSuccess = true
        //     // } else {
        //     //   state.loginSuccess = false
        //     // }
        //   },
        //   rejected: state => {
        //     state.status = "failed"
        //   },
        // }),
        addItem: create.reducer((state, action: PayloadAction<Item>) => {
            if (state.items.length === 0) {
                state.items.push({
                    itemId: action.payload.itemId,
                    engName: action.payload.engName,
                    chiName: action.payload.chiName,
                    price: action.payload.price,
                    amount: action.payload.amount,
                })
            } else {
                let itemExist = false
                state.items.forEach((item, index) => {
                    if (item.itemId === action.payload.itemId) {
                        itemExist = true;
                        state.items[index] = {
                            ...item,
                            amount: item.amount + action.payload.amount,
                        }
                    }
                })
                if (itemExist === false) {
                    state.items.push({
                        itemId: action.payload.itemId,
                        engName: action.payload.engName,
                        chiName: action.payload.chiName,
                        price: action.payload.price,
                        amount: action.payload.amount,
                    })
                }
            }
        }),
        deleteItem: create.reducer((state, action: any) => {
            let itemIndex = 0
            state.items.forEach((item, index) => {
                if (item.itemId === action.payload.itemId) {
                    itemIndex = index;
                }
            })

            if (state.items[itemIndex].amount === 1) {
                // state.items[itemIndex]
                let remainArr = []
                remainArr = state.items.filter((item, index) => {
                    return index != itemIndex
                })
                state.items = remainArr
            } else {
                state.items[itemIndex] = {
                    ...state.items[itemIndex],
                    amount: state.items[itemIndex].amount - 1
                }
            }
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
export const { addItem, deleteItem } =
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

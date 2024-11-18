import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AppThunk } from "../../app/store"
import { postRequestOptions, REACT_BACKEND_SERVER } from "../../utils/constant"
// import { fetchCount } from "./counterAPI"

export interface ItemDetailSliceState {
  status: "idle" | "loading" | "failed"
  productName: string
  productUnit: string
  productImage:string
  inStock: boolean
  price: number
  stockAmt: number
  descriptionDetail: string
  address: string
  createdBy: string
  createdDate: string
  lastUpdatedBy: string
  lastUpdatedDate: string
  language: string
  used: string
}

const initialState: ItemDetailSliceState = {
  status: "idle",
  productName: "",
  productImage:"",
  productUnit: "0g",
  inStock: false,
  price: 0.00,
  stockAmt: 50,
  descriptionDetail: "",
  address: "",
  createdBy: "",
  createdDate: "",
  lastUpdatedBy: "",
  lastUpdatedDate: "",
  language: "",
  used: ""
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const itemDetailSlice = createAppSlice({
  name: "itemDetail",
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

    getItemByItemId: create.asyncThunk(
      async (data: any) => {
        // const response = await callAPI
        console.log(`async`, data)
        let requestOption ={
          ...postRequestOptions,
          body: JSON.stringify({ 
            itemId: data
          })
        }

        const response = await fetch(`${REACT_BACKEND_SERVER}/item/getItemByItemId`, requestOption)
        const result = await response.json()
        console.log(`result`, result)
        return result?.result??null
      }, 
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          console.log(`action`,action)
          state.status = "idle"
          if(action.payload !== null){
            state.productName= action.payload.ENG_NAME + action.payload.CHI_NAME
            state.productImage= action.payload.IMAGE
            state.productUnit= action.payload.UNIT
            if((action?.payload?.AMOUNT??0) >0){
              state.inStock = true     
            }else{
              state.inStock = false
            }
            state.stockAmt = action?.payload?.AMOUNT??0
            state.price = action?.payload?.PRICE??0.00
            state.descriptionDetail = action?.payload?.DESCRIPTION??""
          }else{

          }
        },
        rejected: state => {
          state.status = "failed"
        },
      }
    ),

  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectProductName: data => data.productName,
    selectProductImage: data => data.productImage,
    selectProductUnit: data => data.productUnit,
    selectInStock: data => data.inStock,
    selectPrice: data => data.price,
    selectStockAmt: data => data.stockAmt,
    selectDescriptionDetail: data => data.descriptionDetail,
    selectAddress: data => data.address,
    selectCreatedBy: data => data.createdBy,
    selectCreatedDate: data => data.createdDate,
    selectLastUpdatedBy: data => data.lastUpdatedBy,
    selectLastUpdatedDate: data => data.lastUpdatedDate,
    selectLanguage: data => data.language,
    selectUsed: data => data.used,
  },
})

// Action creators are generated for each case reducer function.
export const { getItemByItemId } =
  itemDetailSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectProductName,
  selectProductImage,
  selectProductUnit,
  selectInStock,
  selectPrice,
  selectStockAmt,
  selectDescriptionDetail,
  selectAddress,
  selectCreatedBy,
  selectCreatedDate,
  selectLastUpdatedBy,
  selectLastUpdatedDate,
  selectLanguage,
  selectUsed,
} = itemDetailSlice.selectors

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

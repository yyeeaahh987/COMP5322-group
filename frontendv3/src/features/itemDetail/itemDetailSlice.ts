import { createAppSlice } from "../../app/createAppSlice"
import { postRequestOptions } from "../../utils/constant"
// import { fetchCount } from "./counterAPI"
const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
export interface ItemDetailSliceState {
  status: "idle" | "loading" | "failed"
  productName: string
  productEngName: string
  productChiName: string
  productId:number
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
  productId:0,
  productName: "",
  productEngName: "",
  productChiName: "",
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
    getItemByItemId: create.asyncThunk(async (data: any) => {
        let requestOption ={
          ...postRequestOptions,
          body: JSON.stringify({ 
            itemId: data
          })
        }
        const response = await fetch(`${BACKEND_SERVER}/item/getItemByItemId`, requestOption)
        const result = await response.json()
        return result?.result??null
      }, 
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          if(action.payload !== null){
            state.productId = action.payload.ITEM_ID
            state.productName= action.payload.ENG_NAME + action.payload.CHI_NAME
            state.productEngName= action.payload.ENG_NAME,
            state.productChiName= action.payload.CHI_NAME,
            state.productImage= action.payload.IMAGE
            state.productUnit= action.payload.UNIT
            if((action?.payload?.STOCK??0) >0){
              state.inStock = true     
            }else{
              state.inStock = false
            }
            state.stockAmt = action?.payload?.STOCK??0
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
    selectProductId: data => data.productId,
    selectProductName: data => data.productName,
    selectProductEngName: data => data.productEngName,
    selectProductChiName: data => data.productChiName,
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
  selectProductId,
  selectProductName,
  selectProductEngName,
  selectProductChiName,
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
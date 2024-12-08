import { createAppSlice } from "../../app/createAppSlice"
import { postRequestOptions } from "../../utils/constant"
const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
export interface OrderSliceState {
    status: "idle" | "loading" | "failed"
    orders: {
        orderId: number,
        orderStatus: string,
    }[],
}
const initialState: OrderSliceState = {
    status: "idle",
    orders: [],
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const orderSlice = createAppSlice({
    name: "order",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: create => ({
        placeOrder: create.asyncThunk(async (data: any) => {
            let requestOption ={
                ...postRequestOptions,
                body: JSON.stringify({ 
                  cartId: data.cartId,
                  userId:data.userId,
                })
              }
              const response = await fetch(`${BACKEND_SERVER}/order/place`, requestOption)
              const result = await response.json()
              return result?.result??null
          }, {
            pending: state => {
              state.status = "loading"
            },
            fulfilled: (state, action:any) => {
                state.status = "idle"
                if(action.payload != null){
                    state.orders = []
                }
            },
            rejected: state => {
              state.status = "failed"
            },
        }),
        getOrder: create.asyncThunk(async (data: any) => {
            let requestOption ={
                ...postRequestOptions,
                body: JSON.stringify({ 
                  userId:data,
                })
              }
              const response = await fetch(`${BACKEND_SERVER}/order/getOrderByUserId`, requestOption)
              const result = await response.json()
              return result?.result??null
          }, {
            pending: state => {
              state.status = "loading"
            },
            fulfilled: (state, action:any) => {
                state.status = "idle"
                if(action.payload != null){
                    state.orders = action.payload
                }
            },
            rejected: state => {
              state.status = "failed"
            },
        }),
    }),
    // You can define your selectors here. These selectors receive the slice
    // state as their first argument.
    selectors: {
        selectOrders: data => data.orders
    },
})

// Action creators are generated for each case reducer function.
export const { placeOrder, getOrder } =
orderSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
    selectOrders,
} = orderSlice.selectors

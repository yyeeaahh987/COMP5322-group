import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AppThunk } from "../../app/store"
// import { fetchCount } from "./counterAPI"

export interface UserSliceState {
  // value: number
  status: "idle" | "loading" | "failed"
  loginSuccess: boolean
  userName: string
  password: string
  email: string
  firstName: string
  lastName: string
  chiName: string
  address: string
  createdBy: string
  id: string
  lastUpdatedBy: string
  lastUpdatedDate: string
  phoneNumber: string
  language: string
  used:string
}

const initialState: UserSliceState = {
  status:"idle",
  loginSuccess: false,
  userName: "",
  password: "",
  email: "",
  firstName: "",
  lastName: "",
  chiName: "",
  address: "",
  createdBy: "",
  id: "",
  lastUpdatedBy: "",
  lastUpdatedDate: "",
  phoneNumber: "",
  language: "",
  used:"",
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const userSlice = createAppSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    login:create.reducer(state =>{

    }),
    validateLogin:create.asyncThunk(async(data:any) =>{
      // const response = await callAPI
      console.log(`async`,data)
      return true;
    },{
      pending: state => {
        state.status = "loading"
      },
      fulfilled: (state, action) => {
        state.status = "idle"
        if(action.payload !=null){
          state.loginSuccess = true
        }else{
          state.loginSuccess = false
        }
      },
      rejected: state => {
        state.status = "failed"
      },
    }),

    // increment: create.reducer(state => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // }),
    // decrement: create.reducer(state => {
    //   state.value -= 1
    // }),
    // // Use the `PayloadAction` type to declare the contents of `action.payload`
    // incrementByAmount: create.reducer(
    //   (state, action: PayloadAction<number>) => {
    //     state.value += action.payload
    //   },
    // ),
    // // The function below is called a thunk and allows us to perform async logic. It
    // // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // // will call the thunk with the `dispatch` function as the first argument. Async
    // // code can then be executed and other actions can be dispatched. Thunks are
    // // typically used to make async requests.
    // incrementAsync: create.asyncThunk(
    //   async (amount: number) => {
    //     // const response = await fetchCount(amount)
    //     // // The value we return becomes the `fulfilled` action payload
    //     // return response.data

    //     const response = null
    //     return response;
    //   },
    //   {
    //     pending: state => {
    //       state.status = "loading"
    //     },
    //     fulfilled: (state, action) => {
    //       state.status = "idle"
    //       state.value += action?.payload??0
    //     },
    //     rejected: state => {
    //       state.status = "failed"
    //     },
    //   },
    // ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectLoginSuccess: data => data.loginSuccess,
    selectUserName: data => data.userName,
    selectPassword: data => data.password,
    selectEmail: data => data.email,
    selectFirstName: data => data.firstName,
    selectLastName: data => data.lastName,
    selectChiName: data => data.chiName,
    selectAddress: data => data.address,
    selectCreatedBy: data => data.createdBy,
    selectId: data => data.id,
    selectLastUpdatedBy: data => data.lastUpdatedBy,
    selectLastUpdatedDate: data => data.lastUpdatedDate,
    selectPhoneNumber: data => data.phoneNumber,
    selectLanguage: data => data.language,
    selectUsed:data => data.used,

  },
})

// Action creators are generated for each case reducer function.
export const {  login, validateLogin } =
  userSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { 
  selectLoginSuccess,
  selectUserName,
  selectPassword,
  selectEmail,
  selectFirstName,
  selectLastName,
  selectChiName,
  selectAddress,
  selectCreatedBy,
  selectId,
  selectLastUpdatedBy,
  selectLastUpdatedDate,
  selectPhoneNumber,
  selectLanguage,
  selectUsed
 } = userSlice.selectors

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

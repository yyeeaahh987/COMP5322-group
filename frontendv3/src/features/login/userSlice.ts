import { createAppSlice } from "../../app/createAppSlice"
import { postRequestOptions } from "../../utils/constant"
const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;
export interface UserSliceState {
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
  used: string
}

const initialState: UserSliceState = {
  status: "idle",
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
  used: "",
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const userSlice = createAppSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    login: create.reducer(state => {

    }),
    validateLogin: create.asyncThunk(async (data: any) => {
      let returnObj = {}
      let requestOption = {
        ...postRequestOptions,
        body: JSON.stringify({
          name: data.loginAccountName,
          password: data.loginAccountPasswowrd
        })
      }

      const response = await fetch(`${BACKEND_SERVER}/user/login`, requestOption)
      const result = await response.json()
      returnObj = {
        result: result?.result ?? false,
        userName: data.loginAccountName,
      }
      return returnObj

    }, {
      pending: state => {
        state.status = "loading"
      },
      fulfilled: (state, action: any) => {
        state.status = "idle"
        if (action.payload.result == true) {
          state.loginSuccess = true
          state.userName = action.payload.userName
          localStorage.setItem("userName", action.payload.userName);
          localStorage.setItem("lastActionTime", new Date().toString());
        } else {
          state.loginSuccess = false
          window.alert("Wrong username or password")
        }
      },
      rejected: state => {
        state.status = "failed"
      },
    }),

    getUserDetailByUserName: create.asyncThunk(async (userName: any) => {
      let returnObj = {}
      let requestOption = {
        ...postRequestOptions,
        body: JSON.stringify({
          userId: userName,
        })
      }

      const response = await fetch(`${BACKEND_SERVER}/user/getUserDetailById`, requestOption)
      const result = await response.json()
      returnObj = {
        result: result?.result ?? null,
        userObj: result?.result ?? null
      }
      return returnObj

    }, {
      pending: state => {
        state.status = "loading"
      },
      fulfilled: (state, action: any) => {
        state.status = "idle"
        if (action.payload.result != null) {
          state.loginSuccess = true
          state.userName = action.payload.result.USER_ID
          localStorage.setItem("userName", action.payload.result.USER_ID);
          localStorage.setItem("lastActionTime", new Date().toString());
        } else {
          state.loginSuccess = false
          window.alert("Wrong username or password")
        }
      },
      rejected: state => {
        state.status = "failed"
      },
    }),

    logout: create.reducer(state => {
      localStorage.setItem("userName", "");
      localStorage.setItem("lastActionTime", "");
      state.loginSuccess = false
      state.userName = "" 

    }),
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
    selectUsed: data => data.used,

  },
})

// Action creators are generated for each case reducer function.
export const { login, validateLogin, logout,getUserDetailByUserName } =
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

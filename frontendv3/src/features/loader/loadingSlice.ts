import { createAppSlice } from "../../app/createAppSlice"
export interface LoadingSliceState {
  status: "idle" | "loading" | "failed"
  loadingStatus: boolean
}

const initialState: LoadingSliceState = {
  status: "idle",
  loadingStatus: false,
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const loadingSlice = createAppSlice({
  name: "loading",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    openLoading: create.reducer(state => {
      state.loadingStatus = true;
    }),
    closeLoading: create.reducer(state => {
      state.loadingStatus = false;
    }),
  }),

  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectLoadingStatus: data => data.loadingStatus,
  },
})

// Action creators are generated for each case reducer function.
export const { openLoading, closeLoading } = loadingSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectLoadingStatus,
} = loadingSlice.selectors

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

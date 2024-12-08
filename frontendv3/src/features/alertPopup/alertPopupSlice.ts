import { createAppSlice } from "../../app/createAppSlice"
export interface AlertPopupSliceState {
  popupStatus: boolean
  severity: "error" | "info" | "success" | "warning"
  alertText: string
}
const initialState: AlertPopupSliceState = {
  popupStatus: false,
  severity: "error",
  alertText: "",
}

export const alertPopupSlice = createAppSlice({
  name: "alertPopup",
  initialState,
  reducers: {
    openPopup : (state, action: any) =>{
      state.popupStatus = true;
      state.severity = action.payload.severity;
      state.alertText = action.payload.alertText;
    },
    closePopup : (state) =>{
      state.popupStatus = false;
      state.severity = "error";
      state.alertText = "";
    }
  },
  selectors: {
    selectPopupStatus: data => data.popupStatus,
    selectSeverity: data => data.severity,
    selectAlertText: data => data.alertText,
  },
})

export const { openPopup, closePopup } =
  alertPopupSlice.actions

export const {
  selectPopupStatus,
  selectSeverity,
  selectAlertText,
} = alertPopupSlice.selectors
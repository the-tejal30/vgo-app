import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isDesktop: true,
  fiscalYear: {
    value: null,
    options: [],
    dateRange: { from: null, to: null, min: null, max: null },
  },
  popUpMsgModel: { open: false, message: '' },
}

const appReducer = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDeviceStatus: (state, action) => {
      state.isDesktop = action.payload
    },
    setFiscalYear: (state, action) => {
      state.fiscalYear = { ...state?.fiscalYear, ...action?.payload }
    },
    setPopupMessageModel: (state, action) => {
      state.popUpMsgModel = action.payload
    },
  },
})

export const { setDeviceStatus, setFiscalYear, setPopupMessageModel } =
  appReducer.actions

export default appReducer.reducer

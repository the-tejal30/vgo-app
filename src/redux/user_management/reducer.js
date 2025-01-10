import { createSlice } from '@reduxjs/toolkit'

import { getItem } from '../../utils/localstorage'

const initialState = {
  view_details: [],
  profile_details: JSON.parse(getItem('userData')),
}

const user = createSlice({
  name: 'user',
  initialState: {
    username: null,
    token: null,
  },
  reducers: {
    profileDetails: (state, action) => {
      state.profile_details = action.payload
    },
    logout: (state) => {
      state.profile_details = null;
    },
    setUserDetails: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    clearUserDetails: (state) => {
      state.username = null;
      state.token = null;
    },
  },
})

export const { profileDetails, logout, setUserDetails, clearUserDetails } = user.actions

export default user.reducer

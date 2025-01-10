import { combineReducers } from 'redux'

import appReducer from './app/reducer'
import userReducer from './user_management/reducer'
import { LOGOUT } from '../utils/constant'
import { isEqual } from '../utils/javascript'

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
})

const reducer = (state, action) => {
  if (isEqual(action.type, LOGOUT)) {
    state = undefined
  }
  return rootReducer(state, action)
}

export default reducer

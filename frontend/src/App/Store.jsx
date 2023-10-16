import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './Reducer'
export default configureStore({
  reducer: rootReducer
})
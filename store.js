import { configureStore } from '@reduxjs/toolkit'
import authReducer from './store/auth'
import workoutReducer from './store/workout'

const store = configureStore({
  reducer: {
    auth: authReducer,
    workout: workoutReducer,
  }
})

export default store
import { configureStore } from '@reduxjs/toolkit'
import movieoReducer from './movieoSlice'
//The movieoReducer represents a reducer function that manages a specific slice of your application's state
//here name can be any i think function ka nam rhna movieoSkice ka

export const store = configureStore({
  reducer: {
    movieoData : movieoReducer
  },
})
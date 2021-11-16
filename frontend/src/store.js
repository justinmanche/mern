import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from 'features/api/apiSlice'
import layoutReducer from 'features/layout/layoutSlice'

export default configureStore({
	reducer: {
		layout: layoutReducer,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware)
})

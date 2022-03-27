import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from 'features/api/apiSlice'
import { authSlice, authReducer } from 'shared/features/authSlice'
import layoutReducer from 'features/layout/layoutSlice'
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

export const store = configureStore({
	reducer: {
		layout: layoutReducer,
		[authSlice.name]: authReducer,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		}).concat([
			apiSlice.middleware
		])
})

export const persistor = persistStore(store)

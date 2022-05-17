import { apiSlice } from 'features/api/apiSlice'
import layoutReducer from 'features/layout/layoutSlice'
import { authSlice, authReducer } from 'shared/features/authSlice'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

export default {
	reducer: {
		layout: layoutReducer,
		[authSlice.name]: authReducer,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: (getDefaultMiddleware) => (
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		}).concat([
			apiSlice.middleware
		])
	)
}

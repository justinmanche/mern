import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { userSlice } from 'shared/features/user/userSlice'
import storage from 'redux-persist/lib/storage'

export const authSlice = createSlice({
	name: 'auth',
	initialState: { user: null },
	extraReducers: (builder) => {
		builder
			.addMatcher(
				isAnyOf(
					userSlice.endpoints.login.matchFulfilled,
					userSlice.endpoints.register.matchFulfilled
				),
				(state, { payload }) => { state.user = payload.user	}
			)
			.addMatcher(
				userSlice.endpoints.logout.matchPending,
				(state) => { state.user = null }
			)
	}
})

export const authReducer = persistReducer({
	key: 'rtk:auth',
	storage,
	whitelist: ['user']
}, authSlice.reducer)

export const selectCurrentUser = state => state.auth.user

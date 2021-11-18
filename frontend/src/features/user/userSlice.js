import { createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCurrentUser: builder.query({
			query: () => '/user/current',
			providesTags: ['CurrentUser']
		}),
		loginUser: builder.mutation({
			query: params => ({
				url: '/login',
				method: 'POST',
				body: params
			}),
			transformResponse: response => response.user,
			invalidatesTags: ['CurrentUser']
		}),
		registerUser: builder.mutation({
			query: params => ({
				url: '/register',
				method: 'POST',
				body: params
			}),
			transformResponse: response => response.user,
			invalidatesTags: ['CurrentUser']
		})
	})
})

export const { useGetCurrentUserQuery, useLoginUserMutation, useRegisterUserMutation } = extendedApiSlice

export const selectCurrentUser = createSelector(
	extendedApiSlice.endpoints.getCurrentUser.select(),
	result => result?.data ?? {}
)

export const selectLoggedIn = createSelector(
	selectCurrentUser,
	result => result.id
)

import { createSelector } from '@reduxjs/toolkit'
import { apiSlice } from 'features/api/apiSlice'

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCurrentUser: builder.query({
			query: () => '/user/current',
			providesTags: ['CurrentUser'],
			onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
				try {
					await queryFulfilled
				} catch (err) {
					dispatch(
						apiSlice.util.updateQueryData('getCurrentUser', undefined, () => ({}))
					)
				}
			}
		}),
		loginUser: builder.mutation({
			query: params => ({
				url: '/login',
				method: 'POST',
				body: params
			}),
			invalidatesTags: (result, err) => !err && ['CurrentUser']
		}),
		registerUser: builder.mutation({
			query: params => ({
				url: '/register',
				method: 'POST',
				body: params
			}),
			transformResponse: response => response.user,
			invalidatesTags: ['CurrentUser']
		}),
		logoutUser: builder.mutation({
			query: () => ({
				url: '/logout',
				method: 'POST'
			}),
			invalidatesTags: ['CurrentUser']
		})
	})
})

export const {
	useGetCurrentUserQuery,
	useLoginUserMutation,
	useRegisterUserMutation,
	useLogoutUserMutation
} = extendedApiSlice

export const selectCurrentUser = createSelector(
	extendedApiSlice.endpoints.getCurrentUser.select(),
	result => result?.data ?? {}
)

export const selectLoggedIn = createSelector(
	selectCurrentUser,
	result => result.id
)

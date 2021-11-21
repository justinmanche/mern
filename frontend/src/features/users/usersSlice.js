import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'

import { apiSlice } from 'features/api/apiSlice'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => '/users',
			transformResponse: (res) => {
				return usersAdapter.setAll(initialState, res)
			}
		}),
		getUser: builder.query({
			query: (userId) => `/users/${userId}`,
			providesTags: (result, error, arg) => [{ type: 'User', id: arg }]
		})
	})
})

export const { useGetUsersQuery, useGetUserQuery } = extendedApiSlice

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()

const selectUsersData = createSelector(
	selectUsersResult,
	(usersResult) => usersResult.data
)

export const {
	selectAll: selectAllUsers,
	selectById: selectUserById
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState)

import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query({
            query: () => '/current_user',
            providedTags: ['CurrentUser']
        }),
        loginUser: builder.mutation({
            query: params => ({
                url: '/login',
                method: 'POST',
                body: params
            }),
            invalidatesTags: ['CurrentUser']
        })
    })
})

export const { useGetCurrentUserQuery, useLoginUserMutation } = extendedApiSlice

export const selectCurrentUsersData = createSelector(
    extendedApiSlice.endpoints.getCurrentUser.select(),
    result => result?.data ?? {}
)

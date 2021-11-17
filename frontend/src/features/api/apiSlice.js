import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const reducerPath = 'api'

export const apiSlice = createApi({
	reducerPath,
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3000/api',
		credentials: 'include',
		prepareHeaders: (headers, { getState }) => {

			return headers
		}
	}),
	tagTypes: ['Item', 'CurrentUser'],
	endpoints: (builder) => ({
		getItems: builder.query({
			query: () => '/items',
			providesTags: (result = []) => [
				'Item',
				...result.map(({ id }) => ({ type: 'Item', id }))
			]
		}),
		getItem: builder.query({
			query: (itemId) => `/items/${itemId}`,
			providesTags: (result, error, arg) => [{ type: 'Item', id: arg }]
		}),
		addNewItem: builder.mutation({
			query: (initialItem) => ({
				url: '/items',
				method: 'POST',
				body: initialItem
			}),
			invalidatesTags: ['Item']
		}),
		editItem: builder.mutation({
			query: (item) => ({
				url: `items/${item.id}`,
				method: 'PATCH',
				body: item
			}),
			invalidatesTags: (result, error, arg) => [{ type: 'Item', id: arg.id }]
		}),
		addReaction: builder.mutation({
			query: ({ itemId, reaction }) => ({
				url: `items/${itemId}/reactions`,
				method: 'POST',
				// In a real app, we'd probably need to base this on user ID somehow
				// so that a user can't do the same reaction more than once
				body: { reaction }
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: 'Item', id: arg.itemId }
			]
		})
	})
})

export const {
	useGetItemsQuery,
	useGetItemQuery,
	useAddNewItemMutation,
	useEditItemMutation
} = apiSlice

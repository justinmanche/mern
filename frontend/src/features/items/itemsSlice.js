import { apiSlice } from 'features/api/apiSlice'
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'

const itemsAdapter = createEntityAdapter()

const initialState = itemsAdapter.getInitialState()

export const slice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getItems: builder.query({
			query: params => ({
				url: '/items',
				params
			}),
			transformResponse: res => itemsAdapter.addMany(initialState, res),
			providesTags: (result = []) => [
				'Item',
				...result.ids.map(id => ({ type: 'Item', id }))
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
		})
	})
})

export const {
	useGetItemsQuery,
	useGetItemQuery,
	useAddNewItemMutation,
	useEditItemMutation
} = slice

const selectItemsData = createSelector(
	slice.endpoints.getItems.select(),
	result => result.data
)

export const {
	selectAll: selectAllItems
} = itemsAdapter.getSelectors((state) => selectItemsData(state) ?? initialState)

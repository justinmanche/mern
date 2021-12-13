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
				'Items',
				...result.ids.map(id => ({ type: 'Items', id }))
			]
		}),
		getItem: builder.query({
			query: (itemId) => `/items/${itemId}`,
			providesTags: (result, error, arg) => [{ type: 'Item', id: arg }]
		})
	})
})

export const {
	useGetItemsQuery,
	useGetItemQuery
} = slice

const selectItemsData = createSelector(
	slice.endpoints.getItems.select(),
	result => result.data
)

export const {
	selectAll: selectAllItems
} = itemsAdapter.getSelectors((state) => selectItemsData(state) ?? initialState)

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
		}),
		addNewItem: builder.mutation({
			query: (initialItem) => ({
				url: '/items',
				method: 'POST',
				body: initialItem
			}),
			invalidatesTags: ['Items']
		}),
		editItem: builder.mutation({
			query: (item) => ({
				url: `items/${item.id}`,
				method: 'PATCH',
				body: item
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: 'Items', id: arg.id },
				{ type: 'Item', id: arg.id }
			]
		}),
		destroyItem: builder.mutation({
			query: itemId => ({
				url: `/items/${itemId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Items']
		})
	})
})

export const {
	useGetItemsQuery,
	useGetItemQuery,
	useAddNewItemMutation,
	useEditItemMutation,
	useDestroyItemMutation
} = slice

const selectItemsData = createSelector(
	slice.endpoints.getItems.select(),
	result => result.data
)

export const {
	selectAll: selectAllItems
} = itemsAdapter.getSelectors((state) => selectItemsData(state) ?? initialState)

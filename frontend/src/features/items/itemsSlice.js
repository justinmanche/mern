import { apiSlice } from 'features/api/apiSlice'

export const extendedApiSlice = apiSlice.injectEndpoints({
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
		})
	})
})

export const {
	useGetItemsQuery,
	useGetItemQuery,
	useAddNewItemMutation,
	useEditItemMutation
} = extendedApiSlice

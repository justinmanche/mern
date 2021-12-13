import Items from 'features/items/ItemsList'
import Item from 'features/items/Item'

export default [
	{ name: 'Items', path: '/items', component: Items, private: true },
	{ path: '/items/:itemId', queryKey: 'getItem', replace: 'itemId', component: Item, private: true }
]

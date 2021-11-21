import Items from 'features/items/ItemsList'
import Item from 'features/items/Item'
import ItemEdit from 'features/items/Edit'

export default [
	{ name: 'Items', path: '/items', component: Items, private: true },
	{ path: '/items/:itemId', queryKey: 'getItem', replace: 'itemId', component: Item, private: true },
	{ name: 'Edit', path: '/items/:itemId/edit', queryKey: 'getItem', replace: 'itemId', component: ItemEdit, private: true }
]

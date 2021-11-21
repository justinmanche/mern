import Items from 'features/items/ItemsList'
import Item from 'features/items/Item'
import ItemEdit from 'features/items/Edit'
import User from 'features/users/User'
import Users from 'features/users/UsersList'

export default [
	{ name: 'Items', path: '/items', component: Items, private: true },
	{ path: '/items/:itemId', queryKey: 'getItem', replace: 'itemId', component: Item, private: true },
	{ name: 'Edit', path: '/items/:itemId/edit', queryKey: 'getItem', replace: 'itemId', component: ItemEdit, private: true },
	{ name: 'Users', path: '/users', component: Users, private: true },
	{ path: '/users/:userId', queryKey: 'getUser', replace: 'userId', component: User, private: true, crumbAttr: 'username' }
]

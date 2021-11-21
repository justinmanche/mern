import React, { useMemo } from 'react'
import { useGetItemsQuery, selectAllItems } from 'features/items/itemsSlice'
import { useGetUsersQuery } from 'features/users/usersSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { red, lime } from '@mui/material/colors'
import Spinner from 'components/Spinner'
import AddItemForm from './Add'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'

const Item = ({ item, bg }) => (
	<Card sx={{ my: 2, bgcolor: bg}}>
		<CardActionArea component={Link} to={`/items/${item.id}`}>
			<CardContent>
				<Typography gutterBottom variant="h5">
					{item.name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{item.content}
				</Typography>
				<br />
				<Typography variant="h10" component="div">
					{item.user.username}
				</Typography>
			</CardContent>
		</CardActionArea>
	</Card>
)

const ItemsList = () => {
	const {
		isLoading,
		isSuccess,
		isError,
		error
	} = useGetItemsQuery()
	useGetUsersQuery()
	const items = useSelector(selectAllItems)

	const sortedItems = useMemo(() => {
		const sortedItems = items.slice()
		sortedItems.sort((a, b) => b.created_at.localeCompare(a.created_at))
		return sortedItems
	}, [items])

	return (
		<>
			<AddItemForm />
			{isLoading && <Spinner text="Loading..." />}
			{isError && <div>{error.error}</div>}
			{isSuccess && sortedItems.map((item, i) => (
				<Item key={item.id} bg={i % 2 ? red[50] : lime[100]} item={item} />
			))}
		</>
	)
}

export default ItemsList

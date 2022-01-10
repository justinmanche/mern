import React, { useMemo } from 'react'
import { useGetItemsQuery, selectAllItems } from 'features/items/itemsSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { red, lime } from '@mui/material/colors'
import Spinner from 'shared/components/Spinner'
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
	const items = useSelector(selectAllItems)

	const sortedItems = useMemo(() => {
		const sortedItems = items.slice()
		sortedItems.sort((a, b) => b.created_at.localeCompare(a.created_at))
		return sortedItems
	}, [items])

	return (
		<>
			{isLoading && <Spinner text="Loading..." />}
			{isError && <div>{error.error}</div>}
			{isSuccess && sortedItems.map((item, i) => (
				<Item key={item.id} bg={i % 2 ? red[50] : lime[100]} item={item} />
			))}
		</>
	)
}

export default ItemsList

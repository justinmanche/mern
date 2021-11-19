import React from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'components/Spinner'
import { useGetItemQuery  } from 'features/items/itemsSlice'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Item = ({ match }) => {
	const { itemId } = match.params
	const { data: item, isFetching } = useGetItemQuery(itemId)

	if (isFetching) return <Spinner text="Loading..." />

	return (
		<Box>
			<Typography variant='h2'>{item.title}</Typography>
			<Typography variant="body2" color="text.secondary">
				{item.content}
			</Typography>
			<br />
			<Typography variant="h10" component="div">
				{item.user.username}
			</Typography>
			<Button component={Link} to={`/items/${item.id}/edit`} variant="contained">Edit Item</Button>
		</Box>
	)
}

export default Item

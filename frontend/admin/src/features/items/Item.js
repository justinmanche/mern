import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Spinner from 'shared/components/Spinner'
import Error from 'shared/components/Error'
import { useGetItemQuery, useDestroyItemMutation } from 'features/items/itemsSlice'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Item = ({ match }) => {
	const { itemId } = match.params
	const history = useHistory()
	const { data: item, isSuccess, isFetching, isError } = useGetItemQuery(itemId)
	const [destroyItem] = useDestroyItemMutation()

	if (isFetching) return <Spinner text="Loading..." />
	if (isError || (isSuccess && !item)) return <Error text="Cannot find item" />

	const destroy = async e => {
		e.preventDefault()

		await destroyItem(itemId)
		history.push('/items')
	}

	return (
		<Box>
			<Typography variant='h2'>{item.name}</Typography>
			<Typography variant="body2" color="text.secondary">
				{item.content}
			</Typography>
			<br />
			<Typography variant="h10" component="div">
				{item.user.username}
			</Typography>
			<Button component={Link} to={`/items/${item.id}/edit`} variant="contained">Edit</Button>
			<Button onClick={destroy} variant='contained' color='warning'>Delete</Button>
		</Box>
	)
}

export default Item

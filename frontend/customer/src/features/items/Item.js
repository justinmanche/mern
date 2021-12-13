import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Spinner from 'shared/components/Spinner'
import Error from 'shared/components/Error'
import { useGetItemQuery } from 'features/items/itemsSlice'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Item = ({ match }) => {
	const { itemId } = match.params
	const { data: item, isFetching, isError } = useGetItemQuery(itemId)

	if (isFetching) return <Spinner text="Loading..." />
	if (isError) return <Error text="Cannot find item" />

	return (
		<Box>
			<Typography variant='h2'>{item.name}</Typography>
			<Typography variant="body2" color="text.secondary">
				{item.content}
			</Typography>
		</Box>
	)
}

export default Item

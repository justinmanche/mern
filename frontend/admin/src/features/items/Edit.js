import React from 'react'
import { useHistory } from 'react-router-dom'
import Spinner from 'shared/components/Spinner'
import { useGetItemQuery, useEditItemMutation } from 'features/items/itemsSlice'
import Form from 'features/items/Form'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const Edit = ({ match }) => {
	const { itemId } = match.params
	const history = useHistory()
	const { data: item, isFetching: itemFetching } = useGetItemQuery(itemId)
	const [updateItem, { isLoading }] = useEditItemMutation()

	if (itemFetching) return <Spinner text="Loading item..." />

	const submit = async ({ name, content }) => {
		await updateItem({ id: itemId, name, content })
		history.push(`/items/${itemId}`)
	}

	return (
		<Box>
			<Typography variant='h2'>Edit Item</Typography>
			<Form
				item={item}
				isLoading={isLoading}
				submit={submit} />
			{isLoading && <Spinner text="Saving..." />}
		</Box>
	)
}

export default Edit

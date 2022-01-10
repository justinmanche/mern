import React from 'react'
import { useAddNewItemMutation } from 'features/items/itemsSlice'
import Form from './Form'

const Add = () => {
	const [addNewItem, { isLoading }] = useAddNewItemMutation()

	const submit = async ({ name, content }) => {
		try {
			await addNewItem({ name, content }).unwrap()
		} catch (err) {
			console.error('Failed to save the item: ', err)
		}
	}

	return <Form submit={submit} isLoading={isLoading} />
}

export default Add

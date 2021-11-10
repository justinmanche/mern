import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { useGetItemQuery, useEditItemMutation } from '../api/apiSlice'

export const EditItemForm = ({ match }) => {
	const { itemId } = match.params

	const { data: item } = useGetItemQuery(itemId)

	const [updateItem, { isLoading }] = useEditItemMutation()

	const [title, setTitle] = useState(item.title)
	const [content, setContent] = useState(item.content)

	const history = useHistory()

	const onTitleChanged = (e) => setTitle(e.target.value)
	const onContentChanged = (e) => setContent(e.target.value)

	const onSaveItemClicked = async () => {
		if (title && content) {
			await updateItem({ id: itemId, title, content })
			history.push(`/items/${itemId}`)
		}
	}

	const spinner = isLoading ? <Spinner text="Saving..." /> : null

	return (
		<section>
			<h2>Edit Item</h2>
			<form>
				<label htmlFor="itemTitle">Item Title:</label>
				<input
					type="text"
					id="itemTitle"
					name="itemTitle"
					placeholder="What's on your mind?"
					value={title}
					onChange={onTitleChanged}
					disabled={isLoading}
				/>
				<label htmlFor="itemContent">Content:</label>
				<textarea
					id="itemContent"
					name="itemContent"
					value={content}
					onChange={onContentChanged}
					disabled={isLoading}
				/>
			</form>
			<button type="button" onClick={onSaveItemClicked} disabled={isLoading}>
        Save Item
			</button>
			{spinner}
		</section>
	)
}

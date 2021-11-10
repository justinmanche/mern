import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Spinner } from '../../components/Spinner'
import { useAddNewItemMutation } from '../api/apiSlice'
import { selectAllUsers } from '../users/usersSlice'

export const AddItemForm = () => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [userId, setUserId] = useState('')

	const [addNewItem, { isLoading }] = useAddNewItemMutation()
	const users = useSelector(selectAllUsers)

	const onTitleChanged = (e) => setTitle(e.target.value)
	const onContentChanged = (e) => setContent(e.target.value)
	const onAuthorChanged = (e) => setUserId(e.target.value)

	const canSave = [title, content, userId].every(Boolean) && !isLoading

	const onSaveItemClicked = async () => {
		if (canSave) {
			try {
				await addNewItem({ title, content, user: userId }).unwrap()
				setTitle('')
				setContent('')
				setUserId('')
			} catch (err) {
				console.error('Failed to save the item: ', err)
			}
		}
	}

	const usersOptions = users.map((user) => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	))

	const spinner = isLoading ? <Spinner size="30px" /> : null

	return (
		<section>
			<h2>Add a New Item</h2>
			<form>
				<label htmlFor="itemTitle">Item Title:</label>
				<input
					type="text"
					id="itemTitle"
					name="itemTitle"
					placeholder="What's on your mind?"
					value={title}
					onChange={onTitleChanged} />
				<label htmlFor="itemAuthor">Author:</label>
				<select id="itemAuthor" value={userId} onChange={onAuthorChanged}>
					<option value=""></option>
					{usersOptions}
				</select>
				<label htmlFor="itemContent">Content:</label>
				<textarea
					id="itemContent"
					name="itemContent"
					value={content}
					onChange={onContentChanged} />
				<div
					style={{
						display: 'flex',
						alignItems: 'center'
					}}>
					<button type="button" onClick={onSaveItemClicked} disabled={!canSave}>
            Save Item
					</button>
					{spinner}
				</div>
			</form>
		</section>
	)
}

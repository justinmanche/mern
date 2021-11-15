import React from 'react'
import { useSelector } from 'react-redux'

import { selectUserById } from '../users/usersSlice'

export const ItemAuthor = ({ userId }) => {
	const author = useSelector((state) => selectUserById(state, userId))

	return <span>by {author ? author.name : 'Unknown author'}</span>
}

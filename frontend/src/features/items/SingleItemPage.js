import React from 'react'
import { Link } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { useGetItemQuery } from '../api/apiSlice'

import { ItemAuthor } from './ItemAuthor'

export const SingleItemPage = ({ match }) => {
	const { itemId } = match.params

	const { data: item, isFetching, isSuccess } = useGetItemQuery(itemId)

	let content
	if (isFetching) {
		content = <Spinner text="Loading..." />
	} else if (isSuccess) {
		content = (
			<article className="item">
				<h2>{item.title}</h2>
				<div>
					<ItemAuthor userId={item.user} />
				</div>
				<p className="item-content">{item.content}</p>
				<Link to={`/editItem/${item.id}`} className="button">
          Edit Item
				</Link>
			</article>
		)
	}

	return <section>{content}</section>
}

import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import { Spinner } from '../../components/Spinner'
import { ItemAuthor } from './ItemAuthor'

import { useGetItemsQuery } from 'features/items/itemsSlice'

let ItemExcerpt = ({ item }) => {
	return (
		<article className="item-excerpt" key={item.id}>
			<h3>{item.title}</h3>
			<div>
				<ItemAuthor userId={item.user} />
			</div>
			<p className="item-content">{item.content.substring(0, 100)}</p>

			<Link to={`/items/${item.id}`} className="button muted-button">
        View Item
			</Link>
		</article>
	)
}

const ItemsList = () => {
	const {
		data: items = [],
		isLoading,
		isFetching,
		isSuccess,
		isError,
		error
	} = useGetItemsQuery()

	const sortedItems = useMemo(() => {
		const sortedItems = items.slice()
		sortedItems.sort((a, b) => b.date.localeCompare(a.date))
		return sortedItems
	}, [items])

	let content

	if (isLoading) {
		content = <Spinner text="Loading..." />
	} else if (isSuccess) {
		const renderedItems = sortedItems.map((item) => (
			<ItemExcerpt key={item.id} item={item} />
		))

		const containerClassname = classnames('items-container', {
			disabled: isFetching
		})

		content = <div className={containerClassname}>{renderedItems}</div>
	} else if (isError) {
		content = <div>{error.error}</div>
	}

	return (
		<>
			<h1>Items</h1>
			{content}
		</>
	)
}

export default ItemsList

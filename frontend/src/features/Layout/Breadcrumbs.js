import React from 'react'
import routes from 'routes'
import { useSelector } from 'react-redux'
import { matchPath, withRouter, Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import MuiLink from '@mui/material/Link'


const Breadcrumbs = ({ location }) => {
	const { pathname } = location

	if (pathname === '/') return null

	const queries = useSelector(state => state.api.queries)

	const parsedRoutes = routes.map(route => {
		const match = matchPath(pathname, { path: route.path })
		const paramToReplace = match?.params[route.replace]

		if (!paramToReplace) return route

		return {
			name: route.name,
			queryKey: route.queryKey,
			path: route.path.replace(`:${route.replace}`, paramToReplace),
			id: paramToReplace
		}
	})

	const matchedRoutes = parsedRoutes.filter(({ path }) => pathname.includes(path))

	const crumbs = matchedRoutes.map(({ name, queryKey, id, path }) => {
		if (name) return { path, name }

		const key = `${queryKey}("${id}")`

		return { path: path, name: queries[key]?.data?.name }
	})

	return (
		<MuiBreadcrumbs aria-label="breadcrumb" sx={{ py: 3 }}>
			<MuiLink component={Link} to={'/'} underline="hover" color="inherit">
        Home
			</MuiLink>
			{crumbs.map((crumb, i) => {
				if (i == crumbs.length - 1) {
					return <Typography key={i} color="text.primary">{crumb.name}</Typography>
				}

				return (
					<MuiLink
						key={i}
						component={Link}
						underline="hover"
						color="inherit"
						to={crumb.path}>
						{crumb.name}
					</MuiLink>
				)
			})}
		</MuiBreadcrumbs>
	)
}

export default withRouter(Breadcrumbs)

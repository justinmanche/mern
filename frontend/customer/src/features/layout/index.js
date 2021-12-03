import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useLogoutUserMutation } from 'shared/features/user/userSlice'
import { useIsAuthenticated } from 'shared/features/user/hooks'
import Breadcrumbs from './Breadcrumbs'
import UsersIcon from '@mui/icons-material/PeopleAlt'
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const Layout = ({ children }) => {
	const [open, setOpen] = useState(false)
	const [menuAnchor, setMenuAnchor] = useState(null)
	const [logoutUser] = useLogoutUserMutation()
	const isAuthenticated = useIsAuthenticated()
  const [navAnchor, setNavAnchor] = useState(null)
  const [userAnchor, setUserAnchor] = useState(null)

	const pages = ['Products', 'Pricing', 'Blog'];
	const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

	const logout = () => {
		logoutUser()
		setUserAnchor(null)
	}

	return (
		<Box>
			<CssBaseline />
	    <AppBar position="static">
	      <Container maxWidth="xl">
	        <Toolbar disableGutters>
	          <Typography
	            variant="h6"
	            noWrap
	            component="div"
	            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
	          >
	            LOGO
	          </Typography>

	          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
	            <IconButton
	              size="large"
	              aria-label="account of current user"
	              aria-controls="menu-appbar"
	              aria-haspopup="true"
	              onClick={e => setNavAnchor(e.currentTarget)}
	              color="inherit"
	            >
	              <MenuIcon />
	            </IconButton>
	            <Menu
	              id="menu-appbar"
	              anchorEl={navAnchor}
	              anchorOrigin={{
	                vertical: 'bottom',
	                horizontal: 'left',
	              }}
	              keepMounted
	              transformOrigin={{
	                vertical: 'top',
	                horizontal: 'left',
	              }}
	              open={Boolean(navAnchor)}
	              onClose={() => setNavAnchor(null)}
	              sx={{
	                display: { xs: 'block', md: 'none' },
	              }}
	            >
	              {pages.map((page) => (
	                <MenuItem key={page} onClick={() => setNavAnchor(null)}>
	                  <Typography textAlign="center">{page}</Typography>
	                </MenuItem>
	              ))}
	            </Menu>
	          </Box>
	          <Typography
	            variant="h6"
	            noWrap
	            component="div"
	            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
	          >
	            LOGO
	          </Typography>
	          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
	            {pages.map((page) => (
	              <Button
	                key={page}
	                onClick={() => setNavAnchor(null)}
	                sx={{ my: 2, color: 'white', display: 'block' }}
	              >
	                {page}
	              </Button>
	            ))}
	          </Box>

	          <Box sx={{ flexGrow: 0 }}>
							{
								isAuthenticated
								? <>
										<Tooltip title="Open settings">
				              <IconButton onClick={e => setUserAnchor(e.currentTarget)} sx={{ p: 0 }}>
				                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
				              </IconButton>
				            </Tooltip>
				            <Menu
				              sx={{ mt: '45px' }}
				              id="menu-appbar"
				              anchorEl={userAnchor}
				              anchorOrigin={{
				                vertical: 'top',
				                horizontal: 'right',
				              }}
				              keepMounted
				              transformOrigin={{
				                vertical: 'top',
				                horizontal: 'right',
				              }}
				              open={Boolean(userAnchor)}
				              onClose={() => setUserAnchor(null)}
				            >
											<MenuItem onClick={() => setNavAnchor(null)}>
												<Typography textAlign="center">Profile</Typography>
											</MenuItem>
											<MenuItem onClick={() => setNavAnchor(null)}>
												<Typography textAlign="center">Account</Typography>
											</MenuItem>
											<MenuItem onClick={() => setNavAnchor(null)}>
												<Typography textAlign="center">Dashboard</Typography>
											</MenuItem>
											<MenuItem onClick={() => setNavAnchor(null)}>
												<Typography textAlign="center" onClick={logout}>Logout</Typography>
											</MenuItem>
				            </Menu>
									</>
								: <Button variant='contained' color='success' component={Link} to='/login'>
										<Typography textAlign="center">Login</Typography>
									</Button>
							}
	          </Box>
	        </Toolbar>
	      </Container>
	    </AppBar>
			<Container>
				{children}
			</Container>
		</Box>
  )
}

export default Layout

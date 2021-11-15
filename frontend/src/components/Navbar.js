import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectSidebarOpen, openSidebar, closeSidebar } from 'features/layout/layoutSlice'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { selectCurrentUsersData } from 'features/user/userSlice'

const Navbar = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectCurrentUsersData)
    const sidebarOpen = useSelector(selectSidebarOpen)
    const [menuAnchor, setMenuAnchor] = useState(null)

    const closeMenu = () => {
        setMenuAnchor(null)
    }

    return (
        <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => dispatch(sidebarOpen ? closeSidebar() : openSidebar())}
                    sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MERN
                </Typography>
                {user.id && (
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={(e) => setMenuAnchor(e.currentTarget)}
                            color="inherit">
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={menuAnchor}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(menuAnchor)}
                            onClose={closeMenu}>
                            <MenuItem onClick={closeMenu}>Profile</MenuItem>
                            <MenuItem onClick={closeMenu}>My account</MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar

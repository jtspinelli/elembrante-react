import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, AppBarProps } from './styles';
import { setLoggedUser } from '../../../feature/LoggedUserSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../feature/store';
import { setOpen } from '../../../feature/sideBarSlice';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

const CustomAppBar: React.FC<AppBarProps> = () => {	
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { open, width } = useSelector((state: RootState) => state.sideBarReducer);
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const handleDrawerOpen = () => {
		dispatch(setOpen(true));
	};

	const closeMenu = () => {
		setAnchorEl(null);
	};

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	function logout(){
		dispatch(setLoggedUser(null));
		navigate('/login');
	}

	return (
		<AppBar position="fixed" open={open} drawerwidth={width}>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: 'none' }) }}
					>
						<MenuIcon />
					</IconButton>

					<Typography variant="h6" noWrap component="div">
            				Elembrante
					</Typography>
				</Box>
				
				<Box>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleMenu}
						color="inherit"
					>
						<AccountCircle />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={Boolean(anchorEl)}
						onClose={closeMenu}
					>
						<MenuItem onClick={closeMenu}>Minha conta</MenuItem>
						<MenuItem onClick={logout}>Sair</MenuItem>
					</Menu>
				</Box>			
			</Toolbar>
		</AppBar>
	);
};

export default CustomAppBar;
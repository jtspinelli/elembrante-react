import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../../feature/sideBarSlice';
import { RootState } from '../../../feature/store';
import { AppBar, AppBarProps } from './styles';

const CustomAppBar: React.FC<AppBarProps> = () => {	
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [auth, setAuth] = useState(true);
	const { open, width } = useSelector((state: RootState) => state.sideBarReducer);

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

				{auth && (
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
							<MenuItem onClick={closeMenu}>Sair</MenuItem>
						</Menu>
					</Box>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default CustomAppBar;
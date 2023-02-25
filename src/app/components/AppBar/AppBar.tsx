import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import { AppBar, AppBarProps, AppIcon, AppTitle, Toolbar } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedUser } from '../../../features/users/LoggedUserSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { setOpen } from '../../../features/sideBar/sideBarSlice';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Icon from '../AppIcon/AppIcon';

const CustomAppBar: React.FC<AppBarProps> = () => {	
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { open, width } = useSelector((state: RootState) => state.sideBarReducer);
	const { loggedUser } = useSelector((state: RootState) => state.loggedUsersReducer);
	const navigate = useNavigate();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('ssm'));
	const upSm = useMediaQuery(theme.breakpoints.up('sm'));

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

	function getLoggedUserFirstName(){
		return loggedUser?.nome.split(' ')[0];
	}

	return (
		<AppBar position="fixed" open={open} drawerwidth={width} upsm={upSm ? 1 : 0}>
			<Toolbar>
				<Box>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: 'none' }) }}
					>
						<MenuIcon />
					</IconButton>
					
					<AppIcon> <Icon colorDefault={false} /> </AppIcon>
					
					<AppTitle variant="h6"> Elembrante </AppTitle>
				</Box>
				
				<Box>
					{ matches && 
						<Typography>{getLoggedUserFirstName()}</Typography>
					}
					
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
import React from 'react';
import { Drawer, IconButton, useTheme, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DrawerHeader } from './styles';
import { RootState } from '../../../feature/store';
import { setOpen } from '../../../feature/sideBarSlice';
import { NavLink } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';

const CustomDrawer: React.FC = () => {
	const { open, width } = useSelector((state: RootState) => state.sideBarReducer);
	const theme = useTheme();
	const dispatch = useDispatch();

	const closeDrawer = () => {
		dispatch(setOpen(false));
	};

	return (
		<Drawer
			sx={{
				width: width,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width,
					boxSizing: 'border-box',
				},
			}}
			variant="persistent"
			anchor="left"
			open={open}
		>
			<DrawerHeader>
				<IconButton onClick={closeDrawer}>
					{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List sx={{
				'&>*': {
					textDecoration: 'none',
					color: 'rgba(0, 0, 0, 0.87)'
				},		
				'& .active .active-mark': {
					backgroundColor: theme.palette.primary.main
				},
				'& .active .link-icon': {
					color: theme.palette.primary.main
				}
			}}>
				<NavLink to='/' className={(navData) => (navData.isActive ? 'active' : '')}>
					<ListItem key={'main'} disablePadding>
						<Box className="active-mark" sx={{ backgroundColor: 'transparent', width: '4px', height: '48px', position: 'absolute' }} />
						<ListItemButton>
							<ListItemIcon className='link-icon'> <NoteAltOutlinedIcon /> </ListItemIcon>
							<ListItemText primary='Meus lembretes' />
						</ListItemButton>
					</ListItem>
				</NavLink>

				<NavLink to='/arquivo' className={(navData) => (navData.isActive ? 'active' : '')}>
					<ListItem key={'archive'} disablePadding>
						<Box className="active-mark" sx={{ backgroundColor: 'transparent', width: '4px', height: '48px', position: 'absolute' }} />
						<ListItemButton>
							<ListItemIcon className='link-icon'> <ArchiveOutlinedIcon /> </ListItemIcon>
							<ListItemText primary='Arquivo' />
						</ListItemButton>
					</ListItem>
				</NavLink>
			</List>
		</Drawer>
	);
};

export default CustomDrawer;


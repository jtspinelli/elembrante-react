import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import AppIcon from '../AppIcon/AppIcon';

const Logo: React.FC = () => {
	const theme = useTheme();
	
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
			<AppIcon colorDefault={true} />

			<Typography sx={{ color: theme.palette.grey[600], fontSize: '1.5rem', marginLeft: '8px', fontWeight: 100 }}>elembrante</Typography>	

		</Box>
	);
};

export default Logo;
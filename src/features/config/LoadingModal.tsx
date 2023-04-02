import { Box, CircularProgress, Modal, Stack } from '@mui/material';
import React from 'react';

export const LoadingModal: React.FC = () => {
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'transparent',
		border: 'none',
		borderRadius: '8px',
		outline: 'none',
		boxShadow: 'none',
		p: 2,
		pointerEvents: 'none',
		'.MuiTypography-root': {
			margin: 0
		}
	};

	return (
		<Modal
			open={true}
			aria-labelledby="loading"
			aria-describedby="modal displayed when communicating with database"
		>
			<Box sx={style}>
				<Stack sx={{ color: 'grey.500', width: '100%', justifyContent: 'center' }} spacing={2} direction="row">
					<CircularProgress sx={{ color: '#fff' }} />
				</Stack>
			</Box>
		</Modal>
	);
};


export default LoadingModal;
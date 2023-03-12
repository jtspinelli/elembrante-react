import React, { useEffect, useState } from 'react';
import store, { RootState } from '../store';
import { SnackbarKey, useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { archiveOne, recoverOne } from '../../features/lembretes/lembreteSlice';
import { archiveLembrete } from '../../features/lembretes/thunks';
import { Button } from '@mui/material';
import Lembrete from '../types/Lembrete';

const useSafeRemove = () => {
	const [ lembrete, setLemb ] = useState<Lembrete>();
	const [ operation, _setOperation ] = useState<string>('');
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const dispatch = useDispatch();
	const { loggedUser } = useSelector((state: RootState) => state.loggedUsersReducer);

	function safeRemove(lembrete: Lembrete){
		setOperation('delete', lembrete);
	}

	function safeArchive(lembrete: Lembrete){
		setOperation('archive', lembrete);
	}

	function setOperation(operation: string, lembrete: Lembrete){
		_setOperation(operation);
		setLemb(lembrete);
	}

	useEffect(() => {
		if(!lembrete || !loggedUser) return;

		if(operation === 'archive') dispatch(archiveOne(lembrete.id));

		showSnackbar();
	}, [lembrete]);

	function revertArchive(lembrete: Lembrete, key: SnackbarKey) {
		if(!lembrete || !loggedUser) return;
		dispatch(recoverOne(lembrete.id));
		closeSnackbar(key);
	}

	function revertRemove(lembrete: Lembrete, key: SnackbarKey) {
		// dispatch(undoRemove)
		closeSnackbar(key);
	}

	function showSnackbar(){
		enqueueSnackbar(`Lembrete ${ operation === 'delete' ? 'excluído' : 'arquivado' }.`, {
			action: (key) => {
				if(!lembrete) return <></>;
				const revert = () => operation === 'delete' ? revertRemove(lembrete, key) : revertArchive(lembrete, key);
				return <Button sx={{ color: 'orange' }} onClick={revert}>Desfazer</Button>;
			},
			onClose: (_, reason) => {
				if(!lembrete || !loggedUser) return;

				if(reason === 'timeout' && operation === 'archive') {
					//persist archive
					store.dispatch(archiveLembrete({ id: lembrete.id, accessToken: loggedUser.accessToken }));
				}
			}
		});
	}

	return { safeRemove, safeArchive };
};

export default useSafeRemove;
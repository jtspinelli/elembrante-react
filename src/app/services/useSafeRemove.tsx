import React, { useEffect, useState } from 'react';
import { SnackbarKey, useSnackbar } from 'notistack';
import Lembrete from '../types/Lembrete';
import { Button } from '@mui/material';
import { setModalOpen } from '../../features/editModal/editModalSlice';
import { useDispatch } from 'react-redux';
// import { addLembrete, removeLembrete, updateLembrete } from '../../features/lembretes/lembreteSlice';

const useSafeRemove = () => {
	const [ lembrete, setLemb ] = useState<Lembrete>();
	const [ operation, _setOperation ] = useState<string>('');
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const dispatch = useDispatch();

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

	// useEffect(() => {
	// 	if(!lembrete) return;

	// 	if(operation === 'delete') dispatch(removeLembrete(lembrete.id));
	// 	if(operation === 'archive') dispatch(updateLembrete({ id: lembrete.id, changes: { excluido: true } }));

	// 	showSnackbar();

	// 	dispatch(setModalOpen(false));
	// }, [lembrete]);

	// function revertRemove(lembrete: Lembrete, key: SnackbarKey){
	// 	dispatch(addLembrete(lembrete));
	// 	closeSnackbar(key);
	// }

	// function revertArchive(lembrete: Lembrete, key: SnackbarKey){
	// 	dispatch(updateLembrete({id: lembrete.id, changes: { excluido: false }}));
	// 	closeSnackbar(key);
	// }

	// function showSnackbar(){
	// 	enqueueSnackbar(`Lembrete ${ operation === 'delete' ? 'excluído' : 'arquivado' }.`, {
	// 		action: (key) => {
	// 			if(!lembrete) return <></>;
	// 			const revert = () => operation === 'delete' ? revertRemove(lembrete, key) : revertArchive(lembrete, key);
	// 			return <Button sx={{ color: 'orange' }} onClick={revert}>Desfazer</Button>;
	// 		}
	// 	});
	// }

	return { safeRemove, safeArchive };
};

export default useSafeRemove;
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import Lembrete from '../../app/types/Lembrete';
import LembretePhantom from '../../app/types/LembretePhantom';

export const getLembretes = createAsyncThunk(
	'lembretes/all',
	async (): Promise<Lembrete[]> => {
		const basePath = process.env.REACT_APP_SERVER_BASE_PATH as string;

		return await axios
			.get(basePath + 'lembretes', {
				withCredentials: true
			})
			.then((response) => response.data)
			.catch((e: AxiosError) => {
				return e;
			});
	}
);

export const archiveLembrete = createAsyncThunk(
	'lembretes/archive',
	async (data: {id: number}): Promise<number> => {
		const basePath = process.env.REACT_APP_SERVER_BASE_PATH as string;

		return await axios.put(basePath + 'lembrete/archive/' + data.id, {}, {
			withCredentials: true
		})
			.then(() => data.id)
			.catch(() => -1);
	}
);

export const recoverLembrete = createAsyncThunk(
	'lembretes/recover',
	async (data: { id: number }): Promise<number> => {
		const basePath = process.env.REACT_APP_SERVER_BASE_PATH as string;

		return await axios.put(basePath + 'lembrete/recover/' + data.id, {}, {
			withCredentials: true
		})
			.then(() => data.id)
			.catch(() => -1);
	}
);

export const removeLembrete = createAsyncThunk(
	'lembretes/remove',
	async (data: { id: number}): Promise<boolean> => {
		const basePath = process.env.REACT_APP_SERVER_BASE_PATH as string;

		return await axios.delete(basePath + 'lembrete/' + data.id, {
			withCredentials: true
		})
			.then(() => true)
			.catch(() => false);
	}
);

export const createLembrete = createAsyncThunk(
	'lembretes/create',
	async (data: { lembrete: LembretePhantom }): Promise<Lembrete | null> => {
		const basePath = process.env.REACT_APP_SERVER_BASE_PATH as string;

		return await axios.post(basePath + 'lembrete', data.lembrete, {
			withCredentials: true
		})
			.then((response) => response.data as Lembrete)
			.catch(() => null);
	}
);

export const updateLembrete = createAsyncThunk(
	'lembretes/update',
	async (data: { lembrete: Lembrete }): Promise<Lembrete | null> => {
		const basePath = process.env.REACT_APP_SERVER_BASE_PATH as string;
		return await axios.put(basePath + 'lembrete/' + data.lembrete.id, data.lembrete, {
			withCredentials: true
		})
			.then((response) => response.data as Lembrete)
			.catch(() => null);
	}
);
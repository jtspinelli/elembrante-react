import React from 'react';
import { useSelector } from 'react-redux';
import { selectAll } from '../../feature/lembreteSlice';
import { FormSection, LembretesSection } from './styles';
import Form from '../components/form/Form';
import Lembrete from '../../feature/Lembrete';
import LembreteCard from '../components/lembreteCard/LembreteCard';
import { RootState } from '../../feature/store';

const MeusLembretesPage: React.FC = () => {
	const { loggedUser } = useSelector((state: RootState) => state.loggedUsersReducer);
	const lembretes = useSelector(selectAll);

	function getLembretes(){
		if(!loggedUser) return [];

		return lembretes
			.filter(lembrete => lembrete.userId === loggedUser.id && !lembrete.excluido)
			.sort((a: Lembrete, b: Lembrete) => b.criadoEm > a.criadoEm ? 1 : -1);
	}

	function getCard(lembrete: Lembrete){
		return <LembreteCard lembrete={lembrete} key={lembrete.id} showEdit={true}/>;
	}

	return <>
		<FormSection>
			<Form />
		</FormSection>

		<LembretesSection>
			{ getLembretes().map(getCard) }
		</LembretesSection>

	</>;
};

export default MeusLembretesPage;
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAll } from '../../feature/lembreteSlice';
import { FormSection, LembretesSection } from './styles';
import Form from '../components/form/Form';
import Lembrete from '../../feature/Lembrete';
import LembreteCard from '../components/lembreteCard/LembreteCard';

const MeusLembretesPage: React.FC = () => {
	const lembretes = useSelector(selectAll);

	function getLembretes(){
		return lembretes
			.sort((a: Lembrete, b: Lembrete) => b.criadoEm > a.criadoEm ? 1 : -1)
			.filter(lembrete => !lembrete.excluido);
	}

	function getCard(lembrete: Lembrete){
		return <LembreteCard lembrete={lembrete} key={lembrete.id} deleteonly={false}/>;
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
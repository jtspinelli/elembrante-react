import React from 'react';
import { FormSection, LembretesSection, Main } from './styles';
import { useSelector } from 'react-redux';
import { selectAll } from '../../feature/lembreteSlice';
import Lembrete from '../../feature/Lembrete';
import Form from '../components/form/Form';
import AppBar from '../components/appBar/AppBar';
import LembreteCard from '../components/lembreteCard/LembreteCard';

const MainPage: React.FC = () => {
	const lembretes = useSelector(selectAll);

	function getLembretes(){
		return lembretes.sort((a: Lembrete, b: Lembrete) => a.criadoEm > b.criadoEm ? 1 : -1);
	}

	function getCard(lembrete: Lembrete){
		return <LembreteCard lembrete={lembrete} key={lembrete.id} />;
	}

	return (
		<>
			<AppBar />

			<Main>
				<FormSection>                
					<Form />
				</FormSection>

				<LembretesSection>
					{ getLembretes().map(getCard) }
				</LembretesSection>
			</Main>
		</>        
	);
};

export default MainPage;
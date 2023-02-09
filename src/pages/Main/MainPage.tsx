import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { v4 as uuid } from "uuid";
import { selectAll } from "../../feature/lembreteSlice";
import { addLembrete } from "../../feature/lembreteSlice";
import AddAlertIcon from '@mui/icons-material/AddAlert';
import Lembrete from "../../feature/Lembrete";

const MainPage: React.FC = () => {
    const  lembretes  = useSelector(selectAll);

    const dispatch = useDispatch();

    function createLembrete() {
        const newLembrete: Lembrete = {
            id: uuid(),
            descricao: "sdahdiuashdiuasd",
            detalhamento: "xcmzxnbcmzxnbc"
        }

        dispatch(addLembrete(newLembrete))
    }

    return (
        <>
            <Typography variant="h1"> Hello from MainPage </Typography>

            <Button variant="contained" onClick={createLembrete}> <AddAlertIcon /> Novo Lembrete</Button>

            { lembretes.map((lembrete: Lembrete, index) => (
                <p key={index}> { lembrete.descricao } </p>
            )) }
        </>
    )
}

export default MainPage;
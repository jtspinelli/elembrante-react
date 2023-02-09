import { Button, Typography } from "@mui/material";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const MainPage: React.FC = () => {
    return (
        <>
            <Typography variant="h1"> Hello from MainPage </Typography>

            <Button variant="contained"> <AccessAlarmIcon /> MUI Testing</Button>
        </>
    )
}

export default MainPage;
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FC, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { addHouse } from '../apis/house';
const { NotificationManager } = require('react-notifications');

interface MainProps {

}

type Props = MainProps;


const Main: FC<Props> = (props: Props) => {
    const [address, setAddress] = useState<string>();
    const [currentValue, setCurrentValue] = useState(0);
    const [loanAmount, setLoanAmount] = useState(0);
    const [houseId, setHouseId] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const navigate = useNavigate();

    /** Form Submission */
    const onSubmit = () => {
        if (!address || !currentValue || !loanAmount) {
            NotificationManager.error("Some fields are missing");
        }
        else {
            setIsSaving(true);
            addHouse({ address, currentValue, loanAmount })
                .then(newId => { setHouseId(newId) })
                .catch((e) => { NotificationManager.error("Something went wrong, please try again.") })
                .finally(() => { setIsSaving(false) });
        }
    }
    /** Navigation to house details page */
    const onNavigateToHouse = () => {
        if (houseId) {
            navigate(`/house/${houseId}`);
        }
    }

    return <Container maxWidth="sm" >
        <Box py={3} >
            <Box display="flex" gap={2} flexDirection={{ xs: "column", md: "row" }}>
                <Card sx={{ flex: 1 }}>
                    {!houseId && <CardContent >
                        <Box display="flex" gap={3} flexDirection="column" alignItems="center">
                            <Typography color="text.primary" fontWeight={700} fontSize={{ xs: "1rem", md: "1.1rem" }}>Your House</Typography>
                            <TextField label="Address" value={address}
                                required
                                fullWidth
                                onChange={(e) => { setAddress(e.target.value) }} />
                            <TextField label="Current Value"
                                required
                                type="number"
                                fullWidth
                                value={currentValue}
                                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                                onChange={(e) => {  setCurrentValue(Number(e.target.value)) }} />
                            <TextField label="Loan Amount"
                                required
                                fullWidth
                                type="number"
                                value={loanAmount}
                                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                                onChange={(e) => {  setLoanAmount(Number(e.target.value)) }} />
                        </Box>
                        <Box display="flex" justifyContent="center" mt={4} mb={2}>
                            <Button variant="contained" disabled={isSaving} color="warning" onClick={() => { onSubmit() }} >
                                {isSaving && <Box color="white" mr={1} ><CircularProgress size={12} color="inherit" /></Box>}
                                <span>Submit</span>
                            </Button>
                        </Box>
                    </CardContent>}
                    {houseId && <CardContent>
                        <Box display="flex" gap={3} flexDirection="column" alignItems="center">
                            <Typography color="text.primary" fontWeight={700} fontSize={{ xs: "1rem", md: "1.1rem" }}>Thank You</Typography>
                            <Typography color="text.secondary" fontSize={{ xs: "0.8rem", md: "0.875rem" }}>House number {houseId} was submitted successfully!</Typography>
                        </Box>
                        <Box display="flex" justifyContent="center" mt={4} mb={2}>
                            <Button variant="contained" color="primary" onClick={() => { onNavigateToHouse() }}>
                                View House Details
                            </Button>
                        </Box>
                    </CardContent>}
                </Card>

            </Box>


        </Box>
    </Container >
}


export default Main;


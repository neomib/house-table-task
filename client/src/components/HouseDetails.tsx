import { Edit, HouseRounded as HouseIcon } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState, } from 'react';
import { useParams } from 'react-router-dom';
import { getHouse, updateHouse } from '../apis/house';
import { House } from '../types/House';
import HouseEditingDialog from './HouseEditingDialog';
const { NotificationManager } = require('react-notifications');

interface HouseDetailsProps {

}

type Props = HouseDetailsProps;


const HouseDetails: FC<Props> = (props: Props) => {
    let { id } = useParams();

    const [house, setHouse] = useState<House | null>();
    const [editingDialogOpen, setEditingDialogOpen] = useState(false);

    /** Fetches house details */
    useEffect(() => {
        if (id) {
            getHouse(Number(id))
                .then(h => setHouse(h))
                .catch(() => { setHouse(null) });
        }

    }, [id]);

    const onUpdate = (currentValue?: number, loanAmount?: number) => {
        if (house && ((currentValue && currentValue !== house.currentValue) || (loanAmount && loanAmount !== house.loanAmount))) {
            const currentValueToUpdate = currentValue || house.currentValue;
            const loanAmountToUpdate = loanAmount || house.loanAmount;
            return updateHouse(house.id, currentValueToUpdate, loanAmountToUpdate)
                .then((houseData: House) => {
                    NotificationManager.success("Changes were saved successfully!");
                    setHouse({ ...house, ...houseData });
                })
                .catch(() => {
                    NotificationManager.error("An error occurred.")
                })
        }
        else {
            return Promise.resolve();
        }
    }

    return <Container maxWidth="sm" >
        {/* Loader */}
        {house === undefined && <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
        </Box>}
        {/* Wrong ID handling */}
        {house === null && <Box display="flex" justifyContent="center" mt={2}>
            <Typography>HOUSE WAS NOT FOUND</Typography>
        </Box>}
        {house && <Card sx={{ mt: 3 }}>
            <CardHeader titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}
                avatar={<Avatar sx={{ backgroundColor: "#2a76d2" }}>
                    <HouseIcon />
                </Avatar>}
                action={<IconButton onClick={() => { setEditingDialogOpen(true) }}>
                    <Edit />
                </IconButton>}
                title={house.address} />
            <CardContent>
                <Typography variant="caption" color="text.secondary" >Current Value</Typography>
                <Typography mb={2} variant='h5'>${house.currentValue}</Typography>
                <Typography variant="caption" color="text.secondary" >Loan Amount</Typography>
                <Typography variant='h5' mb={2}> ${house.loanAmount}</Typography>
                <Typography variant="caption" color="text.secondary" >Risk</Typography>
                <Typography variant='h5' mb={2} color="orange"> {Math.round(house.risk * 100)}%</Typography>
            </CardContent>
        </Card>}
        {/* Edit Dialog */}
        {house && <HouseEditingDialog open={editingDialogOpen} house={house}
            onClose={() => { setEditingDialogOpen(false) }}
            onSave={onUpdate} />}
    </Container>;
}


export default HouseDetails;


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { FC, useEffect, useState, } from 'react';
import { House } from '../types/House';

interface HouseEditingDialogProps {
    house: House;
    open: boolean;
    onClose: () => void;
    onSave: (currentValue?: number, loan?: number) => Promise<any>;
}

type Props = HouseEditingDialogProps;


const HouseEditingDialog: FC<Props> = (props: Props) => {
    const { open, onClose, onSave, house } = props;

    const [loan, setLoan] = useState<number>(house.loanAmount);
    const [currentValue, setCurrentValue] = useState<number>(house.currentValue);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (open) {
            setCurrentValue(house.currentValue);
            setLoan(house.loanAmount);
        };
    }, [open, house]);

    const closeDialog = () => {
        if(!isSaving){
            onClose();
        }
    }

    /** Using the "onSave" promise to update the house details */
    const save = () => {
        setIsSaving(true);
        onSave(currentValue, loan)
            .then(() => { closeDialog(); })
            .finally(() => { setIsSaving(false); });

    }
    return <Dialog open={open} onClose={closeDialog} >
        <DialogTitle>Edit House</DialogTitle>
        <DialogContent>
            <Stack gap={3} mt={1}>
                <TextField value={currentValue} type="number" label="$ Current Value" onChange={e => { setCurrentValue(Number(e.target.value)) }} />
                <TextField value={loan} type="number" label="$ Loan Amount" onChange={e => { setLoan(Number(e.target.value)) }} />
            </Stack>
            <Box display="flex" justifyContent="center" mt={3}>
                <Button color="primary" variant="outlined"
                    onClick={save}
                    disabled={isSaving}>
                    {isSaving && <Box mr={1}><CircularProgress size={15} /></Box>}
                    Save
                </Button>
            </Box>
        </DialogContent>
    </Dialog>;
}


export default HouseEditingDialog;


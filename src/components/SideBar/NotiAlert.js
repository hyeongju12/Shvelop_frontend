import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function NotiAlert() {
    const [open, setOpen] = React.useState(true);

    return (
        <Box sx={{ width: '100%' }} >
            <Collapse in={open}>
                <Alert
                    color="info"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    로그인을 해주세요 :)
                </Alert>
            </Collapse>
        </Box>
    );
}

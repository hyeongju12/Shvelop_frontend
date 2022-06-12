import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function NoListAlert() {
    const [open, setOpen] = React.useState(true);

    return (
        <Box sx={{ width: '100%' }} >
            <Collapse in={open}>
                <Alert
                    color="warning"
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
                    새 게시물을 작성해주세요! ^^
                </Alert>
            </Collapse>
        </Box>
    );
}

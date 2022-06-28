import * as React from 'react';
import { useRef } from 'react';
// component

// material
import {
  Menu,
  TextField,
  Grid,
  InputLabel,
  IconButton,
  DialogTitle,
  Button,
  DialogActions
} from '@mui/material';

// ----------------------------------------------------------------------
import Iconify from '../../Iconify';

export default function TokenMenu() {
  const ref = useRef(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setOpen(true)}>
        <Iconify icon="gridicons:dropdown" width={20} height={20} />
      </IconButton>

      <Menu
        open={open}
        anchorEl={ref.current}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: 600, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <DialogTitle id="alert-dialog-title">Print Ticket No</DialogTitle>
        <InputLabel id="demo-simple-select-label" sx={{ p: 2 }}>
          Role
        </InputLabel>

        <Grid item xs={12} sx={{ p: 2 }} sm={10}>
          <TextField
            autoComplete="given-name"
            name="Reply"
            required
            fullWidth
            id="reply"
            label="reply"
            autoFocus
          />
        </Grid>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Send
          </Button>
        </DialogActions>
      </Menu>
    </>
  );
}

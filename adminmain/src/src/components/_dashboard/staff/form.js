import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { FormControl, MenuItem, InputLabel, Select, DialogActions } from '@mui/material/';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import Iconify from '../../Iconify';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const theme = createTheme();
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function FormModal() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [role, setRole] = React.useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div>
      <Button
        variant="contained"
        to="#"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleClickOpen}
      >
        Add
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container component="main" maxWidth="xs" open={open} sx={style}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography component="h1" variant="h5">
              ADD Staff
            </Typography>
            <Box component="form" noValidate sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ minWidth: 160 }}>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={role}
                      label="Role"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="mobile"
                    label="mobile"
                    type="mobile"
                    id="mobile"
                    autoComplete="mobile"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  Save
                </Button>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Box>
          </Box>
        </Container>
      </Modal>
    </div>
  );
}

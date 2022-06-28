import React, { useState } from 'react'
import { Validate } from '../../../_helper'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, TextField } from '@mui/material';
import Iconify from '../../Iconify';

export default function FormModal(props) {
  const [open, setOpen] = React.useState(false);

  const [note, setNote] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [error, setError] = useState('');
  const SubmitForms = () => {
    let success = 0;
    let obj = { Note: note, BankName: serviceName }
    let Obj = Validate(obj, rules)
    Object.keys(Obj).map(key => {
      if (Obj[key] !== "") {
        success = 1
      }
    })
    setError(Obj)
    if (success === 0) {
      props.callApi(obj, callback)
    }
  }

  const callback = () => {
    setServiceName("");
    setNote("");
    handleClose()
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Stack
          alignItems="center"
          spacing={2}
          sx={{
            p: 2.5,
            pt: 2,
            borderRadius: 1,
            position: 'relative',
            bgcolor: 'grey.200'
          }}
        >
          <DialogTitle id="alert-dialog-title">Add Services</DialogTitle>

          <TextField helperText="Enter Services" id="demo-helper-text-aligned" label="Service"
            value={serviceName}
            onChange={(e) => { setServiceName(e.target.value); setError("") }}
          />
          {error?.BankName && <div className='error-msg'>{error.BankName}</div>}

          <TextField helperText=" Note" id="demo-helper-text-aligned-no-helper" label="Note"
            value={note}
            onChange={(e) => { setNote(e.target.value); setError("") }}
          />
          {error?.Note && <div className='error-msg'>{error.Note}</div>}
          <DialogActions>
            <Button onClick={SubmitForms} autoFocus>
              Save
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </div>
  );
}


const rules = [{
  field: 'Note',
  fieldName: 'Note',
  type: 'string',
  require: true
}, {
  field: 'BankName',
  fieldName: 'Bank Name',
  type: 'string',
  require: true
}]
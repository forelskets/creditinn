import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, TextField } from '@mui/material/';
import Iconify from '../../Iconify';
import { Validate } from '../../../_helper';
import { AllBank, AllService } from '../../../_services/Admin.services';
export default function FormModal(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [bank, setBank] = React.useState('');
  const [service, setService] = React.useState('');

  const handleChange = (event) => {
    setBank(event.target.value);
    setService(event.target.value);
  };

  const [earning, setEarning] = useState('');
  const [cashback, setCashback] = useState('');
  const [error, setError] = useState('');
  const [bankArray, setBankArray] = useState([]);
  const [serviceArray, setServiceArr] = useState([]);
  const [services, setservices] = useState('');
  useEffect(() => {
    callEffect();
  }, []);

  const callEffect = async () => {
    let res = await AllBank();
    if (res?.status === 1 && Array.isArray(res?.data?.services)) {
      setBankArray(res.data.services);
    }
    let allservice = await AllService();
    if (allservice?.status === 1 && Array.isArray(allservice?.data?.services)) {
      setServiceArr(allservice.data.services);
    }
  };

  const SubmitForms = () => {
    let success = 0;
    let obj = {};
  

    if (props?.data?.user?.RefralID === '' || props?.data?.user?.RefralID === undefined) {

      obj = {
        userId: props?.data?.user?._id,
        TransactionType: 'CASHBACK',
        CreditDebit: 'Credit',
        Amount: cashback
      };
    } else {
      obj = {
        userId: props?.data?.user?._id,
        refralId: props?.data?.user?.RefralID,
        TransactionType: 'CASHBACK',
        TransactionTypeEarning: 'EARNING',
        CreditDebit: 'Credit',
        Amount: cashback,
        Earning: earning
      };
    }
    let Obj = Validate(obj, rules);
    Object.keys(Obj).map((key) => {
      if (Obj[key] !== '') {
        success = 1;
      }
    });
    setError(Obj);
    if (success === 0) {
      props.callApi(obj, callback);
    }
  };

  const callback = () => {
    setCashback('');
    setEarning('');
    handleClose();
  };

  const HandleClose = () => {
    callback();
  };

  const onChangeServices = (e) => {
 
    setservices(e.target.value);
  };

  let isDisabled = true;

  if (props?.data?.user?.RefralID) {
    if (cashback && earning) {
      isDisabled = false;
    }
  } else if (cashback) {
    isDisabled = false;
  }

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
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Select Bank & Service</DialogTitle>
        <div>
          <FormControl sx={{ m: 2, minWidth: 140 }}>
            <TextField
              sx={{ m: 2, minWidth: 100 }}
              id="demo-helper-text-aligned-no-helper"
              label="CashBack"
              value={cashback}
              onChange={(e) => {
                setCashback(e.target.value);
                setError('');
              }}
            />

            {!cashback && <div style={{ color: 'red' }}>Please select CashBack</div>}
          </FormControl>
          {props?.data?.user?.RefralID ? (
            <FormControl sx={{ m: 2, minWidth: 140 }}>
              <TextField
                sx={{ m: 2, minWidth: 100 }}
                id="demo-helper-text-aligned-no-helper"
                label="Earning"
                value={earning}
                onChange={(e) => {
                  setEarning(e.target.value);
                  setError('');
                }}
              />
              {!earning && <div style={{ color: 'red' }}>Please select Earning</div>}
            </FormControl>
          ) : (
            ''
          )}
        </div>
        <DialogActions>
          <Button onClick={SubmitForms} autoFocus disabled={isDisabled}>
            Save
          </Button>
          <Button onClick={HandleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const rules = [
  {
    field: 'Note',
    fieldName: 'Note',
    type: 'string',
    require: true
  },
  {
    field: 'BankName',
    fieldName: 'Bank Name',
    type: 'string',
    require: true
  }
  //  {
  //   field: 'BankService',
  //   fieldName: 'Service',
  //   type: 'string',
  //   require: true
  // }
];

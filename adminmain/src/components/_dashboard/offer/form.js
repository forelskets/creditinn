import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, Select, MenuItem, InputLabel, TextField } from '@mui/material/';
import Iconify from '../../Iconify';
import { Validate } from '../../../_helper';
import { AllBank, AllService, AllCategory } from '../../../_services/Admin.services';
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
  const [category, setCategory] = React.useState('');
  const [typed, setTyped] = React.useState('');
  const [isSubmit, setIsSubmit] = React.useState(true);

  const handleChange = (event) => {
    setBank(event.target.value);
    setService(event.target.value);
  };

  const [note, setNote] = useState('');
  const [BankName, setBankName] = useState('');
  const [error, setError] = useState('');
  const [bankArray, setBankArray] = useState([]);
  const [serviceArray, setServiceArr] = useState([]);
  const [categoryArray, setCategoryArray] = React.useState([]);
  const [services, setservices] = useState('');
  const [picture, setPicture] = useState('');

  useEffect(() => {
    callEffect();
  }, []);

  const callEffect = async () => {
    let res = await AllBank();
  
    if (res?.status === 1 && Array.isArray(res?.data?.banks)) {
      setBankArray(res.data.banks);
    }
    let allservice = await AllService();
    if (allservice?.status === 1 && Array.isArray(allservice?.data?.services)) {
      setServiceArr(allservice.data.services);
    }
    let allcategory = await AllCategory();
    if (allcategory?.status === 1 && Array.isArray(allcategory?.data?.CatNames)) {
      setCategoryArray(allcategory?.data?.CatNames);
    }
  };

  const SubmitForms = (e) => {
    // alert("1111")
    e.preventDefault();
    let success = 0;
    // alert("2222")
    let obj = {
      Note: note,
      BankName: BankName, // ? BankName.value : "",
      BankService: [services], //Array.isArray(services) ? services.map(x => (x.value)) : null,
      Category: category,
      Picture: picture,
      Type: typed
    };
    // alert("3333")
    let Obj = Validate(obj, rules);
    Object.keys(Obj).map((key) => {
      if (Obj[key] !== '') {
        success = 1;
      }
    });
    // alert("4444")

    setError(Obj);

    if (success === 0) {
      props.callApi(obj, callback);
    }
    // alert("5555")
  };

  const callback = () => {
    setBankName('');
    setNote('');
    setservices('');
    setCategory('');
    setPicture('');
    setTyped('');
    handleClose('');
  };

  const HandleClose = () => {
    callback();
  };

  const onChangeBank = (e) => {
    setBankName(e.target.value);
  };

  const onChangeServices = (e) => {

    setservices(e.target.value);
  };

  const onChangeCategory = (e) => {

    setCategory(e.target.value);
  };

  const ImageHandler = (e) => {
    setPicture(e.target.files[0]);
  };

  const onChangeTyped = (e) => {
    setTyped(e.target.value);
  };

  let isDisabled = true;
  if (typed && BankName && category && services && note && picture) {
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
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={typed}
              label="Type"
              onChange={onChangeTyped}
            >
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Special Offer">Special Offer</MenuItem>
            </Select>
            {!typed && <div style={{ color: 'red' }}>Please select T</div>}
          </FormControl>
          <FormControl sx={{ m: 2, minWidth: 140 }}>
            <InputLabel id="demo-simple-select-label">Bank</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={BankName}
              label="Bank"
              onChange={onChangeBank}
            >
              {bankArray.map((obj) => {
                return <MenuItem value={obj._id}>{obj.BankName}</MenuItem>;
              })}
            </Select>
            {!BankName && <div style={{ color: 'red' }}>Please select Bank</div>}
          </FormControl>
          <FormControl sx={{ m: 2, minWidth: 140 }}>
            <InputLabel id="demo-simple-select-label">Service</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select1"
              value={services}
              label="Service"
              onChange={onChangeServices}
              // multiple
            >
              {serviceArray.map((obj) => {
                return <MenuItem value={obj._id}>{obj.ServiceName}</MenuItem>;
              })}
            </Select>
            {!services && <div style={{ color: 'red' }}>Please select Service</div>}
          </FormControl>
          <FormControl sx={{ m: 2, minWidth: 140 }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select1"
              value={category}
              label="category"
              onChange={onChangeCategory}
              // multiple
            >
              {categoryArray?.map((obj) => {
                return <MenuItem value={obj.CatName}>{obj.CatName}</MenuItem>;
              })}
            </Select>
            {!category && <div style={{ color: 'red' }}>Please select Category</div>}
          </FormControl>
          <FormControl sx={{ m: 2, minWidth: 140 }}>
            <TextField
              sx={{ m: 2, minWidth: 100 }}
              id="demo-helper-text-aligned-no-helper"
              label="Note"
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                setError('');
              }}
            />
            {!note && <div style={{ color: 'red' }}>Please make a note</div>}
          </FormControl>
          <FormControl sx={{ m: 2, minWidth: 140 }}>
            <input type="file" name="offerPic" onChange={ImageHandler} />
            {!picture && <div style={{ color: 'red' }}>Please select a picture</div>}
          </FormControl>
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

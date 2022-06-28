import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl,  TextField } from '@mui/material/';
import Iconify from '../../Iconify';
import { Validate } from '../../../_helper'
import { AllBank, AllService } from '../../../_services/Admin.services'
import toastr from 'toastr';
import { allortCashback } from '../../../_services/Admin.services';


export default function FormModal(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  


  const [earning, setEarning] = useState('');
  const [cashback, setCashback] = useState('');
  const [error, setError] = useState('');
 
 

  const SubmitForms = async () => {
    let success = 0;
    let obj = {};
    console.log(props.data, "propsdata")

    if(props?.data?.user?.RefralID === '' || props?.data?.user?.RefralID === undefined ){
       console.log(props?.data?.user?.RefralID , "refralId")
      obj = {
      userId: props?.data?.user?._id ,TransactionType: "CASHBACK" , CreditDebit: "CREDIT", Amount: cashback,    
      
    }}else{
      console.log(props?.data?.user?.RefralID , "refralId2")
    obj = {
      userId: props?.data?.user?._id , refralId:props?.data?.user?.RefralID ,TransactionType: "CASHBACK" ,TransactionTypeEarning:"EARNING", CreditDebit: "CREDIT", Amount: cashback, Earning: earning   
      
    }}
    console.log(obj , "obj")
    let Obj = Validate(obj, rules)
    Object.keys(Obj).map(key => {
      if (Obj[key] !== "") {
        success = 1
      }
    })
    setError(Obj)
    if (success === 0) {
      let res = await allortCashback(obj)
      if(res?.status === 1){
       
      
        
        if(callback){
          callback()
          
        }
        alert("allorted")
        props.callApi();
      } else{
        if(res?.message)
        toastr.success(res?.message)
      }
     
    }
  }

  const callback = () => {
    
    setCashback("");
    setEarning("");
    handleClose();
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
              onChange={(e) => { setCashback(e.target.value); setError("") }}
            />
           
            {error?.BankName && <div className='error-msg'>{error.BankName}</div>}
          </FormControl>
         { (props?.data?.user?.RefralID) ? (<FormControl sx={{ m: 2, minWidth: 140 }}>
            
            <TextField
              sx={{ m: 2, minWidth: 100 }}
              id="demo-helper-text-aligned-no-helper"
              label="Earning"
              value={earning}
              onChange={(e) => { setEarning(e.target.value); setError("") }}
            />
          </FormControl>) : ""}
          
         
        </div>
        <DialogActions>
          <Button onClick={SubmitForms} autoFocus>
            Save
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
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
},
//  {
//   field: 'BankService',
//   fieldName: 'Service',
//   type: 'string',
//   require: true
// }
]
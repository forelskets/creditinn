import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';
import Iconify from 'src/components/Iconify';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import { TextField, Grid } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { AllUsers } from 'src/_services/Admin.services';
import {useSelector} from 'react-redux'
import {addLoan , addInsurance , addCreditCard} from '../../../_services/Admin.services'
import { EmojiFlags } from '@material-ui/icons';

const FormModal = (props) => {
  const {usersarray} = useSelector(state => state.AuthReducer)
  const [userId , setUserId] = useState('')
  const [loan , setLoan] = useState({
    BankName:'',
    Amount:"",
    EmiDate:'',
    LoanType:'',
    EndDate:""
  })
  const [insurance , setInsurance] = useState({
    ProviderName:'',
    Amount:"",
    InsuranceType:'',
    EmiDate:'',
    EndDate:""
  })
  const [creditCard , setCreditCard] = useState({
    BankName:'',
    EmiAmount:"",
    EmiDate:''
  })
  const [open, setOpen] = useState(false);
 console.log(usersarray , "usersarray")
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [tabValue, setTabValue] = useState('1');

  const handleTabChange = (event) => {
    setTabValue(event.target.value);
  };

const loanChangeHandler = (e) =>{
  
  const {name , value} = e.target
  setLoan({
    ...loan ,
    [name]: value
  })
}

const insuranceChangeHandler = (e) =>{
  
  const {name , value} = e.target
  setInsurance({
    ...insurance ,
    [name]: value
  })
}

const creditCardChangeHandler = (e) =>{
  
  const {name , value} = e.target
  setCreditCard({
    ...creditCard ,
    [name]: value
  })
}


const handleUserChange = (e) =>{
   setUserId(e.target.value)
}

const handleLoanSubmit = async (e) =>{
  if(userId){
  const response = await addLoan( {BankName: loan.BankName , EmiAmount : loan.Amount , Type : loan.LoanType , EmiDate: loan.EmiDate , EndDate: loan.EndDate} , userId);
  if(response?.status === 1){
    alert(response?.msg)
    props.callEffect()
  }else{
    alert(response?.msg)
  }
}else {
  alert("select user first")
}
}

const handleInsuranceSubmit = async (e) =>{
  if(userId){
  const response = await addInsurance({ProviderName : insurance.ProviderName , EmiAmount : insurance.Amount , Type : insurance.InsuranceType ,EmiDate:insurance.EmiDate , EndDate: insurance.EndDate} , userId)
  if(response?.status == 1){
    alert(response?.msg)
    props.callEffect();
  }else{
    alert(response?.msg)
  }
}else{
  alert("select user first")
}
}

const handleCreditCardSubmit = async (e) =>{
  if(userId){
  const response = await addCreditCard({BankName:creditCard.BankName , EmiAmount:creditCard.EmiAmount , EmiDate : creditCard.EmiDate} , userId)
  if(response?.status == 1){
    alert(response?.msg)
    props.callEffect();
  }else{
    alert(response?.msg)
  }
}else{
  alert("select user first")
}
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
        height="100%"
      >
        <DialogTitle id="alert-dialog-title">Add</DialogTitle>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select-User</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={userValue}
            label="Select-Form"
            onChange={handleUserChange}
          >
            {usersarray.map((user)=>(
              <MenuItem value={user._id}>{user.Name}</MenuItem>
            ))}
           
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select-Form</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tabValue}
            label="Select-Form"
            onChange={handleTabChange}
          >
            <MenuItem value="1">Loan</MenuItem>
            <MenuItem value="2">Insurance</MenuItem>
            <MenuItem value="3">CreditCard</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={tabValue}>
            <TabPanel value="1">
              <Grid
                container
                alignItems="center"
                direction="row"
                justifyContent="space-around"
                style={{ height: '20rem', width: 'auto' }}
              >
                <Grid item>
                  <TextField label="Bank-Name" name="BankName" onChange={loanChangeHandler} variant="filled" color="secondary" />
                </Grid>
                <Grid item>
                  <TextField label="Amount" name="Amount" onChange={loanChangeHandler} variant="filled" color="secondary" />
                </Grid>
                <Grid item>
                  <TextField label="Emi-Date" type="date" name="EmiDate" onChange={loanChangeHandler} variant="filled" color="secondary" />
                </Grid>
                <Grid item>
                  <TextField label="Loan-Type" name="LoanType" onChange={loanChangeHandler} variant="filled" color="secondary" />
                </Grid>
                <Grid item spacing={2}>
                  <TextField label="End-Date" type="date" name="EndDate" onChange={loanChangeHandler} variant="filled" color="secondary" />
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="flex-end">
                <Grid item >
                  <Button variant='contained' onClick={handleLoanSubmit}>Submit</Button>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <Grid
                container
                alignItems="center"
                direction="row"
                justifyContent="space-around"
                style={{ height: '20rem', width: 'auto' }}
              >
                <Grid item>
                  <TextField label="Provider-Name" name="ProviderName" onChange={insuranceChangeHandler} variant="filled" color="secondary" />
                </Grid>
                <Grid item>
                  <TextField label="Amount" name="Amount" onChange={insuranceChangeHandler} variant="filled" color="secondary" />
                </Grid>
                <Grid item>
                  <TextField label="Insurance" name="InsuranceType" onChange={insuranceChangeHandler} variant="filled" color="secondary" />
                </Grid>
                <Grid item>
                  <TextField label="Emi-Date" name='EmiDate' onChange={insuranceChangeHandler} type="date" variant="filled" color="secondary" />
                </Grid>

                <Grid item>
                  <TextField label="End-Date" name='EndDate' onChange={insuranceChangeHandler} type="date" variant="filled" color="secondary" />
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="flex-end">
                <Grid item >
                  <Button variant='contained' onClick={handleInsuranceSubmit}>Submit</Button>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="3">
              <Grid
                container
                alignItems="center"
                direction="row"
                justifyContent="space-around"
                style={{ height: '20rem', width: 'auto' }}
              >
                <Grid item>
                  <TextField label="Bank-Name" name="BankName" onChange={creditCardChangeHandler} variant="filled" color="secondary" />
                </Grid>
                <Grid item>
                  <TextField label="Amount" name="EmiAmount" onChange={creditCardChangeHandler} variant="filled" color="secondary" />
                </Grid>

                <Grid item>
                  <TextField label="Date" name="EmiDate" onChange={creditCardChangeHandler} type="date" variant="filled" color="secondary" />
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="flex-end">
                <Grid item >
                  <Button variant='contained' onClick={handleCreditCardSubmit}>Submit</Button>
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>
        </Box>
        <DialogActions>
          <Button autoFocus>Save</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormModal;

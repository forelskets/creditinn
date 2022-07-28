import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';
import Iconify from 'src/components/Iconify';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import { TextField, Grid } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { useSelector } from 'react-redux';
import { addLoan, addInsurance, addCreditCard } from '../../../_services/Admin.services';
import { AllUsers } from '../../../_services/Admin.services/admin.user';
import { EmojiFlags } from '@material-ui/icons';

const FormModal = (props) => {
  const [usersarray, setUsersarray] = useState([]);
  const [userId, setUserId] = useState('');
  const [loan, setLoan] = useState({
    BankName: '',
    Amount: '',
    EmiDate: '',
    LoanType: '',
    EndDate: ''
  });
  const [insurance, setInsurance] = useState({
    ProviderName: '',
    Amount: '',
    InsuranceType: '',
    EmiDate: '',
    EndDate: ''
  });
  const [creditCard, setCreditCard] = useState({
    BankName: '',
    EmiAmount: '',
    EmiDate: ''
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    callEffect();
  }, []);

  const callEffect = async (req, res) => {
    const users = await AllUsers();
    if (users?.status === 1 && Array.isArray(users?.data)) {
      setUsersarray(users?.data);
    }
  };
  console.log(usersarray, 'usersarray');
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

  const loanChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoan({
      ...loan,
      [name]: value
    });
  };

  const insuranceChangeHandler = (e) => {
    const { name, value } = e.target;
    setInsurance({
      ...insurance,
      [name]: value
    });
  };

  const creditCardChangeHandler = (e) => {
    const { name, value } = e.target;
    setCreditCard({
      ...creditCard,
      [name]: value
    });
  };

  const handleUserChange = (e) => {
    setUserId(e.target.value);
  };

  const handleLoanSubmit = async (e) => {
    if (userId) {
      const response = await addLoan(
        {
          BankName: loan.BankName,
          EmiAmount: loan.Amount,
          Type: loan.LoanType,
          EmiDate: loan.EmiDate,
          EndDate: loan.EndDate
        },
        userId
      );
      setLoan({
        BankName: '',
        Amount: '',
        EmiDate: '',
        LoanType: '',
        EndDate: ''
      });
      if (response?.status === 1) {
        alert(response?.msg);
        props.callEffect();
      } else {
        alert(response?.msg);
      }
    } else {
      alert('select user first');
    }
  };

  const handleInsuranceSubmit = async (e) => {
    if (userId) {
      const response = await addInsurance(
        {
          ProviderName: insurance.ProviderName,
          EmiAmount: insurance.Amount,
          Type: insurance.InsuranceType,
          EmiDate: insurance.EmiDate,
          EndDate: insurance.EndDate
        },
        userId
      );
      setInsurance({
        ProviderName: '',
        Amount: '',
        InsuranceType: '',
        EmiDate: '',
        EndDate: ''
      });
      if (response?.status == 1) {
        alert(response?.msg);
        props.callEffect();
      } else {
        alert(response?.msg);
      }
    } else {
      alert('select user first');
    }
  };

  const handleCreditCardSubmit = async (e) => {
    if (userId) {
      const response = await addCreditCard(
        {
          BankName: creditCard.BankName,
          EmiAmount: creditCard.EmiAmount,
          EmiDate: creditCard.EmiDate
        },
        userId
      );
      setCreditCard({
        BankName: '',
        EmiAmount: '',
        EmiDate: ''
      });
      if (response?.status == 1) {
        alert(response?.msg);
        props.callEffect();
      } else {
        alert(response?.msg);
      }
    } else {
      alert('select user first');
    }
  };

  let isLoanDisabled = true;
  if (
    loan?.BankName &&
    loan?.Amount &&
    loan?.EmiDate &&
    loan?.EndDate &&
    loan?.LoanType &&
    userId
  ) {
    isLoanDisabled = false;
  }

  let isInsuranceDisable = true;
  if (
    insurance?.ProviderName &&
    insurance?.InsuranceType &&
    insurance?.Amount &&
    insurance?.EmiDate &&
    insurance?.EndDate &&
    userId
  ) {
    isInsuranceDisable = false;
  }

  let isCreditCardDisabled = true;
  if (creditCard?.BankName && creditCard?.EmiAmount && creditCard?.EmiDate && userId) {
    isCreditCardDisabled = false;
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
            value={userId}
            label="Select-Form"
            onChange={handleUserChange}
          >
            {usersarray.map((user) => (
              <MenuItem value={user._id}>{user.Name}</MenuItem>
            ))}
          </Select>
          {!userId && <div style={{ color: 'red' }}>Please select User</div>}
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
                  <TextField
                    label="Bank-Name"
                    name="BankName"
                    onChange={loanChangeHandler}
                    value={loan?.BankName}
                    variant="filled"
                    color="secondary"
                  />
                  {!loan?.BankName && <div style={{ color: 'red' }}>required BankName</div>}
                </Grid>
                <Grid item>
                  <TextField
                    label="Amount"
                    name="Amount"
                    type="number"
                    value={loan?.Amount}
                    onChange={loanChangeHandler}
                    variant="filled"
                    color="secondary"
                  />
                  {!loan?.Amount && <div style={{ color: 'red' }}>required Amount</div>}
                </Grid>
                <Grid item>
                  <TextField
                    label="Emi-Date"
                    type="date"
                    name="EmiDate"
                    value={loan?.EmiDate}
                    onChange={loanChangeHandler}
                    variant="filled"
                    color="secondary"
                  />
                  {!loan?.EmiDate && <div style={{ color: 'red' }}>required EmiDate</div>}
                </Grid>
                <Grid item>
                  <TextField
                    label="Loan-Type"
                    name="LoanType"
                    value={loan?.LoanType}
                    onChange={loanChangeHandler}
                    variant="filled"
                    color="secondary"
                  />
                  {!loan?.LoanType && <div style={{ color: 'red' }}>required LoanType</div>}
                </Grid>
                <Grid item spacing={2}>
                  <TextField
                    label="End-Date"
                    type="date"
                    name="EndDate"
                    value={loan?.EndDate}
                    onChange={loanChangeHandler}
                    variant="filled"
                    color="secondary"
                  />
                  {!loan?.EndDate && <div style={{ color: 'red' }}>required EndDate</div>}
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="flex-end">
                <Grid item>
                  <Button variant="contained" onClick={handleLoanSubmit} disabled={isLoanDisabled}>
                    Submit
                  </Button>
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
                  <TextField
                    label="Provider-Name"
                    name="ProviderName"
                    value={insurance?.ProviderName}
                    onChange={insuranceChangeHandler}
                    variant="filled"
                    color="secondary"
                  />
                  {!insurance?.ProviderName && (
                    <div style={{ color: 'red' }}>required Provider</div>
                  )}
                </Grid>
                <Grid item>
                  <TextField
                    label="Amount"
                    type="number"
                    name="Amount"
                    value={insurance?.Amount}
                    onChange={insuranceChangeHandler}
                    variant="filled"
                    color="secondary"
                  />
                  {!insurance?.Amount && <div style={{ color: 'red' }}>required Amount</div>}
                </Grid>
                <Grid item>
                  <TextField
                    label="Insurance"
                    name="InsuranceType"
                    value={insurance?.InsuranceType}
                    onChange={insuranceChangeHandler}
                    variant="filled"
                    color="secondary"
                  />
                  {!insurance?.InsuranceType && (
                    <div style={{ color: 'red' }}>required InsuranceType</div>
                  )}
                </Grid>
                <Grid item>
                  <TextField
                    label="Emi-Date"
                    name="EmiDate"
                    value={insurance?.EmiDate}
                    onChange={insuranceChangeHandler}
                    type="date"
                    variant="filled"
                    color="secondary"
                  />
                  {!insurance?.EmiDate && <div style={{ color: 'red' }}>required EmiDate</div>}
                </Grid>

                <Grid item>
                  <TextField
                    label="End-Date"
                    name="EndDate"
                    vlaue={insurance?.EndDate}
                    onChange={insuranceChangeHandler}
                    type="date"
                    variant="filled"
                    color="secondary"
                  />
                  {!insurance?.EndDate && <div style={{ color: 'red' }}>required EndDate</div>}
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="flex-end">
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={handleInsuranceSubmit}
                    disabled={isInsuranceDisable}
                  >
                    Submit
                  </Button>
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
                  <TextField
                    label="Bank-Name"
                    name="BankName"
                    vlaue={creditCard?.BankName}
                    onChange={creditCardChangeHandler}
                    variant="filled"
                    color="secondary"
                  />
                  {!creditCard?.BankName && <div style={{ color: 'red' }}>required BankName</div>}
                </Grid>
                <Grid item>
                  <TextField
                    label="Amount"
                    type="number"
                    name="EmiAmount"
                    value={creditCard?.EmiAmount}
                    onChange={creditCardChangeHandler}
                    variant="filled"
                    color="secondary"
                  />
                  {!creditCard?.EmiAmount && <div style={{ color: 'red' }}>required EmiAmount</div>}
                </Grid>

                <Grid item>
                  <TextField
                    label="Date"
                    name="EmiDate"
                    vlaue={creditCard?.EmiDate}
                    onChange={creditCardChangeHandler}
                    type="date"
                    variant="filled"
                    color="secondary"
                  />
                  {!creditCard?.EmiDate && <div style={{ color: 'red' }}>required EmiDate</div>}
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="flex-end">
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={handleCreditCardSubmit}
                    disabled={isCreditCardDisabled}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormModal;

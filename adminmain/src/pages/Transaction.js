import React, { useState, useEffect } from 'react'
import { filter } from 'lodash';
import MaterialTable from 'material-table'
// import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
// import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import {
  OfferListHead,
  OfferListToolbar,
  OfferMoreMenu,
  FormModal
} from '../components/_dashboard/offer';
//
// import OFFERS from '../_mocks_/offer';

// import { OfferForm } from '../components/AddYourBankDetailsForm'

import {
  AllBankOffer,
  getTransactionList,
  saveBankOffer
} from '../_services/Admin.services'
import toastr from 'toastr';
import {  ApplicationsStateChange } from '../_services/Admin.services';
// ----------------------------------------------------------------------




 let count = 0;
 
export default function Transaction() {
  
 const [data , setData] = useState([])

  const [transaction, setTransaction] = useState([]);
 
  const callEffect = async () => {
    let res = await getTransactionList()
    let data1 = [];
    if (res?.status === 1 && Array.isArray(res?.data)) {
        console.log(res.data[1].Amount)
        res.data.map((item ) =>{
            data1.push({"Email": item?.userId?.Email , "CreditDebit": item?.CreditDebit , "TransactionType": item?.TransactionType , "Amount": item?.Amount , "Wallet":item?.TransactionWallet})
        })
      setTransaction(data1)
    } else {
      if (res?.message)
        toastr.success(res.message)
    }
    
  };

  
   
  useEffect(() => {

     callEffect();
  
  }, []);

  const columns = [
    {title: "Email", field:"Email"},
    {title: "CreditDebit", field:"CreditDebit"},
    {title: "TransactionType", field:"TransactionType"},
    {title: "Amount", field:"Amount"},
    {title: "Wallet", field:"Wallet"},
    
  ]
  

  return (
    <Page title="Transaction | CreditIN">
      <Container>
        {console.log(transaction, "transaction")}
        <MaterialTable 
        title="Transactions"
        data = {transaction}
        columns={columns}
        />
      
      </Container>
    </Page>
  );
}

const statusArry = ['Pending', 'Approved', 'Processing', 'Reject'];
const Status = (props) => {
  const [value, setValue] = useState('');
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setValue(props?.status);
  }, [props?.status]);
  const onChange = (e) => {
    const { value } = e.target;
    setLoader(true);
    ApplicationsStateChange(props.id, { status: value }).then((res) => {
      if (res?.status === 1) {
        toastr.success('Success');
        setValue(value);
        setLoader(false);
        if (props.ApiUpdate) {
          props.ApiUpdate();
        }
      } else {
        setLoader(false);
      }
    });
  };

  return (
    <>
      {/* <p>{props?.status}</p> */}
      <select value={value} onChange={(e) => onChange(e)}>
        {statusArry.map((obj) => {
          return <option value={obj}>{obj}</option>;
        })}
      </select>
      {loader && <div>Loading...</div>}
    </>
  );
};


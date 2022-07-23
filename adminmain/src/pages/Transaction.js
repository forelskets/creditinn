import { cloneDeep } from "lodash";
import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
// import { Link as RouterLink } from 'react-router-dom';
// material
import {
  
  Container
  
} from '@mui/material';
import {
  
  Button,
 Dialog, DialogActions, DialogContent , DialogTitle
  
} from '@mui/material';
// components
import Page from '../components/Page';

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
 
 const [realData , setRealData] = useState([])
 const [dialogOpen ,setDialogOpen] = useState(false)
 const [dialogClose ,setDialogClose] = useState(false)
 const [startDate , setStartDate] = useState('');
 const [endDate , setEndDate] = useState('')

  const [transaction, setTransaction] = useState([]);
 
  const callEffect = async () => {
    let res = await getTransactionList()
    let data1 = [];
    if (res?.status === 1 && Array.isArray(res?.data)) {
        console.log(res?.data[1]?.Amount)
        res?.data?.map((item ) =>{
            data1.push({ "CreatedAt":item?.createdAt,"TransactionNo":item?.TransactionNo,"Email": item?.userId?.Email , "CreditDebit": item?.CreditDebit , "TransactionType": item?.TransactionType , "Amount": item?.Amount , "Wallet":item?.TransactionWallet })
        })
      setTransaction(data1)
    } else {
      if (res?.message)
        toastr.success(res?.message)
    }
    
  };

  
   
  useEffect(() => {

     callEffect();
  
  }, []);

  const columns = [
    {title: "TransactionNo", field:"TransactionNo"},
    {title: "Email", field:"Email"},
    {title: "CreditDebit", field:"CreditDebit"},
    {title: "TransactionType", field:"TransactionType"},
    {title: "Amount", field:"Amount"},
    {title: "Wallet", field:"Wallet"},
    
    
  ]
  
  const handleDate = () => {
    let tempData = cloneDeep(transaction)
    setRealData(transaction)
   
    const s = new Date(startDate)
    const e = new Date(endDate)
    console.log(s.toISOString(), "and" , e?.toISOString())
    const newData = tempData?.filter(item =>  s?.toISOString() <= item?.CreatedAt )?.filter(itemf => itemf?.CreatedAt <= e?.toISOString())
    
    console.log(newData  ," newData")
    setTransaction(newData)
    console.log(tempData[0].createdAt > s.toISOString() , "tempDAta")
    console.log(s.toISOString() > e.toISOString() , " date")
    setStartDate('')
    setEndDate('')
    setDialogClose(true); setDialogOpen(false) 
  }

  const handleDisabled = () =>{
    if(!startDate || !endDate){
      return true
    }else {
      return false
    }
  }

  return (
    <Page title="Transaction | CreditIN">
      <Container>
      <div style={{display: 'flex' }}>
        <Button variant="contained" onClick={()=> setDialogOpen(true)}>Search By Date</Button>
        <Button variant="contained" onClick={()=> setTransaction(realData)}>Refresh</Button>
      </div>
        <Dialog
        open={dialogOpen}
        onClose={dialogClose}>
          <DialogTitle>Select time period</DialogTitle>
          <DialogContent>
             <div>
              <label>from:</label>
              <input name="startDate" type="date" value={startDate} onChange={(e)=> setStartDate(e.target.value)} />
             </div>
             -
             <div>
             <label>to:</label>
              <input name="endDate" type="date" value={endDate} onChange={(e)=> setEndDate(e.target.value)}/>
             </div>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' onClick={() => {setDialogClose(true); setDialogOpen(false)}}>cancel</Button>
            <Button disabled={handleDisabled()} variant="contained" onClick={handleDate}>close</Button>
          </DialogActions>
        </Dialog>
     
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


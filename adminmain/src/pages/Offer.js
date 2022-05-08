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
  saveBankOffer
} from '../_services/Admin.services'
import toastr from 'toastr';
import {  ApplicationsStateChange } from '../_services/Admin.services';
// ----------------------------------------------------------------------




 let count = 0;
 
export default function Offer() {
  
 const [data , setData] = useState([])

  const [offer, setOffer] = useState([]);
 
  const callEffect = async () => {
    let res = await AllBankOffer()
    if (res?.status === 1 && Array.isArray(res?.data?.services)) {
      setOffer(res.data.services)

      
    } else {
      if (res?.message)
        toastr.success(res.message)
    }
    count = count + 1;
  };

  const Dataconvert =  () =>{
    
    let data1 = [];
     offer?.map((ele , ind)=>(
      ele?.BankService?.map((elm , indx) =>(
            
            data1.push({'Bank' : ele.BankName.BankName , 'Service' : elm.ServiceName , 'Note' : ele.Note})
      ))
      
    ))
    setData(data1)
    console.log(data , "data" ,columns)
  }

  useEffect(() => {
   if(offer.length === 0){
     callEffect();
   }
   else{
   Dataconvert();
   }
  }, [offer]);

  const columns = [
    {title: "Bank", field:"Bank"},
    {title: "Serivce", field:"Service"},
    {title: "Note", field:"Note"},
    
  ]
  

  return (
    <Page title="Banks Services | CreditIN">
      <Container>
        {console.log(data , columns , "datacolumns")}
        <MaterialTable 
        title="Bank Services"
        data = {data}
        columns={columns}
        options={{
          grouping: true
        }}
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


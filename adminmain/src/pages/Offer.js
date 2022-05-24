import React, { useState, useEffect } from 'react'
import { filter } from 'lodash';
import MaterialTable from 'material-table'
// import { Link as RouterLink } from 'react-router-dom';
// material
import {
  
  Container,
  
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
// import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import {
  
  FormModal
} from '../components/_dashboard/offer';

import axios from 'axios'
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
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



 let count = 0;
 
export default function Offer() {
  const [age , setAge] = useState('')
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
    
   
    
     offer?.map((ele , ind)=>{
      //  let BannerImg = JSON.parse(ele?.Picture);
     
      let BannerImg = {};
      if(ele.Picture){
      BannerImg = JSON.parse(ele?.Picture) ;
      }
      return(
      ele?.BankService?.map((elm , indx) =>{
           
            data1.push({'Bank' : ele?.BankName?.BankName , 'Service' : elm?.ServiceName , 'Note' : ele?.Note ,'Category':ele?.Category, 'Picture':BannerImg?.filePath })
      })
      )
      })
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
    {title: "Category" , field: "Category"},
    {title: "Banner", field:"Picture", render:(row) =><div style={{width:"100px" , height:"100px" }}><img src={`../${row?.Picture}`}/></div>},
    
  ]

  const saveOffers = async (obj, callback) => {
    
    const formData = new FormData();
    for(const key in obj){
      const ele = obj[key]
     
      if([key] !== undefined){
        formData.append(key , ele)
      }
    }
    // alert("8888")
    let res = await axios.post('/bank-offer', formData)
    console.log(res , "resss")
    // alert("999")
    if (res?.data?.status === 1) {
      if (callback) { callback() }
      callEffect()
      toastr.success("Bank offer created!")
    } else {
      if (res?.message)
        toastr.success(res.message)
    }
  }

  

  return (
    <Page title="Banks Services | CreditIN">
      <Container>
      <FormModal callApi={saveOffers}/>
        {console.log(data , columns , "datacolumns")}
        <MaterialTable 
        title="Bank Services"
        data = {data}
        columns={columns}
        options={{
          grouping: true,
          paging:true,
          pageSize:6,       // make initial page size
          emptyRowsWhenPaging: false,   // To avoid of having empty rows
          pageSizeOptions:[6,12,20,50],    // rows selection options
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


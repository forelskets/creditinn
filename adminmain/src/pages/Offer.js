import React, { useState, useEffect } from 'react'
import { filter } from 'lodash';
import MaterialTable from 'material-table'
import RichTextEditor from '../components/_dashboard/offer/RichTextEditor'
// import { Link as RouterLink } from 'react-router-dom';
// material
import {
  
  Container, FormControlLabel, Switch,
  
} from '@mui/material';
import toastr from 'toastr';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
// import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import {
  Edit,
  FormModal
} from '../components/_dashboard/offer';

import axios from 'axios'
//
// import OFFERS from '../_mocks_/offer';

// import { OfferForm } from '../components/AddYourBankDetailsForm'

import {
  AllBankOffer,
  ChangeOfferStatus,
  saveBankOffer
} from '../_services/Admin.services'

import {  ApplicationsStateChange , DeleteBankOffer } from '../_services/Admin.services';
// ----------------------------------------------------------------------




 let count = 0;
 
export default function Offer() {
  const [age , setAge] = useState('')
 const [data , setData] = useState([])

  const [offer, setOffer] = useState([]);
 
  const callEffect = async () => {
    let res = await AllBankOffer()
    console.log(res, "response")
    let data1 = [];
    if (res?.status === 1 && Array.isArray(res?.data?.services)) {
      res.data.services.map((ele , ind)=>{
        //  let BannerImg = JSON.parse(ele?.Picture);
      
        let BannerImg = {};
        if(ele.Picture){
        BannerImg = JSON.parse(ele?.Picture) ;
        }
        return(
        ele?.BankService?.map((elm , indx) =>{
             
              data1.push({"RTEditor":ele?.RTEditor ,"type":ele?.Type,"id":ele?._id ,'Bank' : ele?.BankName?.BankName ,"BankId":ele?.BankName?._id, 'Service' : elm?.ServiceName , 'ServiceId':elm?._id , 'Note' : ele?.Note ,'Category':ele?.Category, 'Picture':BannerImg?.filePath ,"View": ele?.Status })
        })
        )
        })
      setData(data1)
      console.log(data , "data" ,columns)
      

      
    } else {
      if (res?.message)
        {toastr.success(res.message)}
    }
    count = count + 1;
  };

 

  useEffect(() => {
   
     callEffect();
  
  }, []);



  const columns = [
    {title: "Bank", field:"Bank"},
    {title: "Serivce", field:"Service"},
    {title: "Note", field:"Note"},
    {title: "Category" , field: "Category"},
    {title: "Type" , field: "type"},
    {
      title: 'View',
      field: 'View',
      render: (row) => (
        <>
          {row.View === true ? (
            <FormControlLabel
              control={<Switch checked={row.View} onChange={(e) => StatusChangeHandler(e, row)} />}
              label="Can-View"
            />
          ) : (
            <FormControlLabel
              control={<Switch checked={row.View} onChange={(e) => StatusChangeHandler(e, row)} />}
              label="Can't-View"
            />
          )}
        </>
      ),
      editable: 'never',
      filtering: false
    },
    {title: "Banner", field:"Picture", render:(row) =><div style={{width:"100px" , height:"100px" }}><img src={`../${row?.Picture}`}/></div>},
    {title: "" , field: "" , render:(row)=> <><Edit data={row} callApi={callEffect}/></>},
    {title: "" , field: "" , render:(row)=> <><RichTextEditor row={row} /></>},
  ]

  const saveOffers = async (obj, callback) => {
    
    const formData = new FormData();
    for(const key in obj){
      const ele = obj[key]
     
      if([key] !== undefined){
        formData.append(key , ele)
      }
    }
  
    let res = await axios.post('/bank-offer', formData)
    console.log(res , "resss")
    
    if (res?.data?.status === 1) {
      if (callback) { callback() }
      callEffect()
      toastr.success("Bank offer created!")
    } else {
      if (res?.message){
        toastr.success(res.message)
      }
    }
  }

 

  const StatusChangeHandler = async (e, row) => {
    e.preventDefault();
    console.log(!row.View);
    const response = await ChangeOfferStatus(row.id, { Status: !row.View });
    if (response?.status === 1) {
      callEffect();
    } else {
      if (response?.message){
         alert(response.message);
      }
    }
  };

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
          actionsColumnIndex: -1,
          grouping: true,
          paging:true,
          pageSize:6,       // make initial page size
          emptyRowsWhenPaging: false,   // To avoid of having empty rows
          pageSizeOptions:[6,12,20,50],    // rows selection options
        }}
        editable={{
          
          onRowDelete: (oldData) =>
            new Promise(async (resolve, reject) => {
              const response = await DeleteBankOffer(oldData.id);
              console.log(response);
              if (response.status === 1) {
                callEffect();
                resolve();
              } else {
                reject();
              }
            })
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


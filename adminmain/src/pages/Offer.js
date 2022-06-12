import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import {Container, FormControlLabel, Switch  
} from '@mui/material';
import toastr from 'toastr';
import Page from '../components/Page';
import {
  Edit,
  FormModal
} from '../components/_dashboard/offer';

import axios from 'axios';

import {
  AllBankOffer,
  ChangeOfferStatus
} from '../_services/Admin.services'

import {  ApplicationsStateChange , DeleteBankOffer } from '../_services/Admin.services';
// ----------------------------------------------------------------------




 let count = 0;
 
export default function Offer() {
 const [data , setData] = useState([])
 
  const callEffect = async () => {
    let res = await AllBankOffer()

    let data1 = [];
    if (res?.status === 1 && Array.isArray(res?.data?.services)) {
      res.data.services.map((ele , ind)=>{
       
        let BannerImg = {};
        if(ele.Picture){
        BannerImg = JSON.parse(ele?.Picture) ;
        }
        return(
        ele?.BankService?.map((elm , indx) =>{
             
              data1.push({"type":ele?.Type,"id":ele?._id ,'Bank' : ele?.BankName?.BankName ,"BankId":ele?.BankName?._id, 'Service' : elm?.ServiceName , 'ServiceId':elm?._id , 'Note' : ele?.Note ,'Category':ele?.Category, 'Picture':BannerImg?.filePath ,"View": ele?.Status })
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
    {title: "Service", field:"Service"},
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
    <Page title="Banks Services | CreditsIN">
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
          pageSize:6,       
          emptyRowsWhenPaging: false,   
          pageSizeOptions:[6,12,20,50],   
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
      <select value={value} onChange={(e) => onChange(e)}>
        {statusArry.map((obj) => {
          return <option value={obj}>{obj}</option>;
        })}
      </select>
      {loader && <div>Loading...</div>}
    </>
  );
};


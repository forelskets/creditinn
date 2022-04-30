import React, { useEffect, useState } from 'react';
import { filter } from 'lodash';

// import { Link as RouterLink } from 'react-router-dom';
// material
import MaterialTable from 'material-table'
import {
 
  
  Container,
  
} from '@mui/material';
// components
import Page from '../components/Page';


import "@material-ui/icons"

import { service, AllService , Updateservice ,Deleteservice} from '../_services/Admin.services/index';
import toastr from 'toastr';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Service', label: 'Service', alignRight: false },
  { id: 'Note', label: 'Note', alignRight: false },
  { id: '' }
];



// ----------------------------------------------------------------------







export default function Services() {
 

  const [data, setData] = useState([]);
  const columns = [
    {title: "ServiceName" ,field:"ServiceName" , validate: rowData => rowData.ServiceName=== undefined ||rowData.ServiceName==="" ? "required": true},
    {title: "Note" ,field:"Note" , validate: rowData => rowData.Note=== undefined || rowData.Note === "" ? "required": true}
    
  ]
  const colum = [
    {ServiceName : "aniddd" , Note : "ffff"}
  ]
  const callEffect = async () => {
    let res = await AllService();
    if (res?.status === 1 && Array.isArray(res?.data?.services)) {
      setData(res.data.services);
      console.log(res.data.services)
    } else {
      if (res?.message) toastr.success(res.message);
    }
  };

  useEffect(() => {
    callEffect();
  }, []);

 



  



  return (
    <Page title="Services | CreditIN">
      <Container>
           <MaterialTable 
           title ="Service Table"
           columns = {columns}
           data = {data}
           options={{actionsColumnIndex : -1 , addRowPosition: "first" , filtering: true , exportButton: true}}
           editable={{
             onRowAdd:(newData) => new Promise( async (resolve , reject)=>{
              const response = await service(newData);
              console.log(response);
              if(response.status === 1){
                resolve();
                callEffect();
              }else{
                reject();
              }
              
             }),
             onRowUpdate:(newData, oldData) => new Promise(async(resolve , reject)=>{
              const response = await Updateservice(oldData._id , newData);
              console.log(response);
              if(response.status === 1){
                resolve();
                callEffect();
              }else{
                reject();
              }

              console.log(oldData)
             }),
             onRowDelete:(oldData)=> new Promise ( async(resolve , reject)=>{
              const response = await Deleteservice(oldData._id );
              console.log(response);
              if(response.status === 1){
                resolve();
                callEffect();
              }else{
                reject();
              }

              
             })
             
           }}
           />

         
        
      </Container>
    </Page>
  );
}

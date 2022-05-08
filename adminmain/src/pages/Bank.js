import React, { useEffect, useState } from 'react';
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
  BankListHead,
  BankListToolbar,
  BankMoreMenu,
  FormModal
} from '../components/_dashboard/bank';
//
// import BANK from '../_mocks_/bank';

    
    import { createBank, UpdateBanks ,AllBank ,DeleteBank} from '../_services/Admin.services';
import toastr from 'toastr';
import { Update } from '@material-ui/icons';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Bank', label: 'Bank', alignRight: false },
  { id: 'Note', label: 'Note', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------



export default function Bank() {
  const [BANK, setData] = useState([]);

  const columns = [
    {field: "BankName" , title: "BankName" , validate: rowData => rowData.BankName === undefined || rowData.BankName === "" ? "required" : true},
    {field: "Note" , title: "Note" , validate: rowData => rowData.Note === undefined || rowData.Note === "" ? "required" : true}
  ]

  const callEffect = async () => {
    let res = await AllBank();
    if (res?.status === 1 && Array.isArray(res?.data?.services)) {
      setData(res.data.services);
    } else {
      if (res?.message) toastr.success(res.message);
    }
  };

  useEffect(() => {
    callEffect();
  }, []);

  

  return (
    <Page title="Bank | Minimal-UI">
      <Container>
         <MaterialTable
           title=" Bank Offer"
           columns={columns}
           data={BANK}
           options={{actionsColumnIndex : -1 , addRowPosition: "first" , filtering: true , exportButton: true}}
           editable={{
             onRowAdd:(newData) => new Promise (async(resolve , reject)=>{
               const response = await createBank(newData);
               console.log(response);
               if(response.status === 1){
                 resolve();
                 callEffect();
               }else{
                 reject();
               }
             }),
             onRowUpdate:(newData , oldData) =>new Promise (async(resolve , reject)=>{
               const response = await UpdateBanks(oldData._id , newData);
               if(response.status === 1){
                resolve();
                callEffect();
              }else{
                reject();
              }
              }),
              onRowDelete:(oldData) => new Promise (async(resolve , reject)=>{
                const response = await DeleteBank(oldData._id);
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

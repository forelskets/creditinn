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
  TablePagination,
  FormControlLabel,
  Switch
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

    
    import { createBank, UpdateBanks ,AllBank ,DeleteBank, AllCategory , ChangeBankStatus} from '../_services/Admin.services';
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
  const [categoryArray,setCategoryArray] = useState({});

  const columns = [
    {
      title: 'Category',
      field: 'CategorySelect',
      lookup: categoryArray,
      validate: (rowData) =>
        rowData.CategorySelect === undefined || rowData.CategorySelect === '' ? 'required' : true
    },
    {field: "BankName" , title: "BankName" , validate: rowData => rowData.BankName === undefined || rowData.BankName === "" ? "required" : true},
    {field: "Note" , title: "Note" , validate: rowData => rowData.Note === undefined || rowData.Note === "" ? "required" : true},
    {
      title: 'View',
      field: 'View',
      render: (row) => (
        <>
          {row.View === true ? (
            <FormControlLabel
              control={<Switch checked={row.View} onChange={(e) => StatusChangeHandler(e, row)} />}
              label="Show"
            />
          ) : (
            <FormControlLabel
              control={<Switch checked={row.View} onChange={(e) => StatusChangeHandler(e, row)} />}
              label="Hide"
            />
          )}
        </>
      ),
      editable: 'never',
      filtering: false
    },
   
  ]

  const callEffect = async () => {
    let res = await AllBank();
    let allcategory = await AllCategory();
    console.log(allcategory, 'allcategory');
    if (allcategory?.status === 1 && Array.isArray(allcategory?.data?.CatNames)) {
      let data2 = {};
      allcategory?.data?.CatNames.map((ele) => {
        data2[ele.CatName] = ele.CatName;
      });
      setCategoryArray(data2);
    }
    if (res?.status === 1 && Array.isArray(res?.data?.banks)) {
      let data1 = [];
      res.data.banks.map((ele) => {
        data1.push({
          BankName: ele.BankName,
          Note: ele.Note,
          View: ele.Status,
          _id: ele._id,
          CategorySelect: ele.Category
        });
      });
      setData(data1);
    } else {
      if (res?.message){
          alert(res.message);
      } 
    }
  };

  useEffect(() => {
    callEffect();
  }, []);

  const StatusChangeHandler = async (e, row) => {
    e.preventDefault();
    console.log(!row.View);
    const response = await ChangeBankStatus(row._id, { Status: !row.View });
    if (response?.status === 1) {
      callEffect();
    } else {
      if (response?.message){
            alert(response.message);
      } 
    }
  };

  return (
    <Page title="Bank | Creditsin">
      <Container>
         <MaterialTable
           title=" Bank Lists"
           columns={columns}
           data={BANK}
           options={{actionsColumnIndex : -1 , addRowPosition: "first" , filtering: true , exportButton: true}}
           editable={{
             onRowAdd:(newData) => new Promise (async(resolve , reject)=>{
               console.log(newData , "newData")
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

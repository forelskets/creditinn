import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
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
import MaterialTable from 'material-table';
//
// import userList from '../_mocks_/user';
import { AllUsers } from 'src/_services/Admin.services';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { field: 'Name', title: 'Name' },
  { field: 'Email', title: 'EmailId'},
  { field: 'Mobile', title: 'MobileNo' },
  { field: 'RefralNo', title: 'RefralNo'},
  { field: 'Status', title: 'Status'},
  
];

// ----------------------------------------------------------------------





export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userList , setUserList] = useState([])

  

  useEffect( ()=>{
         getUsers();
  },[])

  const getUsers = async () =>{
    const response = await AllUsers();
    console.log(response, 'response')
    setUserList(response.data)
    if(response.status === 1){
      setUserList(response.data)
    }
  }

 
 

  return (
    <Page title="User | CreditsIN">
      <Container>
       {console.log(userList , "userList")}
       <MaterialTable
       title="User-Table"
       columns={TABLE_HEAD}
       data={userList} 
       options={{
         exportButton: true,
         paging: true,
         pageSize: 5,
         emptyRowsWhenPagin: false,
         pageSizeOptions : [5 , 10 ,15, 20 ,30 ,40,50 , 100]
       }}/>
      </Container>
    </Page>
  );
}

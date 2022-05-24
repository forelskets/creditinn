import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// material
import {
 
  Container,
  
} from '@mui/material';
// components
import Switch from '@mui/material/Switch';
import Page from '../components/Page';
import MaterialTable from 'material-table';
//
// import userList from '../_mocks_/user';

import { ChangeStatus ,AllUsers} from '../_services/Admin.services/index';
import FormControlLabel from '@mui/material/FormControlLabel';
import { LoadingButton } from '@mui/lab';
// ----------------------------------------------------------------------



// ----------------------------------------------------------------------





export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userList , setUserList] = useState([]);
  const [switchStatus , setSwitchStatus] = useState(Boolean)
  const [loading , setLoading] = useState(false)

  const TABLE_HEAD = [
    { field: 'Name', title: 'Name' },
    { field: 'Email', title: 'EmailId'},
    { field: 'Mobile', title: 'MobileNo' },
    { field: 'RefralNo', title: 'RefralNo'},
    { field: 'Status', title: 'LoginAuthority' , render : (row) =><>{(row.Status === true) ?<FormControlLabel control={<Switch defaultChecked onChange={(e)=> StatusChangeHandler(e ,row)} />} label="Can-Login" />: <FormControlLabel control={<Switch onChange={(e)=> StatusChangeHandler(e, row)} />} label="Can't-Login" />}</>},
    { field: 'userVerified', title: 'Varification' , render : (row) =><>{(row.userVerified) ?  <div style={{backgroundColor:"green"}}>{"Varified"}</div> :<div style={{backgroundColor:"red"}}>{"Not- Varified"}</div>}</>},
    
  ];

  const StatusChangeHandler = async (e , row)=>{
    e.preventDefault();
    const text = " confirm you want to change Login Status of user";
    if(window.confirm(text) === true){
    
    const response = await ChangeStatus(row._id , {"switchStatus" : !row.Status})
    
    if(response?.status === 1){
      getUsers();
      
      // alert(response?.message)
    }else{
      alert(response?.message);
      
    }}
      
  }

  useEffect( ()=>{
         getUsers();
  },[])

  const getUsers = async () =>{
    const response = await AllUsers();
    console.log(response, 'response')
    setUserList(response?.data)
    if(response?.status === 1){
      setUserList(response?.data)
    }
  }

 
 

  return (
    <Page title="User | CreditsIn">
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


import { useEffect, useState } from 'react';
import {
  Container,  
} from '@mui/material';
import Switch from '@mui/material/Switch';
import Page from '../components/Page';
import MaterialTable from 'material-table';
import { ChangeStatus ,AllUsers} from '../_services/Admin.services/index';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function User() {
  const [userList , setUserList] = useState([]);

  const TABLE_HEAD = [
    { field: 'Name', title: 'Name' },
    { field: 'Email', title: 'EmailId'},
    { field: 'Mobile', title: 'MobileNo' },
    { field: 'RefralNo', title: 'RefralNo'},
    { field: 'Status', title: 'LoginAuthority' , render : (row) =><>{(row.Status === true) ?<FormControlLabel control={<Switch defaultChecked onChange={(e)=> StatusChangeHandler(e ,row)} />} label="Can-Login" />: <FormControlLabel control={<Switch onChange={(e)=> StatusChangeHandler(e, row)} />} label="Can't-Login" />}</>},
    { field: 'userVerified', title: 'Verification' , render : (row) =><>{(row.userVerified) ?  <div style={{backgroundColor:"green"}}>{"Verified"}</div> :<div style={{backgroundColor:"red"}}>{"Non- Verified"}</div>}</>},
    
  ];

  const StatusChangeHandler = async (e , row)=>{
    e.preventDefault();
    const text = " confirm you want to change Login Status of user";
    if(window.confirm(text) === true){
    
    const response = await ChangeStatus(row._id , {"switchStatus" : !row.Status})
    
    if(response?.status === 1){
      getUsers();
         
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
    <Page title="Users | Creditsin">
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
         pageSizeOptions : [10 ,15, 20 ,35 ,50, 100]
       }}/>
      </Container>
    </Page>
  );
}

import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
// components
import Page from '../components/Page';

//
// import userList from '../_mocks_/user';
import { Products } from 'src/_services/Admin.services';
// ----------------------------------------------------------------------



// ----------------------------------------------------------------------




 

export default function Token() {
 
  const [userList , setUserList] = useState([])


  useEffect( ()=>{
         getUsers();
  },[])

  const TABLE_HEAD = [
    { field: 'name', title: 'Name'},
    { field: 'product', title: 'Product'},
    { field: 'mobileno', title: 'MobileNo'},
   
 
   
  ];

  const getUsers = async () =>{
    const response = await Products();
    console.log(response, 'response')
    setUserList(response.data)
    if(response?.status === 1){
      let dataArray = [];
     
      response?.data.map((item)=>(
        dataArray.push({"name":item.Name , "product":item.Product , "mobileno":item.Mobile , "status":item.status})
      ))
      setUserList(dataArray)
    }
  }

 

 

  

  return (
    <Page title="Insurances | CreditsIn">
       <MaterialTable
       title="Token"
       columns={TABLE_HEAD}
       data={userList}/>
    </Page>
  );
}

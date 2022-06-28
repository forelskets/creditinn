
import { useEffect, useState } from 'react';
// material

// components
import Page from '../components/Page';

//
// import userList from '../_mocks_/user';
import { AllRefrals } from 'src/_services/Admin.services';
import MaterialTable from 'material-table';
// ----------------------------------------------------------------------



// ----------------------------------------------------------------------




export default function Staff() {
 
  const [userList , setUserList] = useState([])

  const TABLE_HEAD = [
    { field: 'name', title: 'Name'},
    { field: 'product', title: 'Product' },
    {field: 'mobileno', title: 'MobileNo'},
   
   
  ];


  useEffect( ()=>{
         getUsers();
  },[])

  const getUsers = async () =>{
    const response = await AllRefrals();
    console.log(response, 'response')
    
    if(response?.status === 1){
      let dataArray=[];
      response.data.map((item)=>{
          dataArray.push({"name":item.Name , "product":item.Product ,"mobileno":item.Mobile ,  })
      })
      setUserList(dataArray)
    }
  }

  
  

 

  

  


  return (
    <Page title="User | Minimal-UI">
      <MaterialTable
      title="Staff"
      columns={TABLE_HEAD}
      data={userList}/>
    </Page>
  );
}

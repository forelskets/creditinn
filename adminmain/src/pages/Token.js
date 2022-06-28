import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
// components
import Page from '../components/Page';
import toastr from 'toastr';
//
// import userList from '../_mocks_/user';
import { Products , ProductStateChange } from 'src/_services/Admin.services';
// ----------------------------------------------------------------------

import FormModal from '../components/_dashboard/Token/form'

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
    { field: 'Status', title: 'Status' , render:(row) => <><Status id={row.id} value={row.Status} ApiUpdate={getUsers} /></>},
    { field: 'Modal', title: 'Modal',render : (row)=> <>{(row?.Status === "Approved") ? (<FormModal  data = {row} callApi={getUsers}/>):""}</>}
   
  ];

  const getUsers = async () =>{
    const response = await Products();
    console.log(response, 'response')
    setUserList(response.data)
    if(response?.status === 1){
      let dataArray = [];
     
      response?.data.map((item)=>(
        dataArray.push({"user":item.userId,"id":item._id,"Status":item.Status ,"name":item.Name , "product":item.Product , "mobileno":item.Mobile , "status":item.status})
      ))
      setUserList(dataArray)
    }
  }

 

 

  

  return (
    <Page title="User | Minimal-UI">
       <MaterialTable
       title="Token"
       columns={TABLE_HEAD}
       data={userList}/>
    </Page>
  );
}

const statusArray = ['Pending', 'Approved'];
const Status = (props) => {
  const [value, setValue] = useState(props.value);
  const [loader, setLoader] = useState(false);
  console.log(props.value , props.id , "id value")
  useEffect(() => {
    setValue(props?.status);
  }, [props?.status]);
  const onChange = (e) => {
    const { value } = e.target;
    setLoader(true);
    ProductStateChange(props.id, { Status: value }).then((res) => {
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
        {statusArray.map((obj) => {
          return <option value={obj}>{obj}</option>;
        })}
      </select>
      {loader && <div>Loading...</div>}
    </>
  );
};
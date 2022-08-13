import { filter } from 'lodash';
import { cloneDeep } from "lodash";
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
import {
  
  Button,
 Dialog, DialogActions, DialogContent , DialogTitle
  
} from '@mui/material';



 

export default function Token() {
 
  const [userList , setUserList] = useState([])
  const [data , setData] = useState([])
  const [realData , setRealData] = useState([])
  const [dialogOpen ,setDialogOpen] = useState(false)
  const [dialogClose ,setDialogClose] = useState(false)
  const [startDate , setStartDate] = useState('');
  const [endDate , setEndDate] = useState('')

  useEffect( ()=>{
         getUsers();
  },[])

  const TABLE_HEAD = [
    { field: 'name', title: 'Name'},
    { field: 'product', title: 'Product'},
    { field: 'mobileno', title: 'MobileNo'},
    { field: 'Status', title: 'Status' , render:(row) => <><Status id={row?.id} value={row?.Status} ApiUpdate={getUsers} /></>},
    { field: 'Modal', title: 'Modal',render : (row)=> <>{(row?.Status === "Approved") ? (<FormModal  data = {row} callApi={getUsers}/>):""}</>}
   
  ];

  const getUsers = async () =>{
    const response = await Products();
    console.log(response, 'response')
    setUserList(response?.data)
    if(response?.status === 1){
      let dataArray = [];
     
      response?.data.map((item)=>(
        dataArray.push({"createdAt":item?.createdAt ,"user":item?.userId,"id":item?._id,"Status":item?.Status ,"name":item?.Name , "product":item?.Product , "mobileno":item?.Mobile , "status":item?.status})
      ))
      setUserList(dataArray)
    }
  }

  const handleDate = () => {
    let tempData = cloneDeep(userList)
    setRealData(userList)
   
    const s = new Date(startDate)
    const e = new Date(endDate)
    console.log(s.toISOString(), "and" , e.toISOString())
    const newData = tempData.filter(item =>  s.toISOString() <= item?.createdAt ).filter(itemf => itemf?.createdAt <= e?.toISOString())
    console.log(newData  ," newData")
    setUserList(newData)
    
    setStartDate('')
    setEndDate('')
    setDialogClose(true); setDialogOpen(false) 
  }

  const handleDisabled = () =>{
    if(!startDate || !endDate){
      return true
    }else {
      return false
    }
  }

 

  

  return (
    <Page title="Insurances Application">
       <div style={{display: 'flex' }}>
        <Button variant="contained" onClick={()=> setDialogOpen(true)}>Select By Date</Button>
        <Button variant="contained" onClick={()=> setUserList(realData)}>Refresh</Button>
      </div>
        <Dialog
        open={dialogOpen}
        onClose={dialogClose}>
          <DialogTitle>Select time period</DialogTitle>
          <DialogContent>
             <div>
              <label>from:</label>
              <input name="startDate" type="date" value={startDate} onChange={(e)=> setStartDate(e.target.value)} />
             </div>
             -
             <div>
             <label>to:</label>
              <input name="endDate" type="date" value={endDate} onChange={(e)=> setEndDate(e.target.value)}/>
             </div>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' onClick={() => {setDialogClose(true); setDialogOpen(false)}}>cancel</Button>
            <Button disabled={handleDisabled()} variant="contained" onClick={handleDate}>close</Button>
          </DialogActions>
        </Dialog>
       <MaterialTable
       title="Insurances Application"
       columns={TABLE_HEAD}
       data={userList}
          options={{
              exportButton: true,
              paging: true,
              pageSize: 5,
              emptyRowsWhenPagin: false,
              pageSizeOptions : [10 ,15, 20 ,35 ,50, 100]
            }}/>
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
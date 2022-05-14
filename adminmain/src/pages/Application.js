import React, { useEffect, useState } from 'react';
import { filter } from 'lodash';
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
import SearchNotFound from '../components/SearchNotFound';
import { AppListHead, AppListToolbar, AppMoreMenu ,FormModal } from '../components/_dashboard/Application';
import { Applications, ApplicationsStateChange ,allortCashback } from '../_services/Admin.services';
import toastr from 'toastr';
import MaterialTable from 'material-table';
// ----------------------------------------------------------------------


//  
// ----------------------------------------------------------------------





export default function User() {
  const [application , setApplication] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const [data, setData] = useState([]);

  const Dataconvert = () =>{
    let data1 =[];
    data?.map((ele , ind)=>(
    
    data1?.push({"Id":ele?._id,"user":ele?.UserId,"Name" : ele?.UserId?.Name , "Mobile":ele?.UserId?.Mobile , "Application":ele?.ApplicationNo , "AadharNo":ele?.KycId?.AdhaarNo , "PanNo":ele?.KycId?.PanNo , "Amount":ele?.Amount , "Date":ele?.createdAt ,"Status":ele?.status , "Modal":"Modal"  })
    ))
    setApplication(data1)
  }
  useEffect(() => {
    if(data.length === 0){
    callEffect();
    }else{
      Dataconvert();
    }
  }, [data]);

  const callEffect = async () => {
    let res = await Applications();
    if (res?.status === 1 && Array.isArray(res?.data?.applications)) {
      setData(res?.data?.applications);
    }
  };

  const TABLE_HEAD = [
  
    { field: 'Name', title: 'Name' },
    { field: 'Mobile', title: 'MobileNo'},
    { field: 'Application', title: 'ApplicationNo'},
    { field: 'AadharNo', title: 'Aadhar No'},
    { field: 'PanNo', title: 'Pan No' },
    { field: 'Amount', title: 'Amount'},
    { field: 'Date', title: 'Date' },
    { field: 'Status', title: 'Status',render : (row)=>  <Status status={row.Status} id={row.Id} ApiUpdate={callEffect} ></Status>},
    { field: 'Modal', title: 'Modal',render : (row)=> <>{(row?.Status === "Approved") ? (<FormModal  data = {row} callApi={createCashback}/>):""}</>}
   
  ];

  const createCashback = async(obj , callback) =>{
    let res = await allortCashback(obj)
    if(res?.status === 1){
     
    
      
      if(callback){
        callback()

      }
      alert("allorted")
    } else{
      if(res?.message)
      toastr.success(res?.message)
    }
  }

  
  return (
    <Page title="Applications | CreditIN">
      <Container>
        {console.log(data,"filteredApps")}
        <MaterialTable
        title="Applied Application"
        columns={TABLE_HEAD}
        data={application}/>
       
      </Container>
    </Page>
  );
}

const statusArry = ['Pending', 'Approved', 'Processing', 'Reject'];
const Status = (props) => {
  const [value, setValue] = useState('');
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setValue(props?.status);
  }, [props?.status]);
  const onChange = (e) => {
    const { value } = e.target;
    setLoader(true);
    ApplicationsStateChange(props.id, { status: value }).then((res) => {
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
      {/* <p>{props?.status}</p> */}
      <select value={value} onChange={(e) => onChange(e)}>
        {statusArry.map((obj) => {
          return <option value={obj}>{obj}</option>;
        })}
      </select>
      {loader && <div>Loading...</div>}
    </>
  );
};

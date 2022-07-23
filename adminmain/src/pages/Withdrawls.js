import { Container } from '@mui/material'
import MaterialTable from 'material-table'
import React ,{useEffect , useState} from 'react'
import Page from 'src/components/Page'
import {getAllWithDrawls ,WithDrawlsStateChange} from '../_services/Admin.services'
import Dialog from '../components/_dashboard/withdrawls/Dailog';
import toastr from 'toastr'


export default function Withdrawls(){
  const [withdrawls , setWithdrawls] = useState([])
    const column = [
        {title:"Name" , field: "name"},
        {title:"Amount" , field: "amount"},
        {title:"RequestNo" , field: "requestNo"},
        {title:"Date" , field: "date"},
        {title:"TransactionNo" , field: 'TransactionNo' , render:(row) => <>{row?.TransactionNo !== "none" ? row?.TransactionNo : ""}</>},
        { field: 'Status', title: 'Status',render : (row)=>  <>{row?.Status === 'Reject' ? "Reject" : <Status status={row?.Status} id={row?.Id} ApiUpdate={callEffect} ></Status>}</>},
        {title:"",field:"" , render:(rowData) => <><Dialog data={rowData} ApiUpdate={callEffect}/></>}
    ]

    const callEffect  = async () =>{
      const response = await getAllWithDrawls();
      console.log(response , "response")
      if(response?.status === 1 && Array.isArray(response?.data)){
        console.log(response?.data , "ifResponse")
        let data1 = []
        response?.data?.map((ele)=>{
             data1.push({"userId":ele?.UserId?._id,"TransactionNo": ele?.TransactionNo,"Id":ele?._id, "Status":ele?.Status,"name" : ele?.UserId?.Name  , "amount": ele?.Amount , "requestNo": ele?.Requestno , "wallet":ele?.BankId?.Wallet , "AccHolderName":ele?.BankId?.AccHolderName ,"AccountNo":ele?.BankId?.AccountNo , "BankName":ele?.BankId?.BankName, "IFSCcode":ele?.BankId?.IFSCcode , "UPIID":ele?.BankId?.UPIID})
        })
        console.log(data1 , "arraydata")
        setWithdrawls(data1)
      }
    }
  
    useEffect(()=>{
      callEffect();
    },[])

  return (
    <Page title="Withdrawls | Creditsin">
        <Container>
            <MaterialTable
            columns={column}
            data={withdrawls}
            title="Withdrawls Request"/>
        </Container>
    </Page>
  )
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
    if(value === 'Reject'){
      WithDrawlsStateChange(props.id, { status: value }).then((res) => {
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
    }else{
    WithDrawlsStateChange(props.id, { status: value }).then((res) => {
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
    });}
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

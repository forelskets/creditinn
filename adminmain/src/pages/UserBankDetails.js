import MaterialTable from 'material-table'
import React,{useEffect, useState} from 'react'
import Page from '../components/Page'
import { Container } from '@mui/material'
import {getUserBankDetailsList} from '../_services/Admin.services'
const UserBankDetails = () => {
    const [userbankdetails , setUserbankdetails] = useState([]);
    const columns = [
        {title:"Name", field:"Name"},
        {title:"Email", field:"Email"},
        {title:"BankName", field:"BankName"},
        {title:"IFSCcode", field:"IFSCcode"},
        {title:"AcountNo", field:"AccountNo"},
        {title:"Wallet" , field:"Wallet"},
        {title:"AccountHolderName" , field:"AccountHolderName"}
     
    ]
    
    const getUserBankDetails = async (req , res)=>{
           const result = await getUserBankDetailsList();
           if(result?.status === 1){
             console.log(result?.data , "data")
             let data = [];
             result.data.map((item)=>{
               data.push({Name:item?.UserId?.Name, Email:item?.UserId?.Email, BankName:item?.BankName,IFSCcode:item?.IFSCcode,AccountNo:item?.AccountNo,Wallet:item?.Wallet,AccountHolderName:item?.AccountHolderName})
             })
             setUserbankdetails(data)
               
           }else{
             alert(result?.message)
           }
    }

    useEffect(()=>{
       getUserBankDetails();
    },[])
  return (
    <Page title="UserBankDetails | CreditIN">
        <Container>
            <MaterialTable
            title="UserBankDetails"
            data={userbankdetails}
            columns={columns}
            />
        </Container>
    </Page>
  )
}

export default UserBankDetails
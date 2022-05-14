import MaterialTable from 'material-table'
import React,{useEffect, useState} from 'react'
import Page from '../components/Page'
import { Container } from '@mui/material'
import {getUserBankDetailsList} from '../_services/Admin.services'
const UserBankDetails = () => {
    const [userbankdetails , setUserbankdetails] = useState([]);
    const columns = [
        {title:"UserID", field:"UserId"},
        {title:"BankName", field:"BankName"},
        {title:"IFSCcode", field:"IFSCcode"},
        {title:"AcountNo", field:"AccountNo"},
        {title:"Wallet" , field:"Wallet"},
        {title:"AccountHolderName" , field:"AccountHolderName"}
     
    ]
    
    const getUserBankDetails = async (req , res)=>{
           const result = await getUserBankDetailsList();
           if(result?.status === 1){
             setUserbankdetails(result?.data)
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
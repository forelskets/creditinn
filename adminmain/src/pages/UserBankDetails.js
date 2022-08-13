import MaterialTable from 'material-table'
import React,{useEffect, useState} from 'react'
import Page from '../components/Page'
import { Container } from '@mui/material'
import {getUserBankDetailsList} from '../_services/Admin.services'
import { cloneDeep } from "lodash";
import {
  
  Button,
 Dialog, DialogActions, DialogContent , DialogTitle
  
} from '@mui/material';


const UserBankDetails = () => {
    const [userbankdetails , setUserbankdetails] = useState([]);
    const [data , setData] = useState([])
    const [realData , setRealData] = useState([])
    const [dialogOpen ,setDialogOpen] = useState(false)
    const [dialogClose ,setDialogClose] = useState(false)
    const [startDate , setStartDate] = useState('');
    const [endDate , setEndDate] = useState('')
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
             result?.data?.map((item)=>{
               data.push({CreatedAt:item?.createdAt , Name:item?.UserId?.Name, Email:item?.UserId?.Email, BankName:item?.BankName,IFSCcode:item?.IFSCcode,AccountNo:item?.AccountNo,Wallet:item?.Wallet,AccountHolderName:item?.AccountHolderName})
             })
             setUserbankdetails(data)
               
           }else{
             alert(result?.message)
           }
    }

    useEffect(()=>{
       getUserBankDetails();
    },[])

   
  const handleDate = () => {
    let tempData = cloneDeep(userbankdetails)
    setRealData(userbankdetails)
   
    const s = new Date(startDate)
    const e = new Date(endDate)
   
    const newData = tempData?.filter(item =>  s?.toISOString() <= item?.CreatedAt )?.filter(itemf => itemf?.CreatedAt <= e?.toISOString())
    console.log(newData  ," newData")
    setUserbankdetails(newData)
    
   
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
    <Page title="UserBankDetails | CreditIN">
        <Container>
        <div style={{display: 'flex' }}>
        <Button variant="contained" onClick={()=> setDialogOpen(true)}>Search By Date</Button>
        <Button variant="contained" onClick={()=> setUserbankdetails(realData)}>Refresh</Button>
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
            title="UserBankDetails"
            data={userbankdetails}
            columns={columns}
            options={{
              exportButton: true,
              paging: true,
              pageSize: 5,
              emptyRowsWhenPagin: false,
              pageSizeOptions : [10 ,15, 20 ,35 ,50, 100]
            }}
            />
        </Container>
    </Page>
  )
}

export default UserBankDetails
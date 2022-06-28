import React, { useEffect , useState } from 'react'
import Page from 'src/components/Page'
import { Container, Input, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import MaterialTable from 'material-table';
import { getAllUserEmis } from 'src/_services/Admin.services';
import DatePicker from "react-datepicker";

import { Button , Grid } from '@mui/material';
import FormModal from "../components/_dashboard/userEmi/Form"
import { reject } from 'lodash';

const Useremi = () => {
  const [startDate , setStartDate] = useState(new Date())
  const [value, setValue] = React.useState('1');
  const [loanData , setLoanData] = useState([]);
  const [insuranceData , setInsuranceData] = useState([]);
  const [creditCardData , setCreditCardData] = useState([]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 const callEffect = async() =>{
   const response = await getAllUserEmis();
   console.log(response) 
   if(response.status === 1 && Array.isArray(response?.data)){
     let data1 = [];
     let data2 = [];
     let data3 = [];
     response?.data.map((ele)=>{
        if(ele?.Category === "Credit Cards"){
          data1.push({"BankName":ele?.BankName , "EmiAmount":ele?.EmiAmount , "EmiDate":ele?.EmiDate})
        } else if(ele?.Category === "Loans"){
          data2.push({"BankName":ele?.BankName , "EmiAmount":ele?.EmiAmount , "EmiDate": ele?.EmiDate , "LoanType": ele?.Type , "EndDate": ele?.EndDate })
        } else if(ele?.Category === "Insurances"){
          data3.push({"Insucomp":ele?.ProviderName , "EmiAmount":ele?.EmiAmount , "EmiDate": ele?.EmiDate , "InsuranceType": ele?.Type , "EndDate": ele?.EndDate})
        }
     })
     setLoanData(data2);
     setInsuranceData(data3);
     setCreditCardData(data1)
   }
 }


 const InsuranceColumns = [
   {title: "Company", field:"Insucomp"},
   {title: "Amount", field:"EmiAmount"},
   {title: "InsuranceType", field:"InsuranceType"},
   {title: "Date", field:"EmiDate"},
   {title: "EndDate", field:"EndDate"}
 ]

const CreditCardColumns = [
  {title: "BankName", field:"BankName"},
  {title:"Amount" , field:"EmiAmount"},
  {title: "Date", field:"EmiDate"}
]

 const LoanColumns = [
   {title:"Bank" , field:"BankName"},
   {title:"Amount" , field:"EmiAmount"},
   {title: "EmiDate", field: "EmiDate" },
   {title: "LoanType", field: "LoanType"},
   {title: "EndDate", field: "EndDate"}
 ]

  useEffect(()=>{
     callEffect();
  },[])

  return (
    <Page title='WishList | Minimal-UI'>
      <FormModal callEffect={callEffect}/>
      <Container>
     <Box  sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box container  sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        
        <Tab value="1" label="Loan" />
        <Tab value="2" label="Insurance" />
        <Tab value="3" label="CreditCard" />
       
        
      </Tabs>
        </Box>
        <TabPanel value="1">
          <MaterialTable
          title="Loan Table"
          columns={LoanColumns}
          data={loanData}
          options={{
            actionsColumnIndex: -1,
            addRowPosition:'first'
          }}
          editable={{
            onRowAdd:(newData) =>
            new Promise(async(resolve , reject) => {
              console.log(newData , "newData")
            })
          }}
          />
        </TabPanel>
        <TabPanel value="2">
        <MaterialTable
          title="Insurance Table"
          columns={InsuranceColumns}
          data={insuranceData}
          />
        </TabPanel>
        <TabPanel value="3">
        <MaterialTable
          title="CreditCard Table"
          columns={CreditCardColumns}
          data={creditCardData}
          />
        </TabPanel>
      </TabContext>
    </Box>
    </Container>
    </Page>
  )
}

export default Useremi
import React, { useEffect , useState } from 'react'
import Page from 'src/components/Page'
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import MaterialTable from 'material-table';
import { getAllUserEmis } from 'src/_services/Admin.services';

const Useremi = () => {
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
          data1.push({"BankName":ele?.BankName , "Emiamount":ele?.Emiamount , "Emidate":ele?.Emidate})
        } else if(ele?.Category === "Loans"){
          data2.push({"BankName":ele?.BankName , "Emiamount":ele?.Emiamount , "Emidate": ele?.Emidate , "LoanType": ele?.LoanType })
        } else if(ele?.Category === "Insurances"){
          data3.push({"Insucomp":ele?.Insucomp , "Emiamount":ele?.Emiamount , "Emidate": ele?.Emidate , "InsuranceType": ele?.InsuranceType })
        }
     })
     setLoanData(data2);
     setInsuranceData(data3);
     setCreditCardData(data1)
   }
 }


 const InsuranceColumns = [
   {title: "Company", field:"Insucomp"},
   {title: "Amount", field:"Emiamount"},
   {title: "InsuranceType", field:"InsuranceType"},
   {title: "Date", field:"Emidate"},
   {title: "EndDate", field:"Enddate"}
 ]

const CreditCardColumns = [
  {title: "BankName", field:"BankName"},
  {title:"Amount" , field:"Emiamount"},
  {title: "Date", field:"Emidate"}
]

 const LoanColumns = [
   {title:"Bank" , field:"BankName"},
   {title:"Amount" , field:"Emiamount"},
   {title: "EmiDate", field: "Emidate"},
   {title: "LoanType", field: "LoanType"},
   {title: "EndDate", field: "Enddate"}
 ]

  useEffect(()=>{
     callEffect();
  },[])

  return (
    <Page title='WishList | Minimal-UI'>
      <Container>
     <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
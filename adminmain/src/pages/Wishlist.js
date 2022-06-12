import { Container } from '@mui/material'
import MaterialTable from 'material-table'
import React , {useEffect , useState} from 'react'
import Page from 'src/components/Page'
import {getAllWishList } from '../_services/Admin.services'

const Wishlist = () => {
  const [wishlist , setWishlist] = useState([]) 
  const column =[
    {title: "Name" , field: "name"},
    {title: "Email" , field: "email"},
    {title: "Product" , field:"product"},
    {title:"Planning_Time" , field: "planning_Time"},
    {title:"Budget" , field: "budget"},
    {title:"Remarks" , field: "remarks"},
    {title:"State" , field: "state"},
    {title:"City" , field: "city"},
  ]

  const callEffect  = async () =>{
    const response = await getAllWishList();
    console.log(response , "response")
    if(response?.status === 1 && Array.isArray(response?.data)){
      console.log(response.data , "ifResponse")
      let data1 = []
      response?.data.map((ele)=>{
           data1.push({"name" : ele?.UserId?.Name , "email" : ele?.UserId?.Email , "product": ele?.Product , "planning_Time": ele?.Planning_Time , "budget":ele?.Budget , "remarks":ele?.Remarks , "city":ele?.City , "state": ele?.State})
      })
      console.log(data1 , "arraydata")
      setWishlist(data1)
    }
  }

  useEffect(()=>{
    callEffect();
  },[])
  return (
    <Page title='WishList | Creditsin'>
      {console.log(wishlist , "data")}
      <Container>
        <MaterialTable
        title='WishList'
        columns={column}
        data={wishlist}
        />
      </Container>
    </Page>
  )
}

export default Wishlist
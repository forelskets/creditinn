import React, { useState, useEffect , useRef } from 'react';
import { filter } from 'lodash';
import MaterialTable from 'material-table';
// import { Link as RouterLink } from 'react-router-dom';
// material
import { Button, Container } from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
// import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { FormModal } from '../components/_dashboard/offer';

import axios from 'axios';
//
// import OFFERS from '../_mocks_/offer';

// import { OfferForm } from '../components/AddYourBankDetailsForm'

import {
  AllBank,
  AllBankOffer,
  AllCategory,
  AllService,
  saveBankOffer
} from '../_services/Admin.services';
import toastr from 'toastr';
import { ApplicationsStateChange } from '../_services/Admin.services';
// ----------------------------------------------------------------------

let count = 0;

export default function Offer() {
  const [bankObj, setBankObj] = useState({});
  const [serviceObj, setServiceObj] = useState({});
  const [categoryObj, setCategoryObj] = useState({});
  const [age, setAge] = useState('');
  const [data, setData] = useState([]);
  const [picture , setPicture] = useState('')
  const [pictureId , setPictureId] = useState('')
  const [loader , setLoader] = useState(false)
  const [offer, setOffer] = useState([]);
  const pictureRef = useRef(null)

  const callEffect = async () => {
    let res = await AllBankOffer();
    if (res?.status === 1 && Array.isArray(res?.data?.services)) {
      let data1 = [];
      console.log(res, "fffrrrfr")
      res?.data?.services?.map((ele, ind) => {
        let BannerImg = {};
        if (ele.Picture) {
          BannerImg = JSON.parse(ele?.Picture);
        }
        return ele?.BankService?.map((elm, indx) => {
          data1.push({
            Id: ele?._id,
            BankName: ele?.BankName?._id,
            BankService: elm?._id,
            Note: ele?.Note,
            Category: ele?.Category,
            Banner: BannerImg?.filePath,
            Picture:""
          });
        });
      });
      setData(data1);
    }
    let allbank = await AllBank();
    if (allbank?.status === 1 && Array.isArray(allbank?.data?.services)) {
      let bankobj = {};
      allbank?.data?.services.map((ele) => {
        bankobj[ele._id] = ele.BankName;
      });
      console.log(bankobj , "bankobj")
      setBankObj(bankobj);
    }
    let allservice = await AllService();
    if (allservice?.status === 1 && Array.isArray(allservice?.data?.services)) {
      let serviceobj = {};
      allservice?.data?.services.map((ele) => {
        serviceobj[ele._id] = ele.ServiceName;
      });
      console.log(serviceObj , "serviceobj")
      setServiceObj(serviceobj);
    }
    let allcategory = await AllCategory();
    console.log(allcategory, 'allcategory');
    if (allcategory?.status === 1 && Array.isArray(allcategory?.data?.CatNames)) {
      let categoryobj = {};
      allcategory?.data?.CatNames.map((ele) => {
        categoryobj[ele.CatName] = ele.CatName;
      });
      setCategoryObj(categoryobj);
    } else {
      if (res?.message) toastr.success(res.message);
    }
  };

  useEffect(() => {
    callEffect();
  }, []);


  let formData = new FormData();
  
  const FileUpload = async (e , rowDatas)=>{
    
    // setPictureId(rowDatas.Id)
    // setPicture(e.target.files[0]);
    
    // alert(e.target.files[0]})
    formData.append("Id" , rowDatas.Id)
    formData.append('Picture' , e.target.files[0])
    
    
  
  }

  const SendFile = async () =>{
    setLoader(true)
    const response = await axios.post('/bank-offer/picture' , formData )
    console.log(response , "respomse")
   if(response?.data?.status === 1){
     setLoader(false)
   }else{
     alert(response?.data?.msg)
     setLoader(false)
   }
  }

 
  const columns = [
    
    { title: 'Bank', field: 'BankName', lookup: bankObj , validate: (rowData) =>
    rowData.BankName === undefined || rowData.BankName === '' ? 'required' : true },
    { title: 'Serivce', field: 'BankService', lookup: serviceObj ,  validate: (rowData) =>
    rowData.BankService === undefined || rowData.BankService === '' ? 'required' : true},
    { title: 'Note', field: 'Note' , validate: (rowData) =>
    rowData.Note === undefined || rowData.Note === '' ? 'required' : true},
    { title: 'Category', field: 'Category', lookup: categoryObj ,validate: (rowData) =>
    rowData.Category === undefined || rowData.Category === '' ? 'required' : true },
    {
      title: "Upload Banner ",
      field: "photo",
      editable: 'never',
      render: (rowData) => <> {loader ? "" :
        (<div value="photo">
          <input
            accept="image/*"
        
            id="raised-button-file"
            // multiple
            type="file"
           
            onChange={(e )=>{FileUpload(e , rowData)}}
          />
          <Button type='submit' onClick={SendFile}> Upload</Button>
        </div>)
      }</> , filtering : false
    },
    {
      title: 'Banner',
      field: 'Banner',
      render: (row) => (
        <div style={{ width: '100px', height: '100px' }}>
          <img src={`../${row?.Banner}`} />
        </div>
      ),
      editable :'never'
    }
  ];

  const saveOffers = async (obj, callback) => {
    const formData = new FormData();
    for (const key in obj) {
      const ele = obj[key];

      if ([key] !== undefined) {
        formData.append(key, ele);
      }
    }

    let result = await axios.post('/bank-offer', formData, {
      withCredentials: true
    });

    callback();
    if (result?.data?.status === 1) {
      callback();
      callEffect();
      toastr.success('Bank offer created!');
    } else {
      if (result?.data?.message) toastr.success(result?.data?.message);
    }
  };

  return (
    <Page title="Banks Services | CreditIN">
      <Container>
       
        {console.log(data, columns, 'datacolumns')}
        <MaterialTable
          title="Bank Services"
          data={data}
          columns={columns}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: 'first',
            filtering: true,
            exportButton: true,
            grouping: true,
            paging: true,
            pageSize: 6, // make initial page size
            emptyRowsWhenPaging: false, // To avoid of having empty rows
            pageSizeOptions: [6, 12, 20, 50] // rows selection options
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise(async (resolve, reject) => {
                console.log(newData, 'newDate');
                
                const response = await axios.post('/bank-offer', newData, {
                  withCredentials: true
                });
                if (response?.data?.status === 1) {
                  resolve();
                  callEffect();
                } else {
                  reject();
                }
              })
          }}
        />
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

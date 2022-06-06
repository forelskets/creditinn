import React, { useEffect, useState } from 'react';
import { filter } from 'lodash';
import Select from 'react-select';
// import { Link as RouterLink } from 'react-router-dom';
// material
import MaterialTable from 'material-table';
import { Container } from '@mui/material';
// components
import Page from '../components/Page';

import '@material-ui/icons';

import {
  service,
  AllService,
  Updateservice,
  Deleteservice,
  ChangeServiceStatus,
  AllCategory
} from '../_services/Admin.services/index';
import toastr from 'toastr';
// ----------------------------------------------------------------------

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

// ----------------------------------------------------------------------

export default function Services() {
  const [categoryArray, setCategoryArray] = useState({});
  const [data, setData] = useState([]);
  const columns = [
    {
      title: 'Category',
      field: 'CategorySelect',
      lookup: categoryArray,
      validate: (rowData) =>
        rowData.CategorySelect === undefined || rowData.CategorySelect === '' ? 'required' : true
    },
    {
      title: 'ServiceName',
      field: 'ServiceName',
      validate: (rowData) =>
        rowData.ServiceName === undefined || rowData.ServiceName === '' ? 'required' : true
    },
    {
      title: 'Note',
      field: 'Note',
      validate: (rowData) => (rowData.Note === undefined || rowData.Note === '' ? 'required' : true)
    },
    {
      title: 'View',
      field: 'View',
      render: (row) => (
        <>
          {row.View === true ? (
            <FormControlLabel
              control={<Switch checked={row.View} onChange={(e) => StatusChangeHandler(e, row)} />}
              label="Show"
            />
          ) : (
            <FormControlLabel
              control={<Switch checked={row.View} onChange={(e) => StatusChangeHandler(e, row)} />}
              label="Hide"
            />
          )}
        </>
      ),
      editable: 'never',
      filtering: false
    }
    
  ];
  const colum = [{ ServiceName: 'aniddd', Note: 'ffff' }];

  const fruitsList = [
    { value: 'lime', label: 'lime-label' },
    { value: 'mango', label: 'mango-label' }
  ];
  const callEffect = async () => {
    let res = await AllService();
    let allcategory = await AllCategory();
    console.log(allcategory, 'allcategory');
    if (allcategory?.status === 1 && Array.isArray(allcategory?.data?.CatNames)) {
      let data2 = {};
      allcategory?.data?.CatNames.map((ele) => {
        data2[ele.CatName] = ele.CatName;
      });
      setCategoryArray(data2);
    }
    if (res?.status === 1 && Array.isArray(res?.data?.services)) {
      let data1 = [];
      res.data.services.map((ele) => {
        data1.push({
          ServiceName: ele.ServiceName,
          Note: ele.Note,
          View: ele.Status,
          _id: ele._id,
          CategorySelect: ele.Category
        });
      });
      setData(data1);
      console.log(categoryArray, 'category');
    } else {
      if (res?.message) toastr.success(res.message);
    }
  };

  useEffect(() => {
    callEffect();
  }, []);

  const StatusChangeHandler = async (e, row) => {
    e.preventDefault();
    console.log(!row.View);
    const response = await ChangeServiceStatus(row._id, { Status: !row.View });
    if (response?.status === 1) {
      callEffect();
    } else {
      if (response?.message) toastr(response.message);
    }
  };

  return (
    <Page title="Services | CreditIN">
      <Container>
        <MaterialTable
          title="Service Lists"
          columns={columns}
          data={data}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: 'first',
            filtering: true,
            exportButton: true
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise(async (resolve, reject) => {
                console.log(newData, 'newData');
                const response = await service(newData);
                console.log(response);
                if (response.status === 1) {
                  resolve();
                  callEffect();
                } else {
                  reject();
                }
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(async (resolve, reject) => {
                const response = await Updateservice(oldData._id, newData);
                console.log(response);
                if (response.status === 1) {
                  callEffect();
                  resolve();
                } else {
                  reject();
                }

                console.log(oldData);
              }),
            onRowDelete: (oldData) =>
              new Promise(async (resolve, reject) => {
                const response = await Deleteservice(oldData._id);
                console.log(response);
                if (response.status === 1) {
                  callEffect();
                  resolve();
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

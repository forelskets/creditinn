import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { Container } from '@mui/material';
import Page from '../components/Page';
import { cloneDeep } from 'lodash';
import '@material-ui/icons';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
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
  const [dataD, setDataD] = useState([]);
  const [realData, setRealData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogClose, setDialogClose] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const columns = [
    {
      title: 'ServiceName',
      field: 'ServiceName',
      validate: (rowData) =>
        rowData?.ServiceName === undefined || rowData?.ServiceName === '' ? 'required' : true
    },
    {
      title: 'Note',
      field: 'Note',
      validate: (rowData) =>
        rowData?.Note === undefined || rowData?.Note === '' ? 'required' : true
    },
    {
      title: 'View',
      field: 'View',
      render: (row) => (
        <>
          {row?.View === true ? (
            <FormControlLabel
              control={<Switch checked={row?.View} onChange={(e) => StatusChangeHandler(e, row)} />}
              label="Can-View"
            />
          ) : (
            <FormControlLabel
              control={<Switch checked={row?.View} onChange={(e) => StatusChangeHandler(e, row)} />}
              label="Can't-View"
            />
          )}
        </>
      ),
      editable: 'never',
      filtering: false
    },
    {
      title: 'Category',
      field: 'CategorySelect',
      lookup: categoryArray,
      validate: (rowData) =>
        rowData?.CategorySelect === undefined || rowData?.CategorySelect === '' ? 'required' : true
    }
  ];
  const colum = [{ ServiceName: 'aniddd', Note: 'ffff' }];

  const fruitsList = [
    { value: 'lime', label: 'lime-label' },
    { value: 'mango', label: 'mango-label' }
  ];
  const callEffect = async () => {
    let res = await AllService();
    console.log(res, 'reseres');
    let allcategory = await AllCategory();
    console.log(allcategory, 'allcategory');
    if (allcategory?.status === 1 && Array.isArray(allcategory?.data?.CatNames)) {
      let data2 = {};
      allcategory?.data?.CatNames.map((ele) => {
        data2[ele?.CatName] = ele?.CatName;
      });
      setCategoryArray(data2);
    }
    if (res?.status === 1 && Array.isArray(res?.data?.services)) {
      let data1 = [];
      res?.data?.services?.map((ele) => {
        data1?.push({
          createdAt: ele?.createdAt,
          ServiceName: ele?.ServiceName,
          Note: ele?.Note,
          View: ele?.Status,
          _id: ele?._id,
          CategorySelect: ele?.Category
        });
      });
      setData(data1);
      console.log(categoryArray, 'category');
    } else {
      if (res?.message) toastr.success(res?.message);
    }
  };

  useEffect(() => {
    callEffect();
  }, []);

  const StatusChangeHandler = async (e, row) => {
    e.preventDefault();
    console.log(!row?.View);
    const response = await ChangeServiceStatus(row?._id, { Status: !row?.View });
    if (response?.status === 1) {
      callEffect();
    } else {
      if (response?.message) toastr(response?.message);
    }
  };

  const handleDate = () => {
    let tempData = cloneDeep(data);
    setRealData(data);

    const s = new Date(startDate);
    const e = new Date(endDate);
    console.log(s?.toISOString(), 'and', e?.toISOString());
    const newData = tempData
      .filter((item) => s?.toISOString() <= item?.createdAt)
      .filter((itemf) => itemf?.createdAt <= e?.toISOString());
    console.log(newData, ' newData');
    setData(newData);
    console.log(tempData[0], 'tempdaaaaa');
    console.log(tempData[0]?.createdAt > s?.toISOString(), 'tempData');
    console.log(s.toISOString() > e?.toISOString(), ' date');
    setStartDate('');
    setEndDate('');
    setDialogClose(true);
    setDialogOpen(false);
  };

  const handleDisabled = () => {
    if (!startDate || !endDate) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Page title="Services | CreditIN">
      <Container>
        <div style={{ display: 'flex' }}>
          <Button variant="contained" onClick={() => setDialogOpen(true)}>
           Search By Date
          </Button>
          <Button variant="contained" onClick={() => setData(realData)}>
            Refresh
          </Button>
        </div>
        <Dialog open={dialogOpen} onClose={dialogClose}>
          <DialogTitle>Select time period</DialogTitle>
          <DialogContent>
            <div>
              <label>from:</label>
              <input
                name="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            -
            <div>
              <label>to:</label>
              <input
                name="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => {
                setDialogClose(true);
                setDialogOpen(false);
              }}
            >
              cancel
            </Button>
            <Button disabled={handleDisabled()} variant="contained" onClick={handleDate}>
              close
            </Button>
          </DialogActions>
        </Dialog>
        <MaterialTable
          title="Service Table"
          columns={columns}
          data={data}
          options={{
            exportButton: true,
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

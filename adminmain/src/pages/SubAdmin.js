import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { Container, FormControlLabel, Switch, TextField } from '@mui/material';
import Page from '../components/Page';
import { getAdmins, AddAdmin, UpdateSubAdmin, DeleteSubAdmin } from 'src/_services/Admin.services';
import { Typography } from '@mui/material';

const regex = {
  mobile: /^[8976][0-9]{9}$/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};

const SubAdmin = () => {
  const [adminList, setAdminList] = useState();
  const [passwordMatch, setPasswordMatch] = useState(true);
  const TABLE_HEAD = [
    {
      field: 'Name',
      title: 'Name',
      validate: (rowData) => (rowData.Name === '' || rowData.Name === undefined ? 'required' : true)
    },
    {
      field: 'Mobile',
      title: 'Mobile',
      validate: (rowData) =>
        rowData.Mobile === '' || rowData.Mobile === undefined
          ? 'required'
          : !regex?.mobile.test(rowData?.Mobile)
          ? 'invalid'
          : true
    },
    {
      field: 'Email',
      title: 'Email',
      validate: (rowData) =>
        rowData.Email === '' || rowData.Email === undefined
          ? 'required'
          : !regex?.email.test(rowData?.Email)
          ? 'invalid'
          : true
    },
    { field: 'Type', title: 'ADMINTYPE', editable: false },
    {
      field: 'Password',
      title: 'PASSWORD',
      editComponent: (props) => {
        return (
          <>
            <TextField
              type="password"
              required
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
            />
            {console.log(props.value, 'PASSWORD')}
            {props.value === '' || props.value === undefined ? (
              <Typography variant="body2" component="div" sx={{ color: 'red' }}>
                required
              </Typography>
            ) : (
              true
            )}
          </>
        );
      },
      validate: (rowData) =>
        rowData.Password === '' || rowData.Password === undefined ? 'required' : true
    },
    {
      field: 'ConfirmPassword',
      title: 'CONFIRM-PASSWORD',
      editComponent: (props) => {
        return (
          <>
            <TextField
              type="password"
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
            />

            {props.value === '' || props.value === undefined ? (
              <Typography variant="body2" component="div" sx={{ color: 'red' }}>
                required
              </Typography>
            ) : (
              true
            )}
          </>
        );
      },
      validate: (rowData) =>
        rowData.ConfirmPassword === '' || rowData.ConfirmPassword === undefined ? 'required' : true
    }
  ];

  useEffect(() => {
    callEffect();
  }, []);

  const callEffect = async () => {
    console.log('callEffect');
    const admins = await getAdmins();
    console.log(admins?.admins, 'admins');
    if (admins?.status === 1 && admins?.admins?.length >= 0) {
      setAdminList(admins?.admins);
    }
  };

  return (
    <Page title="Sub-Admin">
      <Container>
        <MaterialTable
          title="Sub-Admin"
          columns={TABLE_HEAD}
          data={adminList}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: 'first'
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise(async (resolve, reject) => {
                let data = { Type: 'SubAdmin' };
                console.log(newData, 'newData');
                if (newData.Password === newData.ConfirmPassword) {
                  Object.keys(newData).map((item) => {
                    if (item !== 'ConfirmPassword') {
                      data[item] = newData[item];
                    }
                  });

                  console.log(data, 'Data');
                  const response = await AddAdmin(data);
                  console.log(response);
                  if (response?.status === 1) {
                    resolve();
                    setTimeout(() => {
                      callEffect();
                    }, 3000);
                  } else {
                    reject();
                  }
                } else {
                  alert('Password and Confirm-password is not Matched');
                  setPasswordMatch(false);
                  reject();
                }
              }),

            onRowUpdate: (newData, oldData) =>
              new Promise(async (resolve, reject) => {
                let data = { Type: 'SubAdmin' };
                console.log(newData, 'newData');
                if (newData.Password === newData.ConfirmPassword) {
                  Object.keys(newData).map((item) => {
                    if (item !== 'ConfirmPassword') {
                      data[item] = newData[item];
                    }
                  });

                  console.log(data, 'Data');
                  const response = await UpdateSubAdmin(oldData._id, data);
                  console.log(response);
                  if (response.status === 1) {
                    callEffect();
                    resolve();
                  } else {
                    reject();
                  }
                } else {
                  alert('Password and Confirm-password is not Matched');
                  setPasswordMatch(false);
                  reject();
                }
              }),

            onRowDelete: (oldData) => {
              new Promise(async (resolve, reject) => {
                const response = await DeleteSubAdmin(oldData._id);
                console.log(response);
                if (response.status === 1) {
                  callEffect();
                  resolve();
                } else {
                  reject();
                }
              });
              console.log(oldData, 'oldData');
            }
          }}
        />
      </Container>
    </Page>
  );
};

export default SubAdmin;

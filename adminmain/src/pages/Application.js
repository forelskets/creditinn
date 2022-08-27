import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import dateFormat from 'dateformat';
// components

import Page from '../components/Page';
import { FormModal } from '../components/_dashboard/Application';
import { ApplicationsStateChange, allortCashback } from '../_services/Admin.services';
import toastr from 'toastr';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { getApplications } from '../store/asyncMethod/TablesReq';

export default function User() {
  const dispatch = useDispatch();
  let { applications } = useSelector((state) => state.TablesReqReducer);

  const [application, setApplication] = useState([]);


  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);
  const now = new Date();

  useEffect(() => {
    Applications();
    callEffect();
  }, []);

  const Applications = () => {};

  const callEffect = async () => {
    applications = await dispatch(getApplications());
    console.log(applications, 'applications all efect');
    let data1 = [];
    applications.map((ele, ind) =>
      data1?.push({
        Id: ele?._id,
        Type: ele?.Type,
        user: ele?.UserId,
        Name: ele?.ProfileId?.FirstName,
        Mobile: ele?.ProfileId?.Mobile,
        Application: ele?.ApplicationNo,
        PanNo: ele?.KycId?.PanNo,
        Bank: ele?.Purpose,
        Amount: ele?.Amount,
        City: ele?.ProfileId?.City,
        State: ele?.ProfileId?.State,
        Profession: ele?.Profession,
        Date: dateFormat(ele?.createdAt, 'dd-mmm'),
        Time: dateFormat(ele?.createdAt, 'HH:MM'),
        Status: ele?.status,
        Modal: ele?.Modal
      })
    );
    setApplication(data1);
  };
  const TABLE_HEAD = [
    { field: 'Type', title: 'Type' },
    { field: 'Name', title: 'Name' },
    { field: 'Mobile', title: 'MobileNo' },
    { field: 'Application', title: 'ApplicationNo' },
    // { field: 'AadharNo', title: 'Aadhar No' },
    { field: 'PanNo', title: 'Pan No' },
    { field: 'Amount', title: 'Amount' },
    {field: 'Bank', title:'Bank/Loan Type'},
    {field: 'City', title:'City'},
    {field: 'State', title:'State'},
    {field: 'Profession', title:'Profession'},
    { field: 'Date', title: 'Date' },
    { field: 'Time', title: 'Time' },
    {
      field: 'Status',
      title: 'Status',
      render: (row) => <Status status={row?.Status} id={row?.Id} ApiUpdate={callEffect}></Status>
    },
    {
      field: 'Modal',
      title: 'Modal',
      render: (row) => (
        <>{row?.Status === 'Approved' ? <FormModal data={row} callApi={createCashback} /> : ''}</>
      )
    }
  ];

  const createCashback = async (obj, callback) => {
    let res = await allortCashback(obj);
    if (res?.status === 1) {
      if (callback) {
        callback();
      }
      alert('allorted');
    } else {
      if (res?.message) toastr.success(res?.message);
    }
  };

  return (
    <Page title="Applications | CreditsIN">
      <Container>
        {console.log(data, 'filteredApps')}
        <MaterialTable
          title="Applied Application"
          columns={TABLE_HEAD}
          data={application}
          options={{
            exportButton: true,
            paging: true,
            pageSize: 6,
            emptyRowsWhenPaging: false,
            pageSizeOptions: [6, 12, 20, 50,application?.length]
          }}
        />
      </Container>
    </Page>
  );
}

const statusArry = ['Pending', 'Approved', 'Processing', 'Reject'];
const Status = (props) => {
  // const dispatch = useDispatch();
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
        // dispatch(getApplications());
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
      <select value={value} onChange={(e) => onChange(e)}>
        {statusArry?.map((obj) => {
          return <option value={obj}>{obj}</option>;
        })}
      </select>
      {loader && <div>Loading...</div>}
    </>
  );
};

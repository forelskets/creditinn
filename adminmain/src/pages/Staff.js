import { useEffect, useState } from 'react';
import dateFormat from 'dateformat';

import Page from '../components/Page';

//
// import userList from '../_mocks_/user';
import { AllRefrals } from 'src/_services/Admin.services';
import MaterialTable from 'material-table';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Staff() {
  const [userList, setUserList] = useState([]);

  const TABLE_HEAD = [
    { field: 'name', title: 'Name' },
    { field: 'userName', title: 'User-Name' },
    { field: 'product', title: 'Product' },
    { field: 'mobileno', title: 'MobileNo' },
    { field: 'city', title: 'City' },
    { field: 'state', title: 'State' },
    { field: 'pincode', title: 'Pincode' },
    { field: 'createdAt', title: 'Date & Time' }
  ];

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await AllRefrals();
    console.log(response, 'response');

    if (response?.status === 1) {
      let dataArray = [];
      response?.data?.map((item) => {
        dataArray?.push({
          name: item?.Name,
          userName: item?.userId?.Name,
          product: item?.Product,
          mobileno: item?.Mobile,
          city: item?.City,
          state: item?.State,
          pincode: item?.Zip_Code,
          createdAt: dateFormat(item?.createdAt, 'dd-mmm -hh:mm')
        });
      });
      setUserList(dataArray);
    }
  };

  return (
    <Page title="Refferals | Creditsin">
      <MaterialTable
        title="Refferals "
        columns={TABLE_HEAD}
        data={userList}
        options={{
          exportButton: true,
          paging: true,
          pageSize: 6,
          emptyRowsWhenPaging: false,
          pageSizeOptions: [15, 25, 50, userList?.length]
        }}
      />
    </Page>
  );
}

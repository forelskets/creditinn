import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Switch from '@mui/material/Switch';
import Page from '../components/Page';
import MaterialTable from 'material-table';
import { ChangeStatus, AllUsers } from '../_services/Admin.services/index';
import FormControlLabel from '@mui/material/FormControlLabel';
import { cloneDeep } from 'lodash';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { padding } from '@mui/system';

export default function User() {
  const [userList, setUserList] = useState([]);
  const [data, setData] = useState([]);
  const [realData, setRealData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogClose, setDialogClose] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const TABLE_HEAD = [
    { field: 'Name', title: 'Name' },
    { field: 'Email', title: 'EmailId' },
    { field: 'Mobile', title: 'MobileNo' },
    { field: 'RefralNo', title: 'RefralNo' },
    {
      field: 'Status',
      title: 'LoginAuthority',
      render: (row) => (
        <>
          {row?.Status === true ? (
            <FormControlLabel
              control={<Switch defaultChecked onChange={(e) => StatusChangeHandler(e, row)} />}
              label="Can-Login"
            />
          ) : (
            <FormControlLabel
              control={<Switch onChange={(e) => StatusChangeHandler(e, row)} />}
              label="Can't-Login"
            />
          )}
        </>
      )
    }
    // { field: 'userVerified', title: 'Verification' , render : (row) =><>{(row?.userVerified) ?  <div style={{backgroundColor:"green"}}>{"Verified"}</div> :<div style={{backgroundColor:"red"}}>{"Non- Verified"}</div>}</>},
  ];

  const StatusChangeHandler = async (e, row) => {
    e.preventDefault();
    const text = ' confirm you want to change Login Status of user';
    if (window.confirm(text) === true) {
      const response = await ChangeStatus(row?._id, { switchStatus: !row?.Status });

      if (response?.status === 1) {
        getUsers();
      } else {
        alert(response?.message);
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await AllUsers();
    console.log(response, 'response');
    setUserList(response?.data);
    if (response?.status === 1) {
      setUserList(response?.data);
    }
  };

  const handleDate = () => {
    let tempData = cloneDeep(userList);
    setRealData(userList);

    const s = new Date(startDate);
    const e = new Date(endDate);
    console.log(s?.toISOString(), 'and', e?.toISOString());
    const newData = tempData
      .filter((item) => s?.toISOString() <= item?.createdAt)
      ?.filter((itemf) => itemf?.createdAt <= e?.toISOString());

    setUserList(newData);
    console.log(tempData[0]?.createdAt > s?.toISOString(), 'tempDAta');
    console.log(s?.toISOString() > e?.toISOString(), ' date');
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
    <Page title="Users | Creditsin">
      <Container>
        <div style={{ display: 'flex' }}>
          <Button variant="contained" onClick={() => setDialogOpen(true)}>
            search by date
          </Button>
          {/* <Button variant="contained" onClick={()=> setUserList(realData)}>Refresh</Button> */}
        </div>
        <Dialog open={dialogOpen} onClose={dialogClose}>
          <DialogTitle>Select date</DialogTitle>
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
              close
            </Button>
            <Button disabled={handleDisabled()} variant="contained" onClick={handleDate}>
              search
            </Button>
          </DialogActions>
        </Dialog>

        <MaterialTable
          title="User-Table"
          columns={TABLE_HEAD}
          data={userList}
          options={{
            exportButton: true,
            paging: true,
            pageSize: 5,
            emptyRowsWhenPagin: false,
            pageSizeOptions: [10, 15, 20, 35, 50, userList?.length]
          }}
        />
      </Container>
    </Page>
  );
}

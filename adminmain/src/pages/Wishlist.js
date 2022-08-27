import { Container } from '@mui/material';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import { getAllWishList } from '../_services/Admin.services';
import { cloneDeep } from 'lodash';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [realData, setRealData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogClose, setDialogClose] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const column = [
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Product', field: 'product' },
    { title: 'Planning_Time', field: 'planning_Time' },
    { title: 'Budget', field: 'budget' },
    { title: 'Remarks', field: 'remarks' },
    { title: 'State', field: 'state' },
    { title: 'City', field: 'city' }
  ];

  const callEffect = async () => {
    const response = await getAllWishList();

    if (response?.status === 1 && Array.isArray(response?.data)) {
      console.log(response?.data, 'ifResponse');
      let data1 = [];
      response?.data?.map((ele) => {
        data1?.push({
          createdAt: ele?.CreatedAt,
          name: ele?.UserId?.Name,
          email: ele?.UserId?.Email,
          product: ele?.Product,
          planning_Time: ele?.Planning_time,
          budget: ele?.Budget,
          remarks: ele?.Remarks,
          city: ele?.City,
          state: ele?.State
        });
      });

      setWishlist(data1);
    }
  };

  useEffect(() => {
    callEffect();
  }, []);

  const handleDate = () => {
    let tempData = cloneDeep(wishlist);
    setRealData(wishlist);

    const s = new Date(startDate);
    const e = new Date(endDate);
    console.log(s?.toISOString(), 'and', e?.toISOString());
    const newData = tempData
      ?.filter((item) => s?.toISOString() <= item?.createdAt)
      ?.filter((itemf) => itemf?.createdAt <= e?.toISOString());
    console.log(newData, ' newData');
    setWishlist(newData);

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
    <Page title="WishList | Creditsin">
      {console.log(wishlist, 'data')}
      <Container>
        <div style={{ display: 'flex' }}>
          <Button variant="contained" onClick={() => setDialogOpen(true)}>
            Search By Date
          </Button>
          <Button variant="contained" onClick={() => setWishlist(realData)}>
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
          title="WishList"
          columns={column}
          data={wishlist}
          options={{
            exportButton: true,
            paging: true,
            pageSize: 5,
            emptyRowsWhenPagin: false,
            pageSizeOptions: [10, 15, 20, 35, 50, wishlist?.length]
          }}
        />
      </Container>
    </Page>
  );
};

export default Wishlist;

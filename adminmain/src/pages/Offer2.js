import React, { useState, useEffect } from 'react';
import { filter } from 'lodash';
import MaterialTable from 'material-table';
// import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Toolbar
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
// import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import {
  OfferListHead,
  OfferListToolbar,
  OfferMoreMenu,
  FormModal
} from '../components/_dashboard/offer';
//
// import OFFERS from '../_mocks_/offer';

// import { OfferForm } from '../components/AddYourBankDetailsForm'

import { AllBankOffer, saveBankOffer } from '../_services/Admin.services';
import toastr from 'toastr';
import useTable from './UseTable';
import Controls from './Controls';
import Pops from './Pops';
// ----------------------------------------------------------------------
const columns = [
  {id: 'Bank', label: 'Bank' },
  {id: 'Note', label: 'Note' }
];
let count = 0;

export default function Offer2() {
  
  const [data, setData] = useState([]);

  const [offer, setOffer] = useState([]);
  const [openPopup , setOpenPopup] = useState(false)
  
  const { TblContainer , TblHead , TblPagination , recordsAfterPagingAndSorting} = useTable(offer , columns);
 
  const callEffect = async () => {
    let res = await AllBankOffer();
    if (res?.status === 1 && Array.isArray(res?.data?.services)) {
      setOffer(res?.data?.services);

      console.log('6666');
    } else {
      if (res?.message) toastr.success(res.message);
    }
  };

  useEffect(() => {
    callEffect();
  }, []);

  

  return (
    <Page title="Banks Services | CreditIN">
      <Toolbar>
         <Controls.Input
         label="Search Employee" />
      </Toolbar>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((item, ind) => {
            return (
              <>
                <TableRow key={ind}>
                  <TableCell>{item.Note}</TableCell>
                  <TableCell>{item.BankName.BankName}</TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </TblContainer>
      <TblPagination />
      <Pops
      openPopup = {openPopup}
      setOpenPopup = {setOpenPopup}> 

    </Pops>
    </Page>
    


  );
}
 {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Applied Application
          </Typography>
        </Stack> */}

        <Card>
          <AppListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <AppListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={APPLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredApps
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        name,
                        _id,
                        status,
                        ApplicationNo,
                        UserId,
                        KycId,
                        Amount,
                        createdAt
                      } = row;
                      const { Name, Mobile } = UserId;
                      const { AdhaarNo, PanNo } = KycId;
                      const isItemSelected = selected.indexOf(ApplicationNo) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, ApplicationNo)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {Name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{Mobile}</TableCell>
                          <TableCell align="left">{AdhaarNo}</TableCell>
                          <TableCell align="left">{PanNo}</TableCell>
                          <TableCell align="left">{ApplicationNo}</TableCell>

                          <TableCell align="left">{Amount}</TableCell>
                          <TableCell align="left">{createdAt}</TableCell>
                          <TableCell align="left">
                            <Status status={status} id={_id} ApiUpdate={callEffect}></Status>
                            {/* <Label
                              variant="ghost"
                              color={(status === 'banned' && 'error') || 'success'}
                            >
                              {sentenceCase(status)}
                            </Label> */}
                          </TableCell>

                          <TableCell align="right">
                            <AppMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isAppNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[10, 30, 50]}
            component="div"
            count={APPLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppTotal,
  RaiseAmount,
  ApprovedApp,
  AppNewsUpdate,
  RegUser,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits
} from '../components/_dashboard/app';
import { useDispatch , useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { REMOVE_MESSAGE } from 'src/store/types/AdminTypes';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const dispatch = useDispatch();
  const {message} = useSelector(state => state.AuthReducer)
 
  if(message){
    toast.success(message);
  
  }
   useEffect(()=>{
    dispatch({type: REMOVE_MESSAGE})
   },[])
  return (
    <Page title="Dashboard | Creditsin">
         <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              style: {
               fontSize : "14px",
              },
            }}
          />
      <Container maxWidth="xl">
        
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, CreditIn</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <RegUser />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppTotal />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ApprovedApp />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <RaiseAmount />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid> */}

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

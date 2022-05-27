import {useState , useEffect} from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// component
import Iconify from '../../Iconify';
import {AllUsers } from '../../../_services/Admin.services';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------



// const TOTAL = 7140;

export default function RegUser() {
  const [data , setData] = useState();

  useEffect(()=>{
    callEffect();
 })
 const callEffect = async () => {
   let res = await AllUsers();
   if (res?.status === 1 && Array.isArray(res?.data)) {
     setData(res?.data.length);
   }
 };
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon="bxs:user-plus" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(data)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Registered User
      </Typography>
    </RootStyle>
  );
}

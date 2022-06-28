// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// component
import Iconify from '../../Iconify';
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
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
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));



export default function AppTotal() {
  const {pendingApplications} = useSelector(state => state.TablesReqReducer)
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon="eos-icons:application-window" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(pendingApplications)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Pending Applications
      </Typography>
    </RootStyle>
  );
}

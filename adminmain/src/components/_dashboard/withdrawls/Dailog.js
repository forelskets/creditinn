import { Button, Dialog, DialogTitle, Box, Typography ,DialogContent ,TextField } from '@mui/material';
import React, { useState } from 'react';
import Iconify from 'src/components/Iconify';
import { WithDrawlsUpdateTransaction } from 'src/_services/Admin.services';

const Dailog = (props) => {
  const [open, setOpen] = useState(false);
 
  const [transaction , setTransaction] = useState('')

  const handleClickOpen = () => {
      console.log(props.data , "rowDAta")
    setOpen(true);
    
  };
  const CloseHandler = () => {
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const SubmitTransaction = async (e) =>{
    e.preventDefault();
     const response = await WithDrawlsUpdateTransaction(props?.data?.Id , {transaction});
     if(response.status === 1){
    props.ApiUpdate();
     }
  }

  return (
    <div>
      <Button
        variant="contained"
        to="#"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleClickOpen}
      >
        Show
      </Button>
      <Dialog
        fullWidth
        maxWidth="md"
        maxheight="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Select Bank & Service</DialogTitle>
        <DialogContent >
        {props?.data?.TransactionNo === "none" ? 
        (<Box sx={{ width: '100%', height: 40, display:'flex' , justifyContent: 'space-between' }}>
          <Typography variant="h3" gutterBottom component="span" sx={{ margin: 10 }}>
            TransactionNo:
          </Typography>
          <TextField id="standard-basic" label="Standard" variant="standard" onChange={(e)=>setTransaction(e.target.value)} sx={{ margin: 10  }} />
          <Button variant="contained" sx={{marginTop: 10 ,  padding: 3}} onClick={SubmitTransaction}>submit</Button>
        </Box>) : ""}
        <Box sx={{ width: '80%', height: 40, display:'flex' , justifyContent: 'space-between'}}>
          <Typography variant="h3" gutterBottom component="span" sx={{ margin: 10 }}>
            AccHolderName :
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="span" sx={{ margin: 10 , paddingTop : 2.5}}>
            {props.data.AccHolderName}
          </Typography>
        </Box>
        <Box sx={{ width: '80%' , height: 40, display:'flex' , justifyContent: 'space-between' }}>
          <Typography variant="h3" gutterBottom component="span" sx={{ margin: 10}}>
            BankName :
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="span" sx={{ margin: 10 , paddingTop : 2.5 }}>
            {props.data.BankName}
          </Typography>
        </Box>
        <Box sx={{ width: '80%', height: 40, display:'flex' , justifyContent: 'space-between' }}>
          <Typography variant="h3" gutterBottom component="span" sx={{ margin: 10 }}>
            AccountNo :
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="span" sx={{ margin: 10 , paddingTop : 2.5 }}>
            {props.data.AccountNo}
          </Typography>
        </Box>
        <Box sx={{ width: '80%', height: 40, display:'flex' , justifyContent: 'space-between' }}>
          <Typography variant="h3" gutterBottom component="span" sx={{ margin: 10 }}>
            IFSCcode :
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="span" sx={{ margin: 10 , paddingTop : 2.5}}>
            {props.data.IFSCcode}
          </Typography>
        </Box>
        <Box sx={{ width: '80%' , height: 40, display:'flex' , justifyContent: 'space-between' }}>
          <Typography variant="h3" gutterBottom component="span" sx={{ margin: 10 }}>
            UPIID :
          </Typography>
          <Typography variant="subtitle1" gutterBottom component="span" sx={{ margin: 10 ,paddingTop : 2.5 }}>
            {props.data.UPIID}
          </Typography>
        </Box>
        <Box sx={{ width: '80%', height: 40, display:'flex' , justifyContent: 'space-between' }}>
          <Typography variant="h3" gutterBottom component="span" sx={{ margin: 10 }}>
            Wallet
          </Typography>
          <Typography variant="subtitle" gutterBottom component="span" sx={{ margin: 10 ,paddingTop : 2.5 }}>
            {props.data.wallet}
          </Typography>
        </Box>
          
       
       
      
        
        </DialogContent>
       
        <Button variant="contained" onClick={CloseHandler}>
          Close
        </Button>
        
        
      </Dialog>
    </div>
  );
};

export default Dailog;

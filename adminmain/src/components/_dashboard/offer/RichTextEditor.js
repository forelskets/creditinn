import React, { useRef , useState } from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Iconify from 'src/components/Iconify';
import JoditEditor from 'jodit-react';
import {BankOfferTextEditor} from '../../../_services/Admin.services'


const RichTextEditor = (props) => {
    const [data , setData] = useState('')
    const editor = useRef(null)
    const [open, setOpen] = React.useState(false);
 
    

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const SubmitForms = async(e) =>{
      e.preventDefault();
      if(data){
          console.log(props.id)
         const response = await BankOfferTextEditor(props?.row?.id , {RTEditor : data})
         if(response?.status === 1){
             alert(response?.message)
             props.callApi();
         } else {
             alert(response?.message)
         }
      }else {
          alert("please fill data")
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
        RTEditor
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Select Bank & Service</DialogTitle>
        <div>
       
         <JoditEditor ref={editor} onChange={(content)=> setData(content)} value={props?.row?.RTEditor}/>

         {data}
              
         </div>
  
        <DialogActions>
          <Button onClick={SubmitForms} autoFocus>
            Save
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default RichTextEditor;
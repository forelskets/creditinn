import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'

const Pops = (props) => {
    const [title , children , openPopup ,setOpenPopup ] = props;
  return (
    <Dialog open={openPopup}>
        <DialogTitle>
            <div>title goes here.</div>
        </DialogTitle>
        <DialogContent>
            <div>content goes here.</div>
        </DialogContent>
    </Dialog>
  )
}

export default Pops
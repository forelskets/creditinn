import React ,{useRef , useEffect, useState} from 'react';
import { ShareRefralDataSave } from '../_services/Admin.services/index';
import {Button} from "react-bootstrap";

const ShareModal = (props) =>{
  const modalRef = useRef();
  const [name , setName] = useState('')
  const [mobile , setMobile] = useState('')
  const [product , setProduct] = useState('')
  const [responseMsg , setResponseMsg] = useState('');
  const [submitDis , SetSubmitDis] = useState(true)
   const HandleSubmit =async () =>{
    const refral = props.refral;
    console.log(props.id , name , mobile , product , refral)
    const response = await ShareRefralDataSave(props.id ,{ name , mobile , product , refral});
    
    if(response.status === 1){
      console.log(response.message,'dddd');
      setResponseMsg(response.message);
    }
  
   
  
     }


  
  

  useEffect(()=>{
    if(props.sharemodal){
      modalRef.current.click();
    }
  },[props.sharemodal])


  return (
    <>
   
<button type="button" className="btn btn-primary d-none" ref = {modalRef} data-bs-toggle="modal" data-bs-target="#exampleModal1">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-sm">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Share Referal</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
         <input type= "text" className="form-control mb-3" value={name} placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)} />
         <input type= "text" className="form-control mb-3" value={mobile} placeholder="Enter Your Mobile" onChange={(e)=>setMobile(e.target.value)} />
         <select onChange={(e)=>setProduct(e.target.value)} className="form-control mb-3">
           <option value='ddd'>Selected</option>
           <option value="Health Insourance" >Health Insourance</option>
           <option value="Car Insourance" >Car Insourance</option>
         </select>
         <Button type="button" className='btn-3' onClick={HandleSubmit}>Submit</Button>
         {responseMsg ? responseMsg : ""}
       </form>
      </div>
    </div>
  </div>
 </div>
  </>
  )
}

export default ShareModal
import React ,{useRef , useEffect, useState} from 'react'
import { ShareRefralDataSave } from '../_services/Admin.services/index'

const ShareInput = (props) =>{
  const [name , setName] = useState('')
  const [mobile , setMobile] = useState('')
  const [product , setProduct] = useState('')
  const [responseMsg , setResponseMsg] = useState('');
  const [submitDis , SetSubmitDis] = useState(true)
  const HandleSubmit =async () =>{
    console.log(props.id , name , mobile , product)
    const response = await ShareRefralDataSave(props.id ,{ name , mobile , product});
    
    if(response.status === 1){
      console.log(response.message,'dddd');
      setResponseMsg(response.message);
    }
  
   
  }
  return(
    <>
       <form>
         <input type= "text" value={name} placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)} />
         <input type= "text" value={mobile} placeholder="Enter Your Mobile" onChange={(e)=>setMobile(e.target.value)} />
         <select onChange={(e)=>setProduct(e.target.value)}>
           <option value='ddd'>Selected</option>
           <option value="Health Insourance" >Health Insourance</option>
           <option value="Car Insourance" >Car Insourance</option>
         </select>
         <button type="button" onClick={HandleSubmit}>Submit</button>
         {responseMsg ? responseMsg : ""}
       </form>
    </>
  )
}

const Modal = (props) => {
  const modalRef = useRef();
  

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
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {(props.InputValue === "SHAREINPUT" ) ?<ShareInput id={props.id}/>: ""}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
  </>
  )
}

export default Modal
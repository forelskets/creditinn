import React,{useState , useRef , useEffect} from 'react';
import {productDataSave} from '../_services/Admin.services/index'

const ProductModal = (props) => {
    const [name , setName] = useState('')
    const [mobile , setMobile] = useState('')
    const [email , setEmail] = useState('')
    const [product , setProduct] = useState('')
    const [responseMsg , setResponseMsg] = useState('');
    const modalRef = useRef();
    const [submitDis , SetSubmitDis] = useState(true)
    const HandleSubmit =async () =>{
      const refral = props.profile.RefralNo;
      console.log(props.profile._id , name , mobile , product , refral)
      const response = await productDataSave(props.profile._id ,{ name , mobile , product , refral , email});
      setName('');
      setMobile('');
      setEmail('');
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
{/* <div className="modal-dialog modal-dialog-centered modal-sm"> */}
<div className="modal fade " id="exampleModal1" tabIndex="-1" ariaLabelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-sm">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Apply for Product</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
         <input type= "text" className="form-control mb-3" value={name} placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)} />
         <input type= "text" className="form-control mb-3" value={mobile} placeholder="Enter Your Mobile" onChange={(e)=>setMobile(e.target.value)} />
         <input type= "text" className="form-control mb-3" value={email} placeholder="Ener Your Email" onChange={(e)=>setEmail(e.target.value)} />
         <select className="form-control mb-3" onChange={(e)=>setProduct(e.target.value)}> 
           <option value='ddd'>Selected</option>
           <option value="Health Insourance" >Health Insourance</option>
           <option value="Car Insourance" >Car Insourance</option>
         </select>
         <button type="button" className='btn-3' style={{padding:'5px'}} onClick={HandleSubmit}>Submit</button>
         {responseMsg ? responseMsg : ""}
       </form>
      </div>
    
    </div>
  </div>
</div> 
    </>
  )
}


export default ProductModal;
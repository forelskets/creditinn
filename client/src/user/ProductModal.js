import React,{useState , useRef , useEffect} from 'react';
import {productDataSave} from '../_services/Admin.services/index';
import {Button} from "react-bootstrap";

const ProductModal = (props) => {
    const [name , setName] = useState('')
    const [mobile , setMobile] = useState('')
    const [email , setEmail] = useState('')
    const [product , setProduct] = useState('')
    const [responseMsg , setResponseMsg] = useState('');
    const ProductmodalRef = useRef();
    const [submitDis , SetSubmitDis] = useState(true)

    console.log(props.productmodal,"productModal")
    const HandleSubmit =async () =>{
      console.log(props.profile._id , name , mobile , product)
      const response = await productDataSave(props.profile._id ,{ name , mobile , product , email});
      setName('');
      setMobile('');
      setEmail('');
      setProduct('');
      if(response.status === 1){
        console.log(response.message,'dddd');
        setResponseMsg(response.message);
      }
    }
  

  useEffect(()=>{
    if(props.productmodal){
      ProductmodalRef.current.click();
      console.log("produceModal useEffeect")
    }
  },[])
  return (
    <>
   <button type="button" className="btn btn-primary d-none" ref = {ProductmodalRef} data-bs-toggle="modal" data-bs-target="#exampleModal2">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-sm">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Apply For Product</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
         <input type= "text" value={name} className="form-control mb-3" placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)} />
         <input type= "text" value={mobile} className="form-control mb-3" placeholder="Enter Your Mobile" onChange={(e)=>setMobile(e.target.value)} />
         <input type= "text" value={email} className="form-control mb-3" placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value)} />
         <select onChange={(e)=>setProduct(e.target.value)} className="form-control mb-3">
           <option value='ddd'>Selected</option>
           <option value="Health Insurance" >Health Insurance</option>
           <option value="Life Insurance" >Life Insurance</option>
           <option value="Car Insurance" >Car Insurance</option>
           <option value="Bike Insurance" >Bike Insurance</option>
           <option value="Eductaion Insurance" >Eductaion Insurance</option>
           <option value="Home Insurance" >Home Insurance</option>
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


export default ProductModal;
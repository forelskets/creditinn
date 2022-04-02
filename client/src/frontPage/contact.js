import React ,{useState} from 'react';
import {customerSupport , corporateSupport} from '../_services/Support.Service/index'


const Contact = () => {
  const [customername , setCustomername] = useState('');
  const [customeremail , setCustomeremail] = useState('');
  const [customermobile , setCustomermobile] = useState('');
  const [customerarea , setCustomerarea] = useState('');
  const [corporatename , setCorporatename] = useState('');
  const [corporateemail , setCorporateemail] = useState('');
  const [corporatemobile , setCorporatemobile] = useState('');
  const [corporatearea , setCorporatearea] = useState('');
  const [customermessage , setCustomermessage] = useState('');
  const [corporatemessage , setCorporatemessage] = useState('');

 
  const submitCustomer= async (e)=>{
      e.preventDefault();
      console.log(customername , customeremail , customermobile , customerarea,'aaa')
      const response = await customerSupport({customername , customeremail , customermobile , customerarea}) ;
      console.log(response,'ffff')
      if(response.status === 1){
        console.log(response.status)
        setCustomermessage(response.message);
        
      }else if(response.status === 0){
        setCustomermessage(response.message);
      }
  }

  const submitCorporate= async (e)=>{
    e.preventDefault();
    const response = await corporateSupport({corporatename , corporateemail , corporatemobile , corporatearea}) ;
    if(response.status === 1){
      setCorporatemessage(response.message)
    }else if(response.status === 0){
      setCorporatemessage(response.message)
    }
}


  return (
    
    
  <div className="container contact">
      <div className="head mb-5" >
    <h1> Let's make something awesome together. </h1>
  </div>
    
    <div className="content mb-5">
      
    <div className="right-side">
    <h2  style={{backgroundColor: '#f5f2ee' , textAlign: 'center', padding: '10px 10px'}} >Customer Enquiry</h2>
  
    <p>If you have any query, you can send me message from here. It's our pleasure to help you.</p> 
     <form onSubmit={(e )=>{submitCustomer(e)}}>
      <div className="input-box">
        <input type="text" name="customername"  placeholder="Name" onChange={(e)=>setCustomername(e.target.value)}/>
      </div>
      <div className="input-box">
        <input type="text" name="customeremail" placeholder="Email Address" onChange={(e)=>setCustomeremail(e.target.value)}/>
      </div>
      <div className="input-box">
        <input type="text" name="customermobile" placeholder="Enter Your Mobile" onChange={(e)=>setCustomermobile(e.target.value)}/>
      </div>
      <div className="input-box message-box">
        <textarea placeholder=" How can we help you? " name="customerarea" onChange={(e)=>setCustomerarea(e.target.value)}></textarea>
      </div>
      <div >
        <input style={{padding: '15px'}} type="submit"  className="btn-3" value="Send a Message" />
      </div>
    </form>
    {customermessage ? customermessage : ""}
    </div>
   
    <div className="right-side ">
      {/* <div className="topic-text">We would be happy to help you </div> */}
      <h2  style={{backgroundColor: '#f5f2ee' , textAlign: 'center', padding: '10px 10px'}} >Corporate Enquiry</h2>
      <p>If you have any query, you can send me message from here. It's our pleasure to help you.</p> 
     <form onSubmit={(e )=>{submitCorporate(e)}}>
      <div className="input-box">
        <input type="text" placeholder="Name" name='corporatename' onChange={(e)=>setCorporatename(e.target.value)}/>
      </div>
      <div className="input-box">
        <input type="text" placeholder="Email Address" name='corporateemail' onChange={(e)=>setCorporateemail(e.target.value)}/>
      </div>
      <div className="input-box">
        <input type="text"  placeholder="Enter Your Mobile" name='corporatemobile' onChange={(e)=>setCorporatemobile(e.target.value)}/>
      </div>
      <div className="input-box message-box">
        <textarea placeholder="How can we help you?" name='corporatearea' onChange={(e)=>setCorporatearea(e.target.value)}></textarea>
      </div>
      <div >
        <input type="submit" style={{padding: '15px'}}   className="btn-3" value="Send a Message" />
      </div>
    </form>
    {corporatemessage ? corporatemessage : ""}

    {/* <h1 style={{textAlign:'left'}} >Monday-Friday</h1>
    <h3>9:00AM - 6:00PM</h3>
    <h1 style={{textAlign:'left'}} >Saturday</h1>
    <h3>9:00AM -4:00PM</h3> */}
  </div>
  </div>
  <div className="content">
    <div className="left-side">
    
      <div className="phone details">
        <i className="fas fa-phone-alt"></i>
        <div className="topic">Phone</div>
        <div className="text-one">+0098 9893 5647</div>
        <div className="text-two">+0096 3434 5678</div>
      </div>
      <div className="email details">
        <i className="fas fa-envelope"></i>
        <div className="topic">Email</div>
        <div className="text-one">support@creditsin.com</div>
        <div className="text-two">contact@creditsin.com</div>
      </div>
    </div>
    {/* <div className="left-side" style={{paddingLeft: '20px'}}>
    <div className="address details">
        <i className="fas fa-map-marker-alt"></i>
        <div className="topic">Registered Address</div>
        <div className="text-one">Surkhet, NP12</div>
        <div className="text-two">Birendranagar 06</div>
      </div><div className="address details">
        <i className="fas fa-map-marker-alt"></i>
        <div className="topic">Head Office Address</div>
        <div className="text-one">Surkhet, NP12</div>
        <div className="text-two">Birendranagar 06</div>
      </div>
    </div> */}
    <div className="right-side">
      <div className="topic-text">We would be happy to help you </div>
      {/* <p>If you have any work from me or any types of quries related to my tutorial, you can send me message from here. It's my pleasure to help you.</p> */}
    {/* <form action="#">
      <div className="input-box">
        <input type="text" placeholder="Enter your name" />
      </div>
      <div className="input-box">
        <input type="text" placeholder="Enter your email" />
      </div>
      <div className="input-box message-box">
        <textarea placeholder="Enter your message"></textarea>
      </div>
      <div className="button">
        <input type="button" value="Send Now" / >
      </div>
    </form> */}
    <h4 style={{textAlign:'left'}} >Monday-Friday</h4>
    <h3>9:00AM - 6:00PM</h3>
    <h4 style={{textAlign:'left'}} >Saturday</h4>
    <h3>9:00AM -4:00PM</h3>
  </div>
  </div>
</div>

  );
};

export default Contact;


import React from 'react';


const Contact = () => {
  return (
    
  <div className="container contact">
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
        <div className="text-one">creditsin@gmail.com</div>
        <div className="text-two">info.creditsin@gmail.com</div>
      </div>
    </div>
    <div className="left-side" style={{paddingLeft: '20px'}}>
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
    </div>
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
    <h1 style={{textAlign:'left'}} >Monday-Friday</h1>
    <h3>9:00AM - 6:00PM</h3>
    <h1 style={{textAlign:'left'}} >Saturday</h1>
    <h3>9:00AM -4:00PM</h3>
  </div>
  </div>
</div>

  );
};

export default Contact;


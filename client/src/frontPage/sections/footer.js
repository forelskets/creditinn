import React, { useState, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import ModalComponent from "./modalComponent";
import OtpComponent from "./otpComponent";
import ReCAPTCHA from "react-google-recaptcha";
import toastr from "toastr";
import { sendOTP, matchOTP } from "../../_services/Client.Service";




 


const Footer = () => {
 // const history = useHistory();
 
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [forms, setForms] = useState(false);
 const [isVarified, setIsVarified] = useState(false);
 const [userNotVerified, setUserNotVerified] = useState(false);
 const [otp, setOTP] = useState("");
 const [error, setError] = useState("");
 const [dataa, setData] = useState("");
 const [showLink, setShowLink] = useState(false);
 const refModal = useRef(null);
 const loginModal = useRef(null);

 function onChangeHandle(value) {
   console.log("Captcha value:", value);
   setIsVarified(true);
 }
 const register = () => {
   refModal.current.click();
   setForms(true);
 };
 const loginVar = () => {
   loginModal.current.click();
 };
 const formsValue = (a) => {
   setForms(a);
 };

 const loginSubmit = async (req, res) => {
   const response = await fetch("/userLogin", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({ email, password }),
   });
   console.log("response", response);

   const data = await response.json();
   console.log("data", data);

   if (data) {
     if (data?.status == 1) {
       loginModal?.current?.click();
    //   history.push("/nav");
     } else if (data?.status == 0 && data?.userVerified === 1) {
       setShowLink(true);
       setData(data.data.user);
     } else {
       if (data?.message) {
         toastr.warning(data.message);
       }
     }
   }
 };

 const sendOTPtoServer = () => {
   sendOTP({ Email: email }).then((response) => {
     if (response?.status === 1) {
       setUserNotVerified(true);
     }
   });
 };

 const VerifyOTP = () => {
   let success = 0;
   if (otp === "") {
     setError({ otp: "Please enter OTP" });
     success = 1;
   }
   if (success === 0) {
     matchOTP({ Email: email, Mobile: dataa.Mobile, Code: otp }).then(
       (res) => {
         if (res?.status === 1) {
           toastr.info("Account Verified Please login.");

           setUserNotVerified(false);
         //  history.push("/");
         } else if (res?.message) {
           toastr.warning(res.message);
         }
       }
     );
   }
 };

  return (
    <>
    <div>
      <section className="footer">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12">
              <div className="row">
                <div className="col-md-3 text-area ">
                  <div className="align-inline">
                    <a className="footer-brand" href="#">
                      <img
                        src="./images/footer.png"
                        width="45"
                        height="65"
                        className=" align-top"
                        alt=""
                      />
                    </a>
                  </div>
                  <p className="paragraph">Become an Exclusive Member of <u style={{color: 'white'}}>Creditsin</u> Elite Partners club.
                  <br/>
                   -Earn up to Rs. 20000/- on single referral*.
                 <br/>
                 -Double cash back on self Booking*.
                 <br/>
               <div style={{color : 'orange' , font : '15px' , fontWeight: '700'}}> -*T & C Apply</div>
                  </p>
                </div>
                <div className="col-md-2 text-area padding-down">
                  <div className="align-inline">
                    <h3>Learn More</h3>
                  </div>
                  <ul className="padding-ul">
                  <li > <a href="/about"  className="text-light" style={{textDecoration: 'none'}}>About Us</a></li>
                  <li > <a href="/privacy-policy"  className="text-light" style={{textDecoration: 'none'}}>Privacy Policy</a></li>
                    <li><a href="/terms-and-conditions"  className="text-light" style={{textDecoration: 'none'}}>T & C</a></li>
                    <li onClick={loginVar}>Login </li>

                  </ul>

                  <lottie-player
                    src="https://assets2.lottiefiles.com/private_files/lf30_khh7mhre.json"
                    background="transparent"
                    speed="1"
                    style={{ width: '100px', height: '100px' }}
                    loop
                    autoplay
                  ></lottie-player>
                </div>
                <div className="col-md-2 text-area padding-down">
                  <div className="align-inline">
                    <h3>Get Started </h3>
                  </div>
                  <ul className="padding-ul">
                    <li><a style={{ textDecoration: 'none' }}
                      href="https://creditsin.com/form/"
                      className="text-white me-4"
                    >
                      Create An Account
            </a></li>
                  </ul>
                </div>
                <div className="col-md-2 text-area padding-down">
                  <div className="align-inline">
                    <h3>Need Help?</h3>
                  </div>
                  <ul className="padding-ul">
                    <li > <a href="/support"  className="text-light" style={{textDecoration: 'none'}}>Support</a></li>
                    <li>FAQ's</li>
                  
                    
                  </ul>
                  <br />
                  <lottie-player
                    src="https://assets2.lottiefiles.com/private_files/lf30_khh7mhre.json"
                    background="transparent"
                    speed="1"
                    style={{ width: '100px', height: '100px', marginTop: '-40px' }}
                    loop
                    autoplay
                  ></lottie-player>
                </div>
                <div className="col-md-3 info-area padding-down">
                  <h3>Social Links</h3>
                  <br />
                  <div className="align-inline">
                    <div className="m-auto">
                      <div className="padding-ul">
                        <a className="text-light" style={{textDecoration: 'none'}} href="https://instagram.com/credistin">

                          <i className="fab fa-instagram" ></i></a>
                        <a className="text-light" style={{textDecoration: 'none'}} href="https://facebook.com/credistin">

                          <i className="fab fa-facebook" ></i></a>
                          <a className="text-light" style={{textDecoration: 'none'}} href="https://www.linkedin.com/company/creditsin/">
                        <i className="fab fa-linkedin"></i>
                        <i className="fab fa-youtube"></i>{' '}
                      </div>
                    </div>
                  </div>

                  <div className="button-section align-inline">
                    <button className="btn btn-1 d-inline mx-auto">
                      <img src="images/gpay.svg" alt="" className="img-fluid" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-md-4 col-6 img-area">
              <img
                src="images/MOBILEPNG.png"
                className="img-fluid d-md-block d-none"
                alt=""
              />
              <img
                src="images/mobile-view.png"
                className="img-fluid d-md-none d-block"
                alt=""
              />
            </div> */}
          </div>
        </div>

        <div className="justify-content-between d-flex  p-3 copyright">
          <div className="me-5">
            <span className="text-white">© 2020 Copyright :</span>

            <NavLink className="text-light" to="https://forelskets.com">
              Forelsket Softwares Pvt. Ltd.
            </NavLink>
          </div>
         
        </div>
      </section>
    </div>

<button
type="button"
className="btn btn-primary d-none"
ref={refModal}
data-bs-toggle="modal"
data-bs-target="#exampleModal"
>
Launch demo modal
</button>

<div
className="modal fade"
id="exampleModal"
tabIndex="-1"
aria-labelledby="exampleModalLabel"
aria-hidden="true"
>
<div className="modal-dialog">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">
        {/* <i class="fas fa-long-arrow-alt-left"></i>  */}Registered
        here
      </h5>
      <button
        type="button"
        className="btn-close "
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
    <div className="modal-body">
      {forms ? (
        <ModalComponent formsValue={formsValue} />
      ) : (
        <OtpComponent />
      )}
    </div>
  </div>
</div>
</div>

<button
type="button"
className="btn btn-2 button d-none"
ref={loginModal}
data-bs-toggle="modal"
data-bs-target="#exampleModal1"
>
Launch demo modal
</button>

<div
className="modal fade"
id="exampleModal1"
tabIndex="-1"
aria-labelledby="exampleModalLabel"
aria-hidden="true"
>
<div className="modal-dialog" >
  <div className="modal-content" style={{width:'340px', alignContent:'center'}}>
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">
        Login here
      </h5>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
    <div className="modal-body">
      {userNotVerified ? (
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="otp"
              name="otp"
              value={otp}
              placeholder="OTP (one time password)"
              onChange={(e) => {
                setOTP(e.target.value);
              }}
            />
            <span>Otp has been sent your registered email id ( if don't receive plz check your spam folder)</span>
            {error?.otp && <div className="error-msg">{error.otp}</div>}
            <br/>
            <button type="button" onClick={() => sendOTPtoServer()}>resend otp</button>
          </div>

          <div className="mb-3">
            <button
              type="button"
              className="btn btn-2 button my-2"
              // data-bs-dismiss="modal"
              onClick={VerifyOTP}
              disabled={!isVarified}
            >
              Verify OTP
            </button>
          </div>
        </form>
      ) : (
        <form>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="enter password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={onChangeHandle}
          />
          {showLink && (
            <span>
              To verify your account{" "}
              <a href="#" onClick={() => sendOTPtoServer()}>
                click here
              </a>
            </span>
          )}
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-2 button my-2"
              // data-bs-dismiss="modal"
              onClick={loginSubmit}
              disabled={!isVarified}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  </div>
</div>
</div>
</>
  );
};

export default Footer;

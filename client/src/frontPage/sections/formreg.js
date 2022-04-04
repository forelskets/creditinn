import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from "react-router-dom";
import toastr from "toastr";
import { Validate } from "../../_helper";
import { registerService, matchOTP, sendOTP } from "../../_services/Client.Service";
import { Modal } from "react-bootstrap";
const eye = { fontSize: '15px', height: '0px', fontWeight: '600' }; 
//const eye = <FontAwesomeIcon icon={faEye} />;
const msg = "Password should be contains atleast 8 digit\nPassword should be contain atleast 1 digit(0,1,2) \nPassword should be contain atleast 1 special characte($,#,@)\nFor Exp: Rahul@12";
const init = {
  userName: "",
  userEmail: "",
  userPassword: "",
  userCPassword: "",
  userMobile: "",
  userRefral: "",
};

const FormReg = () => {
  const [isVarified, setIsVarified] = useState(false);
  const [userDetails, setUserDetails] = useState(init);
  const [error, setError] = useState("");
  const [isformSubmit, setFormSubmit] = useState(false);
  const [otp, setOTP] = useState("");
  const [modal, setModal] = useState(false);
  
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const [passwordShown1, setPasswordShown1] = useState(false);
  const togglePasswordVisiblity1 = () => {
    setPasswordShown1(passwordShown1 ? false : true);
  };
  
  
  const history = useHistory();
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };
  function onChangeHandle(value) {
    console.log("Captcha value:", value);
    setIsVarified(true);
  }

  const changeFormsValue = async () => {
    let success = 0;
    let Obj = Validate(userDetails, rules);
    const {
      userName,
      userEmail,
      userPassword,
      userCPassword,
      userMobile,
      userRefral,
    } = userDetails;
    if (Obj.userCPassword !== "" && userPassword !== userCPassword) {
      Obj.userCPassword = "Password is not matched!";
    }
    Object.keys(Obj).map((key) => {
      if (Obj[key] !== "") {
        success = 1;
      }
      return true;
    });

    setError(Obj);

    let data = {
      Name: userName,
      Email: userEmail,
      Password: userPassword,
      CPassword: userCPassword,
      Mobile: userMobile,
      RefralUserCode: userRefral,
    };

    if (success === 0) {
      registerService(data).then((res) => {
        if (res?.status === 1) {
          setFormSubmit(true);
          toastr.warning(res.message);
        } if (res?.userVerified === 1) {
          setModal(true)
        } else if (res.message) {
          toastr.warning(res.message);
        }
        // setUserDetails(init);
      });
    }
  };

  const submitOTP = () => {
    let success = 0;
    if (otp === "") {
      setError({ otp: "Please enter OTP" });
      success = 1;
    }
    if (success === 0) {
      matchOTP({
        Email: userDetails?.userEmail,
        Mobile: userDetails?.userMobile,
        Code: otp,
      }).then((res) => {
        if (res?.status === 1) {
          setUserDetails(init);
          toastr.warning(res.message);
          history.push("/");
        } else if (res?.message) {
          toastr.warning(res.message);
        }
      });
    }
  };

  const gotoTOP = () => {
    sendOTP({ Email: userDetails?.userEmail, }).then((response) => {
      if (response?.status === 1) {
        setFormSubmit(true);
        setModal(false)
      }
    });
  }
 
  return (
    <>
      <div className="formreg"
        style={{
          //width: "30%",
          padding: "20px 10px 10px 10px",
          background: "#ffff",
          boxShadow: "-1px -1px 17px 0px rgb(100, 95, 99)",
          border: "1",
        }}
      >
        {isformSubmit ? (
          <>
            <form
              style={{
                width: "100%",
              
                padding: "20px 10px 10px 10px",
                border: "1",
              }}
            >
              <div className="text-center">
                <img
                  style={{ height: "70px" }}
                  src="images/logo.png"
                  className="d-inline-block align-top"
                  alt=""
                />
                <h2>Enter OTP</h2>
              </div>

              <div className="form-outline mb-2">
                <input
                  type="otp"
                  className="form-control"
                  id="userEmail"
                  name="userEmail"
                 
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                />
                <label className="form-label" for="form3Example3">
                Otp has been sent your registered email id ( if don't receive please check your spam folder)
                </label>
                <button type="button" className="btn-3" onClick={() => gotoTOP()}>resend otp</button>
                {error?.otp && <div className="error-msg">{error.otp}</div>}
              </div>

              <button
                type="button"
                className="btn btn-2 button my-3"
                onClick={submitOTP}
              >
                Submit
                </button>
               
                   
            </form>
            {/* <form method="POST" action="resend">
                    <p class="full">
                        </p>
                </form> */}
 </>

        )
          : ( 
            <form 
              style={{
                width: "100%",
                padding: "20px 10px 10px 10px",
                border: "1",
              }}
            >
              <div className="text-center">
                <img
                  style={{ height: "70px" }}
                  src="images/logo.png"
                  className="d-inline-block align-top"
                  alt=""
                />
                <h2>Register Here</h2>
              </div>
              <div className="row mb-2">
                <div className="col col-12 col-md-6">
                  <div className="form-outline">
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      name="userName"
                      value={userDetails.userName}
                      onChange={changeHandler}
                    />
                    <label className="form-label" for="form3Example1" style={eye}>
                      Name
                    </label>
                    {error?.userName && (
                      <div className="error-msg">{error.userName}</div>
                    )}
                  </div>
                </div>
                <div className="col col-12 col-md-6">
                  <div className="form-outline">
                    <input
                      type="text"
                      className="form-control"
                      id="userMobile"
                      name="userMobile"
                      value={userDetails.userMobile}
                      onChange={changeHandler}
                    />
                    <label className="form-label" for="form3Example2" style={eye} >
                      Mobile No
                    </label>
                    {error?.userMobile && (
                      <div className="error-msg">{error.userMobile}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col col-12 col-md-6">
                <div className="form-outline ">
                <input
                  type="email"
                  className="form-control"
                  id="userEmail"
                  name="userEmail"
                  value={userDetails.userEmail}
                  onChange={changeHandler}
                />
                <label className="form-label" for="form3Example3" style={eye} >
                  Email address
                </label>
                {error?.userEmail && (
                  <div className="error-msg">{error.userEmail}</div>
                )}
                 </div>
                </div><div className="col col-12 col-md-6">
                <div className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    id="userRefral"
                    name="userRefral"
                    value={userDetails.userRefral}
                    onChange={changeHandler}
                  />
                  <label className="form-label" for="form3Example4" style={eye}>
                    Refral no.
                  </label>
                  {error?.userRefral && (
                    <div className="error-msg">{error.userRefral}</div>
                  )}
                </div>
              </div>
              </div>

              
              <div className="row mb-2">
                <div className="col col-12 col-md-6" style={{position: 'relative' ,  display: 'flex'}}>
                  <div className="form-outline ">
                    <input 
                      className="form-control"
                      id="userPassword"
                      name="userPassword"
                      type={passwordShown ? "text" : "password"}
                      value={userDetails.userPassword}
                      onChange={changeHandler}
                    />
                       <i class="fas fa-eye " onClick={togglePasswordVisiblity} style={{position: 'absolute',
  top: '10px',
  right: '25px'}} ></i>{" "} 
                    <label className="form-label" for="form3Example4" title={msg}
                class="fas fa-question "
                style={eye}>
                      Password
                    </label>
                    {error?.userPassword && (
                      <div className="error-msg">{error.userPassword}</div>
                    )}
                  </div>
                </div>
                <div className="col col-12 col-md-6" style={{position: 'relative' ,  display: 'flex'}}>
                  <div className="form-outline">
                    <input
                     
                      className="form-control"
                      type={passwordShown1 ? "text" : "password"}
                      id="userCPassword"
                      name="userCPassword"
                      value={userDetails.userCPassword}
                      onChange={changeHandler}
                    />
                    <i class="fas fa-eye " onClick={togglePasswordVisiblity1} style={{position: 'absolute',
  top: '10px',
  right: '25px'}} ></i>{" "} 
                    <label className="form-label" for="form3Example4"  style={eye} >
                      Confirm Password
                    </label>
                    {error?.userCPassword && (
                      <div className="error-msg">{error.userCPassword}</div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="col col-12 ">
                <div className="form-outline">

                  <label className="form-label" for="form3Example4" style={{ fontSize: '8px' }}>
                    Your Personal Data Will be used to support your experience throughout this website , to manage access to your creditsin account
                    , and for other purposes described in our pricavy policy .
                  </label>

                </div>
              </div>

              {/* <div className="col">
            <div className="form-outline">
              <input type="text" id="form3Example4" className="form-control" />
              <label className="form-label" for="form3Example4">
                Have any refferal code
              </label>
            </div>
          </div> */}
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChangeHandle}
              />
              <button
                type="button"
                className="btn btn-2 button my-3"
                onClick={changeFormsValue}
                disabled={!isVarified}
              >
                Submit
              </button>
            </form>
          )}
        <div className="form-check d-flex justify-content-center mb-2">
          <img
            style={{ height: "20px", width: "20px" }}
            src="images/favicon.png"
            className="d-inline-block "
            alt=""
          />
          <label className="form-check-label" for="form2Example33">
            powered by creditsin.com
          </label>
        </div>
        <Example modal={modal} close={() => setModal(false)}>
          <span>To verify account please <a href="#" onClick={() => gotoTOP()}>click here</a></span>
        </Example>
      </div>
    </>
  );
};

export default FormReg;

const rules = [
  {
    field: "userName",
    fieldName: "Name",
    type: "string",
    require: true,
  },
  {
    field: "userMobile",
    fieldName: "Mobile",
    type: "mobile",
    require: true,
  },
  {
    field: "userEmail",
    fieldName: "Email",
    type: "email",
    require: true,
  },
  {
    field: "userPassword",
    fieldName: "Password",
    type: "password",
    require: true,
  },
  {
    field: "userCPassword",
    fieldName: "Password",
    type: "string",
    require: true,
  },
  // , {
  //   field: 'userRefral',
  //   fieldName: 'User Refral',
  //   type: 'string',
  //   require: true
  // }
];


const Example = (props) => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(props.modal)
  }, [props.modal])
  return (
    <>
      <Modal show={show} onHide={() => { setShow(false); if (props.close) props.close() }}>
        <Modal.Header closeButton>
          <Modal.Title>Verify Account</Modal.Title>
        </Modal.Header>
        <Modal.Body> {props.children}</Modal.Body>
      </Modal>
    </>
  );
}

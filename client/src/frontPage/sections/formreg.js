import React, { useState,useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from "react-router-dom";
import toastr from "toastr";
import { Validate } from "../../_helper";
import { registerService, matchOTP,sendOTP } from "../../_services/Client.Service";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
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
        }if(res?.userVerified === 1){
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

  const gotoTOP=()=>{
    sendOTP({ Email: userDetails?.userEmail, }).then((response) => {
      if (response?.status === 1) {
         setFormSubmit(true);
         setModal(false)
      }
    });
  }

  return (
    <>
      <div
        style={{
          width: "40%",
          margin: "3% 30%",
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
                    style={{ height: "90px", width: "190px" }}
                    src="images/credit-n-logo.svg"
                    className="d-inline-block align-top"
                    alt=""
                  />
                  <h2>Register Here</h2>
                </div>

                <div className="form-outline mb-2">
                  <input
                    type="otp"
                    className="form-control"
                    id="userEmail"
                    name="userEmail"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                  />
                  <label className="form-label" for="form3Example3">
                    OTP - (one time password)
                  </label>
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
                  style={{ height: "90px", width: "190px" }}
                  src="images/credit-n-logo.svg"
                  className="d-inline-block align-top"
                  alt=""
                />
                <h2>Register Here</h2>
              </div>
              <div className="row mb-2">
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      name="userName"
                      aria-describedby="emailHelp"
                      placeholder="Enter Your Name"
                      value={userDetails.userName}
                      onChange={changeHandler}
                    />
                    <label className="form-label" for="form3Example1">
                      Name
                    </label>
                    {error?.userName && (
                      <div className="error-msg">{error.userName}</div>
                    )}
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      className="form-control"
                      id="userMobile"
                      name="userMobile"
                      placeholder="Enter Your Mobile No."
                      value={userDetails.userMobile}
                      onChange={changeHandler}
                    />
                    <label className="form-label" for="form3Example2">
                      Mobile No
                    </label>
                    {error?.userMobile && (
                      <div className="error-msg">{error.userMobile}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-outline mb-2">
                <input
                  type="email"
                  className="form-control"
                  id="userEmail"
                  name="userEmail"
                  placeholder="Enter Your Email"
                  value={userDetails.userEmail}
                  onChange={changeHandler}
                />
                <label className="form-label" for="form3Example3">
                  Email address
                </label>
                {error?.userEmail && (
                  <div className="error-msg">{error.userEmail}</div>
                )}
              </div>
              <div className="row mb-2">
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="password"
                      className="form-control"
                      id="userPassword"
                      name="userPassword"
                      placeholder="Enter Your Password"
                      value={userDetails.userPassword}
                      onChange={changeHandler}
                    />
                    <label className="form-label" for="form3Example4">
                      Password
                    </label>
                    {error?.userPassword && (
                      <div className="error-msg">{error.userPassword}</div>
                    )}
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="password"
                      className="form-control"
                      id="userCPassword"
                      name="userCPassword"
                      placeholder="Enter Your confirm - password"
                      value={userDetails.userCPassword}
                      onChange={changeHandler}
                    />
                    <label className="form-label" for="form3Example4">
                      Confirm Password
                    </label>
                    {error?.userCPassword && (
                      <div className="error-msg">{error.userCPassword}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    id="userRefral"
                    name="userRefral"
                    placeholder="Enter Your Refral no."
                    value={userDetails.userRefral}
                    onChange={changeHandler}
                  />
                  <label className="form-label" for="form3Example4">
                    Refral no.
                  </label>
                  {error?.userRefral && (
                    <div className="error-msg">{error.userRefral}</div>
                  )}
                </div>
              </div>
              <div className="col">
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
            src="images/projectLogo.png"
            className="d-inline-block "
            alt=""
          />
          <label className="form-check-label" for="form2Example33">
            powered by creditsin.com
          </label>
        </div>
        <Example modal={modal} close={()=>setModal(false)}>
          <span>To verify account please <a href="#" onClick={()=>gotoTOP()}>click here</a></span>
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
  useEffect(()=>{
    setShow(props.modal)
  },[props.modal])
  return (
    <>
      <Modal show={show} onHide={()=>{setShow(false);if(props.close)props.close()}}>
        <Modal.Header closeButton>
          <Modal.Title>Verify Account</Modal.Title>
        </Modal.Header>
        <Modal.Body> {props.children}</Modal.Body>
      </Modal>
    </>
  );
}


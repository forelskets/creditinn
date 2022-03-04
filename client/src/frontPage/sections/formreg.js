import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const FormReg = () => {
  const [isVarified, setIsVarified] = useState(false);
  const [userDetails, setUserDetails] = useState({
    userName: '',
    userEmail: '',
    userPassword: '',
    userCPassword: '',
    userMobile: '',
    userRefral: '',
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };
  function onChangeHandle(value) {
    console.log('Captcha value:', value);
    setIsVarified(true);
  }

  const changeFormsValue = async () => {
    const Name = userDetails.userName;
    const Email = userDetails.userEmail;
    const Password = userDetails.userPassword;
    const CPassword = userDetails.userCPassword;
    const Mobile = userDetails.userMobile;
    const Refral = userDetails.userRefral;
    if (!Name || !Email || !Password || !CPassword || !Mobile || !Refral) {
      window.alert('Please fill complete data');
    } else if (Password !== CPassword) {
      window.alert('Password and Confirm Password is not matched');
    } else {
      const response = await fetch('/userRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Name, Email, Password, Mobile, Refral }),
      });
      setUserDetails({
        userName: '',
        userEmail: '',
        userPassword: '',
        userCPassword: '',
        userMobile: '',
        userRefral: '',
      });
      const data = await response.json();

      if (response.status === 400 && data) {
        window.alert(data);
      } else if (response.status === 200 && data) {
        // props.formsValue(false);
        alert('registration doneS');
      }
    }
  };

  return (
    <>
      <div
        style={{
          width: '40%',
          margin: '3% 30%',
          padding: '20px 10px 10px 10px',
          background: '#ffff',
          boxShadow: '-1px -1px 17px 0px rgb(100, 95, 99)',
          border: '1',
        }}
      >
        <form
          style={{
            width: '100%',
            padding: '20px 10px 10px 10px',
            border: '1',
          }}
        >
          <div className="text-center">
            <img
              style={{ height: '90px', width: '190px' }}
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
        <div className="form-check d-flex justify-content-center mb-2">
          <img
            style={{ height: '20px', width: '20px' }}
            src="images/projectLogo.png"
            className="d-inline-block "
            alt=""
          />
          <label className="form-check-label" for="form2Example33">
            powered by creditsin.com
          </label>
        </div>
      </div>
    </>
  );
};

export default FormReg;

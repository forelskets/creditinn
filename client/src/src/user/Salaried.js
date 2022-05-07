import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Salaried = () => {
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
            <h3>Apply For Loan</h3>
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
                />
                <label className="form-label" for="form3Example2">
                  Mobile No
                </label>
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <div className="form-outline">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="userName"
                  aria-describedby="emailHelp"
                />
                <label className="form-label" for="form3Example1">
                  Email Id
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
                />
                <label className="form-label" for="form3Example2">
                  Pan No
                </label>
              </div>
            </div>
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
                />
                <label className="form-label" for="form3Example1">
                  Adhar No
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
                />
                <label className="form-label" for="form3Example2">
                  City
                </label>
              </div>
            </div>
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
                />
                <label className="form-label" for="form3Example1">
                  State
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
                />
                <label className="form-label" for="form3Example2">
                  Pin Code
                </label>
              </div>
            </div>
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
                />
                <label className="form-label" for="form3Example1">
                  Empolyer Name
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
                />
                <label className="form-label" for="form3Example2">
                  Monthly Income
                </label>
              </div>
            </div>
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
                />
                <label className="form-label" for="form3Example1">
                  Total Experience
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
                />
                <label className="form-label" for="form3Example2">
                  Totol Emi (if you have)
                </label>
              </div>
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

          <button type="button" className="btn btn-2 button my-3">
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

export default Salaried;

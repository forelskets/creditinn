import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Loan = () => {
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
            <h3>Select details </h3>
          </div>
          <div className="form-outline mb-4">
            <select class="form-select" aria-label="Default select example">
              <option selected>Select Profession</option>
              <option value="1">Salaried</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="form-outline mb-4">
            <select class="form-select" aria-label="Default select example">
              <option selected>Loan Types</option>
              <option value="1">Personal Loan</option>
              <option value="2">Home Loan</option>
              <option value="3">Education Loan</option>
              <option value="3">Marriage Loan Loan</option>
            </select>
          </div>

          <div className="form-outline mb-4">
            <select class="form-select" aria-label="Default select example">
              <option selected>Amount</option>
              <option value="1">1,00,000/-</option>
              <option value="2">2,00,000/-</option>/option>
              <option value="3">3,00,000/-</option>
            </select>
          </div>

          <button type="button" className="btn btn-2 button my-3">
            Next
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

export default Loan;

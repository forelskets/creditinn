import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const OtpComponent = () => {
  const history = useHistory();
  const [otp, setOtp] = useState('');
  const submitForm = async (req, res) => {
    const response = await fetch('/matchOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp }),
    });
    const data = await response.json();
    if (data && response.status === 400) {
      window.alert(data);
    } else if (data && response.status === 200) {
      history.push('/nav');
    }
  };

  return (
    <>
      <form>
        <div className="mb-3">
          <label
            style={{ color: 'black', padding: '10px 0px', fontSize: '22px' }}
          >
            Enter Your OTP
          </label>
          <br />
          <span style={{ fontSize: '10px', padding: 'none' }}>
            OTP Successfully Sent!
          </span>{' '}
          <input
            type="text"
            className="form-control"
            id="otpId"
            name="otpId"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            aria-describedby="emailHelp"
            placeholder="enter otp"
          />
        </div>

        <button
          type="button"
          className="btn btn-2  my-3"
          data-bs-dismiss="modal"
          onClick={submitForm}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default OtpComponent;

import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LoanForm from './LoanForm';
import Apply from './Apply';
import Bank from './Bank';
import {
  FacebookShareButton, WhatsappShareButton, WhatsappIcon, EmailIcon, EmailShareButton, FacebookIcon
} from "react-share";

const ApplyLoan = () => {
  const shareUrl = 'www.forelskets.com bvhfytrytyrytrtyryryrrtrty';
  const [profile, setProfile] = useState({});
  const [lstatus, setLstatus] = useState(false);
  const LoanFunc = () => {
    setLstatus(!lstatus);
  };

  useEffect(() => {

    callUserMainPage();
  }, []);

  const history = useHistory();
  const callUserMainPage = async (req, res) => {
    try {
      const res = await fetch('/userMain', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();
      console.log(res);
      if (res.status === 401) {
        history.push('/');
      }
      setProfile(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <section>
        <div className="home-content">
          <div className="container">
            <div className="row">
              <div className="sales-boxes">
                <div className="col-sm-9">
                  <div className="row">
                    <div className="overview-boxes">
                      <div className="box col-sm-4">
                        {/* <div className="right-side">
                          <div className="box-topic">Active Loans</div>
                          <div className="number">0</div>
                        </div>
                        <i className="fas fa-money-bill-wave-alt"></i> */}
                        <img src="images/personal.jpg" style={{ height: '120px', width: '300px' }}
                        />                     </div>

                      <div className="box col-sm-4">
                        {/* <div className="right-side">
                          <div className="box-topic">Loan Amount</div>
                          <div className="number">$12,876</div>
                        </div>
                        <i className="bx bx-cart cart three"></i>*/}
                        <img src="images/business.jpeg" style={{ height: '120px', width: '300px' }}
                        />
                      </div>
                      <div className="box col-sm-4">
                        <img src="images/home.webp" style={{ height: '120px', width: '300px' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row pb-5">
                    <div className="recent-sales box ">
                      <div
                        className="row-title mb-3 py-3"
                        style={{ cursor: 'pointer' }}
                        onClick={LoanFunc}
                      >
                        Apply For Loans
                      </div>
                      {lstatus ? <LoanForm /> : ''}
                    </div>
                  </div>
                  <div className="row pb-5">
                    <div className="recent-sales box">
                      <div id="ecww-widgetwrapper" style={{ minWidth: '250px', width: '100%' }}>
                        <div
                          id="ecww-widget"
                          style={{
                            position: 'relative',
                            paddingTop: '0',
                            paddingBottom: '280px',
                            height: '0',
                            overflow: 'hidden',
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="row pb-5">
                    <div className="recent-sales box">
                      <Apply />
                    </div>
                  </div>
                  <div className="row">
                    <div className="recent-sales box">
                      <Bank />
                    </div>
                  </div>
                </div>

                <div className="top-sales box profile-card col-sm-3">
                  <div className="col">
                    <div className="overview-boxes">
                      <div className="box1 col-sm-12">
                        <div className="right-side">
                          <div className="box-topic">Active Loans</div>
                          <div className="number">0</div>
                        </div>
                        <i className="fas fa-money-bill-wave-alt"></i>
                      </div>

                    </div>
                  </div>
                  <div className="title">Profile</div>
                  <ul className="top-sales-details">
                    <li>
                      <NavLink to="#">
                        <img
                          src="images/portrait-young-smiling-woman-2.png"
                          alt=""
                        />
                        <span className="profile-name">{profile.Name}</span>
                      </NavLink>
                    </li>

                    <text style={{ backgroundColor: '#f0f3f4', padding: 8 }}>{profile.RefralNo}</text>
                    <FacebookShareButton url={shareUrl} style={{ padding: 10 }} >
                      <FacebookIcon size={40} />
                    </FacebookShareButton>
                    <EmailShareButton
                      url={profile.RefralNo}
                      subject="subject"
                      body={"hey there, pls share my referal code"}
                    >
                      <EmailIcon
                        size={40} />
                    </EmailShareButton>



                    <WhatsappShareButton url={shareUrl} style={{ padding: 10 }} >
                      <WhatsappIcon size={40} />
                    </WhatsappShareButton>
                    <br />
                    <br />
                    <li>
                      <span className="left-text"> name </span>
                      <input
                        type="text"
                        className="input-area"
                        value={profile.Name}
                        disabled
                      />
                    </li>
                    <li>
                      <span className="left-text">mobile no.</span>
                      <input
                        type="text"
                        className="input-area"
                        value={profile.Mobile}
                        disabled
                      />
                    </li>
                    <li>
                      <span className="left-text">EMAIL ID</span>
                      <input
                        type="text"
                        className="input-area"
                        value={profile.Email}
                        disabled
                      />
                    </li>
                    <li>
                      <span className="left-text">password </span>
                      <input
                        type="password"
                        className="input-area"
                        value={profile.password}
                        disabled
                      />
                    </li>
                  </ul>
                  <button className="btns">Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div >
  );
};

export default ApplyLoan;

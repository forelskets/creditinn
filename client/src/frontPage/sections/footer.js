import React from 'react';
import { NavLink } from 'react-router-dom';

const footer = () => {
  return (
    <div>
      <section className="footer">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12">
              <div className="row">
                <div className="col-md-3 text-area">
                  <div className="align-inline">
                    <a className="footer-brand" href="#">
                      <img
                        src="./images/credit-n-logo-footer.svg"
                        width="45"
                        height="65"
                        className=" align-top"
                        alt=""
                      />
                    </a>
                  </div>
                  <p className="paragraph">
                    Start Your Business with Zero Investment and Earn over
                    ₹1,00,000 Every Month. Provide financial advice and products
                    to the customers and get a fast payout every month.
                  </p>
                </div>
                <div className="col-md-2 text-area">
                  <div className="align-inline">
                    <h3>Learn More</h3>
                  </div>
                  <li>Support</li>
                  <li>PrivacyPolicy</li>
                  <li>About Us</li>
                  <li>Create An Account</li>
                  <lottie-player
                    src="https://assets2.lottiefiles.com/private_files/lf30_khh7mhre.json"
                    background="transparent"
                    speed="1"
                    style={{ width: '100px', height: '100px' }}
                    loop
                    autoplay
                  ></lottie-player>
                </div>
                <div className="col-md-2 text-area">
                  <div className="align-inline">
                    <h3>Get Started </h3>
                  </div>
                  <li>Create An Account</li>
                </div>
                <div className="col-md-2 text-area">
                  <div className="align-inline">
                    <h3>Need Help?</h3>
                  </div>
                  <li>Support</li>
                  <li>PrivacyPolicy</li>
                  <li>About Us</li>
                  <li>Create An Account</li>
                  <br />
                  <lottie-player
                    src="https://assets2.lottiefiles.com/private_files/lf30_khh7mhre.json"
                    background="transparent"
                    speed="1"
                    style={{ width: '100px', height: '100px' }}
                    loop
                    autoplay
                  ></lottie-player>
                </div>
                <div className="col-md-3 info-area">
                  <h3>Social Links</h3>
                  <br />
                  <div className="align-inline">
                    <div className="m-auto">
                      <i className="fab fa-instagram"></i>
                      <i className="fab fa-facebook"></i>
                      <i className="fab fa-twitter"></i>
                      <i className="fab fa-youtube"></i>{' '}
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
          <div>
            <a
              href="https://www.facebook.com/skulamapp/"
              className="text-white me-4"
            >
              About us.
            </a>
            <a href="https://twitter.com/CEO_fact" className="text-white me-4">
              {' '}
              Privacy and policy.{' '}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default footer;

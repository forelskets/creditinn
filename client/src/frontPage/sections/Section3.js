import React from 'react';
import { NavLink } from 'react-router-dom';

const Section3 = () => {
  return (
    <>
      <div className="back-image">
        {/* <section className="featured-in">
          <div className="container">
            <h1>featured in</h1>
            <div className="row">
              <div className="the-box row">
                <div className="col-md-2 col-6 top">
                  <img src="images/MINT.png" alt="" className="img-container" />
                </div>
                <div className="col-md-2 col-6 bottom">
                  <img
                    src="images/YOUR_STORY.png"
                    alt=""
                    className="img-container"
                  />
                </div>
                <div className="col-md-2 col-6 top">
                  <img
                    src="images/BUSINESS_LINE.png"
                    alt=""
                    className="img-container"
                  />
                </div>
                <div className="col-md-2 col-6 bottom">
                  <img
                    src="images/BUSINESS_STANDARD.png"
                    alt=""
                    className="img-container"
                  />
                </div>
                <div className="col-md-2 col-6 top">
                  <img
                    src="images/DAILY_HUNT.png"
                    alt=""
                    className="img-container"
                  />
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <div
          className="row col-sm-12 mx-5 py-5 "
          style={{ margin: 'auto 30px' }}
        >
          <h1
            className="heading text-center"
            // style={{
            //   margin: 'auto 30px',
            // }}
            style={{ paddingBottom: '30px' }}
          >
            Creditsin a platform which <br />
            boost's customer engagement
          </h1>
          <div
            className="card  card1"
            style={{ width: '18rem', margin: 'auto 20px' }}
          >
            <i class="fas fa-share fa-4x" style={{ margin: '20px 100px' }}></i>
            <div className="card-body">
              <h4 className="text-center">Every Customer Earn Credits</h4>
            </div>
          </div>
          <div
            className="card card2"
            style={{ width: '18rem', margin: 'auto 20px' }}
          >
            <i
              class="fas fa-user-alt fa-4x"
              style={{ margin: '20px 100px' }}
            ></i>
            <div className="card-body">
              <h4 className="text-center">Get Targeted Audience</h4>
            </div>
          </div>
          <div
            className="card card4"
            style={{ width: '18rem', margin: 'auto 20px' }}
          >
            <i
              class="fas fa-credit-card fa-4x"
              style={{ margin: '20px 100px' }}
            ></i>
            <div className="card-body">
              <h4 className="text-center">Refer and Earn Credits</h4>
            </div>
          </div>
          <div
            className="card card3"
            style={{ width: '18rem', margin: 'auto 20px' }}
          >
            <i class="fas fa-ring fa-4x" style={{ margin: '20px 100px' }}></i>
            <div className="card-body">
              <h4 className="text-center">Inc. Customer engagement</h4>
            </div>
          </div>
        </div>
        <section className="another-timeline">
          {/* <div className="container">
            <div className="row pb-5 justify-content-center">
              <div className="col-12">
                <h1 className="heading pb-5">How to Operate!</h1>
              </div>

              <img
                src="images/apply.png"
                alt="applyprocess"
                style={{ width: '100%', align: 'center', leftPadding: '100px' }}
              />
            </div>
          </div> */}
        </section>
        <section className="services-section">
          <div className="container">
            <div className="row">
              <div className="col-md-5 col-12 d-md-block d-none">
                <div className="img-area ">
                  <img src="images/creditapp.png" alt="" />
                </div>
              </div>
              <div className="col-md-7 col-12 text-area">
                <h2
                  style={{
                    marginLeft: '28%',
                    textAlign: 'left',
                    fontWeight: '600',
                  }}
                >
                  Reach customers anywhere and everywhere
                </h2>
                <div className="align-inline">
                  <div className="icon-box1">
                    <img
                      src="images/rupee-card.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="text-box">
                    <h2 className="heading">Cashback Reward</h2>
                    <p className="paragraph">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Pariatur laborum id natus nihil sint.
                    </p>
                  </div>
                </div>
                <div className="align-inline">
                  <div className="icon-box1">
                    <img
                      src="images/rupee-card.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="text-box">
                    <h2 className="heading">Coupan Rewards</h2>
                    <p className="paragraph">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Pariatur laborum id natus nihil sint.
                    </p>
                  </div>
                </div>
                <div className="align-inline">
                  <div className="icon-box1">
                    <img
                      src="images/rupee-card.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="text-box">
                    <h2 className="heading">Customer engagement</h2>
                    <p className="paragraph">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Pariatur laborum id natus nihil sint.
                    </p>
                  </div>
                </div>
                <div className="align-inline">
                  <div className="icon-box1">
                    <img
                      src="images/rupee-card.svg"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="text-box">
                    <h2 className="heading">Increase engagement</h2>
                    <p className="paragraph">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Pariatur laborum id natus nihil sint.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className=" card-slider-section">
          <div className="container">
            <h1 className="heading">Reward for Anything & Everything</h1>
            <h3 className="heading2">
              Customers will love Creditsin to apply{' '}
            </h3>
            <div className="row">
              <div className="col-12" style={{ textColor: '#000000' }}>
                <div
                  id="carouselExampleIndicators2"
                  className="carousel slide"
                  dataRide="carousel"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <div className="row">
                        <div className="col-md-4 mb-3">
                          <div className="card">
                            <img
                              className="img-container "
                              alt=""
                              src="images/portrait-young-smiling-woman-2.png"
                            />

                            <div className="card-body">
                              <h4 className="heading3">
                                Special title treatment
                              </h4>
                              <p className="paragraph">
                                With supporting text below as a natural lead-in
                                to additional content.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 mb-3">
                          <div className="card">
                            <img
                              className="img-container "
                              alt=""
                              src="images/portrait-young-smiling-woman-2.png"
                            />

                            <div className="card-body">
                              <h4 className="heading3">
                                Special title treatment
                              </h4>
                              <p className="paragraph">
                                With supporting text below as a natural lead-in
                                to additional content.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 mb-3">
                          <div className="card">
                            <img
                              className="img-container "
                              alt=""
                              src="images/portrait-young-smiling-woman-2.png"
                            />

                            <div className="card-body">
                              <h4 className="heading3">
                                Special title treatment
                              </h4>
                              <p className="paragraph">
                                With supporting text below as a natural lead-in
                                to additional content.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="row">
                        <div className="col-md-4 mb-3">
                          <div className="card">
                            <img
                              className="img-container"
                              alt=""
                              src="images/portrait-young-smiling-woman-2.png"
                            />
                            <div className="card-body">
                              <h4 className="heading">
                                Special title treatment
                              </h4>
                              <p className="paragraph">
                                With supporting text below as a natural lead-in
                                to additional content.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 mb-3">
                          <div className="card">
                            <img
                              className="img-container"
                              alt=""
                              src="images/portrait-young-smiling-woman-2.png"
                            />
                            <div className="card-body">
                              <h4 className="heading">
                                Special title treatment
                              </h4>
                              <p className="paragraph">
                                With supporting text below as a natural lead-in
                                to additional content.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 mb-3">
                          <div className="card">
                            <img
                              className="img-container"
                              alt=""
                              src="images/portrait-young-smiling-woman-2.png"
                            />
                            <div className="card-body">
                              <h4 className="heading">
                                Special title treatment
                              </h4>
                              <p className="paragraph">
                                With supporting text below as a natural lead-in
                                to additional content.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 text-center">
                <NavLink
                  className="btn  mb-3 mx-2"
                  to="#carouselExampleIndicators2"
                  style={{ backgroundColor: '#fff', borderRadius: '50%' }}
                  role="button"
                  dataSlide="prev"
                >
                  <i className="fa fa-arrow-left"></i>
                </NavLink>
                <NavLink
                  className="btn btn-primary mb-3 mx-2 "
                  to="#carouselExampleIndicators2"
                  style={{ backgroundColor: '#fff', borderRadius: '50%' }}
                  role="button"
                  dataSlide="next"
                >
                  <i className="fa fa-arrow-right"></i>
                </NavLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Section3;

import React from 'react';
import { NavLink } from 'react-router-dom';

const Section6 = () => {
  return (
    <div>
      <section className=" card-slider-section">
        <div className="container">
          <h1 className="heading">people love us</h1>
          <h3 className="heading2">You happy. We happy</h3>
          <div className="row">
            <div className="col-12">
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
                            <h4 className="heading">Special title treatment</h4>
                            <p className="paragraph">
                              With supporting text below as a natural lead-in to
                              additional content.
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
                            <h4 className="heading">Special title treatment</h4>
                            <p className="paragraph">
                              With supporting text below as a natural lead-in to
                              additional content.
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
                            <h4 className="heading">Special title treatment</h4>
                            <p className="paragraph">
                              With supporting text below as a natural lead-in to
                              additional content.
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
                            <h4 className="heading">Special title treatment</h4>
                            <p className="paragraph">
                              With supporting text below as a natural lead-in to
                              additional content.
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
                            <h4 className="heading">Special title treatment</h4>
                            <p className="paragraph">
                              With supporting text below as a natural lead-in to
                              additional content.
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
                            <h4 className="heading">Special title treatment</h4>
                            <p className="paragraph">
                              With supporting text below as a natural lead-in to
                              additional content.
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
  );
};

export default Section6;

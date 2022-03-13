import React from 'react';
import Bannerchart from '../chart/bannerChart';
import AreaChart1 from '../chart/areaCharts';


const section1 = () => {

  return (

    <>
      <section className="header w-100">
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-12 text-area banner">
              <div className="heading">
                <span> Customer Will be Rewarded and </span>
                <span style={{ color: '#ee8105' }}>
                  can generate revenue too
                </span>
              </div>
              <div id="paragraph" className="pb-5 mt-5">
                <span className="paragraph">
                  Start Your Business with Zero Investment and Earn over
                  Thousand of rupees Every Month. Refer customers and earn a
                  fast payouts everymonth!
                </span>
              </div>

              <div className="button-area">
                <button
                  className="button btn-3"
                  onClick={() => {
                    window.location.href = 'http://localhost:3000/form';
                  }}
                >
                  <a></a> Register
                </button>

                <lottie-player
                  src="https://assets2.lottiefiles.com/private_files/lf30_khh7mhre.json"
                  background="transparent"
                  speed="1"
                  style={{ width: '100px', height: '100px' }}
                  loop
                  autoplay
                ></lottie-player>
              </div>
            </div>

            <div className="col-md-7 col-12 img-area d-md-block d-none">
              <img
                src="images/creditdash.png"
                alt=""
                className="img-container"
              />
              <lottie-player
                src="https://assets2.lottiefiles.com/private_files/lf30_khh7mhre.json"
                background="transparent"
                speed="1"
                style={{ width: '100px', height: '100px' }}
                loop
                autoplay
              ></lottie-player>
              {/* <div
                  className="card "
                  style={{
                    width: '36rem',
                    margin: '80px  0px 0px 0px ',
                    zIndex: '1',
                  }}
                >
                  <h4 style={{ padding: '15px' }}>Live Statistics</h4>
                  <AreaChart1 />
                </div> */}

              {/* <div
                  className="card "
                  style={{
                    width: '26rem',
                    margin: '-200px  0px 10px 390px ',
                    zIndex: '2',
                    border: '1 solid #000000',
                    borderRadius: '10px',
                  }}
                >
                  <h4 style={{ padding: '15px' }}>Live Statistics</h4>
                  <Bannerchart />
                </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default section1;

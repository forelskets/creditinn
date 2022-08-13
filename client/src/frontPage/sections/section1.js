import React from 'react';


const section1 = () => {

  return (

    <>
      <section className="header w-100">
        <div className="container">
          <div className="row">
            <div id="carouselExampleControls" className="carousel slide col-md-5 col-12 text-area banner" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active" data-bs-interval="1000">
              <div className="heading">
                <span> Customer Will be Rewarded and </span>
                <span style={{ color: '#ee8105' }}>
                  can generate revenue too
                </span>
              </div>
              
              <div id="paragraph" className="pb-5 mt-5">
                <span className="paragraph">
                  Start Your Business with Zero Investment and Earn over
                  Thousands of rupees Every Month. Refer customers and earn a
                  fast payouts everymonth!
                </span>
              </div>

              <div className="button-area">
                <button
                  className="button btn-3"
                  onClick={() => {
                    window.location.href = '/form';
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
              <div class="carousel-item " data-bs-interval="2000">
              <div className="heading">
                <span> Customer Will be Rewarded and </span>
                <span style={{ color: '#ee8105' }}>
                  can generate revenue too
                </span>
              </div>
              
              <div id="paragraph" className="pb-5 mt-5">
                <span className="paragraph">
                  Start Your Business with Zero Investment and Earn over
                  Thousands of rupees Every Month. Refer customers and earn a
                  fast payouts everymonth!
                </span>
              </div>

              <div className="button-area">
                <button
                  className="button btn-3"
                  onClick={() => {
                    window.location.href = '/form';
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
              <div class="carousel-item " data-bs-interval="2000">
              <div className="heading">
                <span> Customer Will be Rewarded and </span>
                <span style={{ color: '#ee8105' }}>
                  can generate revenue too
                </span>
              </div>
              
              <div id="paragraph" className="pb-5 mt-5">
                <span className="paragraph">
                  Start Your Business with Zero Investment and Earn over
                  Thousands of rupees Every Month. Refer customers and earn a
                  fast payouts everymonth!
                </span>
              </div>

              <div className="button-area">
                <button
                  className="button btn-3"
                  onClick={() => {
                    window.location.href = '/form';
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
              </div>
            </div>

            <div className="col-md-7 col-12 img-area d-md-block d-none">
              <img
                src="images/creditdash.png"
                alt="logo"
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

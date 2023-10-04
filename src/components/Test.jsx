/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

const Test = () => {
    return ( 
        <>
        <div className="unslate_co--section" id="services-section">
          <div className="container">
            <div className="section-heading-wrap text-center mb-5 ">
              <h2 className="heading-h2 text-center divider">
                <span className="gsap-reveal text-black">Mes Services</span>
              </h2>
              {/* <span className="gsap-reveal text-black"
                ><img src="images/divider.png" alt="divider" width="76" className="text-black"
              /></span> */}
            </div>

            <div className="row gutter-v3">
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="feature-v1" 
               // data-aos="fade-up" data-aos-delay="0"
                >
                  {/* <div className="wrap-icon mb-3">
                    <img
                      src="images/svg/001-options.svg"
                      alt="Image"
                      width="45"
                    />
                  </div> */}
                  <h3>
                    Digital <br />
                    Strategy
                  </h3>
                  <p>
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="feature-v1" 
               // data-aos="fade-up" data-aos-delay="100"
                >
                  {/* <div className="wrap-icon mb-3">
                    <img src="images/svg/002-chat.svg" alt="Icon" width="45" />
                  </div> */}
                  <h3>
                    Web <br />
                    Design
                  </h3>
                  <p>
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="feature-v1" 
                //data-aos="fade-up" data-aos-delay="200"
                >
                  {/* <div className="wrap-icon mb-3">
                    <img
                      src="images/svg/003-contact-book.svg"
                      alt="Image"
                      className="img-fluid"
                      width="45"
                    />
                  </div> */}
                  <h3>
                    User <br />
                    Experience
                  </h3>
                  <p>
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-4 mb-4">
                <div className="feature-v1" 
                //data-aos="fade-up" data-aos-delay="0"
                >
                  {/* <div className="wrap-icon mb-3">
                    <img
                      src="images/svg/004-percentage.svg"
                      alt="Image"
                      width="45"
                    />
                  </div> */}
                  <h3>
                    Web <br />
                    Development
                  </h3>
                  <p>
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="feature-v1" 
                //data-aos="fade-up" data-aos-delay="100"
                >
                  {/* <div className="wrap-icon mb-3">
                    <img src="images/svg/006-goal.svg" alt="Image" width="45" />
                  </div> */}
                  <h3>
                    WordPress <br />
                    Solutions
                  </h3>
                  <p>
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="feature-v1" 
                //data-aos="fade-up" data-aos-delay="200"
                >
                  {/* <div className="wrap-icon mb-3">
                    <img
                      src="images/svg/005-line-chart.svg"
                      alt="Image"
                      width="45"
                    />
                  </div> */}
                  <h3>
                    Mobile <br />
                    Applications
                  </h3>
                  <p>
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
     );
}
 
export default Test;
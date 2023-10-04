/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  return (
    <>
      <div className="unslate_co--section bg-black" id="portfolio-section">
        <div className="container">
          <div className="relative">
            <div className="loader-portfolio-wrap">
              <div className="loader-portfolio"></div>
            </div>
          </div>
          <div id="portfolio-single-holder"></div>

          <div className="portfolio-wrapper">
            <div className="d-flex align-items-center mb-4 gsap-reveal gsap-reveal-filter">
              <h2 className="mr-auto heading-h2">
                <span className="gsap-reveal">Portfolio</span>
              </h2>

              {/* <!-- <a href="#" className="text-white js-filter d-inline-block d-lg-none">Filter</a>
              
              <div className="filter-wrap">
                <div className="filter ml-auto" id="filters">
                  <a href="#" className="active" data-filter="*">All</a>
                  <a href="#" data-filter=".web">Web</a>
                  <a href="#" data-filter=".branding">Branding</a>
                  <a href="#" data-filter=".illustration">Illustration</a>
                  <a href="#" data-filter=".packaging">Packaging</a>
                </div>
              </div> --> */}
            </div>

            <div id="posts" className="row gutter-isotope-item">
              <div className="item web branding col-sm-6 col-md-6 col-lg-4">
                <a
                  href="portfolio-single-1.html"
                  className="portfolio-item ajax-load-page isotope-item gsap-reveal-img"
                  data-id="1"
                >
                  <div className="overlay">
                    <span className="wrap-icon icon-link2"></span>
                    <div className="portfolio-item-content">
                      <h3 className="mb-1">Shoe Rebranding</h3>
                      <p>web, branding</p>
                    </div>
                  </div>
                  <img
                    src="images/work_1_md.jpg"
                    className="lazyload img-fluid"
                    alt="Images"
                  />
                </a>
              </div>
              <div className="item branding packaging illustration col-sm-6 col-md-6 col-lg-4 isotope-mb-2">
                <a
                  href="portfolio-single-3.html"
                  className="portfolio-item ajax-load-page item-portrait isotope-item gsap-reveal-img"
                  data-id="3"
                >
                  <div className="overlay">
                    <span className="wrap-icon icon-link2"></span>
                    <div className="portfolio-item-content">
                      <h3>Reworking</h3>
                      <p>branding, packaging, illustration</p>
                    </div>
                  </div>
                  <img
                    src="images/work_2_md.jpg"
                    className="lazyload img-fluid"
                    alt="Images"
                  />
                </a>
              </div>

              <div className="item branding packaging col-sm-6 col-md-6 col-lg-4 isotope-mb-2">
                <a
                  href="portfolio-single-4.html"
                  className="portfolio-item isotope-item gsap-reveal-img ajax-load-page"
                  data-id="4"
                >
                  <div className="overlay">
                    <span className="wrap-icon icon-link2"></span>
                    <div className="portfolio-item-content">
                      <h3>Modern Building</h3>
                      <p>branding, packaging</p>
                    </div>
                  </div>
                  <img
                    src="images/work_3_md.jpg"
                    className="lazyload img-fluid"
                    alt="Images"
                  />
                </a>
              </div>

              <div className="item web packaging col-sm-6 col-md-6 col-lg-4 isotope-mb-2">
                <a
                  href="images/work_4_full.jpg"
                  className="portfolio-item isotope-item gsap-reveal-img"
                  data-fancybox="gallery"
                  data-caption="Watch"
                >
                  <div className="overlay">
                    <span className="wrap-icon icon-photo2"></span>
                    <div className="portfolio-item-content">
                      <h3>Watch</h3>
                      <p>web, packaging</p>
                    </div>
                  </div>
                  <img
                    src="images/work_4_full.jpg"
                    className="lazyload img-fluid"
                    alt="Images"
                  />
                </a>
              </div>

              <div className="item illustration packaging col-sm-6 col-md-6 col-lg-4 isotope-mb-2">
                <a
                  href="images/work_5_md.jpg"
                  className="portfolio-item isotope-item gsap-reveal-img"
                  data-fancybox="gallery"
                  data-caption="Shoe Rebranding"
                >
                  <div className="overlay">
                    <span className="wrap-icon icon-photo2"></span>
                    <div className="portfolio-item-content">
                      <h3>Shoe Rebranding</h3>
                      <p>illustration, packaging</p>
                    </div>
                  </div>
                  <img
                    src="images/work_5_md.jpg"
                    className="lazyload img-fluid"
                    alt="Images"
                  />
                </a>
              </div>

              <div className="item web branding col-sm-6 col-md-6 col-lg-4 isotope-mb-2">
                <a
                  href="portfolio-single-2.html"
                  className="portfolio-item ajax-load-page item-portrait isotope-item gsap-reveal-img"
                  data-id="2"
                >
                  <div className="overlay">
                    <span className="wrap-icon icon-link2"></span>
                    <div className="portfolio-item-content">
                      <h3>Reshape</h3>
                      <p>web, branding</p>
                    </div>
                  </div>
                  <img
                    src="images/work_6_md.jpg"
                    className="lazyload img-fluid"
                    alt="Images"
                  />
                </a>
              </div>

              <div className="item branding packaging col-sm-6 col-md-6 col-lg-4 isotope-mb-2">
                <a
                  href="images/work_7_a_md.jpg"
                  className="portfolio-item item-portrait isotope-item gsap-reveal-img"
                  data-fancybox="gallery"
                  data-caption="Modern Building"
                >
                  <div className="overlay">
                    <span className="wrap-icon icon-photo2"></span>
                    <div className="portfolio-item-content">
                      <h3>Modern Building</h3>
                      <p>branding, packaging</p>
                    </div>
                  </div>
                  <img
                    src="images/work_7_a_md.jpg"
                    className="lazyload img-fluid"
                    alt="Images"
                  />
                </a>
              </div>

              <div className="item web branding col-sm-6 col-md-6 col-lg-4 isotope-mb-2">
                <a
                  href="https://www.youtube.com/watch?v=mwtbEGNABWU"
                  className="portfolio-item isotope-item gsap-reveal-img"
                  data-fancybox="gallery"
                  data-caption="Showreel 2019"
                >
                  <div className="overlay">
                    <span className="wrap-icon icon-play_circle_filled"></span>
                    <div className="portfolio-item-content">
                      <h3>Showreel 2019</h3>
                      <p>web, branding</p>
                    </div>
                  </div>
                  <img
                    src="images/work_8_md.jpg"
                    className="lazyload img-fluid"
                    alt="Images"
                  />
                </a>
              </div>

              <div className="item web illustration col-sm-6 col-md-6 col-lg-4 isotope-mb-2">
                <a
                  href="images/work_9_a_md.jpg"
                  className="portfolio-item isotope-item gsap-reveal-img"
                  data-fancybox="gallery"
                  data-caption="Render Packaging"
                >
                  <div className="overlay">
                    <span className="wrap-icon icon-photo2"></span>
                    <div className="portfolio-item-content">
                      <h3>Render Packaging</h3>
                      <p>web, illustration</p>
                    </div>
                  </div>
                  <img
                    src="images/work_9_a_md.jpg"
                    className="lazyload img-fluid"
                    alt="Images"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;

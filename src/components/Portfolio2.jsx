/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio2 = () => {
  return (
    <>
      <div className="container">
        <div className="site-section block__62272" id="portfolio-section">
          <div className="container">
            <div className="row mb-3">
              <div className="col-12 text-center" data-aos="fade">
                <h3 className="section-title-sub text-primary">Awesome Works</h3>
                <h2 className="section-title mb-3">Portfolio</h2>
              </div>
            </div>

            <div className="row justify-content-center mb-5" data-aos="fade-up">
              <div
                id="filters"
                className="filters text-center button-group col-md-7 "
              >
                <button className="btn btn-primary active" data-filter="*">
                  All
                </button>
                <button className="btn btn-primary" data-filter=".web">
                  Web
                </button>
                <button className="btn btn-primary" data-filter=".design">
                  Design
                </button>
                <button className="btn btn-primary" data-filter=".brand">
                  Brand
                </button>
              </div>
            </div>

            <div id="posts" className="row no-gutter">
              <div className="item web col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4">
                <a href="portfolio-single.html" className="item-wrap">
                  <span className="icon-add"></span>
                  <img className="img-fluid" src="images/sq_img_1.jpg" />
                </a>
              </div>
              <div className="item web col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4">
                <a href="portfolio-single.html" className="item-wrap">
                  <span className="icon-add"></span>
                  <img className="img-fluid" src="images/sq_img_2.jpg" />
                </a>
              </div>

              <div className="item brand col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4">
                <a href="portfolio-single.html" className="item-wrap">
                  <span className="icon-add"></span>
                  <img className="img-fluid" src="images/sq_img_3.jpg" />
                </a>
              </div>

              <div className="item design col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4">
                <a href="portfolio-single.html" className="item-wrap">
                  <span className="icon-add"></span>
                  <img className="img-fluid" src="images/sq_img_4.jpg" />
                </a>
              </div>

              <div className="item web col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4">
                <a href="portfolio-single.html" className="item-wrap">
                  <span className="icon-add"></span>
                  <img className="img-fluid" src="images/sq_img_5.jpg" />
                </a>
              </div>

              <div className="item brand col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4">
                <a href="portfolio-single.html" className="item-wrap">
                  <span className="icon-add"></span>
                  <img className="img-fluid" src="images/sq_img_6.jpg" />
                </a>
              </div>

              <div className="item web col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4">
                <a href="portfolio-single.html" className="item-wrap">
                  <span className="icon-add"></span>
                  <img className="img-fluid" src="images/sq_img_7.jpg" />
                </a>
              </div>

              <div className="item design col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4">
                <a href="portfolio-single.html" className="item-wrap">
                  <span className="icon-add"></span>
                  <img className="img-fluid" src="images/sq_img_8.jpg" />
                </a>
              </div>

              <div className="item web col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4">
                <a href="portfolio-single.html" className="item-wrap">
                  <span className="icon-add"></span>
                  <img className="img-fluid" src="images/sq_img_9.jpg" />
                </a>
              </div>

              <div className="item design col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4">
                <a href="portfolio-single.html" className="item-wrap">
                  <span className="icon-add"></span>
                  <img className="img-fluid" src="images/sq_img_10.jpg" />
                </a>
              </div>

              <div className="item brand col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4">
                <a href="portfolio-single.html" className="item-wrap">
                  <span className="icon-add"></span>
                  <img className="img-fluid" src="images/sq_img_11.jpg" />
                </a>
              </div>

              <div className="item design col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4">
                <a href="portfolio-single.html" className="item-wrap">
                  <span className="icon-add"></span>
                  <img className="img-fluid" src="images/sq_img_12.jpg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio2;

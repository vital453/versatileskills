/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="unslate_co--footer unslate_co--section">
        <div className="container items-center justify-center">
          <hr className="text-gray-700" />
          <div className=" w-12 h-12 rounded-full bg-icon-color2 verhaut">
          <a href="#top" class="verhauticon">
          <FaChevronUp className="relative top-4 text-white left-4 "/>
        </a>
          </div>
        </div>
        {/* <a href="#top" class="verhaut">
          <FaChevronUp className="relative top-4 text-black left-4 hover:text-blue-700"/>
        </a> */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7">
              
              <div className="footer-site-logo">
                <a href="#">
                  Versatile<span>.</span>
                </a>
              </div>

              <ul className="footer-site-social">
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">Instagram</a>
                </li>
                <li>
                  <a href="#">Dribbble</a>
                </li>
                <li>
                  <a href="#">Behance</a>
                </li>
              </ul>

              <p className="site-copyright footbar">
                {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                Copyright &copy;
                {/* { document.write(new Date().getFullYear())} */}
                2022 All rights reserved | This template is made with
                <i className="icon-heart" aria-hidden="true"></i> by
                {/* <Link to={"/"} className="footbar">Versatile</Link> */}
                {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

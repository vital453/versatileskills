/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHotjar, FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaSteamSquare } from "react-icons/fa";

const Footer3 = () => {
  return (
    <>
      <div className="site-footer slanted-footer">
        <a href="#top" class="smoothscroll scroll-top">
          <FaChevronUp className="relative top-4 text-white left-4 hover:text-blue-700"/>
        </a>

        <div class="container">
          <div class="row mb-5">
            <div class="col-6 col-md-3 mb-4 mb-md-0">
              <h3>Scenic Products</h3>
              <ul class="list-unstyled">
                <li>
                  <a href="#">Web Design</a>
                </li>
                <li>
                  <a href="#">Graphic Design</a>
                </li>
                <li>
                  <a href="#">Web Developers</a>
                </li>
                <li>
                  <a href="#">Resources</a>
                </li>
              </ul>
            </div>
            <div class="col-6 col-md-3 mb-4 mb-md-0">
              <h3>Company</h3>
              <ul class="list-unstyled">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Career</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Resources</a>
                </li>
              </ul>
            </div>
            <div class="col-6 col-md-3 mb-4 mb-md-0">
              <h3>Support</h3>
              <ul class="list-unstyled">
                <li>
                  <a href="#">Support</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
              </ul>
            </div>
            <div class="col-6 col-md-3 mb-4 mb-md-0">
              <h3>Contact Us</h3>
              <div class="footer-social">
                <a href="#" className="items-center text-white hover:text-blue-700">
                  <FaFacebookF  className="relative top-3 left-3"/>
                </a>
                <a href="#" className="items-center text-white hover:text-blue-700">
                  <FaWhatsapp  className="relative top-3 left-3"/>
                </a>
                <a href="#" className="items-center text-white hover:text-blue-700">
                  <FaTwitter  className="relative top-3 left-3"/>
                </a>
                <a href="#" className="items-center text-white hover:text-blue-700">
                  <FaInstagram  className="relative top-3 left-3"/>
                </a>
              </div>
            </div>
          </div>

          <div class="row text-center">
            <div class="col-12">
              <p class="copyright">
                <small class="block">
                  {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                  Copyright &copy; 2022 All rights reserved  | This template is
                  made with by{" "}
                  <a href="https://colorlib.com" target="_blank">
                    Colorlib
                  </a>
                  {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer3;

/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// import { Link } from "react-router-dom";

const HappyClient = () => {
  return (
    <>
      <div className="unslate_co--section " id="testimonial-section">
        <div className="container">
          <div className="section-heading-wrap text-center mb-5">
            <h2 className="heading-h2 text-center divider">
              <span className="gsap-reveal text-black">My Happy Clients</span>
            </h2>
            <span className="gsap-reveal">
              <img src="images/divider.png" alt="divider" width="76" />
            </span>
          </div>
        </div>

        {/* <div className="owl-carousel testimonial-slider" data-aos="fade-up"> */}
        <div className="container">
          <OwlCarousel items={1} margin={0} autoplay={true} className="owl-theme" loop>
            <div>
              <div className="testimonial-v1">
                <div className="testimonial-inner-bg">
                  <span className="quote">&ldquo;</span>
                  <blockquote className="text-white">
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts. Separated they live in Bookmarksgrove right at the
                    coast of the Semantics, a large language ocean. A small
                    river named Duden flows by their place and supplies it with
                    the necessary regelialia. It is a paradisematic country, in
                    which roasted parts of sentences fly into your mouth.
                  </blockquote>
                </div>

                <div className="testimonial-author-info"> 
                  <img src="images/person_man_1.jpg" alt="Image" />
                  <h3>Eric Ingram</h3>
                  <span className="d-block position text-black">
                    Product Designer @facebook
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="testimonial-v1">
                <div className="testimonial-inner-bg">
                  <span className="quote">&ldquo;</span>
                  <blockquote className="text-white">
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts. Separated they live in Bookmarksgrove right at the
                    coast of the Semantics, a large language ocean. A small
                    river named Duden flows by their place and supplies it with
                    the necessary regelialia. It is a paradisematic country, in
                    which roasted parts of sentences fly into your mouth.
                  </blockquote>
                </div>

                <div className="testimonial-author-info">
                  <img src="images/person_man_2.jpg" alt="Image" />
                  <h3>Ryan Mullins</h3>
                  <span className="d-block position text-black">
                    Product Designer @Shopify
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="testimonial-v1">
                <div className="testimonial-inner-bg">
                  <span className="quote">&ldquo;</span>
                  <blockquote className="text-white">
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts. Separated they live in Bookmarksgrove right at the
                    coast of the Semantics, a large language ocean. A small
                    river named Duden flows by their place and supplies it with
                    the necessary regelialia. It is a paradisematic country, in
                    which roasted parts of sentences fly into your mouth.
                  </blockquote>
                </div>

                <div className="testimonial-author-info">
                  <img src="images/person_woman_1.jpg" alt="Image" />
                  <h3>Erica Miller</h3>
                  <span className="d-block position text-black">
                    Product Designer @Twitter
                  </span>
                </div>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </div>
    </>
  );
};

export default HappyClient;

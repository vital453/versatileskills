/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Commentaire1 = () => {
  return (
    <>
      {/* <!-- ***** Contact Us Start ***** --> */}
      <div class="section colored" id="contact-us">
        <div class="container">
          {/* <!-- ***** Section Title Start ***** --> */}
          <div class="row">
            <div class="col-lg-12">
              <div class="center-heading">
                <h2 class="section-title">Parle-nous</h2>
              </div>
            </div>
            <div class="offset-lg-3 col-lg-6 mt-4">
                {/* <div class="center-text">
                    <p>
                    Maecenas pellentesque ante faucibus lectus vulputate
                    sollicitudin. Cras feugiat hendrerit semper.
                    </p>
                </div> */}
            </div>
          </div>
          {/* <!-- ***** Section Title End ***** --> */}

          <div class="row">
            {/* <!-- ***** Contact Text Start ***** --> */}
            <div class="col-lg-4 col-md-6 col-sm-12">
              <h5 class="margin-bottom-30">Rester en contact</h5>
              <div class="contact-text">
                <p>
                Addresse
                  <br />
                  112  Avenue Steinmetz rue de la  Princesse 
                </p>
                <p>
                 Moi je suis une petite description ...................
                </p>
              </div>
            </div>
            {/* <!-- ***** Contact Text End ***** --> */}

            {/* <!-- ***** Contact Form Start ***** --> */}
            <div class="col-lg-8 col-md-6 col-sm-12">
              <div class="contact-form">
                <form id="contact" action="" method="get">
                  <div class="row">
                    <div class="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <input
                          name="name"
                          type="text"
                          class="form-control border-2 bg-white"
                          id="name"
                          placeholder="Name"
                          required=""
                        />
                      </fieldset>
                    </div>
                    <div class="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <input
                          name="email"
                          type="email"
                          class="form-control border-2 bg-white"
                          id="email"
                          placeholder="E-Mail Address"
                          required=""
                        />
                      </fieldset>
                    </div>
                    <div class="col-lg-12">
                      <fieldset>
                        <textarea
                          name="message"
                          rows="6"
                          class="form-control border-2 bg-white"
                          id="message"
                          placeholder="Ton Message"
                          required=""
                        ></textarea>
                      </fieldset>
                    </div>
                    <div class="col-lg-12">
                      <fieldset>
                        <button
                          type="submit"
                          id="form-submit"
                          class="main-button"
                        >
                          Send Message
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* <!-- ***** Contact Form End ***** --> */}
          </div>
        </div>
      </div>
      {/* <!-- ***** Contact Us End ***** --> */}
    </>
  );
};

export default Commentaire1;

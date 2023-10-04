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
      <div className="section colored" id="contact-us">
        <div className="container">
          {/* <!-- ***** Section Title Start ***** --> */}
          <div className="row">
            <div className="col-lg-12">
              <div className="center-heading">
                <h2 className="section-title">Parle-nous</h2>
              </div>
            </div>
            <div className="offset-lg-3 col-lg-6 mt-4">
                {/* <div className="center-text">
                    <p>
                    Maecenas pellentesque ante faucibus lectus vulputate
                    sollicitudin. Cras feugiat hendrerit semper.
                    </p>
                </div> */}
            </div>
          </div>
          {/* <!-- ***** Section Title End ***** --> */}

          <div className="row">
            {/* <!-- ***** Contact Text Start ***** --> */}
            <div className="col-lg-4 col-md-6 col-sm-12">
              <h5 className="margin-bottom-30">Rester en contact</h5>
              <div className="contact-text">
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
            <div className="col-lg-8 col-md-6 col-sm-12">
              <div className="contact-form">
                <form id="contact" action="" method="get">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <input
                          name="name"
                          type="text"
                          className="form-control border-2 bg-white"
                          id="name"
                          placeholder="Name"
                          required=""
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <input
                          name="email"
                          type="email"
                          className="form-control border-2 bg-white"
                          id="email"
                          placeholder="E-Mail Address"
                          required=""
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <textarea
                          name="message"
                          rows="6"
                          className="form-control border-2 bg-white"
                          id="message"
                          placeholder="Ton Message"
                          required=""
                        ></textarea>
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <button
                          type="submit"
                          id="form-submit"
                          className="main-button"
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

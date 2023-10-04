/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate  } from "react-router-dom";

const About = () => {
  //  const { name, picture } = useStateContext();
  const [tab, setTab] = useState(JSON.parse(localStorage.getItem("userdata")))
  //  useEffect(() => {
  //    console.log(picture+name);
  //  }, [])
  const navigate = useNavigate();
   
  return (
    
    <>
      <div className="unslate_co--section" id="about-section">
        <div className="container">
          <div className="section-heading-wrap text-center mb-5">
            <h2 className="heading-h2 text-center divider">
              <span className="gsap-reveal text-black">À propos de moi </span>
            </h2>
            {/* <span className="gsap-reveal">
              <img src="images/divider.png" alt="divider" />
            </span> */}
          </div>

          <div className="mt-5 flex justify-between ">
            <div className="mr-7">
              {/* <figure className="dotted-bg gsap-reveal-img"> */}
                <img
                    src={`https://backend-shop.benindigital.com/${tab.image}`}
                   //src="images/about_me_pic.jpg"
                  alt="Image"
                  className="rounded-full w-72 h-72 object-cover"
                />
              {/* </figure> */}
            </div>
            <div className="col-lg-4 pr-lg-5">
              <h3 className="mb-4 heading-h3">
                <span className="gsap-reveal text-black">We can make it together</span>
              </h3>
              <p className="lead gsap-reveal">
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there
                <a href="#" 
                //onClick={() => navigate(-1)}
                >live the blind</a> texts.
              </p>
              <p className="mb-4 gsap-reveal">
                A small river named Duden flows by their place and supplies it
                with the necessary regelialia. It is a paradisematic country, in
                which roasted parts of sentences fly into your mouth.
              </p>
              <p className="gsap-reveal">
                <a href="#" className="btn btn-outline-success btn-custom-success">
                  Download my CV
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// import { Link } from "react-router-dom";
import { DiVisualstudio } from "react-icons/di";
import { Link } from "react-router-dom";

const Navbar_model1 = () => {


  return (
    <>
      <div className="container-fluid items-center flex justify-between mt-3">
        <div className="flex items-center text-black font-semibold ml-1 text-14 tracking-tight" >
          <DiVisualstudio className="text-3xl mr-2" />
          <span className="cursor-pointer">VERSATIL</span>
        </div>
        <div className="flex items-center">
          <div className="mr-5 cursor-pointer">
            <Link to={"/register"}>
              <span className="text-black font-semibold ml-1 text-14">
                S'inscrire
              </span>
            </Link>
            <span className="text-black font-semibold ml-1 text-14">/</span>
            <Link to={"/login"}>
              <span className="text-black font-semibold ml-1 text-14">
                Se connecter
              </span>
            </Link>
          </div>
          <div className="mr-5 cursor-pointer">
            <span className="text-black font-semibold ml-1 text-14">
              Prestataires des services
            </span>
          </div>
          <div className="ml-2">
            <img
              className="rounded-full w-10 h-10"
              src="images/about_me_pic2.jpg"
            />
          </div>
          <div className="items-center ml-2 cursor-pointer">
            <span className="text-gray-400 text-14">Hi,</span>{" "}
            <span className="text-gray-400 font-bold ml-1 text-14">
              Michael
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar_model1;

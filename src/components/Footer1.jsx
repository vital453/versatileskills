/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// import { Link } from "react-router-dom";

const Footer1 = () => {
  return (
    <>
      <div className="container-fluid items-center absolute bottom-0 mb-2">
        <div className="container-fluid items-center flex justify-between">
          <div className="text-black font-semibold ml-1 text-14 tracking-tight">
            <span className="cursor-pointer">Bénin</span>
          </div>
        </div>
        <hr className="bg-black" />
        <div className="container-fluid items-center flex flex-wrap justify-center lg:justify-between">
          <div className="flex items-center justify-center flex-wrap">
            <div className="cursor-pointer">
              <span className="text-black font-semibold ml-1 text-14">
                À propos
              </span>
            </div>
            <div className="ml-2 cursor-pointer">
              <span className="text-black font-semibold ml-1 text-14">
                Publicité
              </span>
            </div>
            <div className="ml-2 cursor-pointer">
              <span className="text-black font-semibold ml-1 text-14">
                Entreprise
              </span>
            </div>
            <div className="ml-2 cursor-pointer">
              <span className="text-black font-semibold ml-1 text-14">
                Comment fonctionne la recherche Versatile ?
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center">
            <div className="ml-2 cursor-pointer">
              <span className="text-black font-semibold ml-1 text-14">
                Confidentialité
              </span>
            </div>
            <div className="ml-2 cursor-pointer">
              <span className="text-black font-semibold ml-1 text-14">
                Conditions
              </span>
            </div>
            <div className="ml-2 cursor-pointer">
              <span className="text-black font-semibold ml-1 text-14">
                Pramètres
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer1;

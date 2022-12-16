/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
// import { Link } from "react-router-dom";*

const Card = ({nom, image}) => {
  return (
    <>
    
        <div className="w-60 border-1 border-color rounded-lg cardd m-2">
          <img
            src={`https://backend-shop.benindigital.com/${image}`}
            className="w-full h-40 object-cover rounded-t-lg"
          />
          <div className="name text-xl text-white ml-1">
            <span>{nom}</span>
          </div>
          <div className="name text-xl flex justify-between text-white ml-1">
            <div>
              <i className="fas fa-map-marker text-14"></i>
              <span className="text-14 ml-1">Ville</span>
            </div>
            <div className="bg-white rounded-lg flex items-center pl-1 pr-1">
              <div className="bg-green-500 rounded-full w-3 h-3"></div>
              <span className="text-black text-14 font-semibold ml-1">
                Disponible
              </span>
            </div>
          </div>
          <div className="flex justify-between pr-1 pl-1 items-center profile">
            <div>
              <i className="fa-regular fa-thumbs-up"></i>
              <span className="text-xl tracking-tight cursor-pointer liens ml-2">
                3
              </span>
            </div>
            <div className="mb-1">
              <i className="fas fa-shield-check"></i>
              <span className="text-xl tracking-tight cursor-pointer liens text-green-500 ml-2">
                Profil vérifié
              </span>
            </div>
          </div>
          <div className="m-1">
            <span className="text-xl tracking-tight liens font-semibold">
              Menusier Constructeur chez ZIOR
            </span>
          </div>
          {/* <div className="bg-gray-300 text-center items-center rounded-full m-3">
            <span className="text-black text-14">+22961940010</span>
          </div> */}
          <div className="text-center mb-3">
            <span className="text-gray-500 text-14">
              À partir de 450 € /jour
            </span>
          </div>
        </div>
      
    </>
  );
};

export default Card;

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";*

const NumberResult = () => {
  const datarec = useSelector((state)=>state.profileUser.pictures);
  const ffff= ()=>{
    console.log(datarec);
  }
  return (
    <>
      <div className="justify-between w-full mt-5 flex">
     
          <span className="text-black font-semibold ml-1 text-2xl cursor-pointer liens ml-1">
            1863138 Travailleurs disponible
          </span>
       
          <button type="button" className="btn btn-success mr-3" onClick={ffff}>
            Confiez nous vos besoin
          </button>
       
      </div>
    </>
  );
};

export default NumberResult;

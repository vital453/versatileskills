/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from "react-router-dom";

const Commentaire = () => {
  return (
    <>
      <div className="container">
        <div className="flex flex-col">
          <span className="mb-4 text-2xl ">Laissez nous un commentaire !</span>
          <div className="mb-3 flex flex-col">
            <label for="exampleFormControlInput1" className="form-label text-xl ">
              Email address
            </label>
            <input
              type="email"
              className="border-2 border-color rounded-md w-500 p-3"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
          <div className="mb-3 flex flex-col">
            <label for="exampleFormControlTextarea1" className="form-label text-xl">
              Commentaire
            </label>
            <textarea
              className="border-2 border-color rounded-md w-500 p-4"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Message"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default Commentaire;

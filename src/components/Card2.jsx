/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsCurrencyExchange, BsEyeFill, BsUiChecksGrid, BsWhatsapp } from "react-icons/bs";
import { BsPlayCircleFill } from "react-icons/bs";
import { BsPatchCheckFill } from "react-icons/bs";
import { FiDollarSign } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addandEraseData, addData } from "../feature/profileUser.slice";
import { FaMoneyBill } from "react-icons/fa";
// import { useStateContext } from "../contexts/ContextProvider";

const Card2 = ({ nom, image }) => {
  //   const { name, picture, setName, setPicture } = useStateContext();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(JSON.parse(localStorage.getItem("userdata")));
  const data = {
    name: nom,
    image: image,
  };
  const handleClick = () => {
    dispatch(addandEraseData(data));
    //  setTab(JSON.parse(localStorage.getItem("userdata")))
    //  console.log(tab.name);
    // console.log(picture);
    window.location.href = "/profile";
  };

  return (
    <>
      <div className="niv1">
        <div
          className="niv2 booking-card"
          style={{
            backgroundImage: `url(https://backend-shop.benindigital.com/${image})`,
            // backgroundImage: `url(https://picsum.photos/400/364)`,
          }}
          // "background-image: url(https://images.unsplash.com/photo-1578944032637-f09897c5233d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ)"
        >
          <div className="book-container">
            {/* <div className="content">
            <button className="btn">Réserver</button>
          </div> */}
          </div>
          <div className="informations-container">
            <h2 className="title">{nom}</h2>
            <div className="flex items-center justify-center">
              {/* <BsWhatsapp className="text-icon-color text-2xl"/> */}
              <span className="text-xl">Whatapps: </span>
              <span className="bande mt-1">+229 61940010</span>
            </div>

            <p className="price mb-3">
              <FaMoneyBill  className="text-icon-color text-2xl"/>
              &nbsp; &nbsp; De 0 à 150000 FCFA
            </p>
            <div className="more-information">
              <div className="info-and-date-container">
                {/* <div className="box info">
                <BsPlayCircleFill className="text-icon-color" />
                <p>Parc des expositions à NANTES</p>
              </div> */}
                {/* <Link to={"/"} className="linka"> */}
                <div
                  className="box flex items-center justify-center text-center cursor-pointer"
                  onClick={handleClick}
                >
                  <BsEyeFill className="text-icon-color items-center text-2xl" />
                  <p className="bandot items-center mt-3 ml-2">
                    Voir le profile
                  </p>
                </div>
                {/* </Link> */}
              </div>
              <p className="disclaimer bande_desc">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi
                eveniet perferendis culpa. Expedita architecto nesciunt, rem
                distinctio
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card2;

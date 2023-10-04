/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BsBuilding,
  BsChatDotsFill,
  BsHouseFill,
  BsMailbox,
  BsPersonFill,
  BsUiChecksGrid,
} from "react-icons/bs";
import { BsPlayCircleFill } from "react-icons/bs";
import { BsPatchCheckFill } from "react-icons/bs";
import { FaMoneyBillWave, FaPhone } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addandEraseData } from "../feature/profileUser.slice";

const Card4 = ({ data }) => {
  const dispatch = useDispatch();
  let nav = useNavigate();
  const user = useSelector((t) => t.auth.user);
  // const data = {
  //   id: id,
  //   name: nom,
  //   profileImg: profileImg,
  // };
  const handleClick = () => {
    // dispatch(addandEraseData(data));
    //  setTab(JSON.parse(localStorage.getItem("userdata")))
    //  console.log(tab.name);
    // console.log(picture);
    nav(`/profile/${data.id}/${0}`);
    // nav(`/profile/${id}/${user.professionId}`)
  };
  return (
    <>
      <div className="cardtest1">
        <div className="cardtest11">
          <div className="cardtest11sous">
            <span className="cardtest11span">Digital Strategist</span>
          </div>
        </div>
        <div className="cardtest12">
          <div className="cardtest12sous1">
            <div className="cardtest12sous11">
              <h2 className="cardtest12sous11h2">{data.username}</h2>
            </div>
            <div className="cardtest12sous12">
              <p className="cardtest12sous12p">
                <span className="cardtest12sous12span">À propos: </span> 
                {data.a_propos_de_moi}
                {/* Web
                Designer / UX / Graphic Artist / Coffee Lover ljjcdfhhdfhhf
                fdjfjkdhfdjhfkjhdfhd dfjdfkjdhfhdjhfhdkfh fdkhfjdfhjdhfkjdhfj
                dfhfhdkjhfjk */}
              </p>
            </div>
            <div className="cardtest12sous13">
              <p className="cardtest12sous13p">
                <BsHouseFill className="text-xl font-bold cardtest12sous12icones" />{" "}
                &nbsp; &nbsp;Addresse: {data.adresse}{" "}
              </p>
            </div>
            <div className="cardtest12sous14">
              <p className="cardtest12sous13p">
                <FaPhone className="text-xl font-bold cardtest12sous12icones" />{" "}
                &nbsp; &nbsp;Phone #: + {data.number}{" "}
              </p>
            </div>
            <div className="cardtest12sous14">
              <p className="cardtest12sous13p">
                <FaPhone className="text-xl font-bold cardtest12sous12icones" />{" "}
                &nbsp; &nbsp;Proffession #: + {data.number}{" "}
              </p>
            </div>
            <div className="cardtest12sous15">
              <p className="cardtest12sous13p">
                <FaMoneyBillWave className="text-xl font-bold cardtest12sous12icones" />{" "}
                &nbsp; &nbsp;1 euros à 30 euros{" "}
              </p>
            </div>
          </div>
          <div className="cardtest12sous2">
            {data.profileImg === "" ? (
              <img
                className="h-20 w-20 rounded-full mx-auto"
                src="/man.png"
                alt="Photo_profile"
              />
            ) : (
              <img
                src={`https://backend-skills.versatileskills.space/uploads/${data.profileImg}`}
                alt="user avatar"
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
          </div>
        </div>
        <div className="cardtest13">
          <div className="cardtest13sous1">
            <BsChatDotsFill className="text-white text-2xl" />
          </div>
          <div className="cardtest13sous2" onClick={handleClick}>
            <BsPersonFill className="text-white text-2xl" />{" "}
            <p className="text-white cardtest13sous2p">View Profile</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card4;

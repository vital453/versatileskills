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

const Card5 = ({ data }) => {
  const dispatch = useDispatch();
  let nav = useNavigate();
  const user = useSelector((t) => t.auth.user);

  const [width, setWindowWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    // const width = window.innerWidth;
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener("resize", updateDimensions);
  if (width < 500) {
    return (
      <>
        <div
          className="w-36 h-36 rounded-xl bg-white text-black flex flex-col cursor-pointer shadow"
          onClick={() => {
            nav(`/profile/${data.id}/${data.professionId}`);
          }}
        >
          <div className=" mt-3 flex items-center justify-center">
            {data.profileImg === "" ? (
              <img
                className="h-10 w-10 rounded-full mx-auto"
                src="/man.png"
                alt="Photo_profile"
                // onClick={()=>{nav(`/profile/${data.id}/${data.professionId}`)}}
              />
            ) : (
              <img
                src={`https://backend-skills.versatileskills.space/uploads/${data.profileImg}`}
                alt="user avatar"
                className="w-10 h-10 rounded-full object-cover"
                // onClick={()=>{nav(`/profile/${data.id}/${data.professionId}`)}}
              />
            )}
          </div>
          <div className="flex items-center justify-center mt-2 mb-2 flex-col">
            <span className="text-noir_epais text-sm">{data.username}</span>
            <span className="text-gray-400 text-base mt-1">
              {data.profession}
            </span>
            <span className="text-gray-400 text-xs mt-1 flex space-x-2">
              <FaMoneyBillWave className="text-xs font-bold cardtest12sous12icones" />
              <span>1 euros à 30 euros</span>
            </span>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className="w-52 h-52 rounded-xl bg-white text-black flex flex-col cursor-pointer shadow"
          onClick={() => {
            nav(`/profile/${data.id}/${data.professionId}`);
          }}
        >
          <div className=" mt-3 flex items-center justify-center">
            {data.profileImg === "" ? (
              <img
                className="h-20 w-20 rounded-full mx-auto"
                src="/man.png"
                alt="Photo_profile"
                // onClick={()=>{nav(`/profile/${data.id}/${data.professionId}`)}}
              />
            ) : (
              <img
                src={`https://backend-skills.versatileskills.space/uploads/${data.profileImg}`}
                alt="user avatar"
                className="w-20 h-20 rounded-full object-cover"
                // onClick={()=>{nav(`/profile/${data.id}/${data.professionId}`)}}
              />
            )}
          </div>
          <div className="flex items-center justify-center mt-2 flex-col">
            <span className="text-noir_epais text-xl">{data.username}</span>
            <span className="text-gray-400 text-base mt-1">
              {data.profession}
            </span>
            <span className="text-gray-400 text-base mt-1 flex space-x-2">
              <FaMoneyBillWave className="text-xl font-bold cardtest12sous12icones" />
              <span>1 euros à 30 euros</span>
            </span>
          </div>
        </div>
      </>
    );
  }
};

export default Card5;

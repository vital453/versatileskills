/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { DiVisualstudio } from "react-icons/di";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FcSettings } from "react-icons/fc";
import { logOut } from "../feature/AuthSlice";

const Navbar_model1 = () => {
  const user = useSelector((t) => t.auth.user);
  const userprofile = useSelector((t) => t.profileUser.profiles);

  let nav = useNavigate();
  let dispatch = useDispatch();

  const [toogle, settoogle] = useState(false);

  const logout = () => {
    window.location.href = "/accueil";
    dispatch(logOut([]));
  };
  //   useEffect(() => {
  //     console.log(user.profileImg);
  //  }, [user])

  return (
    <>
      <div className="container-fluid items-center flex justify-between mt-3">
        <div className="flex items-center text-black font-semibold ml-1 text-14 tracking-tight">
          <DiVisualstudio className="text-3xl mr-2" />
          <span className="cursor-pointer">SKILLS</span>
        </div>
        <div className="flex items-center">
          {!user.auth && (
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
          )}
          
          {user.auth && (
            <div
              onClick={() => {
                settoogle(!toogle);
              }}
              className="cursor-pointer flex items-center "
            >
              <div className="ml-2">
                {user.profileImg === "" ? (
                  <img className="rounded-full w-10 h-10" src="man.png" />
                ) : (
                  <img
                    className="rounded-full w-10 h-10"
                    src={`https://backend-skills.versatileskills.space/uploads/${user.profileImg}`}
                  />
                )}
              </div>
              {/* <div className="items-center ml-2 cursor-pointer">
                <span className="text-gray-400 text-14">Salut,</span>{" "}
                <span className="text-gray-400 font-bold ml-1 text-14">
                  {userprofile.find((t) => t.id === user.userId).username}
                </span>
              </div> */}
            </div>
          )}
        </div>
      </div>
      {toogle && (
        <div className="menu-supra">
          <div className="menu-box">
            <div className="menu">
              <div className="flex flex-col justify-start items-start">
                <span className="text-base text-black">
                  {user.nom === "" ? "Aucun nom défini" : user.nom}
                </span>
                <span className="text-sm text-gray-400">Administrator</span>
              </div>
              <hr />
              <ul>
                <li>
                  {/* <FcSettings/> */}
                  <span
                    className="texta"
                    onClick={() => {
                      nav(`/profile/${user.userId}/${user.professionId}`);
                    }}
                  >
                    Mon profile
                  </span>
                </li>
                <li>
                  <span className="texta" onClick={() => logout()}>
                    Se deconnecter
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar_model1;

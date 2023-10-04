/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import {
  FaGithub,
  FaInstagram,
  FaInstagramSquare,
  FaTwitter,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Axios from "axios";
import { setCredentials } from "../feature/AuthSlice";

const Login = () => {
  const [email, setemail] = useState("");
  const [ifemail, setIfemail] = useState(false);
  const [ifemailval, setIfemailval] = useState(false);
  const [password, setpassword] = useState("");
  const [ifPassword, setIfPassword] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [wrongCombine, setWrongCombine] = useState(false);
  const dispatch = useDispatch();
  //toast
  const [loginSuccess, setloginSuccess] = useState(false);

  let navigate = useNavigate();

  const login = () => {
    if (!email) {
      setIfemail(true);
      setTimeout(() => {
        setIfemail(false);
      }, [4000]);
    } else {
      setIfemail(false);
    }
    if (!password) {
      setIfPassword(true);
      setTimeout(() => {
        setIfPassword(false);
      }, [4000]);
    } else {
      setIfPassword(false);
    }

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setIfemailval(false);
      if (email && password) {
        // setShowLoading(true)
        // setprogress(true);
        Axios.post("https://backend-skills.versatileskills.space/login", {
          email: email,
          password: password,
        }).then((response) => {
          // console.log(response);
          if (!response.data.auth) {
            // setloginStatus(false);
            // console.log(response.data);
            if (response.data.message === "L'utilisateur n'existe pas") {
              // if(response.data.error === "L'utilisateur n'existe pas"){
              setUserExist(true);
              // setprogress(false);
              setTimeout(() => {
                setUserExist(false);
              }, [5000]);
            } else if (response.data.message === "Mauvaise combinaison") {
              // }else if(response.data.error === "Mauvaise combinaison"){
              setpassword("");
              // setprogress(false);
              setWrongCombine(true);
              setTimeout(() => {
                setWrongCombine(false);
              }, [5000]);
            }
          } else {
            // console.log(response.data);
            // setprogress(false);
            setloginSuccess(true);
            setTimeout(() => {
              setloginSuccess(false);
            }, [2000]);
            // console.log(response.data);
            dispatch(
              setCredentials({
                userId: response.data.id,
                professionId: response.data.professionId,
                email: response.data.email,
                profileImg: response.data.profileImg,
                token: response.data.token,
                auth: response.data.auth,
                nom: response.data.nom,
              })
            );
            // [response.data.result[0].id, response.data.token, response.data.auth]
            // localStorage.setItem('token', response.data.token);
            // sessionStorage.setItem('token', response.data.token);
            // setloginStatus(true);
            // setShowToast(false)
            setemail("");
            setpassword("");
            window.location.href = "/accueil";
            // setTimeout(() => {
            // }, [2000]);
            // setloginStatus(response.data[0].email);
          }
        });
      }
    } else {
      setIfemailval(true);
      setTimeout(() => {
        setIfemailval(false);
      }, [4000]);
    }
  };

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("user") + "")) {
  //     navigate("/accueil");
  //   }
  // }, []);

  return (
    <>
      {loginSuccess && (
        <div
          id="toast-success"
          className="flex items-center  absolute top-5 left-1/2 -translate-x-1/2 w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ml-3 text-sm font-normal">Connexion réussie</div>
          <button
            onClick={() => setloginSuccess(!loginSuccess)}
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-success"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      )}
      {/* <section className="h-screen"> */}
      <section className="lg:h-screen">
        <div className="px-6 h-full text-gray-800">
          <h1 className="text-center">Connexion</h1>
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              {/* <form> */}
              {/* <!-- Email input --> */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-input w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border-1 border-pink-200 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-pink-400 focus:outline-none"
                  placeholder="Adresse mail"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                {ifemail ? (
                  <div className="empty_full">
                    Veuillez entrez votre adresse mail!
                  </div>
                ) : null}
                {ifemailval && (
                  <div className="empty_full">
                    Veuillez entrez un email au bon format!
                  </div>
                )}
              </div>

              {/* <!-- Password input --> */}
              <div className="">
                <input
                  type="password"
                  className="form-input w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border-1 border-pink-200 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-pink-400 focus:outline-none"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              {ifPassword ? (
                <div className="empty_full">
                  Veuillez entrez votre mot de passe!
                </div>
              ) : null}

              <div className="flex justify-between items-center mb-6">
                <Link to="/forgotpassword" className="text-gray-800">
                  Mot de passe oublié ?
                </Link>
              </div>

              <div className="text-center lg:text-left">
                <button
                  onClick={login}
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Connexion
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0 hover:underline">
                  Vous n'avez pas de compte?{" "}
                  <Link
                    to="/register"
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >
                    S'inscrire
                  </Link>
                </p>
              </div>
              {/* </form> */}
              {userExist ? (
                <div className="failed_full">Ce mail n'a pas été retrouvé</div>
              ) : null}
              {wrongCombine ? (
                <div className="failed_full">Mot de passe incorrect!</div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

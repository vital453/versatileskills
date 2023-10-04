/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import {
  FaGithub
} from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { setCredentials } from "../feature/AuthSlice";
import { toast, Toaster } from "react-hot-toast";

export const liste_vile = [
  {
    id: 0,
    nom: "Cotonou",
    departement: "Littoral",
    population: "678 874",
  },
  {
    id: 1,
    nom: "Abomey-Calavi",
    departement: "Atlantique",
    population: "655 965",
  },
  {
    id: 2,
    nom: "Porto-Novo",
    departement: "Ouémé",
    population: "263 616",
  },
  {
    id: 3,
    nom: "Parakou",
    departement: "Borgou",
    population: "254 254",
  },
  {
    id: 4,
    nom: "Djougou",
    departement: "Donga",
    population: "266 522",
  },
  {
    id: 5,
    nom: "Bohicon",
    departement: "Zou",
    population: "170 604",
  },
  {
    id: 6,
    nom: "Natitingou",
    departement: "Atacora",
    population: "104 010",
  },
  {
    id: 7,
    nom: "Savé",
    departement: "Collines",
    population: "87 379",
  },
  {
    id: 8,
    nom: "Abomey",
    departement: "Zou",
    population: "92 823",
  },
  {
    id: 9,
    nom: "Nikki",
    departement: "Borgou",
    population: "150 466",
  },
  {
    id: 10,
    nom: "Lokossa",
    departement: "Mono",
    population: "104 428",
  },
  {
    id: 11,
    nom: "Ouidah",
    departement: "Atlantique",
    population: "161 544",
  },
  {
    id: 12,
    nom: "Dogbo-Tota",
    departement: "Couffo",
    population: "101 870",
  },
  {
    id: 13,
    nom: "Kandi",
    population: "177 683",
    departement: "Alibori",
  },
  {
    id: 14,
    nom: "Cové",
    population: "50 235",
    departement: "Zou",
  },
  {
    id: 15,
    nom: "Malanville",
    population: "168 006",
    departement: "Alibori",
  },
  {
    id: 16,
    nom: "Pobé",
    population: "123 740",
    departement: "Plateau",
  },
  {
    id: 17,
    nom: "Kérou",
    population: "98 315",
    departement: "Atacora",
  },
  {
    id: 18,
    nom: "Savalou",
    population: "144 814",
    departement: "Collines",
  },
  {
    id: 19,
    nom: "Sakété",
    population: "114 207",
    departement: "Plateau",
  },
  {
    id: 20,
    nom: "Comè",
    population: "79 665",
    departement: "Mono",
  },
  {
    id: 21,
    nom: "Bembéréké",
    population: "125 465",
    departement: "Borgou",
  },
  {
    id: 22,
    nom: "Bassila",
    population: "130 770",
    departement: "Donga",
  },
  {
    id: 23,
    nom: "Banikoara",
    population: "248 621",
    departement: "Alibori",
  },
  {
    id: 24,
    nom: "Kétou",
    population: "156 497",
    departement: "Plateau",
  },
  {
    id: 25,
    nom: "Dassa-Zoumè",
    population: "112 118",
    departement: "Collines",
  },
  {
    id: 26,
    nom: "Tchaourou",
    population: "221 108",
    departement: "Borgou",
  },
  {
    id: 27,
    nom: "Allada",
    population: "127 493",
    departement: "Atlantique",
  },
  {
    id: 28,
    nom: "Aplahoué",
    population: "170 069",
    departement: "Couffo",
  },
  {
    id: 29,
    nom: "Tanguiéta",
    population: "73 731",
    departement: "Atacora",
  },
  {
    id: 30,
    nom: "N'Dali",
    population: "114 659",
    departement: "Borgou",
  },
  {
    id: 31,
    nom: "Segbana",
    population: "89 268",
    departement: "Alibori",
  },
  {
    id: 32,
    nom: "Athiémé",
    population: "56 247",
    departement: "Mono",
  },
  {
    id: 33,
    nom: "Grand Popo",
    population: "57 490",
    departement: "Mono",
  },
  {
    id: 34,
    nom: "Kouandé",
    population: "112 014",
    departement: "Atacora",
  },
];

const Register = () => {
  const [onRegist, setonRegist] = useState(false);
  const [email, setemail] = useState("");
  const [ifemail, setIfemail] = useState(false);
  const [ifemailval, setIfemailval] = useState(false);
  const [password, setpassword] = useState("");
  const [ifPassword, setIfPassword] = useState(false);
  const [password_confirm, setpassword_confirm] = useState("");
  const [ifPassword_confirm, setIfPassword_confirm] = useState(false);
  const [ifpasscomfrom, setIfpasscomfrom] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [profession, setprofession] = useState("");
  const [professionValid, setprofessionValid] = useState("");
  const [professioneMsg, setprofessionMsg] = useState("");
  const [ville, setville] = useState("");
  const [villeValid, setvilleValid] = useState("");
  const [villeMsg, setvilleMsg] = useState("");
  const [ifville, setIfville] = useState(false);
  const [professionId, setprofessionId] = useState(0);
  const [ifprofession, setIfprofession] = useState(false);
  const allprofession = useSelector((t) => t.profession.profession);

  const [suggestion, setsuggestion] = useState([]);
  const [villeSuggestion, setvilleSuggestion] = useState([]);
  const dispatch = useDispatch();
  //toast
  const [registerSuccess, setregisterSuccess] = useState(false);

  let navigate = useNavigate();

  const register = () => {
    if (!password) {
      setIfPassword(true);
      setTimeout(() => {
        setIfPassword(false);
      }, [4000]);
    } else {
      setIfPassword(false);
    }
    if (!password_confirm) {
      setIfPassword_confirm(true);
      setTimeout(() => {
        setIfPassword_confirm(false);
      }, [4000]);
    } else {
      setIfPassword_confirm(false);
    }
    if (!email) {
      setIfemail(true);
      setTimeout(() => {
        setIfemail(false);
      }, [4000]);
    } else {
      setIfemail(false);
    }
    if (!profession) {
      setIfprofession(true);
      setprofessionMsg('Veuillez choisir votre profession !')
      setTimeout(() => {
        setIfprofession(false);
      }, [4000]);
    } else {
      if (allprofession.find(t => t.nom.toLocaleLowerCase() === profession.toLocaleLowerCase())) {
        setprofessionValid(allprofession.find(t => t.nom.toLocaleLowerCase() === profession.toLocaleLowerCase()).nom);
        setprofessionId(allprofession.find(t => t.nom.toLocaleLowerCase() === profession.toLocaleLowerCase()).id);
        // console.log(allprofession.find(t => t.nom.toLocaleLowerCase() === profession.toLocaleLowerCase()).nom);
      } else {
        setprofessionValid("");
        setprofessionId(0);
        setIfprofession(true);
        setprofessionMsg('Veuillez choisir une profession du catalogue ou soumettre une profession !')
        setTimeout(() => {
          setIfprofession(false);
        }, [4000]);
      }
      // setIfprofession(false);
    }

    if (!ville) {
      setIfville(true);
      setvilleMsg('Veuillez choisir votre ville !');
      setTimeout(() => {
        setIfville(false);
      }, [4000]);
    } else {
      if (liste_vile.find(t => t.nom.toLocaleLowerCase() === ville.toLocaleLowerCase())) {
        setvilleValid(liste_vile.find(t => t.nom.toLocaleLowerCase() === ville.toLocaleLowerCase()).nom);
        // console.log(liste_vile.find(t => t.nom.toLocaleLowerCase() === ville.toLocaleLowerCase()).nom);
      } else {
        setvilleValid("");
        setIfville(true);
        setvilleMsg('Veuillez choisir une ville du catalogue !');
        setTimeout(() => {
          setIfville(false);
        }, [4000]);
      }
      // setIfville(false);
    }
    // if (codeparrain.length < 6) {
    //   setIfsupcode(true);
    //   setTimeout(() => {
    //     setIfsupcode(false);
    //   }, [4000]);
    // } else {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setIfemailval(false);
      if (password && password_confirm && email && professionValid && villeValid) {
        if (password === password_confirm) {
          // setShowLoading(true);
          setonRegist(true);
          Axios.post(
            "https://backend-skills.versatileskills.space/register",
            {
              password: password,
              email: email,
              profession: professionValid,
              professionId: professionId,
              ville: villeValid,
            }
          ).then((res) => {
            if (res.data.regist === false) {
              if (res.data.message === "Ce utilisateur existe déjà !") {
                // if(response.data.error === "L'utilisateur n'existe pas"){
                // setShowLoading(false);
                setUserExist(true);
                setTimeout(() => {
                  setUserExist(false);
                }, [5000]);
              }
              setonRegist(false);
              // if (res.data.message === "Ce code de parrainage existe déjà !") {
              //   // if(response.data.error === "L'utilisateur n'existe pas"){
              //   // setShowLoading(false);
              //   setIfcodeExist(true);
              //   setTimeout(() => {
              //     setIfcodeExist(false);
              //   }, [5000]);
              // }
            } else {
              setpassword("");
              setpassword_confirm("");
              setprofession("");
              setprofessionId(0);
              setregisterSuccess(true);
              setTimeout(() => {
                setregisterSuccess(false);
              }, [4000]);
              Axios.post(
                "https://backend-skills.versatileskills.space/login",
                {
                  email: email,
                  password: password,
                }
              ).then((response) => {
                // console.log(response);
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
                window.location.href = "/accueil";
              });
              setonRegist(false);
            }
          });
        } else {
          setIfpasscomfrom(true);
          setTimeout(() => {
            setIfpasscomfrom(false);
          }, [4000]);
        }
      }
    } else {
      setIfemailval(true);
      setTimeout(() => {
        setIfemailval(false);
      }, [4000]);
    }
    // }
  };

  const suggest = (e) => {
    setprofession(e);
    if (e.length > 0) {
      setsuggestion(allprofession.filter(t => t.nom.toLowerCase().includes(e)));
    } else {
      setsuggestion([]);
    }
  };

  const villeSuggest = (e) => {
    setville(e);
    if (e.length > 0) {
      setvilleSuggestion(liste_vile.filter(t => t.nom.toLowerCase().includes(e.toLowerCase())));
      // console.log(liste_vile.filter(t => t.nom.toLowerCase().includes(e.toLowerCase())));
    } else {
      setvilleSuggestion([]);
    }
  };

  const suggestSelect = (e) => {
    setprofession(e);
    setprofessionId(
      allprofession.find((t) => t.nom === e).id
    );
    setsuggestion([]);
  };

  const villeSuggestSelect = (e) => {
    setville(e);
    setvilleSuggestion([]);
  };
  // soumettre une nouvelle profession
  const newProfession = () => {
    // console.log(profession);
    if (allprofession.find(t => t.nom.toLocaleLowerCase() === profession.toLocaleLowerCase())) {
      toast.error("Cette profession fait déjà partie de la liste de profession !")
    } else {
      // Axios.post("https://backend-skills.versatileskills.space/newProfession", {profession}).then((res) =>{
        
        toast.success("Ajout réussie!");
    //  })
    }
  }
  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("user") + "")) {
  //     navigate("/accueil");
  //   }
  // }, []);

  return (
    <>
      {registerSuccess && (
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
          <div className="ml-3 text-sm font-normal">Inscription réussie !</div>
          <button
            onClick={() => setregisterSuccess(false)}
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
      <section className="lg:h-screen" onClick={() => { setvilleSuggestion([]); setsuggestion([]) }}>
        <Toaster
          // position="top-center"
          // reverseOrder={false}
        />
        <div className="px-6 h-full text-gray-800">
          <h1 className="text-center">Inscription</h1>
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              {/* <!-- Email input --> */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-input w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border-1 border-pink-200 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-pink-400 focus:outline-none"
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
              <div className="mb-3">
                <input
                  type="password"
                  className="form-input w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border-1 border-pink-200 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-pink-400 focus:outline-none"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
                {ifPassword ? (
                  <div className="empty_full">
                    Veuillez entrez votre mot de passe!
                  </div>
                ) : null}
              </div>
              {/* <!-- Password confirm input --> */}
              <div className="mb-3">
                <input
                  type="password"
                  className="form-input w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border-1 border-pink-200 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-pink-400 focus:outline-none"
                  placeholder="Confirmez votre mot de passe"
                  value={password_confirm}
                  onChange={(e) => setpassword_confirm(e.target.value)}
                />
                {ifPassword_confirm && (
                  <div className="empty_full">
                    Veuillez entrez votre mot de passe de comfirmation
                  </div>
                )}
                {ifpasscomfrom && (
                  <div className="empty_full">
                    Les mots de passe ne correspondent pas !
                  </div>
                )}
              </div>
              {/* profession */}
              <div className="mb-3 flex items-center">
                <input
                  className="form-input w-full mb-2 px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border-1 border-pink-200 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-pink-400 focus:outline-none"
                  type="text"
                  list="datalistOptions"
                  id="exampleDataList"
                  placeholder="Ex: Menusier"
                  value={profession}
                  onChange={(e) => {
                    suggest(e.target.value);
                  }}
                />
                <span className="cursor-pointer" onClick={newProfession}>
                  <IoIosAddCircleOutline className="w-11 h-11 text-pink-400" />
                </span>
                {/* <button className="p-2 bg-blue-600 text-white font-medium text-sm leading-snug rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                  Soumission de profession
                </button> */}
                {/* <select
                  name="profession"
                  id="profession"
                  onChange={(e) => {
                    setprofession(e.target.value);
                    setprofessionId(
                      allprofession.find((t) => t.nom === e.target.value).id
                    );
                  }}
                  className="form-select"
                >
                  <option value="">Votre profession</option>
                  {allprofession[0] &&
                    allprofession.map((val) => {
                      return (
                        <option value={val.nom} key={val.id}>
                          {val.nom}
                        </option>
                      );
                    })}
                </select> */}
                {suggestion[0] &&
                  <div className="absolute z-10 bg-slate-100 text-black text-base flex flex-col justify-start w-52 md:w-80 shadow rounded-sm border-1 border-slate-100 px-2 max-h-64 overflow-y-scroll">
                    {suggestion.map((val) => {
                      return (
                        <span key={val.id} className='cursor-pointer hover:bg-slate-300 block text-start' onClick={() => { suggestSelect(val.nom) }}>{val.nom}</span>
                      )
                    })}
                  </div>
                }
                {ifprofession && (
                  <div className="empty_full">
                    {professioneMsg}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input type="text"
                  className="form-input w-full px-4 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border-1 border-pink-200 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-pink-400 focus:outline-none"
                  placeholder="Ex: Parakou"
                  value={ville}
                  onChange={(e) => {
                    villeSuggest(e.target.value);
                  }}
                />
                {villeSuggestion[0] &&
                  <div className="absolute z-10 bg-slate-100 text-black text-base w-52 md:w-80 shadow rounded-sm border-1 border-slate-100 px-2 max-h-64 overflow-y-scroll">
                    {villeSuggestion.map((val) => {
                      return (
                        <span key={val.id} className='cursor-pointer hover:bg-slate-300 block text-start' onClick={() => { villeSuggestSelect(val.nom) }}>{val.nom}</span>
                      )
                    })}
                  </div>
                }
                {/* <select
                  name="ville"
                  id="ville"
                  onChange={(e) => {
                    setville(e.target.value);
                  }}
                  className="form-select"
                >
                  <option value="">Votre ville</option>
                  {liste_vile[0] &&
                    liste_vile.map((val) => {
                      return (
                        <option value={val.nom} key={val.id}>
                          {val.nom}
                        </option>
                      );
                    })}
                </select> */}
                {ifville && (
                  <div className="empty_full">
                    {villeMsg}
                  </div>
                )}
              </div>
              <div className="text-center lg:text-left">
                {onRegist ? (
                  <button
                    disabled
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Enregistrer
                  </button>
                ) : (
                  <button
                    onClick={register}
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Enregistrer
                  </button>
                )}

                <p className="text-sm font-semibold mt-2 pt-1 mb-0 hover:underline">
                  Vous avez déjà un compte?{" "}
                  <Link
                    to="/login"
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >
                    Se connecter
                  </Link>
                </p>
              </div>
              {userExist && (
                <div className="userExistAlreadyy">
                  Ce nom email existe déjà !
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="object-cover w-full h-full dark:hidden"
                src="images/create-account-office.jpeg"
                alt="Office"
              />
              <img
                aria-hidden="true"
                className="hidden object-cover w-full h-full dark:block"
                src="images/create-account-office-dark.jpeg"
                alt="Office"
              />
            </div>
            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full flex flex-col">
                <div className="w-full items-center justify-center text-center">
                  <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Create account
                  </h1>
                </div>

                <label className=" text-sm">
                  <span className="text-gray-700 dark:text-gray-400">Email</span>
                  <input
                    className=" w-full mt-1 text-sm border-2 border-color rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                    placeholder="Jane Doe"
                  />
                </label>
                <label className=" mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">Password</span>
                  <input
                    className=" w-full mt-1 text-sm border-2 border-color rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                    placeholder="***************"
                    type="password"
                  />
                </label>
                <label className=" mt-4 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                   
                    Confirm password
                  </span>
                  <input
                    className=" w-full mt-1 text-sm border-2 border-color rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                    placeholder="***************"
                    type="password"
                  />
                </label>
                <div className="flex mt-6 text-sm">
                  <label className="flex items-center dark:text-gray-400">
                    <input
                      type="checkbox"
                      className="text-purple-600 form-checkbox cursor-pointer focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                    />
                    <span className="ml-2">
                      I agree to the &nbsp;
                      <span className="underline">privacy policy</span>
                    </span>
                  </label>
                </div>

                
                <Link
                  className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  to={"/"}
                >
                  Create account
                </Link>

                <hr className="my-8" />

                <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                  <FaInstagram /> &nbsp;  &nbsp;
                  Instagram
                </button>
                <button className="flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                  <FaTwitter /> &nbsp;  &nbsp;
                  Twitter
                </button>

                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-deep_sky_blue dark:text-purple-400 hover:underline"
                    to={"/login"}
                  >
                    Already have an account? Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Register;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import About from "../components/About";
import Card from "../components/Card";
import Card1 from "../components/Card1";
import Card2 from "../components/Card2";
import Card3 from "../components/Card3";
import Footer from "../components/Footer";
import Footer3 from "../components/Footer3";
import HappyClient from "../components/HappyClient";
import Navbar_model2 from "../components/Navbar_model2";
import NumberResult from "../components/NumberResult";
import Portfolio from "../components/Portfolio";
import Portfolio2 from "../components/Portfolio2";
// import Test from "../components/Test";
import ReactPaginate from "react-paginate";
import { useStateContext } from "../contexts/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { recuppic, setPictureData } from "../feature/profileUser.slice";
import Card4 from "../components/Card4";
import Axios from "axios";
import Card5 from "../components/Card5";
import { GoSearch } from "react-icons/go";
import { useParams } from "react-router";
import { liste_vile } from "./Register";

// import { Link } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState(
    useSelector((state) => state.profileUser.profiles)
  );
  const [pageNumber, setPageNumber] = useState(0);
  const userperpage = 12;
  const pagesvisited = pageNumber * userperpage;
  const [tab, setTab] = useState(JSON.parse(localStorage.getItem("pic")));

  const dispatch = useDispatch();

  let { ville, parameter } = useParams();

  const [notesearch, setnotesearch] = useState("");
  const [profession, setprofession] = useState("");
  const [villes, setvilles] = useState("");

  const datarec = useSelector((state) => state.profileUser.profiles);
  const allprofession = useSelector((t) => t.profession.profession);

  const [profilefiltre, setprofilefiltre] = useState([]);

  //variable suggestion profession
  const [suggestion, setsuggestion] = useState([]);
  const [profession_input, setprofession_input] = useState("");

  //variable suggestion ville
  const [villeSuggestion, setvilleSuggestion] = useState([]);
  const [ville_input, setville_input] = useState([]);

  const [width, setWindowWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    // const width = window.innerWidth;
    setWindowWidth(window.innerWidth);
  };
  const displayUser = profilefiltre
    .slice(pagesvisited, pagesvisited + userperpage)
    .map((resusearch, index) => {
      return <Card5 data={resusearch} key={index} />;
    });
  const pageCount = Math.ceil(search.length / userperpage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const recherche1 = () => {
    if (parameter === "parameter" && ville === "ville") {
      setprofilefiltre(datarec);
    } else if (parameter !== "parameter" && ville === "ville") {
      setprofilefiltre(
        datarec.filter(
          (t) =>
            t.username.toLowerCase().includes(parameter) ||
            t.profession.toLowerCase().includes(parameter) ||
            t.ville.toLowerCase().includes(parameter)
        )
      );
    } else if (parameter === "parameter" && ville !== "ville") {
      setprofilefiltre(datarec.filter((t) => t.ville === ville));
    } else if (parameter !== "parameter" && ville !== "ville") {
      setprofilefiltre(
        datarec.filter(
          (t) =>
            (t.ville === ville &&
              t.username.toLowerCase().includes(parameter)) ||
            (t.ville === ville &&
              t.profession.toLowerCase().includes(parameter))
        )
      );
    }
  };
  const recherche2 = (val, ident) => {
    // setprofilefiltre(datarec.filter((t)=>(t.ville === villes ) || (t.profession.toLowerCase().includes(profession))|| (t.nom.toLowerCase().includes(notesearch))))

    if (ident === "profession") {
      setprofession(val);
      if (notesearch === "" && villes === "" && val === "") {
        setprofilefiltre(datarec);
      } else if (notesearch !== "" && villes !== "" && val !== "") {
        setprofilefiltre(
          datarec.filter(
            (t) =>
              t.nom.toLowerCase().includes(notesearch) &&
              t.profession.toLowerCase().includes(val) &&
              t.ville === villes
          )
        );
      } else if (notesearch === "" && villes !== "" && val !== "") {
        setprofilefiltre(
          datarec.filter(
            (t) =>
              t.profession.toLowerCase().includes(val) && t.ville === villes
          )
        );
      } else if (notesearch !== "" && villes !== "" && val === "") {
        setprofilefiltre(
          datarec.filter(
            (t) => t.ville === ville && t.nom.toLowerCase().includes(notesearch)
          )
        );
      } else if (notesearch !== "" && villes === "" && val !== "") {
        setprofilefiltre(
          datarec.filter(
            (t) =>
              t.profession.toLowerCase().includes(val) &&
              t.nom.toLowerCase().includes(notesearch)
          )
        );
      } else if (notesearch !== "" && villes === "" && val === "") {
        setprofilefiltre(
          datarec.filter((t) => t.nom.toLowerCase().includes(notesearch))
        );
      }
    } else if (ident === "villes") {
      setvilles(val);
      if (notesearch === "" && val === "" && profession === "") {
        setprofilefiltre(datarec);
      } else if (notesearch !== "" && val !== "" && profession !== "") {
        setprofilefiltre(
          datarec.filter(
            (t) =>
              t.nom.toLowerCase().includes(notesearch) &&
              t.profession.toLowerCase().includes(profession) &&
              t.ville === val
          )
        );
      } else if (notesearch === "" && val !== "" && profession !== "") {
        setprofilefiltre(
          datarec.filter(
            (t) =>
              t.profession.toLowerCase().includes(profession) && t.ville === val
          )
        );
      } else if (notesearch !== "" && val !== "" && profession === "") {
        setprofilefiltre(
          datarec.filter(
            (t) => t.ville === val && t.nom.toLowerCase().includes(notesearch)
          )
        );
      } else if (notesearch !== "" && val === "" && profession !== "") {
        setprofilefiltre(
          datarec.filter(
            (t) =>
              t.profession.toLowerCase().includes(profession) &&
              t.nom.toLowerCase().includes(notesearch)
          )
        );
      } else if (notesearch !== "" && val === "" && profession === "") {
        setprofilefiltre(
          datarec.filter((t) => t.nom.toLowerCase().includes(notesearch))
        );
      }
    } else if (ident === "note") {
      setnotesearch(val);
      if (val === "" && villes === "" && profession === "") {
        setprofilefiltre(datarec);
      } else if (val !== "" && villes !== "" && profession !== "") {
        setprofilefiltre(
          datarec.filter(
            (t) =>
              t.nom.toLowerCase().includes(val) &&
              t.profession.toLowerCase().includes(profession) &&
              t.ville === villes
          )
        );
      } else if (val === "" && villes !== "" && profession !== "") {
        setprofilefiltre(
          datarec.filter(
            (t) =>
              t.profession.toLowerCase().includes(profession) &&
              t.ville === villes
          )
        );
      } else if (val !== "" && villes !== "" && profession === "") {
        setprofilefiltre(
          datarec.filter(
            (t) => t.ville === ville && t.nom.toLowerCase().includes(val)
          )
        );
      } else if (val !== "" && villes === "" && profession !== "") {
        setprofilefiltre(
          datarec.filter(
            (t) =>
              t.profession.toLowerCase().includes(profession) &&
              t.nom.toLowerCase().includes(val)
          )
        );
      } else if (val !== "" && villes === "" && profession === "") {
        setprofilefiltre(
          datarec.filter((t) => t.nom.toLowerCase().includes(val))
        );
      }
    }
  };

  //fonction de suggestion profession
  const suggest_profession = (e) => {
    setprofession_input(e);
    if (e.length > 0) {
      setsuggestion(
        allprofession.filter((t) => t.nom.toLowerCase().includes(e.toLowerCase()))
      );
    } else {
      setsuggestion([]);
    }
  };

  //fonction de suggestion ville
  const villeSuggest = (e) => {
    setville_input(e);
    if (e.length > 0) {
      setvilleSuggestion(
        liste_vile.filter((t) => t.nom.toLowerCase().includes(e.toLowerCase()))
      );
      // console.log(liste_vile.filter(t => t.nom.toLowerCase().includes(e.toLowerCase())));
    } else {
      setvilleSuggestion([]);
    }
  };

  //fonction de sélection d'une des profession suggérer et appel de la fonction de recherche du profil
  const suggestSelect = (e) => {
    setprofession_input(e);
    recherche2(e, "profession");
    setsuggestion([]);
  };

  //fonction de sélection d'une des villes suggérer et appel de la fonction de recherche du profil
  const villeSuggestSelect = (e) => {
    setville_input(e);
    setvilleSuggestion([]);
    recherche2(e, "villes");
  };

  window.addEventListener("resize", updateDimensions);

  useEffect(() => {
    recherche1();
  }, [datarec]);

  if (width < 500) {
    return (
      <div className="w-full bg-background1">
        <Navbar_model2 />

        <div className="w-full bg-background1">
          <div className="w-full bg-background1 flex flex-wrap justify-center lg:justify-between items-center">
            <div className="flex flex-wrap mt-4 mb-4 p-2 gap-3 items-center justify-center">
              {/* ************************************************ selection profession **************************************************** */}
              <div className="flex flex-col items-center gap-2 justify-center ">
                <div className="text-base text-gray-400">
                  <span> Profession : </span>
                </div>
                <div className="">
                  <div className="w-80 block">
                    <input
                      className="border-2 border-color rounded-lg pl-2 text-base h-10 w-80 text-black"
                      type="text"
                      list="datalistOptions"
                      id="exampleDataList"
                      placeholder="Ex: Menusier"
                      value={profession_input}
                      onChange={(e) => {
                        suggest_profession(e.target.value);
                      }}
                    />
                    {suggestion[0] && (
                      <div className="absolute z-10 bg-slate-100 text-black text-base flex flex-col justify-start w-80 shadow rounded-sm border-1 border-slate-100 px-2 max-h-64 overflow-y-scroll">
                        {suggestion.map((val) => {
                          return (
                            <span
                              key={val.id}
                              className="cursor-pointer hover:bg-slate-300 block text-start"
                              onClick={() => {
                                suggestSelect(val.nom);
                              }}
                            >
                              {val.nom}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  {/* <select
                    name="profession"
                    id="profession"
                    onChange={(e) => {
                      recherche2(e.target.value, "profession");
                    }}
                    className="text-sm h-10 bg-white rounded-lg w-52 pl-3 drop-shadow-lg"
                  // defaultValue={profession}
                  // value={}
                  >
                    <option value="" className="text-sm">
                      Votre profession
                    </option>
                    {allprofession[0] &&
                      allprofession.map((val) => {
                        return (
                          <option value={val.nom} key={val.id}>
                            {val.nom}
                          </option>
                        );
                      })}
                  </select> */}
                </div>
              </div>
              {/* ******************************************************************** selection ville ****************************************** */}
              <div className="flex flex-col items-center gap-2 justify-center">
                <div className="text-base text-gray-400">
                  <span> Ville : </span>
                </div>
                <div className="w-40 block">
                  <input
                    type="text"
                    className="border-2 border-color rounded-lg text-base h-10 w-full pl-2 text-black"
                    placeholder="Ex: Parakou"
                    value={ville_input}
                    onChange={(e) => {
                      villeSuggest(e.target.value);
                    }}
                  />
                  {villeSuggestion[0] && (
                    <div className="absolute z-10 bg-slate-100 text-black text-base w-40 shadow rounded-sm border-1 border-slate-100 px-2 max-h-64 overflow-y-scroll">
                      {villeSuggestion.map((val) => {
                        return (
                          <span
                            key={val.id}
                            className="cursor-pointer hover:bg-slate-300 block text-start"
                            onClick={() => {
                              villeSuggestSelect(val.nom);
                            }}
                          >
                            {val.nom}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
                {/* <div className="">
                  <select
                    name="ville"
                    id="ville"
                    onChange={(e) => {
                      recherche2(e.target.value, "villes");
                    }}
                    className="text-sm h-10 bg-white rounded-lg w-52 pl-3 drop-shadow-lg"
                  // defaultValue={profession}
                  // value={}
                  >
                    <option value="" className="text-sm">
                      Votre ville
                    </option>
                    {liste_vile[0] &&
                      liste_vile.map((val) => {
                        return (
                          <option value={val.nom} key={val.id}>
                            {val.nom}
                          </option>
                        );
                      })}
                  </select>
                </div> */}
              </div>
            </div>
            <div className="mx-4 drop-shadow-lg relative">
              <input
                type="search"
                className="h-10 rounded-lg bg-white text-black text-base pl-10 w-80"
                placeholder="Rechercher par nom "
                onChange={(e) => {
                  recherche2(e.target.value, "note");
                }}
              />
              <div className="absolute left-2 top-3">
                <GoSearch className="text-gray-400 text-base" />
              </div>
            </div>
          </div>
          <div className="container-fluid mt-3 mb-4 flex flex-wrap justify-center items-center gap-5">
            {profilefiltre[0] ? (
              displayUser
            ) : (
              <>
                {" "}
                <div className="flex flex-col justify-center items-center">
                  <img src="/error-page.png" alt="" className="w-40 h-40" />{" "}
                  <div>
                    <span>Aucun résultat</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {/* <NumberResult /> */}
        {/* <Test /> */}

        {/* <div className="container-fluid mt-3 mb-3 flex flex-wrap justify-center items-center">
          {displayUser}
        </div> */}
        {/* <div className="container-fluid mt-3 flex flex-wrap items-center">
        <Card4 />
         </div> */}
        {/* customization page style  */}
        {/* <ReactPaginate 
        previousLabel={"< previous"}
        nextLabel={"next >"}
        pageCount={pageCount}
        breakLabel={"..."}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        /> */}
        {/* bootstrap pagination style  */}
        {/* <ReactPaginate 
        previousLabel={"< previous"}
        nextLabel={"next >"}
        pageCount={pageCount}
        breakLabel={"..."}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={changePage}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item m-1"}
        pageLinkClassName={"page-link m-1"}
        previousClassName={"page-item m-1"}
        previousLinkClassName={"page-link m-1"}
        nextClassName={"page-item m-1"}
        nextLinkClassName={"page-link m-1"}
        breakClassName={"page-item m-1"}
        breakLinkClassName={"page-link m-1"}
        activeClassName={"active"}
        renderOnZeroPageCount={null}
        /> */}
        {/* <Portfolio2 />
        <About />
        <HappyClient /> */}
        <div className="">

        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="w-full h-[100vh] bg-background1">
        <Navbar_model2 />

        <div className="w-full bg-background1">
          <div className="w-full bg-background1 flex flex-wrap justify-center lg:justify-between items-center">
            <div className="flex flex-wrap mt-4 mb-4 p-2 gap-3">
              {/* ************************************************ selection profession **************************************************** */}
              <div className="flex items-center gap-2 justify-center ">
                <div className="text-base text-gray-400">
                  <span> Profession : </span>
                </div>
                <div className="">
                  <div className="w-80 block">
                    <input
                      className="border-2 border-color rounded-lg pl-2 text-base h-10 w-80 text-black"
                      type="text"
                      list="datalistOptions"
                      id="exampleDataList"
                      placeholder="Ex: Menusier"
                      value={profession_input}
                      onChange={(e) => {
                        suggest_profession(e.target.value);
                      }}
                    />
                    {suggestion[0] && (
                      <div className="absolute z-10 bg-slate-100 text-black text-base flex flex-col justify-start w-80 shadow rounded-sm border-1 border-slate-100 px-2 max-h-64 overflow-y-scroll">
                        {suggestion.map((val) => {
                          return (
                            <span
                              key={val.id}
                              className="cursor-pointer hover:bg-slate-300 block text-start"
                              onClick={() => {
                                suggestSelect(val.nom);
                              }}
                            >
                              {val.nom}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  {/* <select
                    name="profession"
                    id="profession"
                    onChange={(e) => {
                      recherche2(e.target.value, "profession");
                    }}
                    className="text-sm h-10 bg-white rounded-lg w-52 pl-3 drop-shadow-lg"
                  // defaultValue={profession}
                  // value={}
                  >
                    <option value="" className="text-sm">
                      Votre profession
                    </option>
                    {allprofession[0] &&
                      allprofession.map((val) => {
                        return (
                          <option value={val.nom} key={val.id}>
                            {val.nom}
                          </option>
                        );
                      })}
                  </select> */}
                </div>
              </div>
              {/* ******************************************************************** selection ville ****************************************** */}
              <div className="flex items-center gap-2 justify-center">
                <div className="text-base text-gray-400">
                  <span> Ville : </span>
                </div>
                <div className="w-40 block">
                  <input
                    type="text"
                    className="border-2 border-color rounded-lg text-base h-10 w-full pl-2 text-black"
                    placeholder="Ex: Parakou"
                    value={ville_input}
                    onChange={(e) => {
                      villeSuggest(e.target.value);
                    }}
                  />
                  {villeSuggestion[0] && (
                    <div className="absolute z-10 bg-slate-100 text-black text-base w-40 shadow rounded-sm border-1 border-slate-100 px-2 max-h-64 overflow-y-scroll">
                      {villeSuggestion.map((val) => {
                        return (
                          <span
                            key={val.id}
                            className="cursor-pointer hover:bg-slate-300 block text-start"
                            onClick={() => {
                              villeSuggestSelect(val.nom);
                            }}
                          >
                            {val.nom}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
                {/* <div className="">
                  <select
                    name="ville"
                    id="ville"
                    onChange={(e) => {
                      recherche2(e.target.value, "villes");
                    }}
                    className="text-sm h-10 bg-white rounded-lg w-52 pl-3 drop-shadow-lg"
                  // defaultValue={profession}
                  // value={}
                  >
                    <option value="" className="text-sm">
                      Votre ville
                    </option>
                    {liste_vile[0] &&
                      liste_vile.map((val) => {
                        return (
                          <option value={val.nom} key={val.id}>
                            {val.nom}
                          </option>
                        );
                      })}
                  </select>
                </div> */}
              </div>
            </div>
            <div className="mx-4 drop-shadow-lg relative">
              <input
                type="search"
                className="h-10 rounded-lg bg-white text-black text-base pl-10 w-80"
                placeholder="Rechercher par nom "
                onChange={(e) => {
                  recherche2(e.target.value, "note");
                }}
              />
              <div className="absolute left-2 top-3">
                <GoSearch className="text-gray-400 text-base" />
              </div>
            </div>
          </div>
          <div className="container-fluid mt-3 mb-4 flex flex-wrap justify-center items-center gap-5">
            {profilefiltre[0] ? (
              displayUser
            ) : (
              <>
                {" "}
                <div className="flex flex-col justify-center items-center">
                  <img src="/error-page.png" alt="" className="w-40 h-40" />{" "}
                  <div>
                    <span>Aucun résultat</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {/* <NumberResult /> */}
        {/* <Test /> */}

        {/* <div className="container-fluid mt-3 mb-3 flex flex-wrap justify-center items-center">
          {displayUser}
        </div> */}
        {/* <div className="container-fluid mt-3 flex flex-wrap items-center">
        <Card4 />
         </div> */}
        {/* customization page style  */}
        {/* <ReactPaginate 
        previousLabel={"< previous"}
        nextLabel={"next >"}
        pageCount={pageCount}
        breakLabel={"..."}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        /> */}
        {/* bootstrap pagination style  */}
        {/* <ReactPaginate 
        previousLabel={"< previous"}
        nextLabel={"next >"}
        pageCount={pageCount}
        breakLabel={"..."}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={changePage}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item m-1"}
        pageLinkClassName={"page-link m-1"}
        previousClassName={"page-item m-1"}
        previousLinkClassName={"page-link m-1"}
        nextClassName={"page-item m-1"}
        nextLinkClassName={"page-link m-1"}
        breakClassName={"page-item m-1"}
        breakLinkClassName={"page-link m-1"}
        activeClassName={"active"}
        renderOnZeroPageCount={null}
        /> */}
        {/* <Portfolio2 />
        <About />
        <HappyClient /> */}
        <Footer />
      </div>
    );
  }
};

export default Search;

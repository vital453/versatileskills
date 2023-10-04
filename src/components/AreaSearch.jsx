/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../feature/AuthSlice";
import { liste_vile } from "../page/Register";
import { isEmpty } from "./Utils";

const AreaSearch = () => {
  const dispatch = useDispatch();
  let nav = useNavigate();
  const user = useSelector((t) => t.auth.user);
  const [ville, setville] = useState("");
  const [notesearch, setnotesearch] = useState("");
  const [ifville, setIfville] = useState(false);

  const allprofession = useSelector((t) => t.profession.profession);
  const [suggestion, setsuggestion] = useState([]);
  const [villeSuggestion, setvilleSuggestion] = useState([]);

  const logout = () => {
    window.location.href = "/accueil";
    dispatch(logOut([]));
  };

  const recherche = () => {
    if (notesearch === "" && ville === "") {
      nav(`/search/ville/parameter`);
    } else if (notesearch !== "" && ville === "") {
      nav(`/search/ville/${notesearch}`);
    } else if (notesearch === "" && ville !== "") {
      nav(`/search/${ville}/parameter`);
    } else if (notesearch !== "" && ville !== "") {
      nav(`/search/${ville}/${notesearch}`);
    }
  };

  const suggest = (e) => {
    setnotesearch(e);
    if (e.length > 0) {
      setsuggestion(allprofession.filter(t => t.nom.toLowerCase().includes(e.toLowerCase())));
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
    setnotesearch(e);
    setsuggestion([]);
  };

  const villeSuggestSelect = (e) => {
    setville(e);
    setvilleSuggestion([]);
  };
  return (
    <>
      <div className="accueil2" onClick={() => {setvilleSuggestion([]); setsuggestion([])}}>
        <div className="text-center mb-3 text-black font-semibold text-3xl">
          <span>Trouver un prestataire</span>
        </div>
        <div className="flex items-center justify-center space-x-1 flex-wrap text-center container recher">
          <div className="w-80 block">
            <input
              className="border-2 border-color rounded-lg pl-2 text-xl h-10 w-80 text-black"
              type="text"
              list="datalistOptions"
              id="exampleDataList"
              placeholder="Ex: Menusier"
              value={notesearch}
              onChange={(e) => {
                suggest(e.target.value);
              }}
            />
            {suggestion[0] &&
              <div className="absolute z-10 bg-slate-100 text-black text-base flex flex-col justify-start w-80 shadow rounded-sm border-1 border-slate-100 px-2 max-h-64 overflow-y-scroll">
                {suggestion.map((val) => {
                  return (
                    <span key={val.id} className='cursor-pointer hover:bg-slate-300 block text-start' onClick={() => { suggestSelect(val.nom) }}>{val.nom}</span>
                  )
                })}
              </div>
            }
          </div>
          <div className="w-40 block">
            <input type="text"
              className="border-2 border-color rounded-lg text-xl h-10 w-full text-black"
              placeholder="Ex: Parakou"
              value={ville}
              onChange={(e) => {
                villeSuggest(e.target.value);
              }}
            />
            {villeSuggestion[0] &&
              <div className="absolute z-10 bg-slate-100 text-black text-base w-40 shadow rounded-sm border-1 border-slate-100 px-2 max-h-64 overflow-y-scroll">
                {villeSuggestion.map((val) => {
                  return (
                    <span key={val.id} className='cursor-pointer hover:bg-slate-300 block text-start' onClick={() => {villeSuggestSelect(val.nom)}}>{val.nom}</span>
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
            {/* {ifville && (
                  <div className="empty_full">
                    Veuillez choisir votre ville !
                  </div>)} */}
          </div>
        </div>

        <div className="text-center mt-3">
          {/* <Link to={"/search"}> */}
          <button type="button" className="btn btn-light" onClick={() => { recherche() }}>
            Lancer la recherche
          </button>
          {/* </Link> */}
          {/* <button type="button" className="btn btn-light" >Lancer la recherche</button> */}
        </div>
        {/* {!isEmpty(user) && (
          <>
            <button
              onClick={logout}
              className="bg-amber-300 px-4 py-2 rounded-sm mr-2"
            >
              LogOut
            </button>
            <button
              onClick={() => nav(`/profile/${user.userId}/${user.professionId}`)}
              className="bg-amber-300 px-4 py-2 rounded-sm"
            >
              Mon Profile
            </button>
          </>
        )} */}
      </div>
    </>
  );
};

export default AreaSearch;

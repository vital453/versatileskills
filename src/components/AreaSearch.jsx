/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const AreaSearch = () => {

    return ( 
        <>
         <div className="accueil2">
        <div className="text-center items-center mb-5 text-black font-semibold text-3xl">
          <span>Trouver un prestataire</span>
        </div>
        <div className="flex items-center text-center container recher">
          <div className="w-50">
            <input
              className="border-2 border-color rounded-lg pl-2 text-xl h-10 w-80 text-black"
              list="datalistOptions"
              id="exampleDataList"
              placeholder="Ex: Menusier"
            />
          </div>
          <div className="ml-7 mt-2">
            <select className="form-select" aria-label="Default select example">
              <option selected>Choisissez une ville </option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div className="items-center text-center mt-3">
          <Link to={"/search"}>
          <button type="button" className="btn btn-light">Lancer la recherche</button>
          </Link>
        {/* <button type="button" className="btn btn-light" >Lancer la recherche</button> */}
        </div>
      </div>
        </>
     );
}
 
export default AreaSearch;
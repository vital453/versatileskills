/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect } from "react";
import { useState } from "react";
import { DiVisualstudio } from "react-icons/di";
import { Link } from "react-router-dom";

const Navbar_model2 = () => {
  const [width, setWindowWidth] = useState(window.innerWidth);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };
  window.addEventListener("resize", updateDimensions);

  useEffect(() => {}, []);

  // if (width < 721) {
  //   return (
  //     <>
  //       <nav className="navbar navbar-expand-lg bg-light">
  //         <div className="container-fluid">
  //           <a className="navbar-brand" href="#">
  //             Navbar
  //           </a>
  //           <button
  //             className="navbar-toggler"
  //             type="button"
  //             data-bs-toggle="collapse"
  //             data-bs-target="#navbarSupportedContent"
  //             aria-controls="navbarSupportedContent"
  //             aria-expanded="false"
  //             aria-label="Toggle navigation"
  //           >
  //             <span className="navbar-toggler-icon"></span>
  //           </button>
  //           <div className="collapse navbar-collapse" id="navbarSupportedContent">
  //             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  //               <li className="nav-item">
  //                 <a className="nav-link active" aria-current="page" href="#">
  //                   Home
  //                 </a>
  //               </li>
  //               <li className="nav-item">
  //                 <a className="nav-link" href="#">
  //                   Link
  //                 </a>
  //               </li>
  //               <li className="nav-item dropdown">
  //                 <a
  //                   className="nav-link dropdown-toggle"
  //                   href="#"
  //                   role="button"
  //                   data-bs-toggle="dropdown"
  //                   aria-expanded="false"
  //                 >
  //                   Dropdown
  //                 </a>
  //                 <ul className="dropdown-menu">
  //                   <li>
  //                     <a className="dropdown-item" href="#">
  //                       Action
  //                     </a>
  //                   </li>
  //                   <li>
  //                     <a className="dropdown-item" href="#">
  //                       Another action
  //                     </a>
  //                   </li>
  //                   <li>
  //                     <hr className="dropdown-divider" />
  //                   </li>
  //                   <li>
  //                     <a className="dropdown-item" href="#">
  //                       Something else here
  //                     </a>
  //                   </li>
  //                 </ul>
  //               </li>
  //               <li className="nav-item">
  //                 <a className="nav-link disabled">Disabled</a>
  //               </li>
  //             </ul>
  //             <form className="d-flex" role="search">
  //               <input
  //                 className="form-control me-2"
  //                 type="search"
  //                 placeholder="Search"
  //                 aria-label="Search"
  //               />
  //               <button className="btn btn-outline-success" type="submit">
  //                 Search
  //               </button>
  //             </form>
  //           </div>
  //         </div>
  //       </nav>
  //     </>
  //   );
  // } else {
    return (
      <>
        <div className="container-fluid flex w-full p-3 pr-2 pl-2 justify-between items-center text-center border-b-2 border-indigo-200 bg-icon-color1">
          <div className="flex">
            {/* <img  src="images/work_6_md.jpg" className=" w-10 h-10"/> */}
            <DiVisualstudio className="text-4xl text-white mr-2" />
            <Link to={"/"}>
              <span className="text-3xl text-white tracking-tight cursor-pointer liens">
                SKILLS
              </span>
            </Link>
          </div>
          {/* <div className="items-center">
            <input
              //className=" border-0 rounded border-color p-2 w-500 bg-input-color"
              className=" border-0 rounded border-color p-2 w-500 bg-white"
              id="exampleDataList"
              placeholder="Ex: Menusier"
            />
  
            <button
              type="button"
              className="btn btn-success mb-1 ml-3"
              onClick={()=>{
                compare_date()
              }}
            >
              Rechercher
            </button>
          </div> */}
          <div className="flex">
            <Link to="/">
              <div>
                <span className="text-white font-semibold ml-1 text-14 cursor-pointer liens">
                  ACCUEIL
                </span>
              </div>
            </Link>
            {/* <div className="ml-3">
                  <span className="text-white font-semibold ml-1 text-14 cursor-pointer liens">
                  PROJETS
                </span>
                  </div> */}
            <div className="ml-3">
              <span className="text-white font-semibold ml-1 text-14 cursor-pointer liens">
                FAVORIS
              </span>
            </div>
            {/* <div>
                  <img  src="images/post_4.jpg" className=" w-10 h-10"/>
                  </div> */}
          </div>
        </div>
      </>
    );
  // }
};

export default Navbar_model2;

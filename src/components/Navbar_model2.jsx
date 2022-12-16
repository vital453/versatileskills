/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect } from "react";
import { useState } from "react";
import { DiVisualstudio } from "react-icons/di";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setHash_code } from "../feature/profileUser.slice";
// import { Link } from "react-router-dom";*

const Navbar_model2 = () => {
  const [resultats, setResultats] = useState("success");
  const [date_actu, setDate_actu] = useState("");
  const [hash, setHash] = useState([]);
  const [year1, setyear1] = useState("");
  const [year2, setyear2] = useState("");
  const [month1, setmonth1] = useState("");
  const [month2, setmonth2] = useState("");
  const [day1, setday1] = useState("");
  const [day2, setday2] = useState("");
  const dispatch = useDispatch();
  const [width, setWindowWidth] = useState(window.innerWidth);


  const updateDimensions = ()=>{
    const width = window.innerWidth;
    setWindowWidth(width);
  }
  window.addEventListener('resize',updateDimensions);
  const makeid = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const envoie_hash = () => {
    Axios.post("https://backend-shop.benindigital.com/licence_hash", {
      hash: makeid(150),
    }).then((ret) => {
      setResultats(ret.data);
      console.log(ret.data);
    });
  };

  const aff = () => {
    for (let index = 0; index < 200; index++) {
      // if(resultats == 'success'){
      envoie_hash();
      // }
    }
  };

  const recupe_hash = () => {
    try {
      fetch("https://backend-shop.benindigital.com/list_hash")
        .then((res) => {
          const data = res.json();
          return data;
        })
        .then((data) => {
          console.log(data.length);
          setHash(data);
          // setDate_actu(data[0].time_actu.split("T")[0] + "");
          // setyear1(data[0].time_actu.split("-")[0]);
          // setmonth1(data[0].time_actu.split("-")[1]);
          // const dd = data[0].time_actu.split("-")[2];
          // setday1(dd.split("T")[0]);s
          dispatch(setHash_code(data));
        });
    } catch (e) {}
  };

  const actu_time = () => {
    try {
      fetch("https://backend-shop.benindigital.com/date_time")
        .then((res) => {
          const data = res.json();
          return data;
        })
        .then((data) => {
          console.log(data[0].time_actu.split("T")[0]);
          setDate_actu(data[0].time_actu.split("T")[0] + "");
          setyear1(data[0].time_actu.split("-")[0]);
          setmonth1(data[0].time_actu.split("-")[1]);
          const dd = data[0].time_actu.split("-")[2];
          setday1(dd.split("T")[0]);
        });
    } catch (e) {}
  };
  const aleatoire_hash = () => {
    var randomNumber = Math.floor(Math.random() * hash.length);
    console.log(hash[randomNumber].hash_code);
    console.log(date_actu);
  };
  const compare_hash = () => {
    for (let index = 0; index < hash.length; index++) {
      if (
        hash[index].hash_code ==
        "9s65eI982H4kQ2IAlzZfWmAqPnYfAxFx5RheVZi1UOmfcuJXjRtWminAVCrQ7gYYfAzuuivLmF4I8lO6Uag0MXrWgp6YYmXUcdXpRl28tCUOR3XOPujdK5Ixn2aICoH44XbfoezU7fUmvMUrinEKga"
      ) {
        console.log("hash trouver");
        break;
      }
    }
  };
  const compare_date = () => {
    const x = new Date("2021-05-23");
    const y = new Date("2022-05-23");
    const date1utc = Date.UTC(x.getFullYear(), x.getMonth(), x.getDate());
    const date2utc = Date.UTC(y.getFullYear(), y.getMonth(), y.getDate());
   const dayunit = 1000*60*60*24;
   const numberday=(date2utc - date1utc)/dayunit
    console.log(numberday);
    // console.log(`lanne est ${date_actu.split("-")[0]} et le mois est ${date_actu.split("-")[1]} et le jours ${date_actu.split("-")[2]}`);
    //  console.log(`lanne est ${ year1} et le mois est ${month1} et le jours ${day1}`);
  };

  const affs = () => {
    var mois = "";
    var today = new Date();
    //   var date =
    //     today.getFullYear() +
    //     "-" +
    //     0 +
    //     (today.getMonth() + 1) +
    //     "-" +
    //     0 +
    //     today.getDate();
    if (String(today).split(" ")[1] == "Jan") {
      mois = "01";
    } else if (String(today).split(" ")[1] == "Feb") {
      mois = "02";
    } else if (String(today).split(" ")[1] == "Mar") {
      mois = "03";
    } else if (String(today).split(" ")[1] == "Apr") {
      mois = "04";
    } else if (String(today).split(" ")[1] == "May") {
      mois = "05";
    } else if (String(today).split(" ")[1] == "Jun") {
      mois = "06";
    } else if (String(today).split(" ")[1] == "Jul") {
      mois = "07";
    } else if (String(today).split(" ")[1] == "Aug") {
      mois = "08";
    } else if (String(today).split(" ")[1] == "Sep") {
      mois = "09";
    } else if (String(today).split(" ")[1] == "Oct") {
      mois = "10";
    } else if (String(today).split(" ")[1] == "Nov") {
      mois = "11";
    } else if (String(today).split(" ")[1] == "Dec") {
      mois = "12";
    }
    // console.log(
    //   `L'année est ${String(today).split(" ")[3]} et le jour est ${
    //     String(today).split(" ")[2]
    //   } et le mois est ${mois}`
    // );
    var date = `${String(today).split(" ")[3]}-${mois}-${
      String(today).split(" ")[2]
    }`;
    // console.log(date);
    const x = new Date(date);
    const y = new Date("2021-05-23");
    // less than, greater than is fine:
    if (x < y) {
      console.log("x < y");
    } else if (x > y) {
      console.log("x > y");
    } else if (x <= y) {
      console.log("x <= y");
    } else if (x >= y) {
      console.log("x >= y");
    } else if (x === y) {
      console.log("x === y");
    }
  };

  useEffect(() => {
    affs();
    recupe_hash();
    actu_time();
  }, []);


  if(width < 721){
return(
  <>
  <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
  </>
)
  }else{
    return (
      <>
        <div className="container-fluid flex w-full p-3 pr-2 pl-2 justify-between items-center text-center border-b-2 border-indigo-200 p-1 bg-icon-color1">
          <div className="flex">
            {/* <img  src="images/work_6_md.jpg" className=" w-10 h-10"/> */}
            <DiVisualstudio className="text-4xl text-white mr-2" />
            <Link to={"/"}>
              <span className="text-3xl text-white tracking-tight cursor-pointer liens">
                Versatile
              </span>
            </Link>
          </div>
          <div className="items-center">
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
          </div>
          <div className="flex">
            <div>
              <span className="text-white font-semibold ml-1 text-14 cursor-pointer liens">
                DASHBOARD
              </span>
            </div>
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
            <div className="ml-3">
              <span className="text-white font-semibold ml-1 text-14 cursor-pointer liens">
                MESSAGES
              </span>
            </div>
            {/* <div>
                  <img  src="images/post_4.jpg" className=" w-10 h-10"/>
                  </div> */}
          </div>
        </div>
      </>
    );
  }
};

export default Navbar_model2;

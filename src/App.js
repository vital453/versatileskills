/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { recuppic, setPictureData } from "./feature/profileUser.slice";
import Acceuil from "./page/Accueil";
import ForgotPassword from "./page/ForgotPassword";
import Login from "./page/Login";
import Notfound from "./page/Notfound";
import ProfileUtilisateur from "./page/ProfileUtilisateur";
import Register from "./page/Register";
import Search from "./page/Search";
import Axios from "axios";
import { allProfession } from "./feature/Profession";
import { recupUser } from "./feature/AuthSlice";
import Login_lvc from "./page/Login_lvc";

function App() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(JSON.parse(localStorage.getItem("pic")))

  const getprofession = ()=> {
    Axios.get("https://backend-skills.versatileskills.space/infos").then((res) => {
      dispatch(allProfession(res.data));
    })
  };

  const getallprofiles = () => {
    Axios.get("https://backend-skills.versatileskills.space/infosprofile").then((ret) => {
      dispatch(setPictureData(ret.data));
      // console.log(ret.data);
    });
  };
  useEffect(() => {
    if(JSON.parse(localStorage.getItem("user") + "")){
      dispatch(recupUser(JSON.parse(localStorage.getItem("user") + "")));
    }
    dispatch(recuppic(JSON.parse(localStorage.getItem("pic"))));
    getprofession();
    getallprofiles();
    //console.log(tab);
  }, [])
  
  return (
    // eslint-disable-next-line react/style-prop-object
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/accueil" element={<Acceuil />} />
          <Route path="/search/:ville/:parameter" element={<Search />} />
          <Route path="/profile/:userId/:professionId" element={<ProfileUtilisateur />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login_lvc" element={<Login_lvc />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/*" element={<Notfound />} /> 
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

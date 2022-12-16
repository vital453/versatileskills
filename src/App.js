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

function App() {
  const dispatch = useDispatch()
  const [tab, setTab] = useState(JSON.parse(localStorage.getItem("pic")))

  useEffect(() => {
    dispatch(recuppic(JSON.parse(localStorage.getItem("pic"))));
    //console.log(tab);
  }, [])
  
  return (
    // eslint-disable-next-line react/style-prop-object
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/accueil" element={<Acceuil />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<ProfileUtilisateur />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/*" element={<Notfound />} /> 
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import About from "../components/About";
import Commentaire from "../components/Commentaire";
import Commentaire1 from "../components/Commentaire1";
import Footer from "../components/Footer";
import Footer3 from "../components/Footer3";
import HappyClient from "../components/HappyClient";
import Navbar_model2 from "../components/Navbar_model2";
import Profile from "../components/profileUtilisateur/Profile";
// import Test from "../components/Test";

const ProfileUtilisateur = () => {
    const [tab, setTab] = useState(JSON.parse(localStorage.getItem("userdata")))
    return ( 
        <>
            <Navbar_model2 />
            <Profile />
            {/* <About /> */}
            {/* <Test />
            <HappyClient /> */}
            {/* <Commentaire1 /> */}
            <Footer />
        </>
     );
}
 
export default ProfileUtilisateur;
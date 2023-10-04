/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// import { Link } from "react-router-dom";
// import { AiOutlineMenu } from "react-icons/ai";
// import { FiShoppingCart } from "react-icons/fi";
// import { BsChatLeft } from "react-icons/bs";
// import { RiNotification3Line } from "react-icons/ri";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Navbar_model1 from "../components/Navbar_model1";
import AreaSearch from "../components/AreaSearch";
import Footer1 from "../components/Footer1";
import ProfilEx from "../components/accueil/ProfilEx";

const Acceuil = () => {
  return (
    <>
      <Navbar_model1 />
      <AreaSearch />
      <ProfilEx />
      {/* <Footer1 /> */}
    </>
  );
};

export default Acceuil;

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
import Test from "../components/Test";
import ReactPaginate from 'react-paginate';
import { useStateContext } from '../contexts/ContextProvider';
import { useDispatch, useSelector } from "react-redux";
import { recuppic, setPictureData } from "../feature/profileUser.slice";
import Card4 from "../components/Card4";
import Axios from "axios";

// import { Link } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const userperpage = 12;
  const pagesvisited = pageNumber * userperpage;
  const [tab, setTab] = useState(JSON.parse(localStorage.getItem("pic")));

  const dispatch = useDispatch();

  const datarec = useSelector((state)=>state.profileUser.pictures);
  const [s1, setS1] = useState(datarec);

  const displayUser = datarec.slice(pagesvisited, pagesvisited + userperpage).map((resusearch,index) =>{
    return (
      <Card4 image={resusearch.picture1} nom={resusearch.name} key={index} />
    )
  })
  const pageCount = Math.ceil(search.length / userperpage);
  const changePage = ({selected}) =>{
    setPageNumber(selected)
  }
  const getsearch = () => {
    Axios.post("https://backend-shop.benindigital.com/afficheart", {
      id_boutique: 8,
    }).then((ret) => {
      dispatch(setPictureData(ret.data));
      setSearch(ret.data);
      console.log(ret.data);
    });
  };

  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
   // dispatch(recuppic(JSON.parse(localStorage.getItem("pic"))));
    getsearch();
    console.log(s1)
    
  }, []);



  return (
    <>
      <Navbar_model2 />
      {/* <NumberResult /> */}
      {/* <Test /> */}

      <div className="container-fluid mt-3 mb-3 flex flex-wrap justify-center items-center">
        {displayUser}
      </div>
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
      <ReactPaginate 
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
      />
      {/* <Portfolio2 />
      <About />
      <HappyClient /> */}
      <Footer />
    </>
  );
};

export default Search;

/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { FaBan } from "react-icons/fa";
import { Link } from "react-router-dom";

const Notfound = () => {
    return ( 
        <>
       
          <div class="flex flex-col items-center notfound">
          <FaBan className="text-2xl text-icon-color"/>
            {/* <svg
              class="w-12 h-12 mt-8 text-purple-200"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                clip-rule="evenodd"
              ></path>
            </svg> */}
            <h1 class="text-6xl font-semibold text-gray-700 dark:text-gray-200">
              404
            </h1>
            <p class="text-gray-700 dark:text-gray-300">
              Page not found. Check the address or &nbsp;
              <Link
                class="text-purple-600 hover:underline dark:text-purple-300"
                to={"/"}
              >
                go Home
              </Link>
              .
            </p>
          </div>
        
        </>
     );
}
 
export default Notfound;
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <>
      <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div class="flex flex-col overflow-y-auto md:flex-row">
            <div class="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                class="object-cover w-full h-full dark:hidden"
                src="images/forgot-password-office.jpeg"
                alt="Office"
              />
              <img
                aria-hidden="true"
                class="hidden object-cover w-full h-full dark:block"
                src="images/forgot-password-office-dark.jpeg"
                alt="Office"
              />
            </div>
            <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div class="w-full flex flex-col">
                <div className="w-full items-center justify-center text-center">
                  <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Forgot password
                  </h1>
                </div>
                <label class=" text-sm">
                  <span class="text-gray-700 dark:text-gray-400">Email</span>
                  <input
                    class=" w-full mt-1 text-sm border-2 border-color rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                    placeholder="Jane Doe"
                  />
                </label>

                {/* <!-- You should use a button here, as the anchor is only used for the example  --> */}
                <Link
                  class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  to={"/"}
                >
                  Recover password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

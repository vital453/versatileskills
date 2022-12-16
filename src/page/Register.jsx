/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import {
  FaGithub,
  FaInstagram,
  FaInstagramSquare,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div class="flex flex-col overflow-y-auto md:flex-row">
            <div class="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                class="object-cover w-full h-full dark:hidden"
                src="images/create-account-office.jpeg"
                alt="Office"
              />
              <img
                aria-hidden="true"
                class="hidden object-cover w-full h-full dark:block"
                src="images/create-account-office-dark.jpeg"
                alt="Office"
              />
            </div>
            <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div class="w-full flex flex-col">
                <div className="w-full items-center justify-center text-center">
                  <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                    Create account
                  </h1>
                </div>

                <label class=" text-sm">
                  <span class="text-gray-700 dark:text-gray-400">Email</span>
                  <input
                    class=" w-full mt-1 text-sm border-2 border-color rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                    placeholder="Jane Doe"
                  />
                </label>
                <label class=" mt-4 text-sm">
                  <span class="text-gray-700 dark:text-gray-400">Password</span>
                  <input
                    class=" w-full mt-1 text-sm border-2 border-color rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                    placeholder="***************"
                    type="password"
                  />
                </label>
                <label class=" mt-4 text-sm">
                  <span class="text-gray-700 dark:text-gray-400">
                   
                    Confirm password
                  </span>
                  <input
                    class=" w-full mt-1 text-sm border-2 border-color rounded-md p-2 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                    placeholder="***************"
                    type="password"
                  />
                </label>
                <div class="flex mt-6 text-sm">
                  <label class="flex items-center dark:text-gray-400">
                    <input
                      type="checkbox"
                      class="text-purple-600 form-checkbox cursor-pointer focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                    />
                    <span class="ml-2">
                      I agree to the &nbsp;
                      <span class="underline">privacy policy</span>
                    </span>
                  </label>
                </div>

                {/* <!-- You should use a button here, as the anchor is only used for the example  --> */}
                <Link
                  class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-deep_sky_blue border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  to={"/"}
                >
                  Create account
                </Link>

                <hr class="my-8" />

                <button class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                  <FaInstagram /> &nbsp;  &nbsp;
                  Instagram
                </button>
                <button class="flex items-center justify-center w-full px-4 py-2 mt-4 text-sm font-medium leading-5  text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray">
                  <FaTwitter /> &nbsp;  &nbsp;
                  Twitter
                </button>

                <p class="mt-4">
                  <Link
                    class="text-sm font-medium text-deep_sky_blue dark:text-purple-400 hover:underline"
                    to={"/login"}
                  >
                    Already have an account? Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

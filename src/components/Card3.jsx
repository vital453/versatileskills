/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsUiChecksGrid } from "react-icons/bs";
import { BsPlayCircleFill } from "react-icons/bs";
import { BsPatchCheckFill } from "react-icons/bs";

const Card3 = ({ nom, image }) => {
  return (
    <>
    <div className="post border-1 border-color rounded-lg m-2">
        <div className="header_post">
            <img src={`https://backend-shop.benindigital.com/${image}`} alt="" />
        </div>

        <div className="body_post">
            <div className="post_content">

                <h1>Lorem ipsum</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi assumenda cumque deserunt
                    dolorum ex exercitationem.</p>

                <div className="container_infos">
                    <div className="postedBy">
                        <span>{nom}</span>
                        John Doe
                    </div>

                    <div className="container_tags">
                        <span>tags</span>
                        <div className="tags">
                            <ul>
                                <li>design</li>
                                <li>front end</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default Card3;

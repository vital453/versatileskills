import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card5 from "../Card5";

const ProfilEx = () => {
  const profiles = useSelector((state) => state.profileUser.profiles);
  const [width, setWindowWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    // const width = window.innerWidth;
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener("resize", updateDimensions);

  if (width < 500) {
    return (
        <div className="absolute bottom-[0%] flex flex-wrap justify-center w-full gap-4 h-[270px] p-4 hdi">
          {profiles[0] &&
            profiles.map((val, i) => {
              if (i < 4) {
                return <Card5 data={val} key={val.id} />;
              }
            })}
        </div>
      );
  }else{
      return (
        <div className="absolute bottom-[14%] flex flex-wrap justify-center w-full gap-4">
          {profiles[0] &&
            profiles.map((val, i) => {
              if (i < 4) {
                return <Card5 data={val} key={val.id} />;
              }
            })}
        </div>
      );
  }
};

export default ProfilEx;

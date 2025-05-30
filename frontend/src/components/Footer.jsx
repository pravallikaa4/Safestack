import React from "react";

const Footer = () => {
  return (
    <div className="backdrop-blur-sm bg-white/10 justify-center items-center flex flex-col   w-full">
      <div className="mycontainer flex flex-col items-center gap-2 text-gray-300 text-sm py-4">
        <div className="flex items-center gap-2">
          <span>Coded with</span>
          <img src="icons/heart.svg" alt="heart" className="w-4 h-4" />
          <span>by Pravallika</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;

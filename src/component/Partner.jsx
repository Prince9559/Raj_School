import React from "react";
import Partner from "/banner/logopartner.png";

const CultureSection = () => {
  return (
    <div
      className="flex flex-col w-full h-[70vh] bg-gradient-to-r from-[#f7f7f7] to-[#e0e0e0] text-gray-800 mt-12 md:mt-24 bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('/banner/girl.png')",
        backgroundPosition: "left center", // default to left
      }}
    >
      <h1 className="text-2xl md:text-[3rem] font-bold text-center p-12">
        Proud Knowledge Partner
      </h1>

      <div className="flex flex-col md:flex-row w-full justify-end h-full">
        <div className="hidden lg:block w-1/2">
          {/* Left side content */}
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 pt-2 pb-16 md:py-0">
          <img
            src={Partner}
            alt="Partner Logo"
            className="w-3/4 md:w-4/5 mb-3 md:mb-6 justify-center mx-auto"
          />
          <p className="text-sm sm:text-base md:text-lg text-gray-700 text-center md:text-left leading-relaxed">
            We are proud to be a trusted knowledge partner, empowering businesses and communities
            through shared insights and strategic collaboration. Our commitment lies in fostering
            innovation, encouraging sustainable growth, and driving meaningful impact across industries.
          </p>
        </div>
      </div>


    </div>
  );
};

export default CultureSection;

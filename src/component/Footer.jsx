import React, { useState, useEffect } from "react";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const eightyPercentScreenHeight = window.innerHeight * 1.5;
      if (window.scrollY > eightyPercentScreenHeight) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="bg-[url('/home/img.svg')] bg-contain lg:bg-cover bg-center bg-no-repeat w-screen h-[5.8rem] -mb-[2rem] md:h-32 p-0 lg:m-[-1px] lg:-mb-[1rem]"></div>

      <div className="bg-[#053f87] p-0">
        <footer className="text-white relative">
          <div className="container mx-auto flex flex-col md:flex-row justify-center items-center md:justify-between">
            {/* About Us Section */}

            {/* Learning Section */}
            <div className="flex flex-col">
              <h4 className="text-red-500 font-bold m-4 text-xl">
                Contact Details
              </h4>
              <p className="flex justify-center items-center pb-1">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                <a href="mailto:rajschoolvns@gmail.com">
                  rajschoolvns@gmail.com
                </a>
              </p>
              <p className="flex items-center pb-1">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                <div className="flex flex-row gap-4 ml-1">
                  <a href="tel:+917703004334">+91 7703004334</a>
                </div>
              </p>
              <p className="flex items-center pb-1">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 pb-1" />
                Near Hotel Buddha Park
              </p>
            </div>
            <div>
              <h4 className="text-red-500 font-bold m-4 text-xl">About Us</h4>
              <a
                className="pb-2"
                href="https://merchant.razorpay.com/policy/NHdrf7OG8DLj67/terms"
              >
                Terms & Conditions
              </a>
              <br></br>
              <a
                className="mr-2 pb-2"
                href="https://merchant.razorpay.com/policy/NHdrf7OG8DLj67/refund"
              >
                Cancellation and Refund
              </a>
              <br></br>
              <a
                className="mr-2 pb-2"
                href="https://merchant.razorpay.com/policy/NHdrf7OG8DLj67/shipping"
              >
                Shipping and Delivery
              </a>
              <br></br>
              <a
                href={"/contact"}
                className="flex items-center text-[#fff] font-bold hover:underline pt-5 "
              >
                <img
                  src="https://hixs.org/wp-content/themes/SKT-Education-Lite/assets/images/locate-icon.svg"
                  className="h-12"
                  alt="locate icon"
                ></img>
                <span className="ml-2 text-[20px] ">Locate Us</span>
              </a>
            </div>

            {/* Community Section */}
            <div>
              <h3 className="text-red-500 font-bold m-4 text-center md:text-left text-xl">
                Follow
              </h3>
              <div className="flex items-center gap-8 justify-between">
                <a
                  href="#"
                  className="flex justify-center items-center w-12 h-12 border border-white rounded-full p-2"
                >
                  <FontAwesomeIcon icon={faFacebookF} className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="flex justify-center items-center w-12 h-12 border border-white rounded-full p-2"
                >
                  <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="flex justify-center items-center w-12 h-12 border border-white rounded-full p-2"
                >
                  <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="flex justify-center items-center w-12 h-12 border border-white rounded-full p-2"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} className="text-2xl" />
                </a>
              </div>

              <div>
                <h4 className="text-red-500 font-bold m-4 text-center md:text-left text-xl">
                  Admissions
                </h4>
                <p>
                  <FontAwesomeIcon icon={faPhone} className="mr-2" />
                  <a href="tel:+917703004334">+91 7703004334</a>&nbsp;(9 am to 5 pm)
                </p>
                <p>
                  <a
                    href="mailto:rajschoolvns@gmail.com"
                    className="text-red-500"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />{" "}
                    rajschoolvns@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {showButton && (
            <a
              href="#top"
              className="bg-white text-blue-900 px-4 py-2 rounded-full font-bold fixed bottom-0 right-0 mr-4 mb-20 items-center flex flex-col"
            >
              <img
                src="https://hixs.org/wp-content/themes/SKT-Education-Lite/assets/images/arrow-up.svg"
                className="h-4 w-4"
                alt="arrow up"
              />
              TOP
            </a>
          )}

          {/* Admissions and Social Links */}

          {/* Bottom Row */}
          <hr className="border-b-1 border-dotted border-black-800 my-2 mt-4" />

          <div className="container mx-auto text-center mt-2 text-gray-400">
            <p>
              © Copyright 2024 , All Rights Reserved | Privacy Policy | Powered
              by: 
              <a className="" href="https://vidyamint.com?utm_source=Raj+English+School&utm_medium=RES&utm_campaign=Reffral">
             VidyaMint
          </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;

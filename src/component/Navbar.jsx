import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const debounce = (func, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const navbarRef = useRef(null);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const location = useLocation();

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOutsideClick = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsOpen(false);
      setIsSubMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleMenuClick = debounce(() => setIsOpen(!isOpen), 200);

  const handleSubMenuClick = (event) => {
    event.stopPropagation();
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const handleScroll = () => {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    setHasScrolled(currentScrollTop > 50);

    if (currentScrollTop > lastScrollTop) {
      setIsScrollingUp(false);
    } else {
      setIsScrollingUp(true);
    }
    setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const getNavbarBackgroundColor = () => {
    if (location.pathname === "/" && !hasScrolled) {
      return "transparent";
    }
    return "bg-custom-blue"; // or any other color for the background
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full transition-transform duration-300 ${
        isScrollingUp ? "translate-y-0" : "-translate-y-full"
      } z-50 ${getNavbarBackgroundColor()}`}
    >
      <div className="flex md:flex-row md:justify-between text-white md:min-h-[100px]">
        <img
          src="/logo.png"
          alt="school"
          className="w-[83.33%] md:w-[28%] h-[100px] p-[5px]"
        />

        <div
          ref={navbarRef}
          className={`flex flex-col md:flex-row items-end justify-end md:justify-around p-2 text-white md:text-white ${
            isOpen && screenSize < 768 ? "" : "w-1/7"
          }  items-center absolute z-10 top-0 right-0 md:static`}
          onClick={handleMenuClick}
        >
          {screenSize < 768 && (
            <button className="md:hidden p-1" onClick={handleMenuClick}>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  ""
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          )}

          <div
            className={`md:flex ${
              isOpen && screenSize < 768
                ? "block bg-custom-blue rounded-md p-2"
                : "hidden"
            } md:order-2 md:justify-evenly md:block`}
          >
            <ul className="flex flex-col text-white sm:text-white md:flex-row sm:gap-1 md:gap-3 xl:gap-6 justify-around text-center">
              <li>
                <Link
                  className={`font-bold text-base  ${
                    location.pathname === "/" ? "border-b-2 border-red-500" : ""
                  } hover:text-red-500 `}
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.35)" }}
                  to={"/"}
                >
                  Home
                </Link>
              </li>
              {/* {<li>
                <a
                  className="font-bold text-base hover:text-red-500"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.35)" }}
                  href="https://forms.edunexttechnologies.com/forms/res/registration/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Admission
                </a>
              </li> } */}
              {/* { <li>
                <Link
                  className={`font-bold text-base ${
                    location.pathname === "/tc"
                      ? "border-b-2 border-red-500"
                      : ""
                  } hover:text-red-500`}
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.35)" }}
                  to={"/tc"}
                >
                  TC
                </Link>
              </li> } */}
              <li>
                <Link
                  className={`font-bold text-base ${
                    location.pathname === "/gallery"
                      ? "border-b-2 border-red-500"
                      : ""
                  } hover:text-red-500`}
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.35)" }}
                  to={"/gallery"}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  className={`font-bold text-base ${
                    location.pathname === "/mand-disclosure"
                      ? "border-b-2 border-red-500"
                      : ""
                  } hover:text-red-500`}
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.35)" }}
                  to={"/mand-disclosure"}
                >
                  Mandatory Disclosure
                </Link>
              </li>
              <li>
                <Link
                  className={`font-bold text-base ${
                    location.pathname === "/about-us"
                      ? "border-b-2 border-red-500"
                      : ""
                  } hover:text-red-500`}
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.35)" }}
                  to={"/about-us"}
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  className={`font-bold text-base ${
                    location.pathname === "/contact"
                      ? "border-b-2 border-red-500"
                      : ""
                  } hover:text-red-500`}
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.35)" }}
                  to={"/contact"}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  className="font-bold text-base hover:text-red-500"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.35)" }}
                  href="https://res.edunexttechnologies.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ERP Login
                </a>
              </li>
              <li>
                <a
                  className="font-bold text-base hover:text-red-500"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.35)" }}
                  href="https://res.edunexttechnologies.com/mvc/std/DynamicEnquiryForm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enquiry Form
                </a>
              </li>
              <li className="relative">
                <a
                  className="font-bold text-base hover:text-red-500 cursor-pointer"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.35)" }}
                  onClick={handleSubMenuClick}
                >
                  Important Links
                </a>
                {isSubMenuOpen && (
                  <ul
                    className={`md:absolute md:top-full md:left-0 md:bg-custom-blue md:shadow-lg md:rounded-md md:p-2 ${isSubMenuOpen ? 'block' : 'hidden'} md:block`}
                  >
                    <li>
                      <a
                        className="block px-4 py-2 text-white hover:bg-red-500"
                        href="https://forms.edunexttechnologies.com/website-service/res/birthday/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Birthday
                      </a>
                    </li>
                    <li>
                      <a
                        className="block px-4 py-2 text-white hover:bg-red-500"
                        href="https://forms.edunexttechnologies.com/website-service/res/calendar/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Calendar
                      </a>
                    </li>
                    <li>
                      <a
                        className="block px-4 py-2 text-white hover:bg-red-500"
                        href="https://forms.edunexttechnologies.com/website-service/res/circular/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Circular
                      </a>
                    </li>
                    <li>
                      <a
                        className="block px-4 py-2 text-white hover:bg-red-500"
                        href="https://forms.edunexttechnologies.com/website-service/res/news/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        News
                      </a>
                    </li>
                    <li>
                      <a
                        className="block px-4 py-2 text-white hover:bg-red-500"
                        href="https://forms.edunexttechnologies.com/website-service/res/transfer-certificate/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Transfer Certificate
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

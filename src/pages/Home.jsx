import { useContext, useEffect, useState } from "react";
import SwiperImg from "../component/SwiperImg";
import { Link } from "react-router-dom";

import Parallaxx from "../component/Parallaxx";
import Popup from "reactjs-popup";
import { defaultSchoolCode } from "../main";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useCookies } from "react-cookie";
import CultureSection from "../component/Partner";

function Home() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null); // error handling
  const { user } = useContext(UserContext);
  const [allCookie, setAllCookie] = useCookies(["tokenByAnshCloud"]);
  // console.log("allCookie :", allCookie);
  const token = allCookie.tokenByAnshCloud || null;
  const stats = [
    {
      number: 20,
      label: "Student Teacher Ratio",
      color: "text-[#d66212] border-[#d66212]",
    },
    {
      number: 4,
      label: "Foreign Languages",
      color: "text-blue-500 border-blue-500",
    },
    { number: 18, label: "Clubs", color: "text-teal-500 border-teal-500" },
    {
      number: 10,
      label: "Collaborations",
      color: "text-[#c06e72] border-[#c06e72]",
    },
    {
      number: 4,
      label: "Community Programs",
      color: "text-purple-500 border-purple-500",
    },
    {
      number: 16,
      label: "Global Links",
      color: "text-purple-500 border-purple-500",
    },
    { number: 9, label: "Labs", color: "text-yellow-500 border-yellow-500" },
    {
      number: 120,
      label: "Smart Classes",
      color: "text-green-500 border-green-500",
    },
    {
      number: 20,
      label: "Subjects Offered in Senior School",
      color: "text-pink-500 border-pink-500",
    },
  ];

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  async function handleUpload() {
    try {
      setError(null);
      const formData = new FormData();
      //    console.log(formData);
      formData.append("file", selectedFile);
      // Append schoolCode and docType
      formData.append("schoolCode", defaultSchoolCode);

      // Assuming you have a bearer token, replace 'YOUR_BEARER_TOKEN' with your actual token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = axios
        .post(`/upload_notice/${defaultSchoolCode}/notice`, formData, config)
        .then((response) => {
          console.log(response.data);
          if(response.data){
            alert("File Upload Successfully")
          }
        });
    } catch (error) {
      //   console.log(error);
      setError(error.message);
    }
  }

  const handleResize = () => {
    setScreenSize(window.innerWidth);
  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [notice, setNotice] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  useEffect(() => {
    async function getNotice() {
      const res = await axios.post("/get_notice", {
        schoolCode: defaultSchoolCode,
      });

      // res.data = [
      //   {
      //     date: "2/1/2024",
      //     topic: "Distribution of Admit Cards",
      //     notice:
      //       "The Annual Examination 2023-24 commences from Saturday, the 2nd March 2024. All the students are expected to go through their subjects intently to stay ahead. The distribution of Admit Cards with Time-table begins from Monday, the 5th February 2024. All the students right from PG to Class IX & XI are hereby informed to clear their Fee dues till March 2024 and collect their Admit Cards from the Reception at Corporate office.",
      //   },
      //   {
      //     date: "2/13/2024",
      //     topic: "Basant Panchami",
      //     notice:
      //       "The School remains closed  tomorrow on Wednesday, the 14th February 2024 (Only for the students) on the auspicious occasion of Basant Panchami : Saraswati Pooja and will re-open on Thursday, the 15th February 2024 as usual.",
      //   },
      //   {
      //     date: "2/22/2024",
      //     topic: "PM's Visit & Guru Ravidas Jayanti",
      //     notice:
      //       "Owing to heavy traffic on account of the PM's advent to the city Varanasi, the School remains closed tomorrow on Friday, the 23rd February 2024 and the School remains closed on Saturday, the 24th February 2024 on the auspicious occasion of Shri Guru Ravidas Jayanti. The School re-opens on Monday, the 26th February 2024 as usual. \n Note:- Corporate Office will remain open on 23/02/2024 and 24/02/2024.Therefore  Parents can clear the dues of their ward and collect their admit cards from classes P.G. to IX and XI."
      //   }
      // ];
      console.log("Response Notice :-", res.data?.Sheet1)
      setNotice(res.data?.Sheet1);
    }
    getNotice();
  }, []);
  useEffect(() => {
    function callPopUp() {
      //   console.log("popup");
      // setTimeout(() => {
      //   setIsPopupOpen(true);
      //    console.log("popup timer 1 sec");
      // }, 4000);
    }
    callPopUp();
  }, []);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      {/* Image swiper and Notice */}

      <div className="rounded-lg">
        <SwiperImg />
      </div>

      {/* dedication texts */}
      {/* dedication texts */}
      <div className=" text-white my-10  ">
        <Parallaxx />
      </div>

      {/* vision-mision */}
      <div className="flex md:m-8 gap-4">
        <div className="md:m-10 m-2 mt-10">
          <h2 className="text-3xl font-bold mb-6 text-center">
            The Vision-Mission Statement of the Teachers
          </h2>

          <p className="text-justify md:mx-10 leadin my-6  text-slate-700 relative">
            {/* <span className="text-5xl font-serif text-black"></span> */}
            <b className="text-4xl font-serif  text-black"> &nbsp;“</b>
            Our positive mission is to combat the roots of societal issues by
            addressing illiteracy, which is often considered the creator of all
            evils. We are dedicated to achieving this goal by imparting
            qualitative, logical, and value-based modern education. Our vision
            aligns with nurturing liberal rational humanism, empathy, and
            togetherness in the new generations, fostering a community that
            values education and understands the importance of shared humanity
            for an honest prosperity of both mind and matter. <b className="absolute text-4xl font-serif  text-black"> &nbsp;”</b>
            {/* <span className="absolute right-44 sm:right-[23rem] xl:-right-[1.4rem] text-5xl font-serif text-black">
              ”
            </span> */}
          </p>

          <div className="flex justify-center">
            <Link to={"/about-us"}>
              <div className="py-2 px-4 rounded bg-gray-400">READ MORE</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Principal */}

      {/* Admission Process and Children Image */}

      {/* <div className=" xl:w-1/2 mt-24 ">
          <h2 className="text-3xl font-bold mb-6 text-center">Admission Process</h2>
          {screenSize < 1025 && (
            <div>
              <img className="mx-auto my-5 md:my-0" src="/Admob.jpg" alt="" />
            </div>
          )}
          <p className=" m-4 lg:ml-9 md:tracking-wide leading-7 text-slate-700 text-justify">
          Raj English School offers a holistic education that goes beyond textbooks, fostering academic, social,
           and personal growth. With dedicated educators and a focus on exploring student interests, the school has 
           achieved notable success in academics, sports, and co-curricular activities. 
           Its modern facilities include smart classrooms, laboratories, a library, and sports grounds. 
           The school integrates technology and emphasizes character development through leadership and 
           personality programs. Join Raj English School for a journey of excellence, growth, and a vibrant
            community.
          </p>
        </div> */}

      <Link to={"/admission"}>
        <div className="relative bg-gray-200 p-4">
          <div className="flex lg:flex-row lg:items-center justify-between lg:space-x-8">
            {/* Left Section */}
            <div className="relative z-10 lg:w-[10%] flex justify-center">
              {/* Red Overlapping Box */}
              <div className="absolute top-0 sm:-top-12 lg:top-16 left-0 sm:w-44 lg:w-[250px] h-20 sm:h-32 lg:h-[250px] bg-[url('/registration-form/bg-img-default.png')] bg-red-500  z-20 flex justify-start items-end">
                <h1 className="text-white text-xl sm:text-3xl lg:text-4xl font-bold p-4">
                  Admission <br /> Process
                </h1>
              </div>
            </div>

            {/* Right Section with Image and Text */}
            <div className="relative lg:w-[90%] mt-8 lg:mt-0">
              {/* Image */}
              <img
                src="/home/admission_process.jpg"
                alt="Training"
                className="w-full h-[500px] object-cover "
              />

              {/* Text beside the image */}
              <p className="m-4 lg:ml-[115px] text-slate-700 text-justify">
                Raj English School offers a holistic education that goes beyond
                textbooks, fostering academic, social, and personal growth. With
                dedicated educators and a focus on exploring student interests,
                the school has achieved notable success in academics, sports,
                and co-curricular activities. Its modern facilities include
                smart classrooms, laboratories, a library, and sports grounds.
                The school integrates technology and emphasizes character
                development through leadership and personality programs. Join
                Raj English School for a journey of excellence, growth, and a
                vibrant community.
              </p>

              {/* Button */}
              <div className="lg:flex justify-start lg:ml-9 mt-4">
                {/* <button className="px-6 py-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold rounded-full">
          SEE MORE
        </button> */}
              </div>
            </div>
          </div>
        </div>
      </Link>

      <CultureSection />

      {/* Admission Contact And AboutUs */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold mb-6">
          <span className="text-red-500">  Raj English School </span>
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-16 sm:gap-32">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <div
                className={`rounded-full border-2 ${stat.color} h-28 w-28 flex items-center justify-center`}
              >
                <span className={`text-4xl font-bold ${stat.color}`}>
                  {stat.number}
                </span>
              </div>
              <p className="text-sm font-bold mt-4">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Notice And Calendar*/}

      <div className="flex flex-col  sm:flex-row md:p-10 justify-around p-2">
        {/* Notice */}
        <div className="w-full">
          <h2 className="text-3xl font-bold mb-6 pb-2 text-center ">Notice</h2>

          {/* Upload Notice */}
          {user && (
            <div className="py-[30px] flex flex-col gap-3 text-center justify-center items-center">
              <input
                type="file"
                onChange={handleFileUpload}
                className="border border-black rounded p-6 w-fit"
              />
              <button
                className="bg-blue-700 p-3 w-fit rounded-lg text-white"
                onClick={() => handleUpload()}
              >
                Upload Notice Excel File
              </button>
            </div>
          )}

          <div className="bg-blue-100 w-full 
          flex flex-col gap-4 md:object-contain 
          text-center h-64 rounded-lg mx-auto 
          overflow-hidden relative p-2">

            <div className="absolute inset-0 animate-scroll">
              <ul className="notice-list p-4">
                {notice &&
                  [...notice, ...notice].map((line, index) => {
                    const dateObj = new Date(line.Date); // Assuming line.date is a string in 'MM/DD/YYYY' format
                    const day = dateObj.toLocaleDateString("en-US", {
                      weekday: "short",
                    });
                    const date = dateObj.getDate();
                    const month = dateObj.toLocaleDateString("en-US", {
                      month: "short",
                    });

                    return (
                      <div key={index} className="flex p-1 gap-2">
                        {/* Date Section (10% of the width) */}
                        <div className="w-[15%] sm:w-[10%] text-left flex flex-col items-center justify-center">
                          {/* Day */}
                          <span className="text-sm">{day}</span>

                          {/* Date inside a box */}
                          <div className="bg-red-500 text-black font-bold w-12 h-10 flex items-center justify-center">
                            {date}
                          </div>

                          {/* Month */}
                          <span className="text-sm">{month}</span>
                        </div>

                        {/* Topic and Notice Section (80% of the width) */}
                        <div className=" w-[85%] sm:w-[90%] text-left">
                          <h3 className="block text-lg text-center font-[Roboto Slab]">
                            {line.Heading}
                          </h3>
                          <p className="text-sm font-[Roboto Slab]">
                            {line.Description}
                          </p>
                          <br></br>
                          <hr className="border-b-1 border-dotted border-red-800 my-2" />
                        </div>
                        {/* Divider */}
                      </div>
                    );
                  })}
              </ul>
            </div>


          </div>

          {/* Calendar and Holidays */}

          {/* <div className="flex flex-col p-2">
          <div className="mx-auto  ">
            <CalendarUI />
          </div>
          <div className="mx-auto">
            <Holidays />
          </div>
        </div> */}
        </div>
      </div>
      <Popup
        open={isPopupOpen}
        closeOnDocumentClick
        onClose={closePopup}
        contentStyle={{
          width: `${screenSize > 768 ? "24rem" : ""}`,
        }}
      >
          <div className="">
            <img className="w-94" src="/adm.jpg" alt="" />
          </div>

        <button onClick={closePopup}>Close</button>
      </Popup>
    </div>
  );
}
export default Home;

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import UserContext from "../context/UserContext";
import { defaultSchoolCode } from "../main";

function AdForm() {
  const navigate = useNavigate();
  const [myCookie, setMyCookie] = useCookies("submitID");
  const [isChecked, setIsChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [enroll, setEnroll] = useState("");

  const [photo, setPhoto] = useState("");
  const [marksheet, setMarksheet] = useState("");
  const [isImageSuccess, setIsImageSuccess] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const [error, setError] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [sibling, setSibling] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  console.log("sibling : ", sibling);

  const { submitID, setSubmitID } = useContext(UserContext);
  if (!submitID && myCookie.submitID) {
    setSubmitID(myCookie.submitID);
  }

  const [formData, setFormData] = useState({

    // personal details
    NAME: "",
    ENROLL_CLASS: "NA",
    SCHOOLCODE: defaultSchoolCode,
    DATE_OF_BIRTH: "NA",
    MOBILE: "",
    EMAIL: "",
    NATIONALITY: "NA",
    RELIGION: "NA",
    CATEGORY: "NA",
    LANGUAGE: "NA",
    GENDER: "NA",
    BLOOD_GROUP: "NA",
    BCCL_EMPLOYEE_STATUS: "NA",
    PERMANENT_ADDRESS: "NA",
    PRESENT_ADDRESS: "NA",

    // parent details
    SINGLE_PARENT: "NO",
    FATHER_NAME: "",
    FATHER_EDUCATION_QUALIFICATION: "NA",
    FATHER_OCCUPATION: "NA",
    FATHER_ORGANISATION_NAME: "NA",
    FATHER_DESIGNATION: "NA",
    FATHER_ADDRESS: "NA",
    FATHER_MOBILE: "NA",
    MOTHER_NAME: "",
    MOTHER_EDUCATION_QUALIFICATION: "NA",
    MOTHER_OCCUPATION: "NA",
    MOTHER_ORGANISATION_NAME: "NA",
    MOTHER_DESIGNATION: "NA",
    MOTHER_ADDRESS: "NA",
    MOTHER_MOBILE: "NA",
    ANNUAL_INCOME: "NA",

    SCHOOL_NAME_WITH_ADDRESS: "",
    BOARD_NAME: "NA",
    REGISTRATION_NO: "NA",
    BOARD_ROLL_NO: "NA",
    PASSING_YEAR: "NA",

    SIBLING_NAME: "NA",
    CLASS: "NA",

    ADMIN_NO: "NA",

    CRITERIA: "NA",
    MEDIUM_OF_EXAM: "NA",
  });
  console.log(formData);

  const checkHandler = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (isChecked) {
      setFormData({ ...formData, PERMANENT_ADDRESS: formData.PRESENT_ADDRESS });
    }
  }, [formData.PRESENT_ADDRESS, isChecked]);

  // closePopup
  const closePopup = () => {
    setEmptyFields([]);
    setIsPopupOpen(false);
    setError(null);
  };

  // handleImageLoad
  const handleImageLoad = (e) => {
    const file = e.target.files[0];

    setError(false);
    setIsImageError(false);

    // Validate file size
    if (file.size > 500 * 1024) {
      setIsPopupOpen(true);
      setError("File size exceeds 500KB limit");

      setIsImageError("File size exceeds 500KB limit");

      setIsImageSuccess(false);
      return;
    }

    // Create an image object to check dimensions
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      // Validate dimensions
      if (
        img.width < 300 ||
        img.height < 300 ||
        img.width > 350 ||
        img.height > 350
      ) {
        setIsPopupOpen(true);
        setError("Image dimensions must be between 300x300 and 350x350 pixels");
        setIsImageError(
          "Image dimensions must be between 300x300 and 350x350 pixels"
        );
        setIsImageSuccess(false);
        return;
      }
      setIsPopupOpen(false);
      setError(false);
      setIsImageError(false);
      setPhoto(file);
      setIsImageSuccess(true);
    };

    console.log("image", URL.createObjectURL(file));
  };

  // handleMarksheetLoad
  const handleMarksheetChange = (e) => {
    const file = e.target.files[0];
    setIsPopupOpen(false);
    if (file.size > 800 * 1024) {
      setIsPopupOpen(true);
      setError("File size exceeds 800KB limit");

      return;
    }

    setMarksheet(file);
  };

  useEffect(() => {
    // valid FormData
    const FormValid = () => {
      let array = [];
      // Check if any form field has an empty string value
      for (const key in formData) {
        if (formData[key].trim() === "") {
          array.push(key);
        }
      }

      if (array.length > 0) {
        setEmptyFields(array);
        console.log("Empty fields:", emptyFields);
        return false;
      }
      setEmptyFields([formData]);

      setIsPopupOpen(false);
      setIsFormValid(true);
      // Check other conditions if needed
      return true; // Add more conditions as needed
    };
    FormValid();
  }, [formData]);

  console.log("Empty fields:", emptyFields);

  // handleSubmit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      // Handle invalid form, show error messages, etc.
      setIsPopupOpen(true);
      setError(
        "Please fill out all required fields and ensure image dimensions are correct."
      );
      setIsImageSuccess(false);

      return;
    }

    try {
      setIsPopupOpen(false);
      setIsLoading(true);
      const formDataObj = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });

      formDataObj.append("photo", photo);
      formDataObj.append("marksheet", marksheet);

      const response = await axios.post("/admission", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      setSubmitID(response.data.submitID);
      if (response.status === 200) {
        setIsImageSuccess(true);
        setMyCookie("submitID", response.data.submitID, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      } else {
        console.error("Form submission failed");
        setError("Form submission failed. Please try again.");
        setIsPopupOpen(true);
        setIsImageSuccess(false);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
      setError(
        `An unexpected error occurred. Please try again later. : ${error}`
      );
      setIsPopupOpen(true);
      setIsImageSuccess(false);
    }
  };

  return (
    <form className="m-10 md:mx-20 ">
      {submitID ? navigate("/preview") : null}
      {/* personal details */}

      <div className="py-10 gap-4 flex flex-col font-bold">
        {/* image Section */}
        <h1 className="text-4xl ">1. Personal Details</h1>
        <hr className="border-2 border-black" />
        <div className="flex flex-row ">
          <div>
            <div className="border border-black w-[200px] h-[200px]">
              {photo ? (
                <img
                  width={"1000px"}
                  src={URL.createObjectURL(photo)}
                  alt="uploaded"
                />
              ) : null}
            </div>
            <input
              type="file"
              name=""
              id=""
              accept="image/*"
              onChange={handleImageLoad}
              aria-required
              required
            />
            {isImageSuccess ? (
              <p className="p-4 text-green-400">Image Uploaded Successfully</p>
            ) : null}
            {isImageError ? (
              <p className="p-4 text-red-400">{isImageError}</p>
            ) : null}
          </div>
          <div>
            <label className="">Enroll in Class :</label>
            <select
              onChange={(e) => {
                setEnroll(e.target.value);
                setFormData({ ...formData, ENROLL_CLASS: e.target.value });
              }}
              name=""
              id=""
            >
              <option value="" selected="selected" disabled="disabled">
                -- select one --
              </option>
              <option value="PG">PG</option>
              <option value="NURSERY">NURSERY</option>
              <option value="LKG">LKG</option>
              <option value="UKG">UKG</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>

              <option value="11">11</option>
            </select>
          </div>
        </div>
        {/* Name */}
        <div className="flex flex-row">
          <label htmlFor="name">Name:</label>
          <input
            onChange={(e) => {
              setFormData({ ...formData, NAME: e.target.value });
            }}
            className="w-64"
            type="text"
            name="name"
            id=""
            required
          />
        </div>

        <div className=" gap-4  justify-between">
          {/* dob */}
          <div className="flex items-center">
            <label htmlFor="dob" className="w-32">
              Date Of Birth :
            </label>
            <input
              type="date"
              onChange={(e) =>
                setFormData({ ...formData, DATE_OF_BIRTH: e.target.value })
              }
              name=""
              id=""
              className="w-64"
            />
          </div>
          {/* Mobile */}
          <div className="flex items-center mb-4">
            <label htmlFor="mobile" className="w-16">
              Mobile :</label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, MOBILE: e.target.value });
              }}
              type="tel"
              name="mobile"
              id=""
              className="w-64"
            />
          </div>
          {/* Email */}
          <div className="flex items-center">
            <label htmlFor="email" className="w-16">
              Email  :
            </label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, EMAIL: e.target.value });
              }}
              type="email"
              name="email"
              id=""
              className="w-64"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-between">
          {/* Nationality */}
          <div className="flex items-center">
            <label htmlFor="nation" className="w-32">
              Nationality :
            </label>
            <select
              onChange={(e) => {
                setFormData({ ...formData, NATIONALITY: e.target.value });
              }}
            >
              <option value="">-- select one --</option>
              <option value="Indian">Indian</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {/* Religion */}
          <div className="flex items-center">
            <label htmlFor="religion" className="w-32">
              Religion :
            </label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, RELIGION: e.target.value });
              }}
              type="text"
              name="religion"
              className="w-64"
            />
          </div>
          {/* category */}
          <div className="flex items-center">
            <label htmlFor="category" className="w-32">
              Category :
            </label>
            <select
              onChange={(e) => {
                setFormData({ ...formData, CATEGORY: e.target.value });
              }}
              name=""
              id=""
              required
              className="w-64"
            >
              <option value="" selected="selected" disabled="disabled">
                -- select one --
              </option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </select>
          </div>
        </div>

        {/* <div className="flex flex-wrap justify-between py- gap-4"> */}
        {/* Language */}
        {/* <div className="flex items-center">
            <label htmlFor="language" className="w-32">
              Language :
            </label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, LANGUAGE: e.target.value });
              }}
              type="text"
              name="language"
              id=""
              className="w-64"
            />
          </div> */}
        {/* Blood Group */}
        {/* <div className="flex items-center">
            <label htmlFor="blood" className="w-32">
              Blood Group :
            </label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, BLOOD_GROUP: e.target.value });
              }}
              type="text"
              name="blood"
              id=""
              className="w-64"
            />
          </div> */}
        {/* Gender */}
        {/* <div className="flex items-center">
            <label htmlFor="gender" className="w-32">
              Gender :
            </label>
            <select
              onChange={(e) => {
                setFormData({ ...formData, GENDER: e.target.value });
              }}
              name=""
              id=""
              className="w-64"
            >
              <option value="" selected="selected" disabled="disabled">
                -- select one --
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div> */}
        {/* </div> */}

        {/* BCCL Employee/Non-BCCL/staff ward */}
        {/* <div className="">
          <label htmlFor="">Staff Ward:</label>
          <select
            onChange={(e) => {
              setFormData({
                ...formData,
                BCCL_EMPLOYEE_STATUS: e.target.value,
              });
            }}
            name=""
            id=""
          >
            <option value="NA" selected="selected" disabled="disabled">
              -- select one --
            </option>
            <option value="BCCL Employee">BCCL Employee</option>
            <option value="Non-BCCL">Non-BCCL</option>
            <option value="staff ward">Staff Ward</option>
          </select>
        </div> */}
        {/* Name of the last school */}
        <div className="flex flex-row items-center">
          <label htmlFor="lastSchoolName" className="">
            Last School Name:
          </label>
          <input
            onChange={(e) => {
              setFormData({
                ...formData,
                SCHOOL_NAME_WITH_ADDRESS: e.target.value,
              });
            }}
            className="w-64"
            type="text"
            id="lastSchoolName"
          />
        </div>
        {/* Present Address */}
        <div className="flex flex-row">
          <label htmlFor="" className="">Present Address :</label>
          <input
            onChange={(e) => {
              setFormData({ ...formData, PRESENT_ADDRESS: e.target.value });
            }}
            className="w-64 h-8"
            type="text"
            name=""
            id=""
          />
        </div>
        {/* checkbox for same  */}
        <div className="flex flex-row">
          <label htmlFor="">Same as Permanent Address: </label>
          <input
            onChange={checkHandler}
            checked={isChecked}
            className="w-10"
            type="checkbox"
            name=""
            id=""
          />
          <p>The checkbox is {isChecked ? "checked" : "unchecked"}</p>
        </div>
        {/* Permanent Address */}
        {/* <div className="flex flex-row disabled:bg-slate-400">
          <label htmlFor="">Permanent Address:</label>
          <input
            value={
              isChecked ? formData.PRESENT_ADDRESS : formData.PERMANENT_ADDRESS
            }
            disabled={isChecked}
            onChange={(e) => {
              setFormData({ ...formData, PERMANENT_ADDRESS: e.target.value });
            }}
            className="w-full"
            type="text"
            name=""
            id=""
          />
        </div> */}
      </div>
      {/* Parent/Guardian Details */}
      <div className="flex flex-col gap-4 font-bold py-4">
        {/* <h1 className="text-4xl">2. Parent/Guardian Details</h1> */}
        {/* <hr className="border-2 border-black" /> */}

        <div className=" gap-16">
          {/* Father Details */}
          <div className="flex flex-col gap-4">
            {/* Father's Name */}
            <div className="flex flex-row items-center">
              <label htmlFor="father" className="w-32">
                Father's Name:
              </label>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, FATHER_NAME: e.target.value });
                }}
                className="w-64"
                type="text"
                name="father"
                id="father"
              />
            </div>

            {/* Education Qualification */}
            {/* <div className="flex flex-row items-center">
              <label htmlFor="fatherEducation" className="w-32">
                Education Qualification :
              </label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    FATHER_EDUCATION_QUALIFICATION: e.target.value,
                  });
                }}
                className="w-64"
                type="text"
                name="fatherEducation"
                id="fatherEducation"
              />
            </div> */}

            {/* Occupation */}
            {/* <div className="flex flex-row items-center">
              <label htmlFor="fatherOccupation" className="w-32">
                Occupation :
              </label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    FATHER_OCCUPATION: e.target.value,
                  });
                }}
                className="w-64"
                type="text"
                name="fatherOccupation"
                id="fatherOccupation"
              />
            </div> */}

            {/* Name Of the Organisation */}
            {/* <div className="flex flex-row items-center">
              <label htmlFor="fatherOrg" className="w-32">
                Name Of The Organisation:
              </label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    FATHER_ORGANISATION_NAME: e.target.value,
                  });
                }}
                className="w-64"
                type="text"
                name="fatherOrg"
                id="fatherOrg"
              />
            </div> */}

            {/* Designation */}
            {/* <div className="flex flex-row items-center">
              <label htmlFor="fatherDesignation" className="w-32">
                Designation :
              </label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    FATHER_DESIGNATION: e.target.value,
                  });
                }}
                className="w-64"
                type="text"
                name="fatherDesignation"
                id="fatherDesignation"
              />
            </div> */}

            {/* Address */}
            {/* <div className="flex flex-row items-center">
              <label htmlFor="fatherAddress" className="w-32">
                Address:
              </label>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, FATHER_ADDRESS: e.target.value });
                }}
                className="w-64"
                type="text"
                name="fatherAddress"
                id="fatherAddress"
              />
            </div> */}

            {/* Mobile no. */}
            {/* <div className="flex flex-row items-center">
              <label htmlFor="fatherMobile" className="w-32">
                Mobile No.:
              </label>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, FATHER_MOBILE: e.target.value });
                }}
                className="w-64"
                type="text"
                name="fatherMobile"
                id="fatherMobile"
              />
            </div> */}
          </div>

          {/* Mother's */}
          <div className="flex flex-col gap-4 my-4">
            {/* Mother's Name */}
            <div className="flex flex-row items-center">
              <label htmlFor="mother" className="w-32">
                Mother's Name:
              </label>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, MOTHER_NAME: e.target.value });
                }}
                className="w-64"
                type="text"
                name="mother"
                id="mother"
              />
            </div>

            {/* Education Qualification */}
            {/* <div className="flex flex-row items-center">
              <label htmlFor="motherEducation" className="w-32">
                Education Qualification:
              </label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    MOTHER_EDUCATION_QUALIFICATION: e.target.value,
                  });
                }}
                className="w-64"
                type="text"
                name="motherEducation"
                id="motherEducation"
              />
            </div> */}

            {/* Occupation */}
            {/* <div className="flex flex-row items-center">
              <label htmlFor="motherOccupation" className="w-32">
                Occupation:
              </label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    MOTHER_OCCUPATION: e.target.value,
                  });
                }}
                className="w-64"
                type="text"
                name="motherOccupation"
                id="motherOccupation"
              />
            </div> */}

            {/* Name Of The Organisation */}
            {/* <div className="flex flex-row items-center">
              <label htmlFor="motherOrg" className="w-32">
                Name Of The Organisation:
              </label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    MOTHER_ORGANISATION_NAME: e.target.value,
                  });
                }}
                className="w-64"
                type="text"
                name="motherOrg"
                id="motherOrg"
              />
            </div> */}

            {/* Designation */}
            {/* <div className="flex flex-row items-center">
              <label htmlFor="motherDesignation" className="w-32">
                Designation:
              </label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    MOTHER_DESIGNATION: e.target.value,
                  });
                }}
                className="w-64"
                type="text"
                name="motherDesignation"
                id="motherDesignation"
              />
            </div> */}

            {/* Address */}
            {/* <div className="flex flex-row items-center">
              <label htmlFor="motherAddress" className="w-32">
                Address:
              </label>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, MOTHER_ADDRESS: e.target.value });
                }}
                className="w-64"
                type="text"
                name="motherAddress"
                id="motherAddress"
              />
            </div> */}

            {/* Mobile No. */}
            {/* <div className="flex flex-row items-center">
              <label htmlFor="motherMobile" className="w-32">
                Mobile No.:
              </label>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, MOTHER_MOBILE: e.target.value });
                }}
                className="w-64"
                type="text"
                name="motherMobile"
                id="motherMobile"
              />
            </div> */}
          </div>
        </div>

        {/* Annual Income */}
        {/* <div className="flex flex-row items-center">
          <label htmlFor="annualIncome" className="w-32">
            Annual Income:
          </label>
          <input
            onChange={(e) => {
              setFormData({ ...formData, ANNUAL_INCOME: e.target.value });
            }}
            className="w-64"
            type="text"
            name="annualIncome"
            id="annualIncome"
          />
        </div> */}
      </div>

      {/*3. Board Detail  */}
      <div className="py-4 gap-4 flex flex-col font-bold">
        {/* <h1 className="text-4xl">3. Board Detail</h1>
        <hr className="border-2 border-black" /> */}

        {/* For flex row */}
        <div className="flex flex-row gap-16">
          {/* column left */}
          <div className="flex flex-col gap-4">
            {/* Board Name */}
            {/* <div className="flex flex-row items-center">
              <label htmlFor="boardName" className="w-32">
                Name Of The Board:
              </label>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, BOARD_NAME: e.target.value });
                }}
                type="text"
                id="boardName"
              />
            </div> */}
            {/* Board Roll No. */}
            {/* <div className="flex flex-row items-center">
              <label htmlFor="boardRollNo" className="w-32">
                Board Roll No.
              </label>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, BOARD_ROLL_NO: e.target.value });
                }}
                type="text"
                id="boardRollNo"
              />
            </div> */}
          </div>

          {/* column right */}
          <div className="flex flex-col gap-4">
            {/* Registration No. */}
            {/* <div className="flex flex-row items-center ">
              <label htmlFor="registrationNo" className="w-36">
                Registration No.
              </label>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, REGISTRATION_NO: e.target.value });
                }}
                type="text"
                id="registrationNo"
              />
            </div> */}

            {/* Year Of Passing/Appearing */}
            {/* <div className="flex flex-row items-center">
              <label htmlFor="passingYear" className="w-36">
                Year Of Passing/Appearing
              </label>
              <input
                type="text"
                id="passingYear"
                onChange={(e) => {
                  setFormData({ ...formData, PASSING_YEAR: e.target.value });
                }}
              />
            </div> */}
          </div>
        </div>

        {/* Sibling */}
        {/* <div className="flex flex-row items-center">
          <label htmlFor="sibling" className="w-32">
            Sibling(Own Brother/Sister Only):
          </label>
          <select
            name="sibling"
            id="sibling"
            className="w-64"
            onChange={(e) => {
              setSibling(e.target.value);
            }}
          >
            <option value="" selected="selected" disabled="disabled">
              -- select one --
            </option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div> */}

        {/* Sibling Detail */}
        <div className="flex flex-row gap-4">
          {/* Sibling Name */}
          {/* <div className="flex flex-row items-center">
            <label htmlFor="siblingName" className="w-32">
              Sibling Name
            </label>
            <input
              type="text"
              id="siblingName"
              onChange={(e) => {
                if (e.target.value === "No") {
                  setFormData({ ...formData, SIBLING_NAME: "NA" });
                } else {
                  setFormData({ ...formData, SIBLING_NAME: e.target.value });
                }
              }}
            />
          </div> */}
          {/* Sibling Class */}
          {/* <div className="flex flex-row items-center">
            <label htmlFor="siblingClass" className="w-32">
              Class :
            </label>
            <input
              type="text"
              id="siblingClass"
              onChange={(e) => {
                if (e.target.value === "No") {
                  setFormData({ ...formData, CLASS: "NA" });
                } else {
                  setFormData({ ...formData, CLASS: e.target.value });
                }
              }}
            />
          </div> */}

          {/* Admin no. */}
          {/* <div className="flex flex-row items-center">
            <label htmlFor="adminNo" className="w-32">
              Admin No. :
            </label>
            <input
              type="text"
              id="adminNo"
              onChange={(e) => {
                if (e.target.value === "No") {
                  setFormData({ ...formData, ADMIN_NO: "NA" });
                } else {
                  setFormData({ ...formData, ADMIN_NO: e.target.value });
                }
              }}
            />
          </div> */}
        </div>
      </div>

      {/* Marks(10th Class)/ Pre Board */}
      {enroll > 10 && (
        <div className="py-11 gap-4 flex flex-col font-bold">
          {/* <h1 className="text-4xl">4. Marks(10th Class)/ Pre Board</h1> */}
          {/* <hr className="border-2 border-black" /> */}
          {/* Percentage or Grade */}
          {/* Input for Percentage or CGPA */}
          <div className="flex flex-row gap-4 items-center">
            <label htmlFor="percentageGrade" className="w-32">
              Percentage Or Grade
              <p>Marks Of 3 subjects - English, Maths, Sc/S.St</p>
            </label>
            <select id="percentageGrade" className="w-64">
              <option
                selected="selected"
                disabled="disabled"
                onChange={(e) => {
                  setFormData({ ...formData, CRITERIA: e.target.value });
                }}
              >
                -- select one --
              </option>
              <option>Percentage</option>
              <option>Grade</option>
            </select>
          </div>

          {/* Medium of Exam */}
          <div className="flex flex-row items-center">
            <label htmlFor="mediumOfExam" className="w-32">
              Medium Of Exam
            </label>
            <input
              type="text"
              id="mediumOfExam"
              className="w-64"
              onChange={(e) => {
                setFormData({ ...formData, MEDIUM_OF_EXAM: e.target.value });
              }}
            />
          </div>

          {/* Xerox copy of Marksheet */}
          <div className="flex flex-row items-center">
            <label htmlFor="marksheet" className="w-32">
              Xerox Copy Of Marksheet PDF
            </label>
            <input
              type="file"
              id="marksheet"
              onChange={handleMarksheetChange}
              accept="application/pdf"
              className="w-64 border border-orange-50 font-normal"
              required={enroll > 10 ? true : false}
            />
          </div>
        </div>
      )}

      {/* submit */}
      <div className="flex flex-row justify-center">
        <button
          className="bg-black text-white py-2 px-4 rounded-lg disabled:bg-gray-400"
          disabled={isLoading}
          onClick={handleFormSubmit}
          type="submit"
        >
          Submit
        </button>
      </div>

      {/* Popup for displaying errors */}
      <Popup open={isPopupOpen} closeOnDocumentClick onClose={closePopup}>
        <div className=" border-2 border-solid border-b-red-900 rounded text-black">
          <p className="text-red-400">{error}</p>
          <div className="flex flex-wrap gap-4 m-5">
            {emptyFields &&
              emptyFields.map((fields, i) => (
                <div key={i}>
                  <p>{fields}</p>
                </div>
              ))}
          </div>
          <button onClick={closePopup}>Close</button>
        </div>
      </Popup>

      {/* payment */}
    </form>
  );
}
export default AdForm;

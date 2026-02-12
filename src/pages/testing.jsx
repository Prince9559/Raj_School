import React, { useContext, useState } from "react";
import {
  Instructions,
  DocumentRequirements,
  OnlineRegistration,
  StudentDetails,
  FatherDetails,
  MotherDetails,
  CorrespondingAddressDetails,
  PermanentAddressDetails,
  UploadDocuments,
  SubmissionSuccess,
  CompletionBar,
  Sidebar,
} from "../component/registrationForm/index";
import { useCookies } from "react-cookie";
import {
  registrationForm,
  uploadDuments,
} from "../services/opreations/authApi";
import UserContext from "../context/UserContext";

const App = () => {
  const [myCookie, setMyCookie] = useCookies("submitID");
  const { submitID, setSubmitID } = useContext(UserContext);
  const [upload, setUpload] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    academicYear: "",
    class: "",
    firstName: "",
    lastName: "",
    dob: "",
    parentFirstName: "",
    parentLastName: "",
    parentEmail: "",
    parentPhone: "",
    correspondingAddress: "",
    correspondingCountry: "",
    correspondingState: "",
    correspondingCity: "",
    correspondingPinCode: "",
    permanentAddress: "",
    permanentCountry: "",
    permanentState: "",
    permanentCity: "",
    permanentPinCode: "",
    birthCertificate: null,
    passportPhoto: null,
    submitID,
  });

  console.log("formData =", formData);
  const handleNextStep = () => {
    if (
      currentStep === 2 &&
      (!formData.firstName || !formData.lastName || !formData.dob)
    ) {
      alert("Please fill in the required fields");
      return;
    }
    if (
      currentStep === 3 &&
      (!formData.parentFirstName ||
        !formData.parentLastName ||
        !formData.parentEmail ||
        !formData.parentPhone)
    ) {
      alert("Please fill in the required fields");
      return;
    }
    console.log("handleNextStep =");
    if (myCookie.submitID) {
      setCurrentStep(3);
      console.log("handleNextStep =");
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const submitPersonalDetails = async () => {
    const responseData = await registrationForm(formData);
    console.log(" registrationForm  responseData =", responseData);
    if (responseData) {
      setMyCookie("submitID", responseData, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      setSubmitID(responseData);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.childAadhaar) {
      alert("Please upload the Documents!");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("childAadhaar", formData.childAadhaar);
    formDataToSubmit.append("submitID", myCookie.submitID);

    const responseData = await uploadDuments(formDataToSubmit);
    if (responseData) {
      setCurrentStep(4);
      setMyCookie("submitID", null);
    }
  };

  console.log("myCookie =", myCookie.submitID);
  console.log("submitID =", submitID);

  return (
    <div className="text-xs flex flex-col md:flex-row font-poppins bg-white h-full pt-[100px]">
      <div className="lg:w-1/4 md:h-screen md:sticky md:top-0">
        <Sidebar />
      </div>
      <div className="w-full lg:w-3/4 p-4 lg:p-8 overflow-y-auto">
        <div className="flex flex-col justify-center items-center mb-8">
          <h1 className="text-2xl font-bold">Registration Form</h1>
          <p className="text-xs">
            Register by entering the information mentioned below
          </p>
        </div>
        <div className="hidden md:flex justify-center items-center ml-24 ">
          <CompletionBar currentStep={currentStep} />
        </div>
        <div className="mb-8 hidden md:flex flex-col lg:flex-row justify-between">
          <button
            onClick={() => setCurrentStep(1)}
            className={`py-2 px-4 rounded mb-2 lg:mb-0 ${
              currentStep === 1 ? "bg-blue-900 text-white" : "bg-gray-200"
            }`}
          >
            Instructions
          </button>
          <button
            onClick={() => setCurrentStep(2)}
            className={`py-2 px-4 rounded mb-2 lg:mb-0 ${
              currentStep === 2 ? "bg-blue-900 text-white" : "bg-gray-200"
            }`}
          >
            Student And Parent Details
          </button>
          <button
            onClick={() => setCurrentStep(3)}
            className={`py-2 px-4 rounded ${
              currentStep === 3 ? "bg-blue-900 text-white" : "bg-gray-200"
            }`}
          >
            Upload Documents
          </button>
          <button
            onClick={() => setCurrentStep(4)}
            className={`py-2 px-4 rounded ${
              currentStep === 4 ? "bg-blue-900 text-white" : "bg-gray-200"
            }`}
          >
            Complete
          </button>
        </div>

        {currentStep === 1 && (
          <>
            <Instructions />
            <DocumentRequirements />
            <OnlineRegistration handleNextStep={handleNextStep} />
          </>
        )}
        {currentStep === 2 && (
          <div className="space-y-10">
            <StudentDetails formData={formData} setFormData={setFormData} />
            <FatherDetails formData={formData} setFormData={setFormData} />
            <MotherDetails formData={formData} setFormData={setFormData} />
            <CorrespondingAddressDetails
              formData={formData}
              setFormData={setFormData}
            />
            <PermanentAddressDetails
              formData={formData}
              setFormData={setFormData}
            />
            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePrevStep}
                className="border-2 border-grey-800 text-blue-500 py-2 px-4 rounded"
              >
                Previous
              </button>
              <button
                onClick={submitPersonalDetails}
                className="bg-blue-500 text-white py-2 px-6 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <UploadDocuments
              setUpload={setUpload}
              upload={upload}
              submitID={myCookie.submitID}
              formData={formData}
              setFormData={setFormData}
            />
            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePrevStep}
                className="border-2 border-grey-800 text-blue-500 py-2 px-4 rounded"
              >
                Previous
              </button>
              <button
                onClick={handleSubmit}
                disabled={!upload}
                className={`${
                  !upload ? "bg-blue-300" : "bg-blue-500"
                }  text-white py-2 px-6 rounded`}
              >
                Submit
              </button>
            </div>
          </div>
        )}
        {currentStep === 4 && <SubmissionSuccess />}
      </div>
    </div>
  );
};

export default App;

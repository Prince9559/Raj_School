import React, { useEffect, useRef, useState } from "react";
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
} from "./registrationForm/index";

// import { useCookies } from "react-cookie";
import {
  registrationForm,
  uploadDuments,
} from "../../services/opreations/authApi.js";

// import { defaultSchoolCode } from "../../main";
import axios from "axios";
import { showRazorpay } from "../../component/Payment.js";
// import { COOKIEMAXAGE } from "../../utils/constant.js";

export const steps = {
  init: 1,
  userDetails: 2,
  paymentDetails: 3,
  finalStep: 4,
};

const NewAdmission = () => {
  const [loading, setLoading] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [upload, setUpload] = useState(false);
  const [submitID, setSubmitID] = useState(
    JSON.parse(sessionStorage.getItem("submitID")) || null
  );
  const [studentName, setStudentName] = useState(
    JSON.parse(sessionStorage.getItem("studentName")) || null
  );
  const [email, setEmail] = useState(
    JSON.parse(sessionStorage.getItem("email")) || null
  );
  const [currentStep, setCurrentStep] = useState(
    JSON.parse(sessionStorage.getItem("currentStep")) || steps.init
  );

  const paymentDetails = useRef({});
  const [isUploadDocument, setIsUploadDocument] = useState(false);

  const [formData, setFormData] = useState(
    JSON.parse(sessionStorage.getItem("formData")) || {
      academicYear: "",
      class: "",
      firstName: "",
      lastName: "",
      middleName: "",
      dob: null,
      aadhaarNo: "",
      primaryMobileNo: "",
      whatsappMobileNo: "",
      emailId: "",
      previousSchool: "",
      fatherName: "",
      fatherQualification: "",
      fatherOccupation: "",
      fatherDesignation: "",
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
      submitID: null,
    }
  );


  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    sessionStorage.setItem("currentStep", JSON.stringify(currentStep));
  }, [currentStep]);

  useEffect(() => {
    sessionStorage.setItem("submitID", JSON.stringify(submitID));
  }, [submitID]);

  useEffect(() => {
    sessionStorage.setItem("studentName", JSON.stringify(studentName));
  }, [studentName]);

  useEffect(() => {
    sessionStorage.setItem("email", JSON.stringify(email));
  }, [email]);

  const handleNextStep = () => {
    if (currentStep === steps.init) {
      setCurrentStep(steps.userDetails);
    }
    if (
      currentStep === steps.userDetails &&
      (!formData.firstName || !formData.lastName || !formData.dob)
    ) {
      alert("Please fill in the required fields");
      return;
    }
    if (
      currentStep === steps.userDetails &&
      (!formData.parentFirstName ||
        !formData.parentLastName ||
        !formData.parentEmail ||
        !formData.parentPhone)
    ) {
      alert("Please fill in the required fields");
      return;
    }
    if (submitID) {
      setCurrentStep(steps.paymentDetails);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const submitPersonalDetails = async () => {
    const responseData = await registrationForm(formData);
    console.log("registrationForm responseData =", responseData);

    if (responseData.submitID) {
      setSubmitID(responseData.submitID);
      setCurrentStep(steps.paymentDetails);
      console.log("submitID =", responseData.submitID); // Log directly from responseData
    }

    if (responseData.emailId) {
      const decodedEmailId = decodeURIComponent(responseData.emailId);
      setEmail(decodedEmailId);
    }
    if (responseData.student_name) {
      setStudentName(responseData.student_name);
    }
  };
     


  const handleSubmit = async () => {
    try {
      if (!submitID) {
        alert("Please provide submit ID");
        return;
      }
  
      // Validate if the required document is uploaded
      if (!formData.childAadhaar) {
        alert("Please upload the required document (e.g., childAadhaar)!");
        return; // Stop execution if the document is not uploaded
      }
  
      // Validate if the user has agreed to the terms
      if (!isAgree) {
        alert("Please check the Agreement!");
        return; // Stop execution if the agreement is not checked
      }
  
      setLoading(true);
  
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("childAadhaar", formData.childAadhaar);
      formDataToSubmit.append("submitID", submitID);
  
      // Upload documents if not already uploaded
      if (!isUploadDocument) {
        const uploadDocResponseData = await uploadDuments(formDataToSubmit);
        console.log("uploadDocResponseData =", uploadDocResponseData);
  
        if (!uploadDocResponseData.success) {
          setLoading(false);
          return; // Stop execution if the document upload fails
        }
  
        setIsUploadDocument(true);
      }
  
      // Proceed to payment only if documents are uploaded and agreed
      const responseRazorpay = await showRazorpay({
        id: submitID,
        student_email: email,
        student_name: studentName,
        setCurrentStep: setCurrentStep,
      });
      console.log("response of razorpay =", responseRazorpay);
      
    } catch (error) {
      console.log("Error in submitting the documents", error);
    } finally {
        // Reset the form state only if the payment is successful
        sessionStorage.clear();
        setSubmitID(null);
        setStudentName(null);
        setEmail(null);
        setFormData({
          academicYear: "",
          class: "",
          firstName: "",
          lastName: "",
          middleName: "",
          dob: null,
          aadhaarNo: "",
          primaryMobileNo: "",
          whatsappMobileNo: "",
          emailId: "",
          previousSchool: "",
          fatherName: "",
          fatherQualification: "",
          fatherOccupation: "",
          fatherDesignation: "",
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
          submitID: null,
        });
        setCurrentStep(steps.init); // Reset to the initial step.
        setIsUploadDocument(false); // Reset the upload document status
      setLoading(false);
      paymentDetails.current = {}; 
    }
  };


  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }
  const debbounceHandleSubmit = debounce(handleSubmit, 1000);
  const getPaymentResponse = async () => {
    if (submitID) {
      let paymentResponse = await axios.get(`getPaymentDetail/${submitID}`);
      if (paymentResponse?.status === 200) {
        paymentDetails.current = paymentResponse.data;
        if (
          paymentDetails.current?.paymentDetailResponse?.STATUS === "SUCCESS" ||
          paymentDetails?.current.paymentDetailResponse?.STATUS === "PENDING"
        ) {
          setCurrentStep(steps.finalStep);
        }
        if (
          paymentDetails?.current?.paymentDetailResponse?.STATUS === "FAILED" ||
          paymentDetails?.current?.paymentDetailResponse?.STATUS === "INITIATED"
        ) {
          setCurrentStep(steps?.paymentDetails);
        }
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await getPaymentResponse();
      if (
        paymentDetails.current?.paymentDetailResponse?.STATUS === "Not Paid" ||
        paymentDetails.current?.paymentDetailResponse?.STATUS === "FAILED" ||
        paymentDetails.current?.paymentDetailResponse?.STATUS === "INITIATED"
      ) {
        setCurrentStep(steps.paymentDetails);
      }
    };

    fetchData();
  }, [submitID, currentStep]);


  return (
    <div className="text-xs flex lg:flex-row md:flex-col md:p-3 w-full rounded-xl lg:mx-auto font-poppins bg-white h-full mt-24">
      <Sidebar className="lg:w-1/4 h-full" />
      {/* <div className="w-full lg:w-3/4 p-4 lg:p-8 lg:ml-[25%]"> */}
      <div className="w-full lg:w-3/4 p-4 lg:p-8">
        <div className="flex flex-col justify-center items-center mb-8">
          <h1 className="text-2xl font-bold">Registration Form</h1>
          <p className="text-xs">
            Register by entering the information mentioned below
          </p>
        </div>
        <div className="flex justify-center items-center lg:ml-24 ex:m-0  w-full ">
          <CompletionBar currentStep={currentStep} />
        </div>
        {/* <div className="mb-8 flex flex-col lg:flex-row justify-between">
                    <button onClick={() => setCurrentStep(1)} className={`py-2 px-4 rounded mb-2 lg:mb-0 ${currentStep === 1 ? 'bg-blue-900 text-white' : 'bg-gray-200'}`}>Instructions</button>
                    <button onClick={() => setCurrentStep(2)} className={`py-2 px-4 rounded mb-2 lg:mb-0 ${currentStep === 2 ? 'bg-blue-900 text-white' : 'bg-gray-200'}`}>Student And Parent Details</button>
                    <button onClick={() => setCurrentStep(3)} className={`py-2 px-4 rounded ${currentStep === 3 ? 'bg-blue-900 text-white' : 'bg-gray-200'}`}>Upload Documents</button>
                    <button onClick={() => setCurrentStep(4)} className={`py-2 px-4 rounded ${currentStep === 4 ? 'bg-blue-900 text-white' : 'bg-gray-200'}`}>Complete</button>
                </div> */}

                {!submitID && currentStep === steps.init && (
          <>
            <Instructions />
            <DocumentRequirements />
            <OnlineRegistration handleNextStep={handleNextStep} />
          </>
        )}
        {currentStep === steps.userDetails && (
          <div className="space-y-10">
            <StudentDetails
              formData={formData}
              setFormData={setFormData}
              setStudentName={setStudentName}
            />
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
        {currentStep === steps.paymentDetails && (
          <div>
            <UploadDocuments
              setIsAgree={setIsAgree}
              setUpload={setUpload}
              upload={upload}
              submitID={submitID}
              formData={formData}
              setFormData={setFormData}
            
              isUploadDocument={isUploadDocument}
            />
            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePrevStep}
                className="border-2 border-grey-800 text-blue-500 py-2 px-4 rounded"
              >
                Previous
              </button>
              {/* <button onClick={handleSubmit} disabled={!upload} className={`${!upload ? "bg-blue-300": "bg-blue-500"}  text-white py-2 px-6 rounded`}>Submit</button> */}
              <button
                onClick={debbounceHandleSubmit}
                className={` text-white py-2 px-6 rounded ${
                  paymentDetails.current?.paymentDetailResponse?.STATUS ===
                  "SUCCESS"
                    ? "bg-green-500"
                    : paymentDetails.current?.paymentDetailResponse?.STATUS ===
                      "PENDING"
                    ? "bg-yellow-300"
                    : "bg-blue-500"
                }`}
              >
                {/* {!upload  ?"Plz upload docs":!isAgree?"plz check the Agreement" : paymentDetails.current?.paymentDetailResponse.STATUS === "SUCCESS" ? "Payment Successful" :paymentDetails.current?.paymentDetailResponse.STATUS === "PENDING" ? "Payment Pending" :
                                <Payment ref={paymentRef} id={cookies.submitID} schoolCode={defaultSchoolCode}student_email={cookies.emailId} setCurrentStep={setCurrentStep} type="submit"/> } */}

                {/* if cookies.documentUploaded is true than show Payment */}
                {loading
                  ? "Loading"
                  : !upload
                  ? "Please upload documents"
                  : !isAgree
                  ? "Please check the Agreement"
                  : isUploadDocument &&
                    paymentDetails.current?.paymentDetailResponse?.STATUS !==
                      "SUCCESS"
                  ? "Payment"
                  : paymentDetails.current?.paymentDetailResponse?.STATUS ===
                    "SUCCESS"
                  ? "Payment Successful"
                  : paymentDetails.current?.paymentDetailResponse?.STATUS ===
                    "PENDING"
                  ? "Payment Pending"
                  : "Submit & Pay"}
              </button>
              {/* {
    showPayment && (
        <Payment ref={paymentRef}
         id={cookies.submitID}
          schoolCode={defaultSchoolCode}
          student_email={cookies.emailId} 
          setLoading={setLoading}
          loading={loading}
          setCurrentStep={setCurrentStep} type="submit"/>
    )
} */}
            </div>
          </div>
        )}
        {currentStep === steps.finalStep &&
          (paymentDetails.current.paymentDetailResponse.STATUS === "SUCCESS" ? (
            <SubmissionSuccess submitID={submitID} />
          ) : (
            <div className="bg-red-50 md:p-10">
              <h1 className="text-center text-2xl text-yellow-500">
                Payment Pending
              </h1>
              <p className="text-center text-lg">
                Please contact <strong>School Administration</strong>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewAdmission;

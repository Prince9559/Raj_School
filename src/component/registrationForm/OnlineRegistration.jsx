import React, { useState } from "react";

const OnpneRegistration = ({ handleNextStep }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="px-4 lg:px-0">
      <h2 className="text-sm text-[#343A78] font-bold bg-[#F5F7F9] py-2.5 px-0 flex items-center mb-1.25 -ml-1.5">
        {" "}
        &nbsp;&nbsp;&nbsp;Online Registration Process:
      </h2>

      <br></br>
      <p class="text-xs text-[#666666] flex items-start pb-2 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#FF492C"
          class="mr-2 min-w-[30px] min-h-[20px]"
        >
          <path d="M21 12 3 19l4-7-4-7 18 7z"></path>
        </svg>
        You would need access to Debit / Credit Card, Net Banking, etc. to make
        payment online.
      </p>
      <p class="text-xs text-[#666666] flex items-start pb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="20"
          viewBox="0 0 24 24"
          fill="#FF492C"
          class="mr-2 min-w-[30px] min-h-[20px]"
        >
          <path d="M21 12 3 19l4-7-4-7 18 7z"></path>
        </svg>
        An acknowledgement Email will be generated on successful payment, with
        details filled in by you and a "Registration No" corresponding to the
        Applicant will also be generated, which is to be used for any further
        communication with the school.
      </p>
      <p class="text-xs text-[#666666] flex items-start pb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#FF492C"
          class="mr-2 min-w-[30px] min-h-[20px]"
        >
          <path d="M21 12 3 19l4-7-4-7 18 7z"></path>
        </svg>
        The Admission Fee Payment link will be sent to you via Email / SMS to
        PAY FEE ONLINE.
      </p>
      <br></br>

      <div className="text-sm text-[#343A78] font-bold bg-[#F5F7F9] py-2.5 px-0 flex items-center mb-1.25 -ml-1.5">
        &nbsp;&nbsp;&nbsp;
        <input
          type="checkbox"
          id="agree"
          name="agree"
          className="mr-2"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="agree">
          I have read and agree to abide by the instructions mentioned above by
          the authorities of the School.
        </label>
      </div>
      <div className="flex items-center justify-center mx-auto">
        <button
          onClick={() => isChecked && handleNextStep()}
          className={`mt-4 py-2 px-4 rounded  ${
            isChecked
              ? "bg-blue-500 text-white"
              : "bg-gray-200 cursor-not-allowed"
          }`}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default OnpneRegistration;

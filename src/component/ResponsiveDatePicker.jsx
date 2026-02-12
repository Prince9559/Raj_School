import React, { useState } from "react";
import dayjs from "dayjs";

const FloatingLabelDatePicker = ({ label, id, required, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mt-6 mx-5">
      <input
        type="date"
        id={id}
        name={id}
        className="block w-full text-[15px] appearance-none focus:outline-none border-b-2 rounded-none border-gray-300 focus:border-blue-500 bg-transparent pt-4 pb-1"
        placeholder=" " // Keeps space for the floating label
        value={value ? dayjs(value).format("YYYY-MM-DD") : ""}
        onChange={(e) => onChange(dayjs(e.target.value))}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
      />
      <label
        htmlFor={id}
        className={`absolute left-0 top-2 text-gray-600 font-semibold transition-all duration-300 ease-in-out transform ${
          value || isFocused
            ? "-translate-y-4 scale-75"
            : "translate-y-0 scale-100"
        } origin-top-left pointer-events-none`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {required && !value ? (
        <label className="error font-semibold text-left text-red-500">
          Please insert the {label}
        </label>
      ) : null}
    </div>
  );
};

export default FloatingLabelDatePicker;
